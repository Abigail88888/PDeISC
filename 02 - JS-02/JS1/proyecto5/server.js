    const express = require('express');
    const path = require('path');

    const app = express();
    const PORT = 3000;

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/', (_req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
    });

    // eliminar 2 letras desde posición 1
    app.post('/eliminar', (req, res) => {
      const { letras } = req.body;
      if (!Array.isArray(letras) || letras.length < 3) {
        return res.status(400).json({ error: 'No hay suficientes letras para eliminar.' });
      }
      letras.splice(1, 2);
      res.json({ letras });
    });

    // insertar sin eliminar en la posición 1
    app.post('/insertar', (req, res) => {
      const { letra, letras } = req.body;
      if (!letra || typeof letra !== 'string' || !Array.isArray(letras)) {
        return res.status(400).json({ error: 'Datos inválidos.' });
      }
      letras.splice(1, 0, letra.toUpperCase());
      res.json({ letras });
    });

    // reemplazar desde una posición
    app.post('/reemplazar', (req, res) => {
      const { pos, nuevas, letras } = req.body;
      const index = parseInt(pos);
      if (isNaN(index) || index < 0 || !Array.isArray(nuevas) || !Array.isArray(letras)) {
        return res.status(400).json({ error: 'Datos inválidos.' });
      }
      letras.splice(index, nuevas.length, ...nuevas.map(l => l.toUpperCase()));
      res.json({ letras });
    });

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });