// Espera que la página cargue completamente
  document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('formulario');
  const lista = document.getElementById('lista');

  // Inputs individuales
  const inputFruta = document.getElementById('inputFruta');
  const inputAmigo = document.getElementById('inputAmigo');
  const inputNumero = document.getElementById('inputNumero');

  // Botones individuales
  const btnFruta = document.getElementById('btnFruta');
  const btnAmigo = document.getElementById('btnAmigo');
  const btnNumero = document.getElementById('btnNumero');

  // Mensajes por sección
  const msgFruta = document.getElementById('msgFruta');
  const msgAmigo = document.getElementById('msgAmigo');
  const msgNumero = document.getElementById('msgNumero');

  // Arrays vacíos para almacenar los datos localmente
  const frutas = [];
  const amigos = [];
  let numeros = [];

  // Validar y guardar fruta
  btnFruta.onclick = () => {
    const valor = inputFruta.value.trim();
    if (valor && isNaN(valor)) {
      frutas.push(valor);
      msgFruta.textContent = `La fruta "${valor}" fue guardada correctamente.`;
      msgFruta.style.color = 'green';
      inputFruta.value = '';
    } else {
      msgFruta.textContent = 'Ingresa solo nombres de frutas válidos (no números).';
      msgFruta.style.color = 'red';
    }
  };

  // Validar y guardar amigo
  btnAmigo.onclick = () => {
    const valor = inputAmigo.value.trim();
    if (valor && isNaN(valor)) {
      amigos.push(valor);
      msgAmigo.textContent = `El amigo "${valor}" fue guardado correctamente.`;
      msgAmigo.style.color = 'green';
      inputAmigo.value = '';
    } else {
      msgAmigo.textContent = 'Ingresa un nombre válido (no un números).';
      msgAmigo.style.color = 'red';
    }
  };

  // Validar y guardar número
  btnNumero.onclick = () => {
    const valor = inputNumero.value.trim();
    const num = parseFloat(valor);

    if (!isNaN(num) && num > 0) {
      // Si el array está vacío o el número es mayor al último
      if (numeros.length === 0 || num > numeros[numeros.length - 1]) {
        numeros.push(num);
        msgNumero.textContent = `El número ${num} fue guardado correctamente.`;
        msgNumero.style.color = 'green';
        inputNumero.value = '';
      } else {
        msgNumero.textContent = 'El número debe ser mayor al último ingresado.';
        msgNumero.style.color = 'red';
      }
    } else {
      msgNumero.textContent = 'Ingresa un número válido mayor a 0.';
      msgNumero.style.color = 'red';
    }
  };

  // Al enviar el formulario (método POST sin recarga)
  formulario.onsubmit = e => {
    e.preventDefault(); // evitar recarga de la página

    const m = document.getElementById('mensaje');

    if (frutas.length < 3 || amigos.length < 3 || numeros.length === 0) {
      m.textContent = 'Debes ingresar al menos 3 frutas, 3 amigos y 1 número.';
      m.style.color = 'red';
      return;
    }

    // Enviar los datos al servidor
    fetch('/guardar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ frutas, amigos, numeros })
    })
    .then(r => r.json().then(j => ({ ok: r.ok, j })))
    .then(res => {
      m.textContent = res.ok ? res.j.mensaje : res.j.error;
      m.style.color = res.ok ? 'green' : 'red';

      if (res.ok) {
        formulario.reset(); // Limpia inputs visibles
        cargarLista();
      }
    })
    .catch(() => {
      m.textContent = 'Error de conexión.';
      m.style.color = 'red';
    });
  };

  // Muestra la lista de datos guardados
  function cargarLista() {
    fetch('/datos')
      .then(r => r.json())
      .then(data => {
        numeros = [...data.numeros]; 

        lista.innerHTML = `
          <li><strong>Frutas:</strong> ${data.frutas.join(', ')}</li>
          <li><strong>Amigos:</strong> ${data.amigos.join(', ')}</li>
          <li><strong>Números:</strong> ${data.numeros.join(', ')}</li>
        `;
      })
      .catch(() => {
        lista.innerHTML = '<li>Error al cargar los datos.</li>';
      });
  }

  cargarLista(); // y con esto mostrar datos al iniciar
});
