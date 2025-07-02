    document.addEventListener('DOMContentLoaded', () => {
      const lista = document.getElementById('lista');
      const mensaje = document.getElementById('mensaje');
      const msgNumeros = document.getElementById('mensajeNumeros');
      const msgPalabras = document.getElementById('mensajePalabras');
      const msgUsuarios = document.getElementById('mensajeUsuarios');

      // Arrays originales
      const numerosOriginales = [5, 12, 8, 20, 3];
      const palabrasOriginales = ["mesa", "televisor", "pan", "computadora", "luz"];
      const usuariosOriginales = [
        { nombre: "Ana", activo: true },
        { nombre: "Luis", activo: false },
        { nombre: "Mario", activo: true },
        { nombre: "Lucía", activo: false }
      ];

      // Copias para modificar
      let numeros = [...numerosOriginales];
      let palabras = [...palabrasOriginales];
      let usuarios = [...usuariosOriginales];

      const renderizarLista = () => {
        lista.innerHTML = `
          <p><strong>Números:</strong> ${numeros.join(', ')}</p>
          <p><strong>Palabras:</strong> ${palabras.join(', ')}</p>
          <p><strong>Usuarios activos:</strong> ${usuarios.map(u => u.nombre).join(', ')}</p>
        `;
      };

      renderizarLista();

      document.getElementById('btnFiltrarNumeros').addEventListener('click', () => {
        numeros = numeros.filter(n => !isNaN(n) && n > 10);
        msgNumeros.textContent = 'Números filtrados correctamente.';
        msgNumeros.style.color = 'green';
        renderizarLista();
      });

      document.getElementById('btnFiltrarPalabras').addEventListener('click', () => {
        palabras = palabras.filter(p => typeof p === 'string' && p.length > 5);
        msgPalabras.textContent = 'Palabras filtradas correctamente.';
        msgPalabras.style.color = 'green';
        renderizarLista();
      });

      document.getElementById('btnFiltrarUsuarios').addEventListener('click', () => {
        usuarios = usuarios.filter(u => u.activo === true);
        msgUsuarios.textContent = 'Usuarios activos filtrados correctamente.';
        msgUsuarios.style.color = 'green';
        renderizarLista();
      });

      document.getElementById('form').addEventListener('submit', (e) => {
        e.preventDefault();
        numeros = [...numerosOriginales];
        palabras = [...palabrasOriginales];
        usuarios = [...usuariosOriginales];
        mensaje.textContent = 'Datos reiniciados correctamente.';
        mensaje.style.color = 'green';
        msgNumeros.textContent = '';
        msgPalabras.textContent = '';
        msgUsuarios.textContent = '';
        renderizarLista();
      });
    });