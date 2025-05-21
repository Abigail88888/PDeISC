const numeros = [10, 20, 30, 40, 50];

function verificarNumero() {
  const numeroInput = document.getElementById('numberInput').value;
  const resultado = document.getElementById('resultado');
  
  if (numeroInput === "") {
    resultado.textContent = "Por favor, ingresa un número.";
    return;
  }

  const encontrado = numeros.some(num => num === parseInt(numeroInput));
  
  if (encontrado) {
    resultado.textContent = `El número ${numeroInput} está en el array.`;
  } else {
    resultado.textContent = `El número ${numeroInput} no está en el array.`;
  }
}