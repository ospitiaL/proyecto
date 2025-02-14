const registrarTecnico = (event) => {
    event.preventDefault();

    let datos = {
        nombre: document.getElementById("nombres").value,
        apellido: document.getElementById("apellidos").value,
        identidad: document.getElementById("identidad").value,
        telefono: document.getElementById("tel").value,
        estudio: document.getElementById("lugar").value
    };

    fetch("https://script.google.com/macros/s/AKfycbwHWycWC1JtkFGhmFrfBL4XXv4h9uqR9XIl3OWzGU3y26OSP9tFnai3WQilyjr1on_6/exec", { 
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
        alert("Servidor respondió: " + data.mensaje);
        document.getElementById("register").reset();
    })
    .catch(error => console.error("Error:", error));
};
