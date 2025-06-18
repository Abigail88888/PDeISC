// script.js

// Elementos del DOM
const formIngreso = document.getElementById('formIngreso');
const formUpload = document.getElementById('formUpload');
const inputNumero = document.getElementById('numero');
const listaNumeros = document.getElementById('listaNumeros');
const advertencia = document.getElementById('advertencia');
const resultadoContenedor = document.getElementById('resultadoContenedor');
const resultadoTexto = document.getElementById('resultadoTexto');
const descargaLink = document.getElementById('descargaLink');

let numeros = []; // Almacena los números ingresados manualmente

// Validar y agregar número al array
formIngreso.addEventListener('submit', e => {
  e.preventDefault();

  const valor = inputNumero.value.trim();

  // Validación: debe ser entero positivo
  if (!/^\d+$/.test(valor)) {
    advertencia.innerHTML = 'Por favor, ingresá un número entero positivo.';
    return;
  }

  const numero = parseInt(valor);

  // No más de 20 números
  if (numeros.length >= 20) {
    advertencia.innerHTML = 'No podés ingresar más de 20 números.';
    return;
  }

  numeros.push(numero);
  inputNumero.value = '';
  advertencia.innerHTML = '';
  renderLista();

  // Autoenvío al llegar a 10 valores mínimo
  if (numeros.length >= 10) {
    enviarNumeros();
  }
});

// Muestra la lista de números ingresados en pantalla
function renderLista() {
  listaNumeros.innerHTML = numeros.map(n => `<li>${n}</li>`).join('');
}

// Enviar números al servidor para guardar como TXT
function enviarNumeros() {
  fetch('/guardar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ numeros })
  })
    .then(res => res.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      descargaLink.href = url;
      descargaLink.download = 'datos.txt';
      descargaLink.textContent = 'Descargar datos.txt';
      descargaLink.style.display = 'inline-block';
    })
    .catch(err => {
      advertencia.innerHTML = 'Error al guardar los números.';
    });
}

// Subir archivo txt al servidor y procesar
formUpload.addEventListener('submit', e => {
  e.preventDefault();

  const archivo = document.getElementById('archivo').files[0];
  if (!archivo) {
    advertencia.innerHTML = 'Seleccioná un archivo para subir.';
    return;
  }

  const formData = new FormData();
  formData.append('archivo', archivo);

  fetch('/upload', {
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        advertencia.innerHTML = data.error;
        return;
      }

      advertencia.innerHTML = '';
      resultadoContenedor.style.display = 'block';

      resultadoTexto.innerHTML = `
        <p>Números válidos: ${data.validos.join(', ')}</p>
        <p>Cantidad de válidos: ${data.cantidadValidos}</p>
        <p>Cantidad de inválidos: ${data.cantidadInvalidos}</p>
        <p>Porcentaje útiles: ${data.porcentaje}%</p>
        ${data.advertencia ? `<p><strong>${data.advertencia}</strong></p>` : ''}
      `;

      descargaLink.href = '/' + data.archivoResultado;
      descargaLink.download = 'resultado.txt';
      descargaLink.textContent = 'Descargar resultado.txt';
      descargaLink.style.display = 'inline-block';
    })
    .catch(err => {
      advertencia.innerHTML = 'Error al subir o procesar el archivo.';
    });
});