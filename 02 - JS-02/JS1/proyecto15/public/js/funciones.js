    document.addEventListener('DOMContentLoaded', () => {
      const form = document.getElementById('form');
      const inputTexto = document.getElementById('inputTexto');
      const lista = document.getElementById('lista');
      const mensaje = document.getElementById('mensaje');

      const codificar = (texto) => {
        let resultado = '';
        for (let i = 0; i < texto.length; i++) {
          const letra = texto[i];
          const codigo = letra.charCodeAt(0);
          const nuevoCodigo = (codigo * 3) + 7;
          resultado += String.fromCharCode(nuevoCodigo % 256); // Controla desbordes
        }
        return resultado;
      };

      const mostrarResultado = (textoCodificado) => {
        lista.innerHTML = '';
        const li = document.createElement('li');
        li.textContent = textoCodificado;
        lista.appendChild(li);
      };

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const texto = inputTexto.value.trim();

        if (!texto || /\d/.test(texto)) {
          mensaje.textContent = 'Debe ingresar solo letras, sin números.';
          mensaje.style.color = 'red';
          return;
        }

        const textoCodificado = codificar(texto);
        mostrarResultado(textoCodificado);
        mensaje.textContent = 'Texto codificado correctamente.';
        mensaje.style.color = 'green';
      });
    });