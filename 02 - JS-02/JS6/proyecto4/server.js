        const express = require('express');
        const path = require('path'); 
        const app = express();
        const PORT = 3003; 

        // la API
        const alumnosTec5 = [
            { 
                id: 1, 
                nombre: 'Abigail', 
                apellidos: 'Di Nucci', 
                curso: '7mo', 
                division: '2da', 
                ciclo: 'Superior', 
                especialidad: 'Informática', 
                materiasAdeudadas: []
            },
            { 
                id: 2, 
                nombre: 'Joaquin', 
                apellidos: 'Rodríguez', 
                curso: '5to', 
                division: '5ta', 
                ciclo: 'Superior', 
                especialidad: 'Electrónica', 
                materiasAdeudadas: [
                    { nombre: 'Sistemas Digitales II', cantidad: 1 },
                    { nombre: 'Fisica', cantidad: 1 }
                ]
            },
            { 
                id: 3, 
                nombre: 'Camila', 
                apellidos: 'Fernández', 
                curso: '4to', 
                division: '4ta', 
                ciclo: 'Superior', 
                especialidad: 'Construcciones', 
                materiasAdeudadas: [] 
            },
            { 
                id: 4, 
                nombre: 'Pedro', 
                apellidos: 'Martínez', 
                curso: '3ro', 
                division: '2da', 
                ciclo: 'Básico', 
                especialidad: 'Informática', 
                materiasAdeudadas: [
                    { nombre: 'Historia', cantidad: 1 }
                ]
            }
        ];

        // Servimos archivos estaticos desde public
        app.use(express.static(path.join(__dirname, 'public')));

        // Accedemos a la api de los alumnos
        app.get('/api/alumnostec5', (req, res) => {
            res.json(alumnosTec5); // Devuelve el JSON de alumnos
        });

        // Ruta principal que sirve el HTML
        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'public', 'index.html'));
        });

        // Iniciar el servidor
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en: http://localhost:${PORT}`);
        });