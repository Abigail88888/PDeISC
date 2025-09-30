// index.js
// Servidor Express principal

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import portfolioRoutes from './routes/portfolio.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors({
    origin: ['http://localhost:5173', 'https://tu-portfolio.vercel.app'], // ¡cambia esto!
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', mensaje: 'Backend funcionando.' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(` Servidor corriendo en puerto ${PORT}`);
});