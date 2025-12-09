    document.addEventListener("DOMContentLoaded", () => {
      // Arrays
      let colores = []; 
      let tareas = ["sacar la basura", "limpiar", "ordenar"];
      let usuarios = ["marcos07", "lucia33", "tomasito", "anitta"];

      // Lista de colores válidos
      const coloresValidos = [
        "rojo",
        "verde",
        "azul",
        "amarillo",
        "negro",
        "blanco",
        "naranja",
        "rosa",
        "marron",
        "gris",
      ];

      // Elementos del DOM
      const colorInput = document.getElementById("colorInput");
      const tareaInput = document.getElementById("tareaInput");
      const usuarioInput = document.getElementById("usuarioInput");

      const colorMensaje = document.getElementById("colorMensaje");
      const tareaMensaje = document.getElementById("tareaMensaje");
      const usuarioMensaje = document.getElementById("usuarioMensaje");
      const mensaje = document.getElementById("mensaje");
      const lista = document.getElementById("lista");

      // Cargar datos del servidor 
      fetch("/datos")
        .then((res) => res.json())
        .then((data) => {
          colores = [...data.colores];
          renderizarLista();
        });

      // Agregar color al mensaje validado
      document.getElementById("btnAgregarColores").addEventListener("click", () => {
        const valor = colorInput.value.trim().toLowerCase();
        if (coloresValidos.includes(valor)) {
          colores.unshift(valor);
          colorMensaje.textContent = `Color "${valor}" agregado correctamente.`;
          colorMensaje.style.color = "green";
          colorInput.value = "";
        }     else {
          colorMensaje.textContent = "Debes ingresar un color válido.";
          colorMensaje.style.color = "red";
        }
      });

      // Agregar tarea urgente al inicio
      document.getElementById("btnAgregarTarea").addEventListener("click", () => {
        const valor = tareaInput.value.trim();
        if (valor && isNaN(valor)) {
          tareas.unshift(valor);
          tareaMensaje.textContent = `Tarea urgente "${valor}" agregada al principio.`;
          tareaMensaje.style.color = "green";
          tareaInput.value = "";
        } else {
          tareaMensaje.textContent = "Ingresa una tarea válida (solo letras).";
          tareaMensaje.style.color = "red";
        }
      });

      // Agregar usuario conectado al inicio
      document.getElementById("btnAgregarUsuario").addEventListener("click", () => {
        const valor = usuarioInput.value.trim();
        if (valor && isNaN(valor)) {
          usuarios.unshift(valor);
          usuarioMensaje.textContent = `Usuario "${valor}" conectado.`;
          usuarioMensaje.style.color = "green";
          usuarioInput.value = "";
        }     else {
          usuarioMensaje.textContent = "Ingresa un nombre de usuario válido.";
          usuarioMensaje.style.color = "red";
        }
      });

      // Enviar datos al servidor
      document.getElementById("form").addEventListener("submit", (e) => {
        e.preventDefault();

        if (colores.length === 0 && tareas.length === 0 && usuarios.length === 0) {
          mensaje.textContent = "No hay datos para enviar.";
          mensaje.style.color = "red";
          return;
        }

        fetch("/guardar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nuevosColores: colores,
            nuevaTarea: tareas[0] || null,
            nuevoUsuario: usuarios[0] || null,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            mensaje.textContent = data.mensaje;
            mensaje.style.color = "green";
            renderizarLista();
      })
          .catch(() => {
            mensaje.textContent = "Error al guardar.";
            mensaje.style.color = "red";
          });
      });

      // Mostrar resultados en lista
      function renderizarLista() {
        lista.innerHTML = "";
        if (colores.length) {
          lista.innerHTML += `<li><strong>Colores:</strong> ${colores.join(
            ", "
          )}</li>`;
        }
        if (tareas.length) {
          lista.innerHTML += `<li><strong>Tareas:</strong> ${tareas.join(
            ", "
          )}</li>`;
        }
        if (usuarios.length) {
          lista.innerHTML += `<li><strong>Usuarios conectados:</strong> ${usuarios.join(
            ", "
          )}</li>`;
        }
      }
    });