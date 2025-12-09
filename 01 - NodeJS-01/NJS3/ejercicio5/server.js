const express = require("express");
const app = express();
const path = require("path");

// 1) Servir archivos estáticos (public = html, css, js, imágenes)
app.use(express.static(path.join(__dirname, 'public')));

// 2) Ruta principal que manda el index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 3) Ruta para cuando escriben una página que no existe
app.use((req, res) => {
    res.status(404).send('Página no encontrada');
});

// 4) Escuchar en puerto 3000
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
