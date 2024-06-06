async function obtenerDatos() {
    const url = 'https://sheet.best/api/sheets/9b0e6141-8e81-45a9-9d22-354ba5063711'; // Reemplaza con tu URL de endpoint de Sheet.best
    const range = 'A1:D10'; // Define el rango de celdas que deseas obtener

    try {
        const response = await fetch(`${url}?range=${range}`);
        const data = await response.json();
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

// Llamar a la función para obtener datos cuando se carga la página
window.onload = obtenerDatos;
