const mensaje = document.getElementById('mensaje');

// Evento click
document.getElementById('btnClick').addEventListener('click', () => {
  mensaje.textContent = 'Evento: click detectado';
});

// Evento doble click
document.getElementById('btnDblClick').addEventListener('dblclick', () => {
  mensaje.textContent = 'Evento: doble click detectado';
});

// Evento keydown (al presionar tecla)
document.getElementById('btnKeydown').addEventListener('click', () => {
  mensaje.textContent = 'Presiona una tecla';
  document.addEventListener('keydown', detectarTecla, { once: true });
});

//Esto es re importante, funcion para detectar la tecla que estamos tocando
function detectarTecla(e) {
  mensaje.textContent = `Tecla presionada: ${e.key}`;
}

// Evento dragover
document.getElementById('btnDragover').addEventListener('dragover', (e) => {
  e.preventDefault();
  mensaje.textContent = 'Evento: dragover activo';
});

// Evento load
function eventoLoad() {
  console.log('La página ha sido cargada');
  document.getElementById('btnLoad').textContent = 'Página cargada ✔';
}