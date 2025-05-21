    const express = require('express');
    const path = require('path');

    const app = express();
    const PORT = 3005;

    let letras = ['A', 'B', 'C', 'D', 'E']; // array base para pruebas

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/', (_req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
    });

    // eliminar 2 letras desde posición 1
    app.post('/eliminar', (_req, res) => {
      if (letras.length >= 3) {
        letras.splice(1, 2);
        return res.json({ letras });
     }    else {
        return res.status(400).json({ error: 'No hay suficientes letras para eliminar.' });
      }
    });

    // insertar sin eliminar en la posición 1
    app.post('/insertar', (req, res) => {
      const { letra } = req.body;
      if (!letra || typeof letra !== 'string') {
        return res.status(400).json({ error: 'Letra inválida.' });
      }
      letras.splice(1, 0, letra.toUpperCase());
      return res.json({ letras });
    });

    // para reemplazar desde una posición con nuevas letras
    app.post('/reemplazar', (req, res) => {
      const { pos, nuevas } = req.body;
      const index = parseInt(pos);
      if (isNaN(index) || index < 0 || !Array.isArray(nuevas) || nuevas.length < 1) {
        return res.status(400).json({ error: 'Datos inválidos.' });
      }
      letras.splice(index, nuevas.length, ...nuevas.map(l => l.toUpperCase()));
      return res.json({ letras });
    });

    // array nuevo
    app.get('/letras', (_req, res) => {
      res.json({ letras });
    });

    app.listen(PORT, () => {
      console.log(`Proyecto 5 corriendo en http://localhost:${PORT}`);
    });