// Creamos el servidor http y le agregamos el file system y los demas import para los 3 modulos anteriores

  import { createServer } from 'node:http';
  import fs from 'node:fs';
  import { obtenerHora, obtenerFecha, obtenerTimestamp } from './ejercicio1(m1).js';
  import { mostrarVocales } from './ejercicio1(m2).js';
  import { convertirARomano } from './ejercicio1(m3).js';

// Variables para probar los modulos
  const textoEjemplo = "Hicimos la página de AyudaBahía";
  const numeroEjemplo = 45;

// Módulos
  const hora = obtenerHora();
  const fecha = obtenerFecha();
  const timestamp = obtenerTimestamp();
  const vocales = mostrarVocales(textoEjemplo);
  const romano = convertirARomano(numeroEjemplo);

// el html
  const mostrarHtml = `
    <html lang="es">
    <!DOCTYPE html>
        <head>
          <meta charset="UTF-8">
          <title>Servidor</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #f3f4f6;
              color: #333;
              padding: 40px;
              line-height: 1.6;
              }
              h1 {
              color: #1f2937;
              font-size: 22px;
              }
              p {
              margin: 8px 0 20px;
              font-size: 18px;
              }
          </style>
        </head>
        <body>
          <h1>Fecha actual</h1>
          <p>` + fecha + `</p>

          <h1>Hora actual</h1>
          <p>` + hora + `</p>

          <h1>Tiempo en milisegundos</h1>
          <p>` + timestamp + `</p>

          <h1>Texto ingresado</h1>
          <p>` + textoEjemplo + `</p>

          <h1>Vocales del texto</h1>
          <p>` + vocales + `</p>

          <h1>Número convertido a romano</h1>
          <p>Número original: ` + numeroEjemplo + `</p>
          <p>Conversión a romano: ` + romano + `</p>
      </body>
    </html>
  `;

//Creamos archivo HTML
  fs.writeFileSync('index.html', mostrarHtml);

// servidor y especificamos text/html
  const server = createServer((req, res) => {
    const data = fs.readFileSync('index.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
// starts a simple http server locally on port 3000
  server.listen(3000, '127.0.0.1', () => {
    console.log('Servidor escuchando en http://127.0.0.1:3000');
  });