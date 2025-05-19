// === Funciones de inicialización ===
const poblarRegiones = () => {
  const regionSelect = document.getElementById('region');
  regionSelect.innerHTML = '<option value="">Seleccione una región</option>'; // No sé si será necesario, pero lo pongo por si acaso
  regionesJson.forEach(region => {
    let option = document.createElement('option');
    option.value = region.id;
    option.textContent = region.nombre;
    regionSelect.appendChild(option);
  });
};

const actualizarComunas = () => {
  const regionSelect = document.getElementById('region');
  const comunaSelect = document.getElementById('comuna');
  const regionId = parseInt(regionSelect.value);

  comunaSelect.innerHTML = '<option value="">Seleccione una comuna</option>'; // Limpiar las comunas previas
  comunaSelect.disabled = true; // Para evitar que se seleccione antes de cargar
  
  const region = regionesJson.find(r => r.id === regionId);
  if (region && region.comunas) {
    region.comunas.forEach(comuna => {
      let option = document.createElement('option');
      option.value = comuna.id;
      option.textContent = comuna.nombre;
      comunaSelect.appendChild(option);
    });
    comunaSelect.disabled = false; // Una vez cargadas las comunas, habilitar el select
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
    otroTemaDiv.appendChild(input);
  }
};

const agregarCampoFoto = () => {
  const fotosExtraDiv = document.getElementById('fotos-extra');
  const totalFotos = document.querySelectorAll('input[type="file"][name="foto[]"]').length;
  if (totalFotos >= 5) {
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
  const otroContactoDiv = document.getElementById('contactar-otra');
  
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

    divContacto.appendChild(inputLabel);
    divContacto.appendChild(input);
    infoContactoDiv.appendChild(divContacto);

    // Si se selecciona la opción "otra", mostrar un campo especial
    if (valor === 'otra') {
      const otroInputLabel = document.createElement('label');
      otroInputLabel.textContent = 'Indique cómo quiere ser contactado:';

      const otroInput = document.createElement('input');
      otroInput.type = 'text';
      otroInput.name = 'contactar-otra';
      otroInput.placeholder = 'Escriba aquí su medio de contacto';
      otroInput.minLength = 4;
      otroInput.maxLength = 50;

      otroContactoDiv.appendChild(otroInputLabel);
      otroContactoDiv.appendChild(otroInput);
    }
  });
};

const prellenarFechaInicio = () => {
  const fecha = new Date(); // Obtener la fecha actual
  const dia = String(fecha.getDate()).padStart(2, '0'); // padStart agrega ceros a la izquierda si tiene menos de 2 dígitos
  const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
  const anio = fecha.getFullYear();

  const hora = String(fecha.getHours()).padStart(2, '0');
  const minutos = String(fecha.getMinutes()).padStart(2, '0');

  document.getElementById('inicio').value = `${anio}-${mes}-${dia}T${hora}:${minutos}`;
};

