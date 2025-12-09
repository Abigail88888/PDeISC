  document.addEventListener('DOMContentLoaded', () => {
    const lista = document.getElementById('lista');
    const mensaje = document.getElementById('mensaje');
    const mensajeLetras = document.getElementById('mensajeLetras');
    const mensajeNumeros = document.getElementById('mensajeNumeros');
    const mensajeTexto = document.getElementById('mensajeTexto');

    // Función para renderizar los datos actuales
    const renderizar = (data) => {
      lista.innerHTML = '';
      if (data.letras.length) {
        lista.innerHTML += `<li><strong>Letras:</strong> ${data.letras.join(', ')}</li>`;
      }
      if (data.numeros.length) {
        lista.innerHTML += `<li><strong>Números:</strong> ${data.numeros.join(', ')}</li>`;
      }
      if (data.textoInvertido) {
        lista.innerHTML += `<li><strong>Texto invertido:</strong> ${data.textoInvertido}</li>`;
      }
    };

    // Mostrar estado inicial
    fetch('/datos')
      .then(res => res.json())
      .then(renderizar);

    // Invertir letras
    document.getElementById('btnInvertirLetras').addEventListener('click', () => {
      fetch('/invertir-letras', { method: 'POST' })
        .then(res => res.json())
        .then(data => {
          renderizar(data);
          mensajeLetras.textContent = 'Letras invertidas correctamente.';
        });
    });

    // Invertir números
    document.getElementById('btnInvertirNumeros').addEventListener('click', () => {
      fetch('/invertir-numeros', { method: 'POST' })
        .then(res => res.json())
        .then(data => {
          renderizar(data);
          mensajeNumeros.textContent = 'Números invertidos correctamente.';
        });
    });

    // Invertir texto ingresado (solo letras permitidas)
    document.getElementById('btnInvertirTexto').addEventListener('click', () => {
      const texto = document.getElementById('inputTexto').value.trim();

      // Validación: solo letras (mayúsculas o minúsculas)
      if (!texto) {
        mensajeTexto.textContent = 'Debes ingresar un texto.';
        return;
      }

      if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(texto)) {
        mensajeTexto.textContent = 'Solo se permiten letras (sin números ni símbolos).';
        return;
      }

      fetch('/invertir-texto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto })
      })
        .then(res => res.json())
        .then(data => {
          renderizar(data);
          mensajeTexto.textContent = 'Texto invertido correctamente.';
        });
    });

    // Reiniciar los datos al estado original
    document.getElementById('form').addEventListener('submit', (e) => {
      e.preventDefault();
      fetch('/reiniciar', { method: 'POST' })
        .then(res => res.json())
        .then(data => {
          renderizar(data);
          mensaje.textContent = 'Datos reiniciados correctamente.';
          mensajeLetras.textContent = '';
          mensajeNumeros.textContent = '';
          mensajeTexto.textContent = '';
        });
    });
  });
