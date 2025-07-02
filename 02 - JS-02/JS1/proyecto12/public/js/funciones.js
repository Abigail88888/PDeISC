    document.addEventListener('DOMContentLoaded', () => {
      const lista = document.getElementById('lista');
      const mensaje = document.getElementById('mensaje');
      const mensajeSuma = document.getElementById('mensajeSuma');
      const mensajeMultiplica = document.getElementById('mensajeMultiplica');
      const mensajeTotal = document.getElementById('mensajeTotal');

      // Arrays originales
      const numerosOriginales = [5, 10, 15];
      const enterosOriginales = [2, 4, 6];
      const productosOriginales = [
        { precio: 100 },
        { precio: 250 },
        { precio: 400 }
      ];

      // Copias para modificar
      let numeros = [...numerosOriginales];
      let enteros = [...enterosOriginales];
      let productos = productosOriginales.map(p => ({ ...p }));

      // Renderizar el contenido actual
      const renderizarLista = () => {
        lista.innerHTML = `
          <p><strong>Números (sumados):</strong> ${numeros.join(', ')}</p>
          <p><strong>Enteros (multiplicados):</strong> ${enteros.join(', ')}</p>
          <p><strong>Precios actualizados:</strong> ${productos.map(p => p.precio.toFixed(2)).join(', ')}</p>
        `;
      };

      renderizarLista();

      // Sumar todos los números
      document.getElementById('btnSuma').addEventListener('click', () => {
        const suma = numeros.reduce((acc, val) => acc + val, 0);
        numeros = [suma]; // Actualiza el array con el resultado
        mensajeSuma.textContent = 'Cargado correctamente.';
        mensajeSuma.style.color = 'green';
        renderizarLista();
      });

      // Multiplicar todos los enteros
      document.getElementById('btnMultiplica').addEventListener('click', () => {
        const producto = enteros.reduce((acc, val) => acc * val, 1);
        enteros = [producto]; // Actualiza el array con el resultado
        mensajeMultiplica.textContent = 'Cargado correctamente.';
        mensajeMultiplica.style.color = 'green';
        renderizarLista();
      });

      // Sumar precios
      document.getElementById('btnTotal').addEventListener('click', () => {
        const total = productos.reduce((acc, p) => acc + p.precio, 0);
        productos = [{ precio: total }]; // Actualiza el array con el precio total
        mensajeTotal.textContent = 'Cargado correctamente.';
        mensajeTotal.style.color = 'green';
        renderizarLista();
      });

      // Reiniciar arrays al estado original
      document.getElementById('form').addEventListener('submit', (e) => {
        e.preventDefault();
        numeros = [...numerosOriginales];
        enteros = [...enterosOriginales];
        productos = productosOriginales.map(p => ({ ...p }));

        mensaje.textContent = 'Datos reiniciados correctamente.';
        mensaje.style.color = 'green';

        mensajeSuma.textContent = '';
        mensajeMultiplica.textContent = '';
        mensajeTotal.textContent = '';

        renderizarLista();
      });
    });