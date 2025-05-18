
// Mostrar detalles de una actividad
const mostrarDetalle = (id) => {
  const actividad = actividadesJson.find(a => a.id === id);
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
        <img src="/static/${foto.ruta_archivo}" class="foto-miniatura" width="320" height="240" onclick="ampliarFoto('/static/${foto.ruta_archivo}')">
      `).join('')}
    </div>
  `;
  document.getElementById("tabla-listado").style.display = "none";
  document.getElementById("detalle-actividad").style.display = "block";
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
