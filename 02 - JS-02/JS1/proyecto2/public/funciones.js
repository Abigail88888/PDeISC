document.addEventListener('DOMContentLoaded', () => {
  const animales = [];
  const compras = [];

  const listaAnimales = document.getElementById('listaAnimales');
  const listaCompras = document.getElementById('listaCompras');
  const arrayVaciar = document.getElementById('arrayVaciar');

  const animalInput = document.getElementById('animalInput');
  const productoInput = document.getElementById('productoInput');

  const animalEliminado = document.getElementById('animalEliminado');
  const productoEliminado = document.getElementById('productoEliminado');

  // === Animales ===
  document.getElementById('btnAgregarAnimal').addEventListener('click', () => {
    const valor = animalInput.value.trim();
    if (valor) {
      animales.push(valor);
      animalInput.value = '';
      renderAnimales();
    }
  });

  document.getElementById('btnEliminarAnimal').addEventListener('click', () => {
    const eliminado = animales.pop();
    animalEliminado.textContent = eliminado ? `Eliminado: ${eliminado}` : 'No hay más animales.';
    renderAnimales();
  });

  function renderAnimales() {
    listaAnimales.innerHTML = '';
    animales.forEach(a => {
      const li = document.createElement('li');
      li.textContent = a;
      listaAnimales.appendChild(li);
    });
  }

  // === Compras ===
  document.getElementById('btnAgregarProducto').addEventListener('click', () => {
    const valor = productoInput.value.trim();
    if (valor) {
      compras.push(valor);
      productoInput.value = '';
      renderCompras();
    }
  });

  document.getElementById('btnEliminarProducto').addEventListener('click', () => {
    const eliminado = compras.pop();
    productoEliminado.textContent = eliminado ? `Eliminado: ${eliminado}` : 'No hay más productos.';
    renderCompras();
  });

  function renderCompras() {
    listaCompras.innerHTML = '';
    compras.forEach(p => {
      const li = document.createElement('li');
      li.textContent = p;
      listaCompras.appendChild(li);
    });
  }

  // === Vaciar con while + pop ===
  document.getElementById('btnVaciar').addEventListener('click', () => {
    let vaciar = ['A', 'B', 'C', 'D', 'E'];
    let resultado = [];

    while (vaciar.length > 0) {
      resultado.push(vaciar.pop());
    }

    arrayVaciar.innerHTML = resultado.map(item => `<li>${item}</li>`).join('');
  });
});