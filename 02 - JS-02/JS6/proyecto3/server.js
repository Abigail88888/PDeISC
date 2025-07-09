        const express = require('express');
        const path = require('path');
        const app = express();
        const PORT = 3002; 

        // Para servir archivos estáticos
        app.use(express.static(path.join(__dirname, 'public')));

        // Ruta principal para el index.html
        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'public', 'index.html'));
        });

        // Iniciamos el servidor
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });