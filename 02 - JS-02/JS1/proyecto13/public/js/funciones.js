    document.addEventListener('DOMContentLoaded', () => {
      const lista = document.getElementById('lista');
      const mensaje = document.getElementById('mensaje');
      const msgNums = document.getElementById('mensajeNumeros');
      const msgWords = document.getElementById('mensajePalabras');
      const msgEdades = document.getElementById('mensajeEdades');
      /*Muestro los arays*/
      const renderizar = (data) => {
        lista.innerHTML = '';
        if (data.numeros.length) {
          lista.innerHTML += `<li><strong>Números:</strong> ${data.numeros.join(', ')}</li>`;
        }
        if (data.palabras.length) {
          lista.innerHTML += `<li><strong>Palabras:</strong> ${data.palabras.join(', ')}</li>`;
        }
        if (data.personas.length) {
          const nombres = data.personas.map(p => `${p.nombre} (${p.edad})`);
          lista.innerHTML += `<li><strong>Personas:</strong> ${nombres.join(', ')}</li>`;
        }
      };

      // Mostrar estado actual
      fetch('/datos')
        .then(res => res.json())
        .then(renderizar);

      // Ordenar números
      document.getElementById('btnOrdenarNumeros').addEventListener('click', () => {
        fetch('/ordenar-numeros', { method: 'POST' })
          .then(res => res.json())
          .then(data => {
            renderizar(data);
            msgNums.textContent = 'Números ordenados correctamente.';
          });
      });

      // Ordenar palabras
      document.getElementById('btnOrdenarPalabras').addEventListener('click', () => {
        fetch('/ordenar-palabras', { method: 'POST' })
          .then(res => res.json())
          .then(data => {
            renderizar(data);
            msgWords.textContent = 'Palabras ordenadas correctamente.';
          });
      });

      // Ordenar por edad
      document.getElementById('btnOrdenarEdades').addEventListener('click', () => {
        fetch('/ordenar-edades', { method: 'POST' })
          .then(res => res.json())
          .then(data => {
            renderizar(data);
            msgEdades.textContent = 'Personas ordenadas por edad.';
          });
      });

      // Reiniciar arrays
      document.getElementById('form').addEventListener('submit', (e) => {
        e.preventDefault();
        fetch('/reiniciar', { method: 'POST' })
          .then(res => res.json())
          .then(data => {
            renderizar(data);
            mensaje.textContent = 'Datos reiniciados correctamente.';
            msgNums.textContent = '';
            msgWords.textContent = '';
            msgEdades.textContent = '';
          });
      });
    });