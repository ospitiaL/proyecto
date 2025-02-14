fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vTVbUqsF7LE2AJmwUQiFKbwY69GDNfJC0bA00gvs63o2vX7Hs_YbRqbf5qZ_g6IaM2x3ID9GgziYo7Q/pub?output=csv")
            .then(response => response.text())
            .then(data => {
                let filas = data.split("\n").map(fila => fila.split(","));
                let tabla = document.getElementById("tabla");

                filas.forEach((fila, i) => {
                    let tr = document.createElement("tr");
                    fila.forEach(col => {
                        let celda = document.createElement(i === 0 ? "th" : "td");
                        celda.textContent = col;
                        tr.appendChild(celda);
                    });
                    tabla.appendChild(tr);
                });
            })
            .catch(error => console.error("Error cargando los datos:", error));