fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vTCIhbt2dRXotqnZT_xinpCpEqCFE3p2kCfsQHivKmAlvm8PZ5hrZGk7_MhotockRsAX0fzvOfMJ9Fs/pub?gid=0&single=true&output=csv")
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