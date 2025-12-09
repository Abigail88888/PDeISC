import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

// Necesario para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware para JSON y archivos estáticos
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Arrays para guardar los datos
const colores = []; // empieza vacío 
const tareas = ['sacar la basura', 'limpiar', 'ordenar']; // tareas base
const usuarios = ['marcos', 'lucia', 'tomas', 'ana'];     // usuarios conectados base

// Ruta raíz
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

// POST /guardar - Recibe datos desde el cliente
app.post('/guardar', (req, res) => {
  const { nuevosColores, nuevaTarea, nuevoUsuario } = req.body;

  // Si vienen nuevos colores, los agregamos al principio
  if (Array.isArray(nuevosColores)) {
    colores.unshift(...nuevosColores.map(c => c.trim().toLowerCase()));
  }

  if (nuevaTarea) {
    tareas.unshift(nuevaTarea.trim());
  }

  if (nuevoUsuario) {
    usuarios.unshift(nuevoUsuario.trim());
  }

  res.json({ mensaje: 'Datos guardados correctamente.' });
});

// GET /datos - Envía datos actuales
app.get('/datos', (_req, res) => {
  res.json({ colores, tareas, usuarios });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});