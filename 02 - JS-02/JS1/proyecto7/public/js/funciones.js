    // Espera a que el DOM esté completamente cargado
    window.addEventListener('DOMContentLoaded', () => {
      // Arrays originales con valores
      const animalesOriginales = ['gato', 'perro', 'conejo', 'pez'];
      const numerosOriginales = [10, 20, 30, 40, 50, 60];
      const ciudadesOriginales = ['París', 'Londres', 'Tokio', 'Roma'];

      // Copias modificables
      let animales = [...animalesOriginales];
      let numeros = [...numerosOriginales];
      let ciudades = [...ciudadesOriginales];

      // Referencias al DOM
      const lista = document.getElementById('lista');
      const mensaje = document.getElementById('mensaje');
      const btnBuscarPerro = document.getElementById('btnBuscarPerro');
      const btnBuscarNumero = document.getElementById('btnBuscarNumero');
      const btnBuscarMadrid = document.getElementById('btnBuscarMadrid');

      // Muestra los arrays actuales
      function renderizarLista() {
        lista.innerHTML = `
          <li><strong>Animales:</strong> ${animales.join(', ')}</li>
          <li><strong>Números:</strong> ${numeros.join(', ')}</li>
          <li><strong>Ciudades:</strong> ${ciudades.join(', ')}</li>
        `;
      }

      // Buscar "perro" en animales
      btnBuscarPerro.addEventListener('click', () => {
        const index = animales.indexOf('perro');
        if (index !== -1) {
          mensaje.innerHTML = `<span style="color: green">\"perro\" está en la posición ${index + 1}.</span>`;
        } else {
          mensaje.innerHTML = `<span style="color: red">\"perro\" no está en el array de animales.</span>`;
        }
      });

      // Buscar número 50 en números
      btnBuscarNumero.addEventListener('click', () => {
        const index = numeros.indexOf(50);
        if (index !== -1) {
          mensaje.innerHTML = `<span style="color: green">El número 50 está en la posición ${index + 1}.</span>`;
        } else {
          mensaje.innerHTML = `<span style="color: red">El número 50 no se encuentra.</span>`;
        }
      });

      // Buscar "Madrid" en ciudades
      btnBuscarMadrid.addEventListener('click', () => {
        const index = ciudades.indexOf('Madrid');
        if (index !== -1) {
          mensaje.innerHTML = `<span style="color: green">\"Madrid\" está en la posición ${index + 1}.</span>`;
        } else {
          mensaje.innerHTML = `<span style="color: orange">\"Madrid\" no está en la lista de ciudades.</span>`;
        }
      });

      renderizarLista(); // Mostrar arrays 
    });