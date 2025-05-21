const productos = [
  { id: 1, nombre: "Pan", precio: 100 },
  { id: 2, nombre: "Leche", precio: 250 },
  { id: 3, nombre: "Queso", precio: 500 },
  { id: 4, nombre: "Arroz", precio: 300 },
];

const lista = document.getElementById("listaProductos");
productos.forEach(p => {
  const li = document.createElement("li");
  li.textContent = `${p.nombre} - $${p.precio}`;
  lista.appendChild(li);
});

document.getElementById("formFind").addEventListener("submit", function (e) {
  e.preventDefault();
  const nombreBuscado = document.getElementById("nombreProducto").value.toLowerCase();
  const resultado = productos.find(p => p.nombre.toLowerCase() === nombreBuscado);

  const resultadoTexto = document.getElementById("resultadoBusqueda");
  if (resultado) {
    resultadoTexto.textContent = `Producto encontrado: ${resultado.nombre} - $${resultado.precio}`;
  } else {
    resultadoTexto.textContent = "Producto no encontrado.";
  }
});