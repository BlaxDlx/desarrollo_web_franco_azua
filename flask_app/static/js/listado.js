
// Mostrar detalles de una actividad
const mostrarDetalle = (id) => {
  fetch('/api/actividades')
    .then(response => {
      if (!response.ok) throw new Error("Hubo un error con la solicitud");
      return response.json();
    })
    .then(json => {
      if (json.status !== "ok") throw new Error("Respuesta inválida del servidor");
      const actividades = json.data
      const actividad = actividades.find(a => a.id === id);
      if (!actividad) return;

      const contenedor = document.getElementById("detalle-container");
      contenedor.innerHTML = `
        <div id="contenido-detalle">
          <h2>${actividad.nombre}</h2>
          <p><strong>Inicio:</strong> ${actividad.dia_hora_inicio}</p>
          <p><strong>Término:</strong> ${actividad.dia_hora_termino || "No info"}</p>
          <p><strong>Comuna:</strong> ${actividad.comuna.nombre}</p>
          <p><strong>Sector:</strong> ${actividad.sector || "No info"}</p>
          <p><strong>Tema:</strong> ${actividad.tema.tema}</p>
          <p><strong>Email:</strong> ${actividad.email}</p>
          <p><strong>Celular:</strong> ${actividad.celular || "No info"}</p>
          <p><strong>Descripción:</strong> ${actividad.descripcion || "No info"}</p>
          <div class="galeria-fotos">
            ${actividad.fotos.map(foto => `
              <img src="/static/${foto.ruta_archivo}" alt="${foto.nombre_archivo}" class="foto-miniatura" onclick="ampliarFoto(this.src)">
            `).join('')}
          </div>
        </div>
        <div id="comentarios-seccion">
          <h3>Comentarios</h3>
          <ul id="comentarios-lista"></ul>

          <form id="formulario-comentario">
            <label>Nombre: <input type="text" id="nombre-comentario" required minlength="3" maxlength="80"></label><br>
            <label>Comentario:<br>
              <textarea id="texto-comentario" rows="4" cols="50" required minlength="5" maxlength="300"></textarea>
            </label><br>
            <button type="submit">Agregar comentario</button>
            <div id="comentario-errores" style="color:red;"></div>
          </form>
        </div>
      `;
      document.getElementById("tabla-listado").style.display = "none";
      document.getElementById("detalle-actividad").style.display = "block";

      configurarFormularioComentarios(actividad.id);
    })
    .catch(error => console.error('Error:', error));
}

// Comentarios
const configurarFormularioComentarios = (actividadId) => {
  cargarComentarios(actividadId);

  const form = document.getElementById("formulario-comentario");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre-comentario").value.trim();
    const texto = document.getElementById("texto-comentario").value.trim();

    fetch(`/api/comentarios/${actividadId}`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, texto })
    })
    .then(res => {
      if (!res.ok) return res.json().then(data => Promise.reject(data));
      return res.json();
    })
    .then(() => {
      document.getElementById("comentario-errores").textContent = "";
      form.reset();
      cargarComentarios(actividadId);
    })
    .catch(data => {
      const erroresDiv = document.getElementById("comentario-errores");
      if (data && data.errores) {
        erroresDiv.innerHTML = data.errores.join("<br>");
      } else {
        erroresDiv.textContent = "Error inesperado al enviar el comentario.";
      }
    });
  });
};

const cargarComentarios= (actividadId) => {
  fetch(`/api/comentarios/${actividadId}`)
    .then(res => {
      if (!res.ok) {
        // Si la respuesta no es OK, lanzar error para caer en catch
        throw new Error("Respuesta no OK del servidor");
      }
      return res.json();
    })
    .then(data => {
      const lista = document.getElementById('comentarios-lista');
      lista.innerHTML = "";
      if (data.status == "ok") {
        comentarios = data.comentarios
      }

      if (comentarios.length === 0) {
        lista.innerHTML = "No hay comentarios aún. ¡Sé el primero en comentar esta actividad! :D <br><br>";
      } else {
        for (let c of comentarios) {
          const li = document.createElement('li');
          li.innerHTML = `<strong>${c.nombre}</strong> (${c.fecha}): ${c.texto}`;
          lista.appendChild(li);
        }
      }
    })
    .catch(() => {
      document.getElementById('comentarios-lista').innerHTML = "Error al cargar comentarios.<br><br>";
    });
};

// Volver al listado
const volverAlListado = () => {
  // Muestra el listado y oculta el detalle
  document.getElementById("detalle-actividad").style.display = "none";
  document.getElementById("tabla-listado").style.display = "block";
}

// Ampliar foto
const ampliarFoto = (src) => {
  document.getElementById("foto-ampliada").src = src;
  document.getElementById("modal-foto").style.display = "block";
}

// Cerrar foto
const cerrarFoto = () => {
  document.getElementById("modal-foto").style.display = "none";
}