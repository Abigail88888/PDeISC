    // Arrays originales
    let numerosOriginal = [2, 4, 6, 8, 10];
    let nombresOriginal = ['ana', 'luis', 'mario'];
    let preciosOriginal = [100, 250, 400];

    // Arrays actuales (pueden ser modificados)
    let numeros = [...numerosOriginal];
    let nombres = [...nombresOriginal];
    let precios = [...preciosOriginal];

    // Muestra el estado actual de los arrays
    function mostrarEstado() {
      document.getElementById('arrayNumeros').textContent = 'Números: ' + numeros.join(', ');
      document.getElementById('arrayNombres').textContent = 'Nombres: ' + nombres.join(', ');
      document.getElementById('arrayPrecios').textContent = 'Precios: ' + precios.join(', ');
      document.getElementById('tablaIVA').innerHTML = ''; // limpiar tabla si se reinició
    }

    document.addEventListener('DOMContentLoaded', () => {
      mostrarEstado();

      // Botón: triple de números
      document.getElementById('btnTriple').addEventListener('click', () => {
        numeros = numeros.map(n => n * 3);
        document.getElementById('msgTriple').textContent = 'Multiplicados correctamente.';
        mostrarEstado();
      });

      // Botón: nombres en mayúsculas
      document.getElementById('btnMayus').addEventListener('click', () => {
        nombres = nombres.map(n => n.toUpperCase());
        document.getElementById('msgMayus').textContent = 'Cambiado correctamente.';
        mostrarEstado();
      });

      // Botón: aplicar IVA
      document.getElementById('btnIva').addEventListener('click', () => {
        const tabla = document.getElementById('tablaIVA');
        tabla.innerHTML = `
          <table>
            <thead>
              <tr><th>Precio</th><th>IVA 21%</th><th>Precio Final</th></tr>
            </thead>
            <tbody>
              ${precios.map(p => {
                const iva = (p * 0.21).toFixed(2);
                const total = (p * 1.21).toFixed(2);
                return `<tr><td>$${p}</td><td>$${iva}</td><td>$${total}</td></tr>`;
              }).join('')}
            </tbody>
          </table>
        `;
        document.getElementById('msgIva').textContent = 'Tabla generada con IVA.';
      });

      // Botón: reiniciar arrays
      document.getElementById('form').addEventListener('submit', (e) => {
        e.preventDefault();
        numeros = [...numerosOriginal];
        nombres = [...nombresOriginal];
        precios = [...preciosOriginal];

        document.getElementById('msgTriple').textContent = '';
        document.getElementById('msgMayus').textContent = '';
        document.getElementById('msgIva').textContent = '';
        document.getElementById('mensaje').textContent = 'Arrays reiniciados.';
        mostrarEstado();
      });
    });
