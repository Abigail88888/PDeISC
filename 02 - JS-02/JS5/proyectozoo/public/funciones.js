        // Retorna nombre legible del tipo
        export function getTipoNombre(tipo) {
          if (typeof tipo === "string" && isNaN(parseInt(tipo))) {
            return tipo;
          }
          switch (parseInt(tipo)) {
            case 1: return "Felino";
            case 2: return "Ave";
            case 3: return "Reptil";
            default: return "Otro";
          }
        }

        // b) Contar animales en jaula 5 con peso < 3kg
        export function contarJaula5Livianos(animales) {
          return animales.filter(a => a.JaulaNumero === 5 && a.peso < 3).length;
        }

        // c) Contar felinos entre jaulas 2 y 5
        export function contarFelinosEntreJaulas(animales) {
          return animales.filter(a =>
            a.IdTypeAnimal === 1 &&
            a.JaulaNumero >= 2 &&
            a.JaulaNumero <= 5
          ).length;
        }

        // d) Buscar animal en jaula 4 con peso < 120
        export function buscarJaula4(animales) {
          return animales.find(a => a.JaulaNumero === 4 && a.peso < 120);
        }

        // Tabla de animales (también usada para document.write)
        export function generarTabla(animales) {
          let tabla = `
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Jaula</th>
                  <th>Tipo</th>
                  <th>Peso</th>
                </tr>
              </thead>
              <tbody>
          `;

          for (const a of animales) {
            tabla += `
              <tr>
                <td>${a.IdAnimal}</td>
                <td>${a.nombre}</td>
                <td>${a.JaulaNumero}</td>
                <td>${getTipoNombre(a.IdTypeAnimal)}</td>
                <td>${a.peso} kg</td>
              </tr>
            `;
          }

          tabla += `</tbody></table>`;
          return tabla;
    }

      // Mostrar con document.write (extra opcional para e)

      export function mostrarResultadosDocumentWrite(animales) {
        const b = contarJaula5Livianos(animales);
        const c = contarFelinosEntreJaulas(animales);
        const d = buscarJaula4(animales);

        document.write(`
          <!DOCTYPE html>
          <html lang="es">
          <head>
            <meta charset="UTF-8">
            <title>Resultados Zoológico</title>
            <link rel="stylesheet" href="segundo.css">
          </head>
          <body class="pagina-resultados">
            <h1>Resultados del Zoológico</h1>
            <h3>b) Animales en Jaula 5 con peso menor a 3kg:</h3>
            <p>${b}</p>
            <h3>c) Felinos en Jaulas 2 a 5:</h3>
            <p>${c}</p>
            <h3>d) Animal en Jaula 4 con peso menor a 120kg:</h3>
            <p>${d ? d.nombre : 'Ninguno'}</p>
            <h3>Listado completo de animales:</h3>
            <div class="tabla-resultados">
              ${generarTabla(animales)}
            </div>

            <p><button onclick="window.location.href='index.html'">Volver al formulario</button></p>

    </body>
          </html>
        `);
      }