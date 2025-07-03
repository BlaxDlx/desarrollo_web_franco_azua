let actividadIdActual = null;
let btnActual = null;

const abrirModal = (actividadId, btn) => {
    actividadIdActual = actividadId;
    btnActual = btn;
    document.getElementById('input-nota').value = '';
    document.getElementById('modal-error').textContent = '';
    document.getElementById('modal-nota').style.display = 'flex';
    document.getElementById('input-nota').focus();
}

const cerrarModal = () => {
    document.getElementById('modal-nota').style.display = 'none';
    actividadIdActual = null;
    btnActual = null;
}

const evaluarActividad = () => {
    const valor = parseFloat(document.getElementById('input-nota').value);
    // Validación en el modal
    if (isNaN(valor) || valor < 1 || valor > 7) {
        document.getElementById('modal-error').textContent = "La nota debe ser un número entre 1 y 7";
        return;
    }
    // Si pasa la validación, limpia el error del modal y cierra el modal
    document.getElementById('modal-error').textContent = "";

    // Fetch al backend
    fetch('/api/evaluar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nota: valor, actividadId: actividadIdActual})
    })
    .then(res => {
      if (!res.ok) return res.json().then(data => Promise.reject(data));
      return res.json();
    })
    .then(data => {
        document.getElementById("nota-errores").textContent = "";
        document.getElementById("nota-exito").textContent = "";
        if (data.status === 'ok') {
            // Actualiza solo la celda de la nota
            const notaCell = btnActual.parentElement.parentElement.querySelector('td:nth-child(6) span');
            if (notaCell) notaCell.textContent = data.calificacion.toFixed(2);
            document.getElementById("nota-exito").textContent = "Nota guardada correctamente";
        } else {
            document.getElementById("nota-errores").textContent = data.mensaje || 'Error al guardar la nota';
        }
        cerrarModal();
    })
    .catch(() => {
        cerrarModal();
        document.getElementById("nota-errores").textContent = "Error inesperado al enviar la nota.";
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.evaluar-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            abrirModal(this.getAttribute("data-id"), this);
        });
    });
    document.getElementById('btn-guardar-nota').addEventListener('click', evaluarActividad);
    document.getElementById('btn-cerrar-modal').addEventListener('click', cerrarModal);
    // Cierra el modal si se hace click fuera del cuadro
    document.getElementById('modal-nota').addEventListener('click', function(e) {
        if (e.target === this) cerrarModal();
    });
});