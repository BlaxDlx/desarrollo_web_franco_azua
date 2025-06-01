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