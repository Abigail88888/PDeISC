const numeros = [];

function agregarNumero() {
  const numeroInput = document.getElementById('numeroInput').value;
  const listaNumeros = document.getElementById('listaNumeros');
  const resultadoSuma = document.getElementById('resultadoSuma');

  if (numeroInput === "") {
    resultadoSuma.textContent = "Por favor, ingresa un número.";
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

  // Sumar los números usando reduce()
  const sumaTotal = numeros.reduce((acumulador, num) => acumulador + num, 0);
  resultadoSuma.textContent = `Suma total: ${sumaTotal}`;
}