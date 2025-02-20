const URL_JSONBIN = "https://api.jsonbin.io/v3/b/67b4d9c1acd3cb34a8e72661";
const API_KEY = "$2a$10$8OdcwmdEF3G7zErnorA84eTQB2V2YFtqAL1vxaU/FRwJ2OWPZ4Ydm"; 


const generarNuevoID = (solicitudes) =>
    solicitudes.length === 0 ? 1 : Math.max(...solicitudes.map(s => s.id || 0)) + 1;


const registrarTecnico = async (event) => {
    event.preventDefault();

    const direccion = document.getElementById("direccion").value.trim();
    const barrio = document.getElementById("barrio").value.trim();
    const tipoSoporte = document.getElementById("opciones").value;
    const comentarios = document.getElementById("comentarios").value.trim();
    const fecha = new Date().toLocaleString();

    if (!direccion || !barrio || !tipoSoporte) {
        alert("Por favor, completa todos los campos obligatorios.");
        return;
    }

    const response = await fetch(URL_JSONBIN, {
        headers: { "X-Master-Key": API_KEY }
    });

    const data = await response.json();
    const solicitudes = Array.isArray(data.record) ? data.record : [];

    const nuevoID = generarNuevoID(solicitudes);

    const nuevaSolicitud = {
        id: nuevoID,
        direccion,
        barrio,
        tipoSoporte,
        comentarios,
        fecha,
        estado: "pendiente",
        tecnico: null,
        precio: null,
        calificacion: null,
        comentariosUsuario: null
    };

    await fetch(URL_JSONBIN, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "X-Master-Key": API_KEY
        },
        body: JSON.stringify([...solicitudes, nuevaSolicitud])
    });

    alert("Solicitud registrada con éxito");
    document.getElementById("register").reset();
};

const cargarSolicitudesPendientes = async () => {
    const response = await fetch(URL_JSONBIN, {
        headers: { "X-Master-Key": API_KEY }
    });

    const data = await response.json();
    const solicitudes = Array.isArray(data.record) ? data.record : [];

    const listaSolicitudes = document.getElementById("listaSolicitudesUsuario");
    const listaCalificaciones = document.getElementById("listaCalificaciones"); 
    listaSolicitudes.innerHTML = "";
    listaCalificaciones.innerHTML = ""; 

    solicitudes.forEach((solicitud) => {
        if (solicitud.estado === "aceptado") {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${solicitud.tipoSoporte}</strong> - ${solicitud.barrio} 
                <br> Técnico: ${solicitud.tecnico}
                <br> Oferta: $${solicitud.precio}
                <br><button onclick="aceptarOferta(${solicitud.id})">Aceptar</button>
                <button onclick="rechazarOferta(${solicitud.id})">Rechazar</button>
            `;
            listaSolicitudes.appendChild(li);
        }

        if (solicitud.estado === "terminado" && solicitud.calificacion === null) {
            
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${solicitud.tipoSoporte}</strong> - ${solicitud.barrio} 
                <br> Técnico: ${solicitud.tecnico}
                <br> Precio: $${solicitud.precio}
                <br> <button onclick="calificarServicio(${solicitud.id})">Calificar</button>
            `;
            listaCalificaciones.appendChild(li);
        }

        if (solicitud.calificacion !== null) {
            const liCalificado = document.createElement("li");
            liCalificado.innerHTML = `
                <strong>Servicio:</strong> ${solicitud.tipoSoporte} - ${solicitud.barrio} 
                <br> Técnico: ${solicitud.tecnico}
                <br> Calificación: ${solicitud.calificacion} / 5
                <br> Comentarios: ${solicitud.comentariosUsuario || "Sin comentarios"}
            `;
            listaCalificaciones.appendChild(liCalificado);
        }
    });
};

document.addEventListener("DOMContentLoaded", cargarSolicitudesPendientes);

const aceptarOferta = async (id) => {
    const response = await fetch(URL_JSONBIN, {
        headers: { "X-Master-Key": API_KEY }
    });

    const data = await response.json();
    const solicitudes = Array.isArray(data.record) ? data.record : [];

    solicitudes.forEach((solicitud) => {
        if (solicitud.id === id && solicitud.estado === "aceptado") {
            solicitud.estado = "confirmado";
        }
    });

    await fetch(URL_JSONBIN, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "X-Master-Key": API_KEY
        },
        body: JSON.stringify(solicitudes)
    });

    alert("Has aceptado la oferta del técnico.");
    cargarSolicitudesPendientes(); 
};