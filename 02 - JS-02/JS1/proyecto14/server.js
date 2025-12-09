    const express = require('express');
    const path = require('path');

    const app = express();
    const PORT = 3000;

    // Arrays originales
    let letrasOriginal = ['A', 'B', 'C', 'D'];
    let numerosOriginal = [1, 2, 3, 4, 5];
    let textoInvertido = '';

    // Copias editables
    let letras = [...letrasOriginal];
    let numeros = [...numerosOriginal];

    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'public')));
    app.get('/', (_req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
    });

    app.get('/datos', (_req, res) => {
      res.json({ letras, numeros, textoInvertido });
    });

    app.post('/invertir-letras', (_req, res) => {
      letras.reverse();
      res.json({ letras, numeros, textoInvertido });
    });

    app.post('/invertir-numeros', (_req, res) => {
      numeros.reverse();
      res.json({ letras, numeros, textoInvertido });
    });

    app.post('/invertir-texto', (req, res) => {
      const { texto } = req.body;
      textoInvertido = texto.split('').reverse().join('');
      res.json({ letras, numeros, textoInvertido });
    });

    app.post('/reiniciar', (_req, res) => {
      letras = [...letrasOriginal];
      numeros = [...numerosOriginal];
      textoInvertido = '';
      res.json({ letras, numeros, textoInvertido });
    });

    app.listen(PORT, () => {
      console.log(`Servidor activo en http://localhost:${PORT}`);
    });