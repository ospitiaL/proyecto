const API_URL = "https://api.jsonbin.io/v3/b/67b4e758ad19ca34f808bef0";
const API_KEY = "$2a$10$8OdcwmdEF3G7zErnorA84eTQB2V2YFtqAL1vxaU/FRwJ2OWPZ4Ydm";

let login = async () => {
    let usuario = document.getElementById("usuario").value.trim();
    let password = document.getElementById("password").value.trim();

    if (usuario === "" || password === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    try {
        let response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "X-Master-Key": API_KEY
            }
        });

        let data = await response.json();
        let usuarios = data.record;  

       
        let usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.contraseña === password);

        if (usuarioEncontrado) {
            alert("Bienvenido " + usuarioEncontrado.nombre);

            localStorage.setItem("usuario", usuarioEncontrado.usuario);
            localStorage.setItem("rol", usuarioEncontrado.rol);
            localStorage.setItem("nombre", usuarioEncontrado.nombre);

            switch (usuarioEncontrado.rol) {
                case "admin":
                    window.location.href = "html/admin.html";
                    break;
                case "tech":
                    window.location.href = "html/tech.html";
                    break;
                case "user":
                    window.location.href = "html/user.html";
                    break;
                default:
                    alert("El rol no ha sido asignado.");
                    break;
            }
        } else {
            alert("Usuario o contraseña incorrectos");
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Hubo un problema con la solicitud.");
    }
};
