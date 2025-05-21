const express = require('express');
const path = require('path');
const app = express();
const PORT = 3002;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html' ,'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor Proyecto 2 corriendo en http://localhost:${PORT}`);
});