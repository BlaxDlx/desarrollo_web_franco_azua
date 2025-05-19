from flask import Flask, request, render_template, redirect, url_for, session, jsonify
from database import db
from werkzeug.utils import secure_filename
from markupsafe import escape
from utils.validations import validate_formulario
UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)

app.secret_key = "your_secret_key"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# --- Auxiliary Functions ---
def actividadesToDict(actividades):
    return [
        {
            "id": actividad.id,
            "nombre": actividad.nombre,
            "dia_hora_inicio": actividad.hora_inicio,
            "dia_hora_termino": actividad.hora_termino if actividad.dia_hora_termino else "",
            "comuna": {"nombre": actividad.comuna.nombre if actividad.comuna else ""},
            "sector": actividad.sector if actividad.sector else "",
            "descripcion": actividad.descripcion if actividad.descripcion else "",
            "celular": actividad.celular if actividad.celular else "",
            "tema": {
                "tema": actividad.tema.tema if actividad.tema and actividad.tema.tema else "",
                "glosa_otro": actividad.tema.glosa_otro if actividad.tema and actividad.tema.glosa_otro else ""
            } if actividad.tema else {"tema": "", "glosa_otro": ""},
            "email": actividad.email,
            "fotos": [
                {"ruta_archivo": foto.ruta_archivo,"nombre_archivo": foto.nombre_archivo}
                for foto in actividad.fotos
            ]
        }
        for actividad in actividades
    ]

def regionesToDict(regiones):
    return [
        {
            "id": r.id,
            "nombre": r.nombre,
            "comunas": [
                {
                    "id": c.id,
                    "nombre": c.nombre
                }
                for c in r.comunas
            ]
        }
        for r in regiones
    ]

# --- Routes ---
@app.route("/")
def portada():
    # Si hay un mensaje de parte de formulario, enviarlo a la plantilla
    mensaje = request.args.get("mensaje")
    # Aquí se obtienen las 5 actividades de la base de datos
    actividades = db.get_ultimas_actividades(5)
    return render_template("index.html", actividades = actividades, mensaje = mensaje)

@app.route("/formulario", methods=["GET", "POST"])
def formulario():
    if request.method == "POST":
        # Se obtienen los datos del formulario
        formulario = {
            "region_id": request.form.get("region"),
            "comuna_id": request.form.get("comuna"),
            "sector": request.form.get("sector", ""),
            "nombre": request.form.get("nombre"),
            "email": request.form.get("email"),
            "telefono": request.form.get("telefono", ""),
            "inicio": request.form.get("inicio"),
            "termino": request.form.get("termino", ""),
            "descripcion": request.form.get("descripcion"),
            "tema": request.form.get("tema"),
            "otro_tema": request.form.get("otro-tema",""), 
            "contactar": request.form.getlist("contactar"),
            "archivos": request.files.getlist("foto[]")
        }
        # Convertir a None los campos de tipo fecha que no se enviaron
        formulario["termino"] = formulario["termino"] or None

        # Validar los datos del formulario
        errores = validate_formulario(formulario, request.form)
        if errores:
            # Si hay errores, render_template con errores
            return render_template(
                "formulario.html", 
                errores=errores, 
                regiones=regionesToDict(db.get_regiones())
                )
        else:
            # Si todo bien, guardar en la base de datos con los datos sanitizados
            actividad = db.create_actividad(
                int(formulario["comuna_id"]),
                str(formulario["sector"]),
                str(formulario["nombre"]),
                str(formulario["email"]),
                str(formulario["telefono"]),
                formulario["inicio"],
                formulario["termino"],
                str(formulario["descripcion"])
            )
            # Guardar el tema
            db.create_actividad_tema(actividad.id, formulario.tema, formulario.otro_tema)

            # Guardar los medios de contacto
            for medio in formulario.contactar:
                # Como no se pudo sanitizar estos campos dinámicos en las validaciones, se sanitizan aquí
                identificador = str(escape(request.form.get(f"contacto-{medio}")))
                if medio == "otra":
                    nombre_otro = str(escape(request.form.get("contactar-otra")))
                    # Asumimos que ambos campos se tienen debido a las verificacionoes
                    db.create_contactar_por(actividad.id, nombre_otro, identificador)
                else:
                    db.create_contactar_por(actividad.id, medio, identificador)
            # Guardar las fotos
            for archivo in formulario.archivos:
                if archivo and archivo.filename:
                    filename = secure_filename(archivo.filename)
                    ruta_archivo = f"{UPLOAD_FOLDER}/{filename}"
                    archivo.save(ruta_archivo)
                    db.create_foto(actividad.id, ruta_archivo, filename)

            # Redirigir a la página de listado
            return redirect(url_for("portada", mensaje="Actividad agregada correctamente"))
    return render_template("formulario.html", regiones = regionesToDict(db.get_regiones()))

@app.route("/listado")
def listado():
    page = int(request.args.get("page", 1))
    actividades = db.get_todas_las_actividades()
    total = len(actividades)
    start = (page - 1) * 5
    end = start + 5
    actividades_pagina = actividades[start:end]
    actividadesDict = actividadesToDict(actividades)
    total_pages = (total - 1) // 5 + 1
    return render_template(
        "listado.html",
        actividades=actividades_pagina,
        actividadesDict=actividadesDict,
        page=page,
        total_pages=total_pages
    )

@app.route("/estadisticas")
def estadisticas():
    return render_template("estadisticas.html")

# --- API Endpoints ---
@app.route("/api/actividades")
def api_actividades():
    actividades = db.get_todas_las_actividades()
    actividadesDict = actividadesToDict(actividades)
    return jsonify(actividadesDict)

@app.route("/api/regiones")
def api_regiones():
    regiones = db.get_regiones()
    data = regionesToDict(regiones)
    return jsonify(data)