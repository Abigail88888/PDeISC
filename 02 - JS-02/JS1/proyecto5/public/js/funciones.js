    document.addEventListener('DOMContentLoaded', () => {
      const lista = document.getElementById('listaLetras');
      const error = document.getElementById('mensajeError');

      // Array local de letras
      let letras = ['A', 'B', 'C', 'D', 'E', 'F'];

      // Muestra las letras en la lista
      const cargarLista = (data) => {
        lista.innerHTML = '';
        error.textContent = '';
        data.letras.forEach(l => {
          const li = document.createElement('li');
          li.textContent = l;
          lista.appendChild(li);
        });
      };

      // Muestra un mensaje de error
      const mostrarError = (msg) => {
        error.textContent = msg;
      };

      // Enviar datos y actualizar array
      const postear = (url, body) => {
        fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        })
          .then(res => {
            if (!res.ok) throw new Error('Error en la operación');
            return res.json();
          })
          .then(data => {
            letras = data.letras;
            cargarLista(data);
          })
          .catch(() => mostrarError('No se pudo procesar la solicitud.'));
      };

      // Botón eliminar 2 desde posición 1
      document.getElementById('btnEliminar').addEventListener('click', () => {
        if (letras.length < 3) return mostrarError('Se necesitan al menos 3 letras.');
        postear('/eliminar', { letras });
      });

      // Botón insertar en posición 1
      document.getElementById('btnInsertar').addEventListener('click', () => {
        const letra = document.getElementById('inputInsertar').value.trim();
        if (!/^[a-zA-Z]$/.test(letra)) return mostrarError('Ingrese una única letra válida.');
        postear('/insertar', { letra, letras });
      });

      // Botón reemplazar
      document.getElementById('btnReemplazar').addEventListener('click', () => {
        const pos = document.getElementById('inputPosicion').value;
        const nuevas = document.getElementById('inputNuevas')
          .value
          .split(',')
          .map(l => l.trim())
          .filter(Boolean);

        if (isNaN(pos) || nuevas.length === 0) return mostrarError('Complete los campos correctamente.');
        postear('/reemplazar', { pos, nuevas, letras });
      });

      // Cargar lista inicial
      cargarLista({ letras });
    });