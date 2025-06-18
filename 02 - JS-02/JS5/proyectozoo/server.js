    import express from 'express';
    import path from 'path';
    import { fileURLToPath } from 'url';

    const app = express();
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Servir archivos estáticos desde /public
    app.use(express.static(path.join(__dirname, 'public')));

    // Levantar servidor en puerto 3000
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Servidor funcionando en http://localhost:${PORT}`);
    });