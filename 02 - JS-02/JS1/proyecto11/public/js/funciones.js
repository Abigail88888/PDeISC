const numeros = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

function filtrarNumeros() {
  const limiteInput = document.getElementById('limiteInput').value;
  const resultado = document.getElementById('resultado');

  if (limiteInput === "") {
    resultado.textContent = "Por favor, ingresa un límite.";
    return;
  }

  const limite = parseInt(limiteInput);
  const numerosFiltrados = numeros.filter(num => num > limite);

  resultado.textContent = `Números mayores a ${limite}: ${numerosFiltrados.join(', ')}`;
}