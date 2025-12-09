const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

// Arrays base
const frutas = [];
const amigos = ['Tiziano']; // solo uno como pide la consigna
const numeros = [10, 20, 30];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta raíz: muestra el index
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

// Ruta para guardar datos
app.post('/guardar', (req, res) => {
  const { frutas: frutasNuevas, amigos: nuevosAmigos, numero } = req.body;

  // Agregar frutas solo si son letras (minúsculas o mayúsculas)
  if (Array.isArray(frutasNuevas)) {
    frutasNuevas.forEach(fruta => {
      const f = fruta.trim().toLowerCase();
      if (/^[a-záéíóúñü\s]+$/i.test(f)) {
        frutas.push(f);
      }
    });
  }

  // Agregar amigos
  if (Array.isArray(nuevosAmigos)) {
    nuevosAmigos.forEach(amigo => {
      const a = amigo.trim();
      if (a) amigos.push(a);
    });
  }

  // Agregar número solo si es mayor que el último
  if (numero) {
    const nuevo = parseInt(numero);
    const ultimo = numeros[numeros.length - 1] || 0;
    if (!isNaN(nuevo)) {
      if (nuevo > ultimo) {
        numeros.push(nuevo);
      } else {
        return res.status(400).json({ error: 'El número no es mayor que el último.' });
      }
    }
  }

  // Respuesta default
  return res.json({ mensaje: 'Datos guardados correctamente.' });
});

// Ruta para consultar datos
app.get('/datos', (req, res) => {
  res.json({ frutas, amigos, numeros });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});