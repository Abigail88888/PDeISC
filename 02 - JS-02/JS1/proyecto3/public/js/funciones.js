let animales = [];
let productos = [];

function agregarAnimal() {
  const animalInput = document.getElementById('animalShiftInput');
  animales.push(animalInput.value);
  animalInput.value = '';
  mostrarLista(animales, 'listaAnimalesShift');
}

function eliminarPrimerAnimal() {
  animales.shift();
  mostrarLista(animales, 'listaAnimalesShift');
}

function agregarProducto() {
  const productoInput = document.getElementById('productoShiftInput');
  productos.push(productoInput.value);
  productoInput.value = '';
  mostrarLista(productos, 'listaProductosShift');
}

function eliminarPrimerProducto() {
  productos.shift();
  mostrarLista(productos, 'listaProductosShift');
}

function vaciarLista() {
  animales = [];
  productos = [];
  mostrarLista(animales, 'listaVaciadaShift');
  mostrarLista(productos, 'listaVaciadaShift');
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