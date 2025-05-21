let animales = [];
let productos = [];

function agregarAnimal() {
  const animalInput = document.getElementById('animalUnshiftInput');
  animales.unshift(animalInput.value);
  animalInput.value = '';
  mostrarLista(animales, 'listaAnimalesUnshift');
}

function agregarProducto() {
  const productoInput = document.getElementById('productoUnshiftInput');
  productos.unshift(productoInput.value);
  productoInput.value = '';
  mostrarLista(productos, 'listaProductosUnshift');
}

function vaciarLista() {
  animales = [];
  productos = [];
  mostrarLista(animales, 'listaVaciadaUnshift');
  mostrarLista(productos, 'listaVaciadaUnshift');
}

function mostrarLista(lista, id) {
  const ul = document.getElementById(id);
  ul.innerHTML = '';
  lista.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });
}