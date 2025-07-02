const evaluarActividad = (event) => {
    const btn = event.currentTarget;
    const actividadId = btn.getAttribute("data-id");
    let valor = prompt('Ingrese la nota (1 a 7):');
    if (valor === null) return;
    valor = parseFloat(valor);
    if (isNaN(valor) || valor < 1 || valor > 7) {
        document.getElementById("nota-exito").textContent = "";
        document.getElementById("nota-errores").textContent = "La nota debe ser un número entre 1 y 7";
        return;
    }
    fetch('/api/evaluar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nota: valor, actividadId })
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
            const notaCell = btn.parentElement.parentElement.querySelector('td:nth-child(6) span');
            if (notaCell) notaCell.textContent = data.calificacion.toFixed(2);
            document.getElementById("nota-exito").textContent = "Nota guardada correctamente";
        } else {
            document.getElementById("nota-errores").textContent = data.mensaje || 'Error al guardar la nota';
        }
    })
    .catch(() => {
        document.getElementById("nota-errores").textContent = "Error inesperado al enviar la nota.";
    });
};

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.evaluar-btn').forEach(btn => {
        btn.addEventListener('click', evaluarActividad);
    });
});