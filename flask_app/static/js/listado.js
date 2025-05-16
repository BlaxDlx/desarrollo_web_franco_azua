// Datos de ejemplo para las actividades
const actividades = [
    {
      inicio: "2025-03-28 12:00",
      termino: "2025-03-28 14:00",
      comuna: "Santiago",
      sector: "Beauchef 850",
      tema: "Deporte",
      nombre: "Escuela de Boxeo",
      organizador: "Club Deportivo UC",
      fotos: ["img/boxeo.png", "img/boxeo2.png"]
    },
    {
      inicio: "2025-03-29 19:00",
      termino: "2025-03-29 20:00",
      comuna: "Ñuñoa",
      sector: "Plaza Ñuñoa",
      tema: "Alimentación",
      nombre: "Cómo deshidratar fruta",
      organizador: "Huertos Chile",
      fotos: ["img/frutas.png", "img/frutas2.png", "img/frutas3.png"]
    },
    {
      inicio: "2025-04-02 10:00",
      termino: "2025-04-02 12:30",
      comuna: "Providencia",
      sector: "Parque Inés",
      tema: "Arte",
      nombre: "Taller cerámica básica",
      organizador: "Manos de Barro",
      fotos: ["img/ceramica.png"]
    },
    {
      inicio: "2025-04-03 16:00",
      termino: "2025-04-03 18:00",
      comuna: "La Reina",
      sector: "Casa Cultura",
      tema: "Pintura",
      nombre: "Pintura al aire libre",
      organizador: "Colores Vivos",
      fotos: ["img/pintura.png", "img/pintura2.png"]
    },
    {
      inicio: "2025-04-05 09:00",
      termino: "2025-04-05 11:00",
      comuna: "Recoleta",
      sector: "Huerto Urbano",
      tema: "Medioambiente",
      nombre: "Introducción a la huerta",
      organizador: "Recoleta Verde",
      fotos: ["img/huerto.png", "img/huerto2.png", "img/huerto3.png"]
    }
  ];
  
  // Mostrar detalles de una actividad
  function mostrarDetalle(index) {
    const actividad = actividades[index];
  
    const contenedor = document.getElementById("contenido-detalle");
    contenedor.innerHTML = `
      <h2>${actividad.nombre}</h2>
      <p><strong>Inicio:</strong> ${actividad.inicio}</p>
      <p><strong>Término:</strong> ${actividad.termino}</p>
      <p><strong>Comuna:</strong> ${actividad.comuna}</p>
      <p><strong>Sector:</strong> ${actividad.sector}</p>
      <p><strong>Tema:</strong> ${actividad.tema}</p>
      <p><strong>Organizador:</strong> ${actividad.organizador}</p>
      <div class="galeria-fotos">
        ${actividad.fotos.map(foto => `
          <img src="${foto}" class="foto-miniatura" width="320" height="240" onclick="ampliarFoto('${foto}')">
        `).join('')}
      </div>
    `;
  
    document.getElementById("tabla-listado").style.display = "none";
    document.getElementById("detalle-actividad").style.display = "block";
  }
  
  // Volver al listado
  function volverAlListado() {
    document.getElementById("detalle-actividad").style.display = "none";
    document.getElementById("tabla-listado").style.display = "block";
  }
  
  // Ampliar foto
  function ampliarFoto(src) {
    document.getElementById("foto-ampliada").src = src;
    document.getElementById("modal-foto").style.display = "block";
  }
  
  // Cerrar foto
  function cerrarFoto() {
    document.getElementById("modal-foto").style.display = "none";
  }
  