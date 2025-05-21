const numeros = [];

function agregarNumero() {
  const numeroInput = document.getElementById('numeroInput').value;
  const listaNumeros = document.getElementById('listaNumeros');
  const numerosFiltrados = document.getElementById('numerosFiltrados');

  if (numeroInput === "") {
    numerosFiltrados.textContent = "Por favor, ingresa un número.";
    return;
  }

  const numero = parseInt(numeroInput);
  numeros.push(numero);

  // Mostrar los números ingresados
  listaNumeros.innerHTML = "";
  numeros.forEach(numero => {
    const li = document.createElement('li');
    li.textContent = numero;
    listaNumeros.appendChild(li);
  });

  // Filtrar números mayores a 10
  const numerosFiltradosArray = numeros.filter(num => num > 10);
  numerosFiltrados.textContent = `Números mayores a 10: ${numerosFiltradosArray.join(", ")}`;
}