
let usuario = localStorage.getItem("usuario");
let rol = localStorage.getItem("rol");

document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem("nombre"); 
    console.log('Nombre de usuario recuperado:', username); 
    const welcomeMessage = document.getElementById('username'); 
    welcomeMessage.textContent = username ? `Bienvenido, ${username}` : 'Bienvenido, Invitado'; 
});




if (!usuario || !rol) {
    window.location.href = "../index.html";  
}


let paginaActual = window.location.pathname;


if (paginaActual.includes("admin.html") && rol !== "admin") {
    alert("No tienes permiso para acceder a esta página.");
    window.location.href = "../index.html";  
}

else if (paginaActual.includes("tech.html") && rol !== "tech") {
    alert("No tienes permiso para acceder a esta página.");
    window.location.href = "../index.html";  
}

else if (paginaActual.includes("user.html") && rol !== "user") {
    alert("No tienes permiso para acceder a esta página.");
    window.location.href = "../index.html";  
}


const cerrarSesion =() => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("rol");

    window.location.href = "../index.html"; 
}




