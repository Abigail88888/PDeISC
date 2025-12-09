    document.addEventListener('DOMContentLoaded', () => {
      // Arrays base
      const nombres = ['Ana', 'Luis', 'Carlos', 'María'];
      const numeros = [2, 5, 7, 10];
      const personas = [
        { nombre: 'Ana', edad: 28 },
        { nombre: 'Luis', edad: 35 },
        { nombre: 'Carlos', edad: 22 }
      ];

      // Elementos DOM
      const lista = document.getElementById('lista');
      const mensaje = document.getElementById('mensaje');

      const mensajeNombres = document.getElementById('mensajeNombres');
      const mensajeNumeros = document.getElementById('mensajeNumeros');
      const mensajePersonas = document.getElementById('mensajePersonas');

      const btnSaludarNombres = document.getElementById('btnSaludarNombres');
      const btnDoblarNumeros = document.getElementById('btnDoblarNumeros');
      const btnMostrarPersonas = document.getElementById('btnMostrarPersonas');

      // Mostrar arrays base
      function cargarLista() {
        lista.innerHTML = `
          <li><strong>Nombres:</strong> ${nombres.join(', ')}</li>
          <li><strong>Números:</strong> ${numeros.join(', ')}</li>
          <li><strong>Personas:</strong> ${personas.map(p => `${p.nombre} (${p.edad} años)`).join(', ')}</li>
        `;
      }

      // Saludar nombres
      btnSaludarNombres.addEventListener('click', () => {
        let saludos = [];
        nombres.forEach(nombre => {
          saludos.push(`Hola, ${nombre}!`);
        });
        mensajeNombres.textContent = saludos.join(' ');
      });

      // Doblar números
      btnDoblarNumeros.addEventListener('click', () => {
        let dobles = [];
        numeros.forEach(num => {
          dobles.push(num * 2);
        });
        mensajeNumeros.textContent = `Números al doble: ${dobles.join(', ')}`;
      });

      // Mostrar personas nombre y edad
      btnMostrarPersonas.addEventListener('click', () => {
        let listaPersonas = [];
        personas.forEach(p => {
          listaPersonas.push(`${p.nombre} tiene ${p.edad} años`);
        });
        mensajePersonas.textContent = listaPersonas.join(' | ');
      });

      cargarLista(); // Mostrar estado inicial
    });