const prellenarFechaTermino = () => {
  const inicioInput = document.getElementById('inicio');
  const terminoInput = document.getElementById('termino');
  if (!inicioInput.value) {
    console.log("No hay fecha de inicio");
    return; // Si no hay fecha de inicio aún, no se puede prellenar
  }
  // Obtener la fecha de inicio como objeto Date
  const inicio = new Date(inicioInput.value);
  // Sumar 3 horas
  inicio.setHours(inicio.getHours() + 3);

  // Formatear la fecha y hora como con la fecha de inicio
  const dia = String(inicio.getDate()).padStart(2, '0');
  const mes = String(inicio.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
  const anio = inicio.getFullYear();
  const hora = String(inicio.getHours()).padStart(2, '0');
  const minutos = String(inicio.getMinutes()).padStart(2, '0');
  // Asignar el valor al campo de fecha de término
  terminoInput.value = `${anio}-${mes}-${dia}T${hora}:${minutos}`;
};

const mostrarFechaTermino = () => {
  const checkBox = document.getElementById('indicar-termino');
  const terminoInput = document.getElementById('termino');
  if (checkBox.checked) {
    terminoInput.style.display = 'block';
    prellenarFechaTermino();
  } else {
    terminoInput.style.display = 'none';
    terminoInput.value = ''; // Limpiar el campo si se desmarca
  }
};

// === Funciones de validación ===

const mostrarErrorCampo = (campoId, mensaje, tipo = "input") => {
  const errorSpan = document.getElementById('error-' + campoId);
  if (errorSpan) {
    errorSpan.innerHTML = `
      <span class="error-alert">
        <span class="icono">!</span>
        <span>${mensaje}</span>
      </span>
    `;
    errorSpan.style.display = 'block';
  }

  if (tipo === "input") {
    const input = document.getElementById(campoId);
    if (input) input.classList.add('input-error');
  } else if (tipo === "checkbox") {
    const checkboxes = document.querySelectorAll(`#${campoId} input[type="checkbox"]`);
    checkboxes.forEach(cb => cb.classList.add('checkbox-error'));
  }
};

const limpiarErrores = () => {
  const errorDiv = document.getElementById('error-mensajes');
  if (errorDiv) errorDiv.textContent = '';
  document.querySelectorAll('.error-campo').forEach(span => {
    span.textContent = '';
    span.style.display = 'none';
  });
  document.querySelectorAll('.input-error').forEach(input => input.classList.remove('input-error'));
  document.querySelectorAll('.checkbox-error').forEach(cb => cb.classList.remove('checkbox-error'));
};

const validarRegion = (region) => {
  if (!region) return "Debe seleccionar una región."; // Es obligatorio
  return null;
};

const validarComuna = (comuna) => {
  if (!comuna) return "Debe seleccionar una comuna."; // Es obligatorio
  return null;
};

const validarSector = (sector) => {
  if (sector && sector.length > 100) return "El sector no puede exceder los 100 caracteres."; // Es opcional y no debe exceder 100 caracteres
  return null;
};

const validarNombre = (nombre) => { 
  // Es obligatorio y no debe exceder 200 caracteres
  if (!nombre || nombre.length > 200) return "El nombre del organizador es obligatorio y debe tener como máximo 200 caracteres.";
  return null;
};

const validarEmail = (email) => {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 100) { // Es obligatorio y debe tener el formato correcto
    return "Debe ingresar un email válido (máx. 100 caracteres).";
  }
  return null;
};

const validarTelefono = (telefono) => {
  if (telefono && !/^\+\d{3}\.\d{8}$/.test(telefono)) {  // Es opcional, pero si se ingresa, debe tener el formato +NNN.NNNNNNNN
    return "El número de celular debe tener el formato +NNN.NNNNNNNN, por ejemplo: +569.12345678.";
  }
  return null;
};

const validarFechaInicio = (inicio) => {
  if (!inicio) return "Debe indicar la fecha y hora de inicio."; // Es obligatorio
  return null;
};

const validarFechaTermino = (inicio, termino) => {
  if (termino && termino <= inicio) return "La fecha de término debe ser posterior a la de inicio."; // Es opcional, pero si se ingresa, debe ser posterior a la de inicio
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
  
  if (checkboxesSeleccionados.length === 0) {
    return "Debe seleccionar al menos un medio de contacto.";}

  if (checkboxesSeleccionados.length > 5) {
    return "No puede seleccionar más de 5 medios de contacto.";
  }

  const contactoInputs = infoContactoDiv.querySelectorAll('input');
  for (let input of contactoInputs) {
    const val = input.value.trim();
    if (val.length < 4 || val.length > 50) {
      return "Cada ID o URL de contacto válido debe tener entre 4 y 50 caracteres.";
    }
  }
  return null;
};

const validarOtroContacto = (otroContacto, contactarDiv) => {
  const checkboxesSeleccionados = contactarDiv.querySelectorAll('input[name="contactar"]:checked');
  let seSeleccionoOtra = false;
  checkboxesSeleccionados.forEach(option => {
    if (option.value === 'otra') {
      seSeleccionoOtra = true;
    }
  });
  if (seSeleccionoOtra && (!otroContacto || otroContacto.value.trim().length < 4)) {
    return "El contacto adicional debe tener al menos 4 caracteres.";
  }
  return null;
}

const validarFotos = (fotos) => {
  // fotos es un NodeList de inputs[type="file"]
  let archivos = [];
  fotos.forEach(input => {
    if (input.files && input.files.length > 0) {
      archivos.push(input.files[0]);
    }
  });

  if (archivos.length === 0) {
    return "Debe seleccionar al menos una foto.";
  }
  if (archivos.length > 5) {
    return "Debe seleccionar entre 1 y 5 fotos.";
  }

  for (const archivo of archivos) {
    if (archivo.type.split('/')[0] !== 'image') {
      return "Todas las fotos deben ser imágenes.";
    }
  }
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
  const otroContacto = form.querySelector('contacar-otra');

  let hayErrores = false;

  // Validar cada campo y mostrar el error en el lugar correspondiente
  const errorRegion = validarRegion(region);
  if (errorRegion) {
    mostrarErrorCampo('region', errorRegion);
    hayErrores = true;
  }

  const errorComuna = validarComuna(comuna);
  if (errorComuna) {
    mostrarErrorCampo('comuna', errorComuna);
    hayErrores = true;
  }

  const errorNombre = validarNombre(nombre);
  if (errorNombre) {
    mostrarErrorCampo('nombre', errorNombre);
    hayErrores = true;
  }

  const errorEmail = validarEmail(email);
  if (errorEmail) {
    mostrarErrorCampo('email', errorEmail);
    hayErrores = true;
  }

  const errorTelefono = validarTelefono(telefono);
  if (errorTelefono) {
    mostrarErrorCampo('telefono', errorTelefono);
    hayErrores = true;
  }

  const errorSector = validarSector(sector);
  if (errorSector) {
    mostrarErrorCampo('sector', errorSector);
    hayErrores = true;
  }

  const errorInicio = validarFechaInicio(inicio);
  if (errorInicio) {
    mostrarErrorCampo('inicio', errorInicio);
    hayErrores = true;
  }

  const errorTermino = validarFechaTermino(inicio, termino);
  if (errorTermino) {
    mostrarErrorCampo('termino', errorTermino);
    hayErrores = true;
  }

  const errorTema = validarTema(tema, otroTemaInput);
  if (errorTema) {
    mostrarErrorCampo('tema', errorTema);
    hayErrores = true;
  }

  const errorContactar = validarContactos(contactarDiv, infoContactoDiv);
  if (errorContactar) {
    mostrarErrorCampo('contactar-options', errorContactar, "checkbox");
    hayErrores = true;
  }

  const errorOtroContacto = validarOtroContacto(otroContacto, contactarDiv);
  if (errorOtroContacto) {
    mostrarErrorCampo('otro-contacto', errorOtroContacto);
    hayErrores = true;
  }

  const errorFotos = validarFotos(fotos);
  if (errorFotos) {
    mostrarErrorCampo('foto1', errorFotos);
    hayErrores = true;
  }

  // Si hay errores, no enviar el formulario
  if (hayErrores) return;

  // Si todo está bien, mostrar confirmación
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
  // Enviamos un submit real:
  document.getElementById('form-actividad').submit();
  // O si se quiere hacer una petición AJAX, se puede hacer aquí
  // fetch('/ruta/a/tu/api', {
  //   method: 'POST',
  //   body: new FormData(document.getElementById('form-actividad'))
  // })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log('Success:', data);
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //   });
  // Aquí puedes manejar la respuesta del servidor
  // y mostrar un mensaje de éxito o error.
};

const cancelarConfirmacion = () => {
  document.getElementById('confirmacion').style.display = 'none';
  document.getElementById('form-actividad').style.display = 'block';
};

// === Event listeners ===
window.onload = () => {
  poblarRegiones();
  prellenarFechaInicio();
  document.getElementById('region').addEventListener('change', actualizarComunas);
  document.getElementById('tema').addEventListener('change', mostrarCampoOtroTema);
  document.getElementById('agregar-foto').addEventListener('click', agregarCampoFoto);
  document.getElementById('contactar-options').addEventListener('change', mostrarOtraFormaContacto);
  document.getElementById('form-actividad').addEventListener('submit', validarFormulario);
  document.getElementById('confirmar-si').addEventListener('click', confirmarEnvio);
  document.getElementById('confirmar-no').addEventListener('click', cancelarConfirmacion);
  document.getElementById('indicar-termino').addEventListener('change', mostrarFechaTermino);
};
