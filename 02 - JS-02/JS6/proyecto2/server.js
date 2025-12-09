        const express = require('express');
        const path = require('path');
        const app = express();
        const PORT = 3001;

        // Para que Express entienda JSON en el cuerpo de las peticiones
        app.use(express.json());
        // Para servir archivos estáticos 
        app.use(express.static(path.join(__dirname, 'public')));

        // Ruta para simular el envío de datos con el método POST
        app.post('/enviar-datos', (req, res) => {
            const { nombre, email } = req.body; // Capturamos los datos que llegan

            // Simulamos una respuesta de la API, devolviendo un ID trucho
            const nuevoId = Math.floor(Math.random() * 1000) + 1; 

            // Log para ver qué llegó al servidor, incluyendo el ID simulado
            // ¡Modificación aquí para mostrar el ID junto con nombre y email!
            console.log('Datos recibidos en el servidor:', { id: nuevoId, nombre: nombre, email: email });
            
            // Devolvemos el ID y los datos
            res.status(200).json({ 
                id: nuevoId,
                datosRecibidos: { nombre, email }
            });
        });

        // Ruta principal 
        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'public', 'index.html'));
        });

        // Iniciamos el servidor
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });