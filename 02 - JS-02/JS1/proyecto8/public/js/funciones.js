    document.addEventListener('DOMContentLoaded', () => {
      // Arrays base
      const usuarios = ['admin', 'editor', 'guest', 'developer'];
      const colores = ['rojo', 'azul', 'verde', 'amarillo'];
      let numeros = [5, 10, 15];

      // Elementos del DOM
      const lista = document.getElementById('lista');
      const mensaje = document.getElementById('mensaje');
      const mensajeNumero = document.getElementById('mensajeNumero');
      const inputNumero = document.getElementById('inputNumero');

      const btnVerificarAdmin = document.getElementById('btnVerificarAdmin');
      const btnVerificarVerde = document.getElementById('btnVerificarVerde');
      const btnAgregarNumero = document.getElementById('btnAgregarNumero');

      // Mostrar arrays actuales
      function cargarLista() {
        lista.innerHTML = `
          <li><strong>Usuarios:</strong> ${usuarios.join(', ')}</li>
          <li><strong>Colores:</strong> ${colores.join(', ')}</li>
          <li><strong>Números:</strong> ${numeros.join(', ')}</li>
        `;
      }

      // Verificar si "admin" está en usuarios
      btnVerificarAdmin.addEventListener('click', () => {
        mensaje.textContent = usuarios.includes('admin')
          ? '"admin" está presente en el array de usuarios.'
          : '"admin" no está presente.';
        mensaje.style.color = usuarios.includes('admin') ? 'green' : 'red';
      });

      // Verificar si "verde" está en colores
      btnVerificarVerde.addEventListener('click', () => {
        mensaje.textContent = colores.includes('verde')
          ? '"verde" está en el array de colores.'
          : '"verde" no está en el array.';
        mensaje.style.color = colores.includes('verde') ? 'green' : 'orange';
      });

      // Verificar número antes de agregar
      btnAgregarNumero.addEventListener('click', () => {
        const valor = parseInt(inputNumero.value.trim());

        if (isNaN(valor) || valor <= 0) {
          mensajeNumero.textContent = 'Debe ingresar un número válido mayor a 0.';
          mensajeNumero.style.color = 'red';
          return;
        }

        if (numeros.includes(valor)) {
          mensajeNumero.textContent = `El número ${valor} ya está en el array.`;
          mensajeNumero.style.color = 'orange';
        } else {
          numeros.push(valor);
          mensajeNumero.textContent = `El número ${valor} fue agregado correctamente.`;
          mensajeNumero.style.color = 'green';
          cargarLista();
        }

        inputNumero.value = '';
      });

      cargarLista(); // Inicializa lista al cargar
    });