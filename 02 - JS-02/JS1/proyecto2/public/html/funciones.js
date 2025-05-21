const animales = [];
const compras = [];
let arrayParaVaciar = ["uno", "dos", "tres", "cuatro"];

const listaAnimales = document.getElementById("listaAnimales");
const listaCompras = document.getElementById("listaCompras");
const arrayPop = document.getElementById("arrayPop");

function agregarAnimal() {
  const input = document.getElementById("animalInput");
  if (input.value.trim()) {
    animales.push(input.value.trim());
    input.value = "";
    actualizarLista(animales, listaAnimales);
  }
}

function eliminarAnimal() {
  const eliminado = animales.pop();
  actualizarLista(animales, listaAnimales);
  document.getElementById("animalEliminado").textContent = eliminado
    ? `Eliminado: ${eliminado}`
    : "No hay más animales para eliminar.";
}

function agregarProducto() {
  const input = document.getElementById("productoInput");
  if (input.value.trim()) {
    compras.push(input.value.trim());
    input.value = "";
    actualizarLista(compras, listaCompras);
  }
}

function quitarUltimoProducto() {
  const eliminado = compras.pop();
  actualizarLista(compras, listaCompras);
  document.getElementById("productoEliminado").textContent = eliminado
    ? `Producto eliminado: ${eliminado}`
    : "No hay productos para eliminar.";
}

function vaciarArray() {
  while (arrayParaVaciar.length > 0) {
    arrayParaVaciar.pop();
  }
  actualizarLista(arrayParaVaciar, arrayPop);
}

function actualizarLista(array, elementoHTML) {
  elementoHTML.innerHTML = "";
  array.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    elementoHTML.appendChild(li);
  });
}

// Mostrar lista inicial para vaciar
actualizarLista(arrayParaVaciar, arrayPop);