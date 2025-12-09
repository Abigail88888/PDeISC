    // Recuperar números desde localStorage o array vacío
    const numeros = JSON.parse(localStorage.getItem("numeros")) || [];

    // Elementos del DOM
    const listaDiv = document.getElementById("numerosIngresados");
    const formNumeros = document.getElementById("formNumeros");
    const guardarBtn = document.getElementById("guardarTxt");
    const mensaje = document.getElementById("mensaje");
    const archivoForm = document.getElementById("formArchivo");
    const resultado = document.getElementById("resultado");
    const inputNumero = document.getElementById("numero");

    // Mostrar los números ingresados en pantalla
    const renderNumeros = () => {
      // Mostrar cada número en un div
      listaDiv.innerHTML = numeros.map(n => `<div>${n}</div>`).join("");

      // Guardar en localStorage
      localStorage.setItem("numeros", JSON.stringify(numeros));

      // Activar el botón "Guardar archivo" solo con 10 o más números
      guardarBtn.disabled = numeros.length < 10;

      // Mensaje visual informativo
      mensaje.textContent = `Cargaste ${numeros.length} número(s).`;
    };

    // Ejecutar al cargar la página
    renderNumeros();

    // Evento al agregar número
    formNumeros.addEventListener("submit", e => {
      e.preventDefault();
      const num = parseInt(inputNumero.value);

      // Validación: número mayor a 0
      if (isNaN(num) || num <= 0) {
        mensaje.textContent = " Solo se permiten números mayores a 0.";
        return;
      }

      // Validación: máximo 20 números
      if (numeros.length >= 20) {
        mensaje.textContent = " Ya ingresaste el máximo de 20 números.";
        return;
      }

      // Validación: sin repetidos
      if (numeros.includes(num)) {
        mensaje.textContent = ` El número ${num} ya fue ingresado.`;
        return;
      }

      // Agregar número y actualizar interfaz
      numeros.push(num);
      inputNumero.value = "";
      renderNumeros();
    });

    // Eliminar último número
    document.getElementById("eliminarUltimo").addEventListener("click", () => {
      numeros.pop();
      renderNumeros();
    });

    // Eliminar todos los números
    document.getElementById("eliminarTodos").addEventListener("click", () => {
      numeros.length = 0;
      renderNumeros();
    });

    // Guardar archivo .txt con fetch
    guardarBtn.addEventListener("click", () => {
      fetch("/guardar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ numeros })
      })
      .then(res => {
        if (!res.ok) throw new Error("Error al guardar");
        return res.text();
      })
      .then(msg => {
        mensaje.textContent = ` ${msg}`;
      })
      .catch(err => {
        mensaje.textContent = `❌ No se pudo guardar el archivo.`;
      });
    });

    // Procesamiento del archivo .txt
    archivoForm.addEventListener("submit", e => {
      e.preventDefault();
      const archivo = document.getElementById("archivoTxt").files[0];
      if (!archivo) return;

      const reader = new FileReader();

      reader.onload = () => {
        const contenido = reader.result;

        fetch("/procesar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ texto: contenido })
        })
        .then(res => res.json())
        .then(data => {
          // Mostramos mensaje de confirmación + resultados
          //resultado.innerHTML = `<div style="padding: 1rem; background-color: #e6ffe6; border-left: 5px solid #4caf50; margin-bottom: 1rem;"> ✅ <strong>resultados.txt cargado correctamente</strong></div><h3> Números útiles (empiezan y terminan igual):</h3><p>${validos.join(", ") || "Ninguno"}</p><h3> Números que no cumplen:</h3>   <p>${noUtiles.join(", ") || "Ninguno"}</p>       <p><strong> Útiles:</strong> ${utiles} | <strong>❌ No útiles:</strong> ${noUtiles.length}</p>        <p><strong> Porcentaje útil:</strong> ${porcentaje}%</p>`;
          resultado.innerHTML = `<p> Numeros validos: ${data.validos} </p><p> Numeros utiles: ${data.utiles} </p><p> Numeros no Útiles: ${data.noUtiles} </p><p>Porcentaje: ${data.porcentaje} </p><p></p>`;
        });
    
      };

      reader.readAsText(archivo);
    });

    // Mostrar el nombre del archivo seleccionado
    const archivoInput = document.getElementById("archivoTxt");
    const nombreArchivo = document.getElementById("nombreArchivo");

    archivoInput.addEventListener("change", () => {
      if (archivoInput.files.length > 0) {
        nombreArchivo.textContent = `📄 Archivo seleccionado: ${archivoInput.files[0].name}`;
      } else {
        nombreArchivo.textContent = "";
      }
    });