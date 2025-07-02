    const express = require('express');
    const path = require('path');

    const app = express();
    const PORT = 3000;

    // Arrays iniciales
    let numerosOriginal = [5, 3, 9, 1, 8];
    let palabrasOriginal = ['zorro', 'banana', 'avión', 'foca'];
    let personasOriginal = [
      { nombre: 'Lucas', edad: 30 },
      { nombre: 'Ana', edad: 25 },
      { nombre: 'Luis', edad: 40 }
    ];

    // Copias mutables
    let numeros = [...numerosOriginal];
    let palabras = [...palabrasOriginal];
    let personas = [...personasOriginal];

    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'public')));
    app.get('/', (_req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
    });
    // Mostrar estado actual
    app.get('/datos', (_req, res) => {
      res.json({ numeros, palabras, personas });
    });

    // Ordenar números
    app.post('/ordenar-numeros', (_req, res) => {
      numeros.sort((a, b) => a - b);
      res.json({ numeros, palabras, personas });
    });

    // Ordenar palabras
    app.post('/ordenar-palabras', (_req, res) => {
      palabras.sort();
      res.json({ numeros, palabras, personas });
    });

    // Ordenar por edad
    app.post('/ordenar-edades', (_req, res) => {
      personas.sort((a, b) => a.edad - b.edad);
      res.json({ numeros, palabras, personas });
    });

    // Reiniciar datos
    app.post('/reiniciar', (_req, res) => {
      numeros = [...numerosOriginal];
      palabras = [...palabrasOriginal];
      personas = [...personasOriginal];
      res.json({ numeros, palabras, personas });
    });

    app.listen(PORT, () => {
      console.log(`Servidor activo en http://localhost:${PORT}`);
    });