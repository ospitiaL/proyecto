fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vT5aEUCs9iNc9aCR6lutPzIdnsK2lu7gKv1fURsdKZYes59ZFqVBmj-_HBtHTRCiFUygozHZSpciMuI/pub?output=csv")
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