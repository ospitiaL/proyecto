const API_URL = "https://api.jsonbin.io/v3/b/67b501cdad19ca34f808e500";
const API_KEY = "$2a$10$8OdcwmdEF3G7zErnorA84eTQB2V2YFtqAL1vxaU/FRwJ2OWPZ4Ydm"; 

document.getElementById("formContactenos").addEventListener("submit", async (e) => {
    e.preventDefault();

    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("correo").value;
    let asunto = document.getElementById("asunto").value;
    let mensaje = document.getElementById("mensaje").value;

    try {
        
        let response = await fetch(API_URL, {
            headers: { "X-Master-Key": API_KEY }
        });
        let data = await response.json();
        let mensajes = data.record || [];

        
        mensajes.push({ nombre, correo, asunto, mensaje, fecha: new Date().toISOString() });

        
        let actualizar = await fetch(API_URL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": API_KEY
            },
            body: JSON.stringify(mensajes)
        });

        if (actualizar.ok) {
            alert("Mensaje enviado correctamente.");
            document.getElementById("formContactenos").reset();
        } else {
            alert("Error al enviar el mensaje.");
        }
    } catch (error) {
        console.error("Error al guardar el mensaje:", error);
    }
});
