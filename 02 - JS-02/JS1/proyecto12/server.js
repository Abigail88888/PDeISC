    import express from 'express';
    import path from 'path';
    import { fileURLToPath } from 'url';

    const app = express();
    const port = 3000;

    // __dirname para ESModules
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Middleware
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.json());

    app.get('/', (_req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
    });

    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });