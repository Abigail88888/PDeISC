    // Importamos los archivos necesarios
    import { CZooAnimal } from './clasezoologico.js';
    import { mostrarResultadosDocumentWrite } from './funciones.js';

    // Abrimos el documento
    document.open();

    // Escribimos toda la estructura, incluyendo el <head> con el CSS
    document.write(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Resultados con document.write</title>
      <link rel="stylesheet" href="segundo.css">
    </head>
    <body class="pagina-resultados">
      
    `);

    // Obtenemos los animales del localStorage
    const animalesGuardados = JSON.parse(localStorage.getItem('zoo')) || [];

    const animales = animalesGuardados
      .filter(a => a.IdAnimal && a.nombre && a.JaulaNumero && a.IdTypeAnimal && a.peso)
      .map(a => new CZooAnimal(
        parseInt(a.IdAnimal),
        a.nombre,
        parseInt(a.JaulaNumero),
        isNaN(a.IdTypeAnimal) ? a.IdTypeAnimal : parseInt(a.IdTypeAnimal),
        parseFloat(a.peso)
      ));

    // Escribimos los resultados desde la función
    mostrarResultadosDocumentWrite(animales);

    // Cerramos el <body> y <html>
    document.write(`
    <script type="module" src="mostrar.js"></script>
    </body>
    </html>
    `);

    document.close();