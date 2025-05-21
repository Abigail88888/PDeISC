document.getElementById('decodificarBtn').addEventListener('click', async () => {
  const response = await fetch('/decodificar');
  
  if (response.ok) {
    document.getElementById('resultado').textContent = 'Mensaje decodificado correctamente.';
  } else {
    document.getElementById('resultado').textContent = 'Error al decodificar el mensaje.';
  }
});