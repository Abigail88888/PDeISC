   document.addEventListener('DOMContentLoaded', () => {

      // Obtener referencias a los elementos HTML donde se mostrará la lista y los errores
      const lista = document.getElementById('listaLetras');
      const error = document.getElementById('mensajeError');

      // Función que recibe los datos (array de letras) y los muestra en pantalla
      const render = (data) => {
        lista.innerHTML = '';       // Limpia la lista anterior
        error.textContent = '';     // Limpia cualquier mensaje de error

        data.letras.forEach(l => {  // Por cada letra recibida del servidor
          const li = document.createElement('li'); 
          li.textContent = l;       // Le pone el texto de la letra
          lista.appendChild(li);    // Lo agrega a la lista en el HTML
        });
      };

      // Función que muestra un mensaje de error
      const mostrarError = (msg) => {
        error.textContent = msg; 
      };

      // Botón Eliminar que envía una petición al servidor para eliminar letras
      document.getElementById('btnEliminar').addEventListener('click', () => {
        fetch('/eliminar', { method: 'POST' }) // Hace una petición POST a la ruta /eliminar
          .then(res => res.json())             // Convierte la respuesta a JSON
          .then(render)                        // Muestra la lista modificada
          .catch(() => mostrarError('No se pudo eliminar.')); // Si falla, muestra error
      });

      // Botón "Insertar": inserta una letra al array del servidor
      document.getElementById('btnInsertar').addEventListener('click', () => {
        const letra = document.getElementById('inputInsertar').value.trim(); // Toma el valor ingresado y lo limpia
        if (!letra) return mostrarError('Debe ingresar una letra.');         // Si está vacío, muestra error

        fetch('/insertar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ letra }) // envía la letra como JSON
        })
          .then(res => res.json())   
          .then(render)              
          .catch(() => mostrarError('No se pudo insertar.')); 
      });

      // Botón "Reemplazar": reemplaza una o más letras a partir de una posición
      document.getElementById('btnReemplazar').addEventListener('click', () => {
        const pos = document.getElementById('inputPosicion').value; // Toma la posición ingresada
        const nuevas = document.getElementById('inputNuevas')       // Toma las nuevas letras
          .value
          .split(',')           // Las separa por comas
          .map(l => l.trim())   // Quita espacios
          .filter(Boolean);     // Elimina vacíos

        if (nuevas.length === 0) return mostrarError('Ingrese al menos una letra para reemplazar.');

        fetch('/reemplazar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pos, nuevas }) // Envía posición y nuevas letras
        })
          .then(res => res.json())  // Convierte respuesta a JSON
          .then(render)             // Muestra nueva lista
          .catch(() => mostrarError('No se pudo reemplazar.')); // Si hay error, lo muestra
      });

      // muestra el estado actual del array
      fetch('/letras')
        .then(res => res.json())
        .then(render);
    });