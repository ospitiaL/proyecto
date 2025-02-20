const URL_JSONBIN = "https://api.jsonbin.io/v3/b/67b4d9c1acd3cb34a8e72661";
const API_KEY = "$2a$10$8OdcwmdEF3G7zErnorA84eTQB2V2YFtqAL1vxaU/FRwJ2OWPZ4Ydm"; 


const cargarSolicitudes = async () => {
    const response = await fetch(URL_JSONBIN, {
        headers: { "X-Master-Key": API_KEY }
    });
    const solicitudes = await response.json();

    const listaSolicitudes = document.getElementById("listaSolicitudes");
    listaSolicitudes.innerHTML = "";

    solicitudes.record.forEach((solicitud) => {
        if (solicitud.estado === "pendiente") {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${solicitud.tipoSoporte}</strong> - ${solicitud.barrio} 
                <button onclick="aceptarSolicitud(${solicitud.id})">Aceptar</button>
            `;
            listaSolicitudes.appendChild(li);
        }
    });
};


const aceptarSolicitud = async (id) => {
    const nombreTecnico = prompt("Ingresa tu nombre para aceptar la solicitud:");
    if (!nombreTecnico) return;

    const precio = prompt("Ingresa tu oferta de precio:");
    if (!precio) return;

    const response = await fetch(URL_JSONBIN, {
        headers: { "X-Master-Key": API_KEY }
    });
    let solicitudes = await response.json();
    solicitudes = solicitudes.record;

    solicitudes = solicitudes.map((solicitud) => {
        if (solicitud.id === id && solicitud.estado === "pendiente") {
            return { ...solicitud, estado: "aceptado", tecnico: nombreTecnico, precio };
        }
        return solicitud;
    });

    await fetch(URL_JSONBIN, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "X-Master-Key": API_KEY
        },
        body: JSON.stringify(solicitudes),
    });

    alert("Solicitud aceptada con éxito.");
    cargarSolicitudes();
};


const cargarServiciosEnProgreso = async () => {
    const response = await fetch(URL_JSONBIN, {
        headers: { "X-Master-Key": API_KEY }
    });
    const solicitudes = await response.json();

    const listaServicios = document.getElementById("listaServicios");
    listaServicios.innerHTML = "";

    solicitudes.record.forEach((solicitud) => {
        if (solicitud.estado === "confirmado") {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${solicitud.tipoSoporte}</strong> - ${solicitud.barrio} 
                <br> Cliente: ${solicitud.direccion}
                <br> Precio: $${solicitud.precio}
                <br><button onclick="marcarComoTerminado(${solicitud.id}, '${solicitud.tecnico}')">Servicio Terminado</button>
            `;
            listaServicios.appendChild(li);
        }
    });
};


const marcarComoTerminado = async (id, tecnico) => {
    const tecnicoAutenticado = prompt("Ingresa tu nombre para confirmar:");
    if (tecnicoAutenticado !== tecnico) {
        alert("Solo el técnico asignado puede marcar el servicio como terminado.");
        return;
    }

    const response = await fetch(URL_JSONBIN, {
        headers: { "X-Master-Key": API_KEY }
    });
    let solicitudes = await response.json();
    solicitudes = solicitudes.record;

    solicitudes = solicitudes.map((solicitud) => {
        if (solicitud.id === id && solicitud.estado === "confirmado") {
            return { ...solicitud, estado: "terminado" };
        }
        return solicitud;
    });

    await fetch(URL_JSONBIN, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "X-Master-Key": API_KEY
        },
        body: JSON.stringify(solicitudes),
    });

    alert("Servicio marcado como terminado.");
    cargarServiciosEnProgreso();
};

document.addEventListener("DOMContentLoaded", cargarSolicitudes);
document.addEventListener("DOMContentLoaded", cargarServiciosEnProgreso);
