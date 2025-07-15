    // Revisa si el tipo de dato es string
    export function getTipoNombre(tipo) {
      if (typeof tipo === "string" && isNaN(parseInt(tipo))) {
        return tipo;
      }
      switch (parseInt(tipo)) {
        case 1:
          return "Felino";
        case 2:
          return "Ave";
        case 3:
          return "Reptil";
        default:
          return "Otro";
      }
    }

    // b) Contar animales en jaula 5 con peso < 3kg
    export function contarJaula5Livianos(animales) {
      return animales.filter(a => a.JaulaNumero === 5 && a.peso < 3).length;
    }

    // c) Contar felinos entre jaulas 2 y 5
    export function contarFelinosEntreJaulas(animales) {
      return animales.filter(
        a => a.IdTypeAnimal === 1 && a.JaulaNumero >= 2 && a.JaulaNumero <= 5
      ).length;
    }

    // d) Buscar animal en jaula 4 con peso < 120
    export function buscarJaula4(animales) {
      return animales.find(a => a.JaulaNumero === 4 && a.peso < 120);
    }

    // Genera el HTML de la tabla de animales
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