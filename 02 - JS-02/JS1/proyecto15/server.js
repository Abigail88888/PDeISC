import express from 'express';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(process.cwd(), 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'views', 'index.html'));
});

// Ruta para decodificar el mensaje
app.get('/decodificar', (req, res) => {
  const inputFile = path.join(process.cwd(), 'SECRETO.IN');
  const outputFile = path.join(process.cwd(), 'SECRETO.OUT');

  // Leer el archivo SECRETO.IN
  fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error leyendo el archivo SECRETO.IN');
    }

    // Decodificar el mensaje
    const mensajeDecodificado = decodificarMensaje(data);

    // Guardar el mensaje decodificado en SECRETO.OUT
    fs.writeFile(outputFile, mensajeDecodificado, (err) => {
      if (err) {
        return res.status(500).send('Error escribiendo en el archivo SECRETO.OUT');
      }

      res.send('Mensaje decodificado correctamente.');
    });
  });
});

// Función para decodificar el mensaje
function decodificarMensaje(mensaje) {
  // Usar una expresión regular para encontrar los trozos entre paréntesis
  return mensaje.replace(/\(([^)]+)\)/g, (match, contenido) => {
    // Invertir el contenido dentro de los paréntesis
    return contenido.split('').reverse().join('');
  });
}

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});