    // server.js (versión con imports)
    import express from 'express';
    import fs from 'fs';
    import path from 'path';
    import { fileURLToPath } from 'url';
    import { dirname } from 'path';

    const app = express();
    const PORT = 3000;

    // Necesario para obtener __dirname en ES modules
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'public')));

    // Ruta POST para guardar números en datos.txt
    app.post('/guardar', (req, res) => {
      const { numeros } = req.body;
      if (!Array.isArray(numeros) || numeros.length < 10 || numeros.length > 20) {
        return res.status(400).send('Debe ingresar entre 10 y 20 números');
      }

      const contenido = numeros.join('\n');
      fs.writeFile('datos.txt', contenido, err => {
        if (err) return res.status(500).send('Error al guardar');
        res.send('Archivo guardado correctamente como datos.txt');
      });
    });

    // Ruta POST para procesar contenido de un archivo txt
    app.post('/procesar', (req, res) => {
      const { texto } = req.body;
      if (!texto) return res.status(400).send('Archivo vacío');

      // Separar líneas y convertir a números
      const lineas = texto.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
      const numeros = lineas.map(Number).filter(n => !isNaN(n));

      // Filtrar números útiles (mismo primer y último dígito)
      const validos = numeros.filter(n => {
            const str = n.toString();
        return str[0] === str[str.length - 1];
      });

      const utiles = validos.length;
      const total = numeros.length;
      const noUtiles = total - utiles;
      const porcentaje = total > 0 ? ((utiles / total) * 100).toFixed(2) : 0;

      // Guardar resultado en resultados.txt
      const resultado = `Números válidos:\n${validos.join(', ')}\n\nÚtiles: ${utiles}\nNo útiles: ${noUtiles}\nPorcentaje útil: ${porcentaje}%`;

      fs.writeFile('resultados.txt', resultado, err => {
        if (err) return res.status(500).send('Error al guardar resultado');
        res.send({ validos, utiles, noUtiles, porcentaje });
      });
    });

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });