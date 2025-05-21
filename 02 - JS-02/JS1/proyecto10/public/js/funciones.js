const precios = [100, 200, 300, 400, 500];

function incrementarPrecios() {
  const incrementoInput = document.getElementById('incrementoInput').value;
  const resultado = document.getElementById('resultado');

  if (incrementoInput === "") {
    resultado.textContent = "Por favor, ingresa un porcentaje.";
    return;
  }

  const incremento = parseFloat(incrementoInput);
  const preciosIncrementados = precios.map(precio => precio + (precio * (incremento / 100)));

  resultado.textContent = `Precios después del incremento: ${preciosIncrementados.join(', ')}`;
}