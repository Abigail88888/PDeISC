const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); 

// el array de personas
let personas = [];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// la ruta para guardar persona
app.post('/guardar', (req, res) => {
  const datos = req.body;

  // validación básica del servidor (solo si falta algo)
  if (!datos.nombre || !datos.apellido || !datos.edad || !datos.mail) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  personas.push(datos);
  res.json({ mensaje: 'Persona registrada correctamente' });
});

// ruta para obtener personas
app.get('/personas', (req, res) => {
  res.json(personas);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});