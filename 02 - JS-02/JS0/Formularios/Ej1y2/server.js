const express = require('express');
const path = require('path');
const app = express();

const Personas = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Para leer JSON del fetch
app.use(express.static(path.join(__dirname, 'public')));

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  const persona = { username, password };
  Personas.push(persona);
  res.json({ message: "Agregado correctamente", personas: Personas });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/Personas', (req, res) => {
  res.json(Personas);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});