let scriptURL = "https://script.google.com/macros/s/AKfycbx-aBhfOHYYhMxuq4c-lTLXs2NyrsYbIYMaT9tu426I1JGyzx8L6gMMkPsonTywdgoNRg/exec"; // Reemplázalo con la URL de Google Apps Script

let login = () => {
    let usuario = document.getElementById("usuario").value;
    let password = document.getElementById("password").value;

    if (usuario === "" || password === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    fetch(`${scriptURL}?user=${usuario}&pass=${password}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Bienvenido");

                localStorage.setItem("usuario", usuario);
                localStorage.setItem("rol", data.rol);
                // Redirigir según el rol
                switch (data.rol) {
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
                        alert("el rol no ha sido asignado.");
                        break;
                }
            } else {
                alert("Usuario o contraseña incorrectos");
            }
        })
        .catch(error => console.error("Error:", error));
};








