    import express from 'express';
    import path from 'path';
    import { fileURLToPath } from 'url';

    const app = express();
    const PORT = 3000;

    // Para __dirname en ES Modules
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Arrays base
    let usuarios = ['admin', 'editor', 'guest'];
    let colores = ['rojo', 'azul', 'verde', 'amarillo'];
    let numeros = [5, 10, 15];

    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'public')));

    // Ruta raíz
    app.get('/', (_req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
    });

    // Ruta para obtener arrays actuales
    app.get('/datos', (_req, res) => {
      res.json({ usuarios, colores, numeros });
    });

    // Ruta para agregar número si no está
    app.post('/agregarNumero', (req, res) => {
      const { numero } = req.body;

      if (typeof numero !== 'number' || numero <= 0 || isNaN(numero)) {
        return res.status(400).json({ error: 'Número inválido' });
      }

      if (numeros.includes(numero)) {
        return res.json({ mensaje: `El número ${numero} ya está en el array.`, numeros });
      }

      numeros.push(numero);
      return res.json({ mensaje: `Número ${numero} agregado correctamente.`, numeros });
    });

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });