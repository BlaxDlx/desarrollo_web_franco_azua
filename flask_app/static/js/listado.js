
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

      const contenedor = document.getElementById("contenido-detalle");
      contenedor.innerHTML = `
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
            <img src="${foto.url}" alt="${foto.titulo}">
          `).join('')}
        </div>
      `;
      document.getElementById("tabla-listado").style.display = "none";
      document.getElementById("detalle-actividad").style.display = "block";
    })
    .catch(error => console.error('Error:', error));
}

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
