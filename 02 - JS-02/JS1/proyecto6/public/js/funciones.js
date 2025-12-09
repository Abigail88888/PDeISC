    // Espera a que el DOM esté completamente cargado
    window.addEventListener('DOMContentLoaded', () => {
      // Arrays originales con valores
      const numerosOriginales = [10, 20, 30, 40, 50];
      const peliculasOriginales = ['Matrix', 'Titanic', 'Terminator 3', 'La vida es bella', 'Interstellar'];
      const golosinasOriginales = ['Chocolate', 'Caramelos', 'Gomitas', 'Chicle', 'Turrón'];

      // Copias actuales (pueden ser modificadas)
      let numeros = [...numerosOriginales];
      let peliculas = [...peliculasOriginales];
      let golosinas = [...golosinasOriginales];

      // Arrays copiados
      let copiaNumeros = [];
      let copiaPeliculas = [];
      let copiaGolosinas = [];

      // Referencias al DOM
      const lista = document.getElementById('lista');
      const mensaje = document.getElementById('mensaje');

      const btnCopiarNumeros = document.getElementById('btnCopiarNumeros');
      const btnCopiarPeliculas = document.getElementById('btnCopiarPeliculas');
      const btnCopiarGolosinas = document.getElementById('btnCopiarGolosinas');
      const form = document.getElementById('form');

      // Muestra los arrays actuales
      function renderizarLista() {
        lista.innerHTML = `
          <li><strong>Números originales:</strong> ${numeros.join(', ')}</li>
          <li><strong>Películas originales:</strong> ${peliculas.join(', ')}</li>
          <li><strong>Golosinas originales:</strong> ${golosinas.join(', ')}</li>
        `;

        // Muestra resultados si existen
        if (copiaNumeros.length) {
          lista.innerHTML += `<li><strong>Números copiados:</strong> ${copiaNumeros.join(', ')}</li>`;
        }
        if (copiaPeliculas.length) {
          lista.innerHTML += `<li><strong>Películas copiadas:</strong> ${copiaPeliculas.join(', ')}</li>`;
        }
        if (copiaGolosinas.length) {
          lista.innerHTML += `<li><strong>Golosinas copiadas:</strong> ${copiaGolosinas.join(', ')}</li>`;
        }
      }

      // Validaciones básicas
      function validarArray(arr, cantidadMinima) {
        return Array.isArray(arr) && arr.length >= cantidadMinima;
      }

      // Copiar primeros 3 números
      btnCopiarNumeros.addEventListener('click', () => {
        if (!validarArray(numeros, 3)) {
          mensaje.textContent = 'Debe haber al menos 3 números para copiar.';
          return;
        }
        copiaNumeros = numeros.slice(0, 3);
        mensaje.innerHTML = '<span style="color: green">Números copiados correctamente.</span>';
        renderizarLista();
      });

      // Copiar películas del índice 2 al 4 
      btnCopiarPeliculas.addEventListener('click', () => {
        if (!validarArray(peliculas, 4)) {
          mensaje.textContent = 'Debe haber al menos 4 películas para copiar desde la posición 2.';
          return;
        }
        copiaPeliculas = peliculas.slice(2, 4);
        mensaje.innerHTML = '<span style="color: green">Películas copiadas correctamente.</span>';
        renderizarLista();
      });

      // Copiar últimos 3 elementos de golosinas
      btnCopiarGolosinas.addEventListener('click', () => {
        if (!validarArray(golosinas, 3)) {
          mensaje.textContent = 'Debe haber al menos 3 golosinas para copiar los últimos elementos.';
          return;
        }
        copiaGolosinas = golosinas.slice(-3);
        mensaje.innerHTML = '<span style="color: green">Golosinas copiadas correctamente.</span>';
        renderizarLista();
      });

      // Reiniciar los arrays 
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        numeros = [...numerosOriginales];
        peliculas = [...peliculasOriginales];
        golosinas = [...golosinasOriginales];
        copiaNumeros = [];
        copiaPeliculas = [];
        copiaGolosinas = [];
        mensaje.innerHTML = '<span style="color: blue">Arrays reiniciados.</span>';
        renderizarLista();
      });

      renderizarLista(); // Inicializa mostrando los arrays originales
    });