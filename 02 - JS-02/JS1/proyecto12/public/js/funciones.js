const ventas = [];

function agregarVenta() {
  const ventaInput = document.getElementById('ventaInput').value;
  const totalVentas = document.getElementById('totalVentas');

  if (ventaInput === "") {
    totalVentas.textContent = "Por favor, ingresa un monto de venta.";
    return;
  }

  const venta = parseFloat(ventaInput);
  ventas.push(venta);

  const total = ventas.reduce((acumulado, venta) => acumulado + venta, 0);
  totalVentas.textContent = `Total de ventas: $${total.toFixed(2)}`;
}