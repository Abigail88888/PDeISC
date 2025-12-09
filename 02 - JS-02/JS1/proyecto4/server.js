  import express from 'express';
  import path from 'path';
  import { fileURLToPath } from 'url';

  const app = express();
  const port = 3000;

  // Datos iniciales para shift()
  const numeros = [10, 20, 30, 40];
  const mensajes = ["Hola Ana", "estoy enamorado", "tirame un consejo"];
  const clientes = ["Cliente 1", "Cliente 2", "Cliente 3"];

  // Necesario para __dirname en ES Modules
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Middleware para JSON y archivos estáticos
  app.use(express.json());
  app.use(express.static(path.join(__dirname, 'public')));

  // Ruta raíz
  app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
  });

  app.post('/guardar', (req, res) => {
    const { nuevoNumero, nuevoMensaje, nuevoCliente } = req.body;

    if (nuevoNumero !== undefined && !isNaN(nuevoNumero)) {
      numeros.push(Number(nuevoNumero));
    }

    if (nuevoMensaje) {
      mensajes.push(nuevoMensaje.trim());
    }

    if (nuevoCliente) {
      clientes.push(nuevoCliente.trim());
    }

    res.json({ mensaje: 'Datos guardados correctamente.' });
  });

  app.get('/datos', (_req, res) => {
    res.json({ numeros, mensajes, clientes });
  });

  // Iniciar servidor
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });