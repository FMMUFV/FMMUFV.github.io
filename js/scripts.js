let cacheData = null;
let lastFetchTime = null;
const CACHE_DURATION = 60000; // 60 segundos

async function obtenerDatos() {
    const url = 'https://sheet.best/api/sheets/9b0e6141-8e81-45a9-9d22-354ba5063711';
    const range = 'A1:D10'; 

    if (cacheData && (Date.now() - lastFetchTime) < CACHE_DURATION) {
        mostrarDatos(cacheData);
        return;
    }

    try {
        const response = await fetch(`${url}?range=${range}`);
        const data = await response.json();
        cacheData = data;
        lastFetchTime = Date.now();
        mostrarDatos(data);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

function mostrarDatos(datos) {
    const contenedor = document.getElementById('datos');
    let html = '<table border="1">';
    datos.forEach(fila => {
        html += '<tr>';
        for (const celda in fila) {
            html += `<td>${fila[celda]}</td>`;
        }
        html += '</tr>';
    });
    html += '</table>';
    contenedor.innerHTML = html;
}

window.onload = obtenerDatos;
