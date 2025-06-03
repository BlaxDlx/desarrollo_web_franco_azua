// Variables globales
let actividades = [];

fetch('/api/actEstadisticas')
    .then(response => {
        if (!response.ok) throw new Error("Ocurrió un error al obtener las actividades.");
        return response.json();
    })
    .then(json => {
        actividades = json.data;

        // Se cargan los gráficos de manera asíncrona con los datos actualizados
        const ctxLineas = document.getElementById('graficoLineas').getContext('2d');
        new Chart(ctxLineas, { 
            ...configLineas, // Se copian las propiedades del objeto configLineas
            data: datosActividadesPorDia() // Y se modifica el data por los datos reales
        });
        
        // Para el resto es igual
        const ctxTorta = document.getElementById('graficoTorta').getContext('2d');
        new Chart(ctxTorta, {
            ...configTorta,
            data: datosActividadesPorTipo()
        });

        const ctxBarras = document.getElementById('graficoBarras').getContext('2d');
        new Chart(ctxBarras, {
            ...configBarras,
            data: datosActividadesPorMesYHora()
        });
    })
    .catch(error => console.log('Error:', error));

// Gráfico de Líneas: Actividades por Día
const datosActividadesPorDia = () => {
    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const conteoDias = dias.map(dia => actividades.filter(a => a.dia_semana === dia).length);
    return {
        labels: dias,
        datasets: [{
            label: 'Actividades por Día',
            data: conteoDias,
            borderColor: '#4e73df',
            backgroundColor: 'rgba(78, 115, 223, 0.2)',
            fill: true,
            tension: 0.4
        }]
    };
}

// Las configuraciones se definen con datos vacíos
const configLineas = {
    type: 'line',
    data: {}, // data vacía, luego con fetch se rellena con datos reales
    options: {
        responsive: true,
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    font: { size: 14 }
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    font: { size: 14 }
                }
            }
        }
    }
};

// Gráfico de Torta: Actividades por Tipo (tema)
const datosActividadesPorTipo = () => {
    const temas = ['Música', 'Deporte', 'Ciencias', 'Religión', 'Política', 'Tecnología', 'Juegos', 'Baile', 'Comida', 'Otro'];
    const conteoPorTema = temas.map(tema => actividades.filter(a => a.tema.tema === tema).length);

    return {
        labels: temas,
        datasets: [{
            data: conteoPorTema,
            backgroundColor: [
                '#4e73df', // Música
                '#1cc88a', // Deporte
                '#36b9cc', // Ciencias
                '#f6c23e', // Religión
                '#e74a3b', // Política
                '#858796', // Tecnología
                '#fd7e14', // Juegos
                '#20c997', // Baile
                '#ff6384', // Comida
                '#6f42c1'  // Otro
            ],
            hoverBackgroundColor: [
                '#2e59d9', // Música
                '#17a673', // Deporte
                '#2c9faf', // Ciencias
                '#f4b731', // Religión
                '#e23a2d', // Política
                '#6c757d', // Tecnología
                '#e8590c', // Juegos
                '#198754', // Baile
                '#e83e8c', // Comida
                '#5a32a3'  // Otro
            ]
        }]
    };
}

const configTorta = {
    type: 'pie',
    data: {}, // data vacía, luego con fetch se rellena con datos reales
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return 'Actividades: ' + tooltipItem.raw;
                    }
                }
            }
        }
    }
};

// Gráfico de Barras: Actividades por Mes y Hora
const datosActividadesPorMesYHora = () => {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    // Se cuentan las actividades por mes y hora
    const conteo = {
        'Mañana':    meses.map(() => 0),
        'Mediodía':  meses.map(() => 0),
        'Tarde':     meses.map(() => 0)
    };
    actividades.forEach(actividad => {
        const bloque_horario = actividad.bloque_horario;
        const mes = actividad.mes; // Se obtiene mes de la actividad (desde 0 a 11)
        if (bloque_horario != "Madrugada"){
            conteo[bloque_horario][mes] ++;
        }
    })
    
    return {
    labels: meses,
    datasets: [
        {
            label: 'Mañana',
            data: conteo['Mañana'],
            backgroundColor: '#4e73df'
        },
        {
            label: 'Mediodía',
            data: conteo['Mediodía'],
            backgroundColor: '#36b9cc'
        },
        {
            label: 'Tarde',
            data: conteo['Tarde'],
            backgroundColor: '#1cc88a'
        }
    ]}
};

const configBarras = {
    type: 'bar',
    data: {}, // data vacía, luego con fetch se rellena con datos reales
    options: {
        responsive: true,
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    font: { size: 14 }
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    font: { size: 14 }
                }
            }
        },
        plugins: {
            legend: {
                position: 'top'
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return 'Actividades: ' + tooltipItem.raw;
                    }
                }
            }
        }
    }
};