from flask import Flask, request, render_template, redirect, url_for, session
from database import db
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)

app.secret_key = "your_secret_key"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# --- Routes ---
@app.route("/")
def portada():
    # Aquí obtienes las últimas 5 actividades de la base de datos
    actividades = db.get_ultimas_actividades(5)
    return render_template("index.html", actividades=actividades)

@app.route("/formulario", methods=["GET", "POST"])
def formulario():
    if request.method == "POST":
        # Validar y guardar en la base de datos
        # Si hay error, render_template con errores
        # Si todo bien, redirect a portada con mensaje
        pass
    return render_template("formulario.html")

@app.route("/listado")
def listado():
    # Obtener actividades paginadas
    return render_template("listado.html")

@app.route("/estadisticas")
def estadisticas():
    return render_template("estadisticas.html")