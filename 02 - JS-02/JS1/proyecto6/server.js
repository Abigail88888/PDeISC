    import express from 'express';
    import path from 'path';
    import { fileURLToPath } from 'url';

    const app = express();
    const PORT = 3006;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/', (_req, res) => {
      res.sendFile(path.join(__dirname, 'public' ,'html', 'index.html'));
    });

    app.get('/numeros', (_req, res) => {
      res.json({ numeros });
    });

    app.get('/peliculas', (_req, res) => {
      res.json({ peliculas });
    });

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });