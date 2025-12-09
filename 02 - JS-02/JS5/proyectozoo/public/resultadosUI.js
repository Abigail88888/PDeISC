    import { CZooAnimal } from './clasezoologico.js';
    import {
      contarJaula5Livianos,
      contarFelinosEntreJaulas,
      buscarJaula4,
      generarTabla
    } from './funciones.js';

    document.addEventListener('DOMContentLoaded', () => {
      const animalesGuardados = JSON.parse(localStorage.getItem('zoo')) || [];

      // Recreamos instancias de CZooAnimal 
      const animales = animalesGuardados
        .filter(a => a.IdAnimal && a.nombre && a.JaulaNumero && a.IdTypeAnimal && a.peso)
        .map(a => new CZooAnimal(
          parseInt(a.IdAnimal),
          a.nombre,
          parseInt(a.JaulaNumero),
          isNaN(a.IdTypeAnimal) ? a.IdTypeAnimal : parseInt(a.IdTypeAnimal),
          parseFloat(a.peso)
        ));

      // Obtenemos los elementos donde se mostrarán los resultados
      const resultadoBElement = document.getElementById('resultadoB');
      const resultadoCElement = document.getElementById('resultadoC');
      const resultadoDElement = document.getElementById('resultadoD');
      const tablaAnimalesElement = document.getElementById('tablaAnimales');

      // Calculamos los resultados
      const b = contarJaula5Livianos(animales);
      const c = contarFelinosEntreJaulas(animales);
      const d = buscarJaula4(animales);

      // Inyectamos los resultados en el HTML
      resultadoBElement.textContent = b;
      resultadoCElement.textContent = c;
      resultadoDElement.textContent = d ? d.nombre : 'Ninguno';
      tablaAnimalesElement.innerHTML = generarTabla(animales);
    });