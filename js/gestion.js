const API_URL = "https://api.jsonbin.io/v3/b/67b4e758ad19ca34f808bef0";
const API_KEY = "$2a$10$8OdcwmdEF3G7zErnorA84eTQB2V2YFtqAL1vxaU/FRwJ2OWPZ4Ydm"; 

document.addEventListener("DOMContentLoaded", () => {
    cargarUsuarios();
});


const cargarUsuarios = async () => {
    try {
        let response = await fetch(API_URL, {
            headers: { "X-Master-Key": API_KEY }
        });
        let data = await response.json();
        let usuarios = data.record || []; 
        mostrarUsuarios(usuarios);
    } catch (error) {
        console.error("Error al cargar usuarios:", error);
    }
};


const mostrarUsuarios = (usuarios) => {
    let tabla = document.getElementById("tablaUsuarios");
    tabla.innerHTML = `
        <tr>
            <th>Usuario</th>
            <th>Contraseña</th>
            <th>Rol</th>
            <th>Nombre</th>
            <th>Acciones</th>
        </tr>
    `;

    usuarios.forEach((usuario, index) => {
        let fila = tabla.insertRow();
        fila.innerHTML = `
            <td>${usuario.usuario}</td>
            <td>${usuario.contraseña}</td>
            <td>${usuario.rol}</td>
            <td>${usuario.nombre}</td>
            <td>
                <button onclick="eliminarUsuario(${index})">Eliminar</button>
            </td>
        `;
    });
};


const agregarUsuario = async () => {
    let usuario = document.getElementById("nuevoUsuario").value;
    let contraseña = document.getElementById("nuevaContraseña").value;
    let rol = document.getElementById("nuevoRol").value;
    let nombre = document.getElementById("nuevoNombre").value;

    if (!usuario || !contraseña || !rol || !nombre) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    try {
        let response = await fetch(API_URL, {
            headers: { "X-Master-Key": API_KEY }
        });
        let data = await response.json();
        let usuarios = data.record || [];

        
        let existe = usuarios.some(u => u.usuario === usuario);
        if (existe) {
            alert("El usuario ya existe.");
            return;
        }

        
        let nuevoUsuario = { usuario, contraseña, rol, nombre };
        usuarios.push(nuevoUsuario);

        let actualizar = await fetch(API_URL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": API_KEY
            },
            body: JSON.stringify(usuarios)
        });

        if (actualizar.ok) {
            alert("Usuario agregado correctamente.");
            cargarUsuarios(); 
            document.getElementById("formAgregarUsuario").reset(); 
        } else {
            alert("Error al agregar usuario.");
        }
    } catch (error) {
        console.error("Error al agregar usuario:", error);
    }
};


const eliminarUsuario = async (index) => {
    try {
        let response = await fetch(API_URL, {
            headers: { "X-Master-Key": API_KEY }
        });
        let data = await response.json();
        let usuarios = data.record;

        if (!usuarios || index < 0 || index >= usuarios.length) {
            alert("Error: No se pudo eliminar el usuario.");
            return;
        }

        usuarios.splice(index, 1); 

        let actualizar = await fetch(API_URL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": API_KEY
            },
            body: JSON.stringify(usuarios)
        });

        if (actualizar.ok) {
            alert("Usuario eliminado correctamente.");
            cargarUsuarios(); 
        } else {
            alert("Error al eliminar usuario.");
        }
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
    }
};
