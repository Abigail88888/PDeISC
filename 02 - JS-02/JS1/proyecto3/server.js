import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html' ,'index.html'));
});
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});