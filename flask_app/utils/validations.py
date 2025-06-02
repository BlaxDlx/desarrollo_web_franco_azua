import re
from markupsafe import escape
import filetype

# Validaciones individuales para cada campo del formulario
def validate_comuna(comuna_id):
    try:
        comuna_id = int(comuna_id)
        return None
    except (TypeError, ValueError):
        return "Debe seleccionar una comuna válida."

def validate_sector(sector):
    if sector and len(sector) > 100:
        return "El sector no puede exceder 100 caracteres."
    return None

def validate_nombre(nombre):
    if not nombre or len(nombre) > 200:
        return "Debe ingresar un nombre (máx 200 caracteres)."
    return None

def validate_email(email):
    if not email or len(email) > 100 or not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return "Debe ingresar un email válido (máx 100 caracteres)."
    return None

def validate_celular(celular):
    if celular and not re.match(r"^\+\d{3}\.\d{8}$", celular):
        return "El número de celular no puede exceder 15 caracteres."
    return None

def validate_fechas(inicio, termino):
    from datetime import datetime
    try:
        inicio_dt = datetime.strptime(inicio, "%Y-%m-%dT%H:%M")
    except Exception:
        return "Debe ingresar una fecha y hora de inicio válida."
    if termino:
        try:
            termino_dt = datetime.strptime(termino, "%Y-%m-%dT%H:%M")
            if termino_dt <= inicio_dt:
                return "La fecha de término debe ser posterior a la de inicio."
        except Exception:
            return "Debe ingresar una fecha y hora de término válida."
    return None

def validate_descripcion(descripcion):
    if descripcion and len(descripcion) > 500:
        return "La descripción no puede exceder 500 caracteres."
    return None

def validate_tema(tema, otro_tema):
    temas_validos = ['música','deporte','ciencias','religión','política','tecnología','juegos','baile','comida','otro']
    if tema not in temas_validos:
        return "Debe seleccionar un tema válido."
    if tema == "Otro":
        if not otro_tema or len(otro_tema) < 3 or len(otro_tema) > 15:
            return "Debe indicar un tema entre 3 y 15 caracteres."
    return None

def validate_contactar(contactar, request_form):
    if not contactar or len(contactar) == 0:
        return "Debe seleccionar al menos una forma de contacto."
    if len(contactar) > 5:
        return "No puede seleccionar más de 5 formas de contacto."
    for medio in contactar:
        if medio == "otra":
            nombre_otro = request_form.get("contactar-otra", "")
            identificador_otro = request_form.get("contacto-otra", "")
            if not nombre_otro or len(nombre_otro) < 4 or len(nombre_otro) > 50:
                return "El nombre del contacto adicional debe tener entre 4 y 50 caracteres."
            if not identificador_otro or len(identificador_otro) < 4 or len(identificador_otro) > 50:
                return "El identificador del contacto adicional debe tener entre 4 y 50 caracteres."
        else:
            identificador = request_form.get(f"contacto-{medio}", "")
            if not identificador or len(identificador) < 4 or len(identificador) > 50:
                return f"El identificador para {medio} debe tener entre 4 y 50 caracteres."
    return None

def validate_archivos(archivos):
    if len(archivos) > 5:
        return "No puede subir más de 5 archivos."
    for archivo in archivos:
        if archivo and archivo.filename:
            if len(archivo.filename) > 300:
                return "El nombre del archivo es demasiado largo."
            archivo.seek(0)
            kind = filetype.guess(archivo.read(261))
            archivo.seek(0)
            if not kind or kind.mime.split('/')[0] != 'image':
                return "Solo se permiten archivos de imagen."
    return None

def sanitize_input(text):
    return escape(text) if text else text

# Validaciones para el formulario de actividades
def validate_formulario(formulario, request_form):
    errores = {}

    error = validate_comuna(formulario.get("comuna_id"))
    if error: errores["comuna"] = error

    error = validate_sector(formulario.get("sector"))
    if error: errores["sector"] = error

    error = validate_nombre(formulario.get("nombre"))
    if error: errores["nombre"] = error

    error = validate_email(formulario.get("email"))
    if error: errores["email"] = error

    error = validate_celular(formulario.get("telefono"))
    if error: errores["telefono"] = error

    error = validate_fechas(formulario.get("inicio"), formulario.get("termino"))
    if error: errores["fechas"] = error

    error = validate_descripcion(formulario.get("descripcion"))
    if error: errores["descripcion"] = error

    error = validate_tema(formulario.get("tema"), formulario.get("otro_tema"))
    if error: errores["tema"] = error

    error = validate_contactar(formulario.get("contactar"), request_form)
    if error: errores["contactar"] = error

    error = validate_archivos(formulario.get("archivos"))
    if error: errores["archivos"] = error

    # Sanitizar entradas de texto
    for campo in ["sector", "nombre", "email", "telefono", "descripcion", "otro_tema"]:
        formulario[campo] = sanitize_input(formulario.get(campo))

    return errores