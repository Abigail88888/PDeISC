import { CZooAnimal } from './clasezoologico.js';
import {
  contarJaula5Livianos,
  contarFelinosEntreJaulas,
  buscarJaula4,
  generarTabla
} from './funciones.js';

const animales = JSON.parse(localStorage.getItem('zoo')) || [];

const form = document.getElementById('animalForm');
const tipoSelect = document.getElementById('tipo');
const otroTipoInput = document.getElementById('otroTipo');
const otroTipoContainer = document.getElementById('otroTipoContainer');
const mensajes = document.getElementById('mensajes');

// ✅ Mostrar mensaje con estilo
function mostrarMensaje(texto, tipo = 'info') {
  mensajes.innerHTML = `<p class="${tipo}">${texto}</p>`;
  mensajes.scrollIntoView({ behavior: 'smooth', block: 'center' });
  setTimeout(() => (mensajes.innerHTML = ''), 6000);
}

// ✅ Mostrar campo si eligen "Otro"
tipoSelect.addEventListener('change', () => {
  if (tipoSelect.value === 'otro') {
    otroTipoContainer.style.display = 'block';
    otroTipoInput.required = true;
  } else {
    otroTipoContainer.style.display = 'none';
    otroTipoInput.required = false;
  }
});

// ✅ Guardar animal
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Marcar campos como tocados
  const campos = form.querySelectorAll('input, select');
  campos.forEach(campo => campo.classList.add('user-touched'));

  const id = parseInt(document.getElementById('id').value);
  const nombre = document.getElementById('nombre').value.trim();
  const jaula = parseInt(document.getElementById('jaula').value);
  let tipo = tipoSelect.value;
  const peso = parseFloat(document.getElementById('peso').value);

  if ([id, jaula, peso].some(v => isNaN(v) || v <= 0)) {
    mostrarMensaje('ID, Jaula y Peso deben ser números válidos y mayores a 0.', 'error');
    return;
  }

  if (!nombre || nombre.length < 2 || !/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(nombre)) {
    mostrarMensaje('El nombre debe tener al menos 2 letras y solo letras.', 'error');
    return;
  }

  if (tipo === 'otro') {
    const otro = otroTipoInput.value.trim();
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(otro)) {
      mostrarMensaje('Tipo inválido. Solo letras.', 'error');
      return;
    }
    tipo = otro;
  } else {
    tipo = parseInt(tipo);
  }

  if (animales.some(a => a.IdAnimal === id)) {
    mostrarMensaje('El ID ya existe.', 'error');
    return;
  }

  // Guardamos un objeto plano, no instancia
const animal = {
  IdAnimal: id,
  nombre,
  JaulaNumero: jaula,
  IdTypeAnimal: tipo,
  peso
};

animales.push(animal);

  localStorage.setItem('zoo', JSON.stringify(animales));

  form.reset();
  otroTipoContainer.style.display = 'none';
  mostrarMensaje(`Animal '${nombre}' guardado correctamente.`, 'success');

  // Reset validaciones visuales
  const inputs = form.querySelectorAll('input, select');
  inputs.forEach(i => {
    i.classList.remove('user-touched');
    i.classList.remove('invalid');
    i.style.outline = '';
  });
});

document.getElementById('mostrarBtn').addEventListener('click', () => {
  window.location.assign('./resultados.html');
});
