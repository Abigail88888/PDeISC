import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

// Configuración de rutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware para leer formularios y archivos públicos
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta raíz: sirve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para guardar números en un archivo .txt
app.post('/guardar', (req, res) => {
  const { numeros } = req.body;

  if (!Array.isArray(numeros)) {
    return res.status(400).send('Datos inválidos');
  }

  const texto = numeros.join('\n');
  fs.writeFile('numeros.txt', texto, (err) => {
    if (err) {
      console.error('Error al guardar:', err);
      return res.status(500).send('Error al guardar');
    }
    res.send('Archivo numeros.txt guardado correctamente');
  });
});

// Configuración para subir archivos .txt
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Ruta para procesar archivo subido
app.post('/subir', upload.single('archivo'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No se envió ningún archivo');
  }

  const contenido = req.file.buffer.toString();
  const lineas = contenido.split(/\r?\n/);
  const numeros = lineas.map(l => l.trim()).filter(l => /^\d+$/.test(l));

  const utiles = [];
  const noUtiles = [];

  for (let n of numeros) {
    if (n[0] === n[n.length - 1]) {
      utiles.push(Number(n));
    } else {
      noUtiles.push(Number(n));
    }
  }

  utiles.sort((a, b) => a - b);
  const total = utiles.length + noUtiles.length;
  const porcentaje = total === 0 ? 0 : (utiles.length / total * 100).toFixed(2);

  const resultado = `
Números útiles: ${utiles.join(', ')}
Cantidad útiles: ${utiles.length}
Cantidad no útiles: ${noUtiles.length}
Porcentaje útiles: ${porcentaje}%
`;

  fs.writeFile('resultado.txt', resultado.trim(), (err) => {
    if (err) {
      console.error('Error al guardar resultado:', err);
      return res.status(500).send('Error al guardar resultado');
    }
    res.send({
      utiles,
      porcentaje,
      utilesCantidad: utiles.length,
      noUtilesCantidad: noUtiles.length,
      mensaje: 'Resultado procesado y guardado correctamente en resultado.txt'
    });
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});