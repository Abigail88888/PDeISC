// Espera que la página cargue completamente
document.addEventListener('DOMContentLoaded', () => {

  // referencias al formulario y a algunos elementos de la página
  const f = document.getElementById('formulario'); // el formulario entero
  const m = document.getElementById('mensaje');    // donde se muestra el mensaje (éxito o error)
  const l = document.getElementById('lista');      // lista donde se muestran los datos guardados

  // contenedores donde se agregan los nuevos inputs dinámicos
  const frutasContainer = document.getElementById('frutas-container');
  const amigosContainer = document.getElementById('amigos-container');

  // esto es para que se agregue un nuevo input si tocamos el boton
  document.getElementById('agregar-fruta').onclick = () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'fruta';
    input.placeholder = 'Otra fruta';
    frutasContainer.appendChild(input);
  };

  // lo mismo pero con agregar amigo 
  document.getElementById('agregar-amigo').onclick = () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'amigo';
    input.placeholder = 'Otro amigo';
    amigosContainer.appendChild(input);
  };

  // cuando se envía el formulario
  f.onsubmit = e => {
    e.preventDefault(); // evitamos que se recargue la página

    // recolecta todas las frutas ingresadas (evita vacíos)
    const frutas = Array.from(f.querySelectorAll('input[name="fruta"]'))
      .map(i => i.value.trim())
      .filter(v => v);

    // recolecta todos los amigos ingresados
    const amigos = Array.from(f.querySelectorAll('input[name="amigo"]'))
      .map(i => i.value.trim())
      .filter(v => v);

    // recolecta el número ingresado
    const numero = f.numero.value.trim();

    //  si no se ingresó nada, muestra error
    if (frutas.length === 0 && amigos.length === 0 && !numero) {
      m.textContent = 'Debes ingresar al menos una fruta, amigo o número.';
      m.style.color = 'red';
      return;
    }

    // Enviar los datos al servidor con fetch y método POST
    fetch('/guardar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ frutas, amigos, numero }) // lo mandamos como objeto JSON
    })
    .then(r => r.json().then(j => ({ ok: r.ok, j }))) // procesa la respuesta
    .then(r => {
      m.textContent = r.ok ? r.j.mensaje : r.j.error; // mensaje de éxito o error
      m.style.color = r.ok ? 'green' : 'red';

      if (r.ok) {
        f.reset();       // limpia los inputs
        cargarLista();   // actualiza la lista con lo nuevo
      }
    })
    .catch(() => {
      m.textContent = 'Error de conexión.';
      m.style.color = 'red';
    });
  };

  // esta función consulta los datos actuales del servidor y los muestra
  function cargarLista() {
    fetch('/datos')
      .then(r => r.json())
      .then(data => {
        l.innerHTML = `
          <li><strong>Frutas:</strong> ${data.frutas.join(', ')}</li>
          <li><strong>Amigos:</strong> ${data.amigos.join(', ')}</li>
          <li><strong>Números:</strong> ${data.numeros.join(', ')}</li>
        `;
      })
      .catch(() => {
        l.innerHTML = '<li>Error al cargar los datos.</li>';
      });
  }

  // Llamamos a la funcion para mostrar la lista
  cargarLista();
});