from flask import Flask, request, render_template, redirect, url_for, session, jsonify
from database import db
from werkzeug.utils import secure_filename

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
    # Aquí se obtienen las 5 actividades de la base de datos
    actividades = db.get_ultimas_actividades(5)
    return render_template("index.html", actividades=actividades)

@app.route("/formulario", methods=["GET", "POST"])
def formulario():
    if request.method == "POST":
        # Validar y guardar en la base de datos
        # Si hay error, render_template con errores
        # Si todo bien, redirect a portada con mensaje
        pass
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