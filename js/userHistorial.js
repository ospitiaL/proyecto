const API_URL = "https://api.jsonbin.io/v3/b/67b4d9c1acd3cb34a8e72661";
const API_KEY = "$2a$10$8OdcwmdEF3G7zErnorA84eTQB2V2YFtqAL1vxaU/FRwJ2OWPZ4Ydm"; 

const cargarHistorial = async () => {
    try {
        let response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "X-Master-Key": API_KEY
            }
        });

        let data = await response.json();
        let solicitudes = data.record; 

        let tabla = document.getElementById("tabla");
        tabla.innerHTML = `
            <tr>
                <th>Dirección</th>
                <th>Barrio</th>
                <th>Tipo de Soporte</th>
                <th>Comentarios</th>
                <th>Fecha</th>
            </tr>
        `;

        solicitudes.forEach(solicitud => {
            let fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${solicitud.direccion}</td>
                <td>${solicitud.barrio}</td>
                <td>${solicitud.tipoSoporte}</td>
                <td>${solicitud.comentarios}</td>
                <td>${solicitud.fecha}</td>
            `;
            tabla.appendChild(fila);
        });
    } catch (error) {
        console.error("Error al cargar el historial:", error);
        alert("Hubo un problema al cargar el historial.");
    }
};


document.addEventListener("DOMContentLoaded", cargarHistorial);
