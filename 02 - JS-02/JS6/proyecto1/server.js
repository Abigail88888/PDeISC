    const express = require('express');
    const path = require('path');
    const app = express();
    const PORT = 3010;

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'public')));

    // Ruta raíz: muestra el index
    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
      });