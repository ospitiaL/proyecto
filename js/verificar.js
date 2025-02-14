let usuario = localStorage.getItem("usuario");
let rol = localStorage.getItem("rol");


const rutasPorRol = {
    admin: "/proyecto/html/admin.html",
    tech: "/proyecto/html/tech.html",
    user: "/proyecto/html/user.html"
};


let rutaActual = window.location.pathname;


if (!usuario || !rol || !rutasPorRol[rol]) {
    alert("Acceso denegado. Debes iniciar sesión.");
    window.location.href = "../index.html"; 
} else if (rutaActual !== rutasPorRol[rol]) {
    
    alert("Acceso no autorizado.");
    window.location.href = rutasPorRol[rol];  
}
