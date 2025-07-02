    // Esperar a que el DOM esté completamente cargado
    document.addEventListener('DOMContentLoaded', () => {
      // Arrays simulados 
      const numeros = [10, 20, 30, 40];
      const mensajes = ['Hola Ana', '¿Cómo andas?', 'Tanto tiempo'];
      const clientes = ['Cliente 1', 'Cliente 2', 'Cliente 3'];

      // Referencias a los inputs
      const numeroInput = document.getElementById('numeroInput');
      const mensajeInput = document.getElementById('mensajeInput');
      const clienteInput = document.getElementById('clienteInput');

      // Referencias a la lista donde se muestran los datos y el mensaje de estado
      const lista = document.getElementById('lista');
      const mensajeGeneral = document.getElementById('mensaje');

      // Botones
      const btnAgregarNumero = document.getElementById('btnAgregarNumero');
      const btnEliminarNumero = document.getElementById('btnEliminarNumero');

      const btnAgregarMensaje = document.getElementById('btnAgregarMensaje');
      const btnEliminarMensaje = document.getElementById('btnEliminarMensaje');

      const btnAgregarCliente = document.getElementById('btnAgregarCliente');
      const btnAtenderCliente = document.getElementById('btnAtenderCliente');

      // Agrega un número entero válido (> 0)
      btnAgregarNumero.addEventListener('click', () => {
        const valor = numeroInput.value.trim();
        const numero = parseInt(valor, 10);

        if (!valor || isNaN(numero) || numero <= 0) {
          mensajeGeneral.textContent = 'Debes ingresar un número válido mayor a 0.';
          mensajeGeneral.style.color = 'red';
          return;
        }

        numeros.push(numero);
        numeroInput.value = '';
        mensajeGeneral.textContent = `Número ${numero} agregado correctamente.`;
        mensajeGeneral.style.color = 'green';
        cargarLista();
      });

      // Elimina el primer número del array
      btnEliminarNumero.addEventListener('click', () => {
        if (numeros.length === 0) {
          mensajeGeneral.textContent = 'No hay números para eliminar.';
          mensajeGeneral.style.color = 'red';
          return;
        }

        const eliminado = numeros.shift();
        mensajeGeneral.textContent = `Se eliminó el número: ${eliminado}`;
        mensajeGeneral.style.color = 'green';
        cargarLista();
      });

      // Agrega un mensaje de texto (no puede ser número)
      btnAgregarMensaje.addEventListener('click', () => {
        const texto = mensajeInput.value.trim();

        if (!texto || !isNaN(texto)) {
          mensajeGeneral.textContent = 'Debes ingresar un mensaje válido.';
          mensajeGeneral.style.color = 'red';
          return;
        }

        mensajes.push(texto);
        mensajeInput.value = '';
        mensajeGeneral.textContent = `Mensaje agregado correctamente.`;
        mensajeGeneral.style.color = 'green';
        cargarLista();
      });

      // Elimina el primer mensaje del array
      btnEliminarMensaje.addEventListener('click', () => {
        if (mensajes.length === 0) {
          mensajeGeneral.textContent = 'No hay mensajes para eliminar.';
          mensajeGeneral.style.color = 'red';
          return;
        }

        const eliminado = mensajes.shift();
        mensajeGeneral.textContent = `Mensaje eliminado: "${eliminado}"`;
        mensajeGeneral.style.color = 'green';
        cargarLista();
      });

      // Agrega un nuevo cliente al final de la cola
      btnAgregarCliente.addEventListener('click', () => {
        const cliente = clienteInput.value.trim();

        if (!cliente || !isNaN(cliente)) {
          mensajeGeneral.textContent = 'Debes ingresar un nombre de cliente válido.';
          mensajeGeneral.style.color = 'red';
          return;
        }

        clientes.push(cliente);
        clienteInput.value = '';
        mensajeGeneral.textContent = `Cliente agregado correctamente.`;
        mensajeGeneral.style.color = 'green';
        cargarLista();
      });

      // Simula la atención del primer cliente (shift)
      btnAtenderCliente.addEventListener('click', () => {
        if (clientes.length === 0) {
          mensajeGeneral.textContent = 'No hay clientes para atender.';
          mensajeGeneral.style.color = 'red';
          return;
        }

        const atendido = clientes.shift();
        mensajeGeneral.textContent = `Cliente atendido: ${atendido}`;
        mensajeGeneral.style.color = 'green';
        cargarLista();
      });

      /* Función que actualiza el contenido de la lista sin recargar la página. 
        O sea muestra los datos actuales.
       */
      function cargarLista() {
        lista.innerHTML = '';

        if (numeros.length) {
          lista.innerHTML += `<li><strong>Números:</strong> ${numeros.join(', ')}</li>`;
        }

        if (mensajes.length) {
          lista.innerHTML += `<li><strong>Mensajes:</strong> ${mensajes.join(', ')}</li>`;
        }

        if (clientes.length) {
          lista.innerHTML += `<li><strong>Cola de atención:</strong> ${clientes.join(', ')}</li>`;
        }
      }

      // Mostrar los datos al cargar la página
      cargarLista();
    });