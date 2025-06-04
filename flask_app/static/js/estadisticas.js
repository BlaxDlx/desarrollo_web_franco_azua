// Variables globales
let actividades = [];

fetch('/api/actEstadisticas')
    .then(response => {
        if (!response.ok) throw new Error("Ocurrió un error al obtener las actividades.");
        return response.json();
    })
    .then(json => {
        actividades = json.data;

        // Se cargan los gráficos de manera asíncrona con los datos entregados por las funciones
        Highcharts.chart('graficoLineas', configLineas());
        Highcharts.chart('graficoTorta', configTorta());
        Highcharts.chart('graficoBarras', configBarras());
    })
    .catch(error => console.log('Error:', error));

// Gráfico de Líneas: Actividades por Día
const configLineas = () => {
    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const conteo = dias.map(dia => actividades.filter(a => a.dia_semana === dia).length);

    return {
        chart: { type: 'line' },
        title: { text: '' },
        legend: {
            itemStyle: {
                fontSize: '15px'
            }
        },
        xAxis: { categories: dias, labels: { style: { fontSize: '15px' } } },
        yAxis: { title: { text: 'Cantidad' }, labels: { style: { fontSize: '15px' } } },
        series: [{
            name: 'Actividades',
            data: conteo
        }]
    };
}

// Gráfico de Torta: Actividades por Tipo (tema)
const configTorta = () => {
    const temas = ['Música', 'Deporte', 'Ciencias', 'Religión', 'Política', 'Tecnología', 'Juegos', 'Baile', 'Comida', 'Otro'];
    const conteo = temas.map(tema => actividades.filter(a => a.tema.tema === tema).length);
    const colores = [
    '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b',
    '#858796', '#fd7e14', '#20c997', '#ff6384', '#6f42c1'
    ];

    const data = temas.map((tema, i) => ({
                name: tema,
                y: conteo[i],
                color: colores[i],
                visible: conteo[i] > 0, // Solo muestra en el gráfico los temas con conteo > 0
                showInLegend: true // Pero las muestra en el recuadro de leyendas a la derecha
    }))

    return {
        chart: { type: 'pie' },
        title: { text: '' },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            itemStyle: {
                fontSize: '15px',
            }
        },
         plotOptions: {
            pie: {
                showInLegend: true,
                dataLabels: {
                    style: {
                        fontSize: '14px',
                    },
                }
            }
        },
        series: [{
            name: 'Actividades',
            data: data,
            dataLabels: {
                style: {
                    fontSize: '14px'
                }
            }
        }]
    };
}

// Gráfico de Barras: Actividades por Mes y Hora
const configBarras = () => {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const conteo = {
        'Mañana':    meses.map(() => 0),
        'Mediodía':  meses.map(() => 0),
        'Tarde':     meses.map(() => 0)
    };

    actividades.forEach(a => {
        if (a.bloque_horario !== 'Madrugada') {
            conteo[a.bloque_horario][a.mes]++;
        }
    });

    return {
        chart: { type: 'column' },
        title: { text: '' },
        legend: {
            itemStyle: {
                fontSize: '15px'
            }
        },
        xAxis: { categories: meses, labels: { style: { fontSize: '15px' } } },
        yAxis: { title: { text: 'Actividades' }, labels: { style: { fontSize: '15px' } } },
        series: [
            { name: 'Mañana', data: conteo['Mañana'] },
            { name: 'Mediodía', data: conteo['Mediodía'] },
            { name: 'Tarde', data: conteo['Tarde'] }
        ]
    };
}