    import express from 'express';
    import path from 'path';
    import { fileURLToPath } from 'url';

    const app = express();
    const port = 3000;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'public')));

    // Ruta raíz
    app.get('/', (_req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
    });

    // Inicia el servidor
    app.listen(port, () => {
      console.log(`Servidor funcionando en http://localhost:${port}`);
    });