import regionComuna from './region_comuna.js';

// === Funciones de inicialización ===
const poblarRegiones = () => {
  const regionSelect = document.getElementById('region');
  for (const region in regionComuna) {
    let option = document.createElement('option');
    option.value = region;
    option.textContent = region;
    regionSelect.appendChild(option);
  }
};

const actualizarComunas = () => {
  const regionSelect = document.getElementById('region');
  const comunaSelect = document.getElementById('comuna');
  const region = regionSelect.value;

  comunaSelect.innerHTML = '<option value="">Seleccione una comuna</option>';
  comunaSelect.disabled = true;

  if (region && regionComuna[region]) {
    regionComuna[region].forEach(comuna => {
      let option = document.createElement('option');
      option.value = comuna;
      option.textContent = comuna;
      comunaSelect.appendChild(option);
    });
    comunaSelect.disabled = false;
  }
};

const mostrarCampoOtroTema = () => {
  const temaSelect = document.getElementById('tema');
  const otroTemaDiv = document.getElementById('otro-tema');
  otroTemaDiv.innerHTML = '';

  if (temaSelect.value === 'otro') {
    let input = document.createElement('input');
    input.type = 'text';
    input.name = 'otro-tema';
    input.placeholder = 'Indique el tema';
    input.minLength = 3;
    input.maxLength = 15;
    input.required = true;
    otroTemaDiv.appendChild(input);
  }
};

const agregarCampoFoto = () => {
  const fotosExtraDiv = document.getElementById('fotos-extra');
  const totalFotos = document.querySelectorAll('input[type="file"][name="foto[]"]').length;
  if (totalFotos >= 5) {
    mostrarMensajeError("Solo se permiten hasta 5 fotos.");
    return;
  }

  let input = document.createElement('input');
  input.type = 'file';
  input.name = 'foto[]';
  input.accept = 'image/*';
  fotosExtraDiv.appendChild(input);
  fotosExtraDiv.appendChild(document.createElement('br'));
};

const mostrarOtraFormaContacto = () => {
  const contactarOptions = document.querySelectorAll('input[name="contactar"]:checked');
  const infoContactoDiv = document.getElementById('info-contacto');
  
  // Limpiar campos previos
  infoContactoDiv.innerHTML = '';

  // Iterar sobre las opciones seleccionadas
  contactarOptions.forEach(option => {
    const valor = option.value;

    // Crear un contenedor para cada opción seleccionada
    const divContacto = document.createElement('div');
    divContacto.classList.add('contacto-item');

    // Crear una etiqueta y un campo de texto para la URL o ID
    let inputLabel = document.createElement('label');
    inputLabel.textContent = `ID o enlace para ${valor}:`;

    const input = document.createElement('input');
    input.type = 'text';
    input.name = `contacto-${valor}`;
    input.placeholder = `Indique el ID o enlace para ${valor}`;
    input.minLength = 4;
    input.maxLength = 50;
    input.required = true;

    divContacto.appendChild(inputLabel);
    divContacto.appendChild(input);
    infoContactoDiv.appendChild(divContacto);

    // Si se selecciona la opción "otra", mostrar un campo especial
    if (valor === 'otra') {
      const otroInputLabel = document.createElement('label');
      otroInputLabel.textContent = 'Indique cómo quiere ser contactado:';

      const otroInput = document.createElement('input');
      otroInput.type = 'text';
      otroInput.name = 'contacto-otra';
      otroInput.placeholder = 'Escriba aquí su medio de contacto';
      otroInput.minLength = 4;
      otroInput.maxLength = 50;
      otroInput.required = true;

      infoContactoDiv.appendChild(otroInputLabel);
      infoContactoDiv.appendChild(otroInput);
    }
  });
};

// === Funciones de validación ===

const mostrarMensajeError = (mensaje) => {
  const errorDiv = document.getElementById('error-mensajes');
  const errorItem = document.createElement('li');
  errorItem.textContent = mensaje;
  errorDiv.appendChild(errorItem);
};

const limpiarErrores = () => {
  const errorDiv = document.getElementById('error-mensajes');
  errorDiv.innerHTML = ' ';  // Limpiar los errores previos
};

const validarRegion = (region) => {
  if (!region) return "Debe seleccionar una región.";
  return null;
};

const validarComuna = (comuna) => {
  if (!comuna) return "Debe seleccionar una comuna.";
  return null;
};

const validarNombre = (nombre) => {
  if (!nombre || nombre.length > 200) return "El nombre del organizador es obligatorio y debe tener como máximo 200 caracteres.";
  return null;
};

const validarEmail = (email) => {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 100) {
    return "Debe ingresar un email válido (máx. 100 caracteres).";
  }
  return null;
};

const validarTelefono = (telefono) => {
  if (telefono && !/^\+\d{3}\.\d{8}$/.test(telefono)) {
    return "El número de celular debe tener el formato +NNN.NNNNNNNN, por ejemplo: +569.12345678.";
  }
  return null;
};

const validarSector = (sector) => {
  if (sector.length > 100) return "El sector no puede exceder los 100 caracteres.";
  return null;
};

const validarFechaInicio = (inicio) => {
  if (!inicio) return "Debe indicar la fecha y hora de inicio.";
  return null;
};

const validarFechaTermino = (inicio, termino) => {
  if (termino && termino <= inicio) return "La fecha de término debe ser posterior a la de inicio.";
  return null;
};

const validarTema = (tema, otroTemaInput) => {
  if (!tema) return "Debe seleccionar un tema.";
  if (tema === 'otro' && (!otroTemaInput || otroTemaInput.value.trim().length < 3 || otroTemaInput.value.trim().length > 15)) {
    return "Debe indicar un tema entre 3 y 15 caracteres.";
  }
  return null;
};

const validarContactos = (contactarDiv, infoContactoDiv) => {
  const checkboxesSeleccionados = contactarDiv.querySelectorAll('input[name="contactar"]:checked');
  
  if (checkboxesSeleccionados.length > 5) {
    return "No puede seleccionar más de 5 medios de contacto.";
  }

  const contactoInputs = infoContactoDiv.querySelectorAll('input');
  for (let input of contactoInputs) {
    const val = input.value.trim();
    if (val.length < 4 || val.length > 50) {
      return "Cada ID o URL de contacto debe tener entre 4 y 50 caracteres.";
    }
  }
  return null;
};

const validarFotos = (fotos) => {
  if (fotos.length < 1) return "Debe agregar al menos una foto.";
  if (fotos.length > 5) return "Solo se permiten hasta 5 fotos.";
  return null;
};

// === Validación general ===
const validarFormulario = (e) => {
  e.preventDefault();
  
  limpiarErrores();  // Limpiar los errores previos

  const form = document.getElementById('form-actividad');
  const region = form.region.value.trim();
  const comuna = form.comuna.value.trim();
  const sector = form.sector.value.trim();
  const nombre = form.nombre.value.trim();
  const email = form.email.value.trim();
  const telefono = form.telefono.value.trim();
  const contactarDiv = document.getElementById('contactar-options');
  const inicio = form.inicio.value.trim();
  const termino = form.termino.value.trim();
  const tema = form.tema.value.trim();
  const otroTemaInput = form.querySelector('[name="otro-tema"]');
  const fotos = document.querySelectorAll('input[type="file"][name="foto[]"]');
  const infoContactoDiv = document.getElementById('info-contacto');

  const errores = [];

  errores.push(validarRegion(region));
  errores.push(validarComuna(comuna));
  errores.push(validarNombre(nombre));
  errores.push(validarEmail(email));
  errores.push(validarTelefono(telefono));
  errores.push(validarSector(sector));
  errores.push(validarFechaInicio(inicio));
  errores.push(validarFechaTermino(inicio, termino));
  errores.push(validarTema(tema, otroTemaInput));
  errores.push(validarContactos(contactarDiv, infoContactoDiv));
  errores.push(validarFotos(fotos));

  // Filtrar errores nulos y mostrar mensaje
  const erroresValidos = errores.filter(error => error !== null);

  if (erroresValidos.length > 0) {
    erroresValidos.forEach(error => mostrarMensajeError(error));
    return;
  }

  mostrarConfirmacion();
};

// === Confirmación ===
const mostrarConfirmacion = () => {
  document.getElementById('form-actividad').style.display = 'none';
  document.getElementById('confirmacion').style.display = 'block';
};

const confirmarEnvio = () => {
  document.getElementById('confirmacion').style.display = 'none';
  document.getElementById('mensaje-final').style.display = 'block';
};

const cancelarConfirmacion = () => {
  document.getElementById('confirmacion').style.display = 'none';
  document.getElementById('form-actividad').style.display = 'block';
};

// === Event listeners ===
window.onload = () => {
  poblarRegiones();
  document.getElementById('region').addEventListener('change', actualizarComunas);
  document.getElementById('tema').addEventListener('change', mostrarCampoOtroTema);
  document.getElementById('agregar-foto').addEventListener('click', agregarCampoFoto);
  document.getElementById('contactar-options').addEventListener('change', mostrarOtraFormaContacto);
  document.getElementById('form-actividad').addEventListener('submit', validarFormulario);
  document.getElementById('confirmar-si').addEventListener('click', confirmarEnvio);
  document.getElementById('confirmar-no').addEventListener('click', cancelarConfirmacion);
};
