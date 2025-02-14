fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vRvd_sjvX-UC20eidmvSVOF_gVh8osJ61JKKx0BJktB_qFtCbgDFtfQxq46JurT3x47qd5QJNgyY4U6/pub?output=csv")
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