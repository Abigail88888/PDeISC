// routes/portfolio.js
import express from 'express';
import { connectDB } from '../connectbbdd.js';
import { verificarToken, esAdmin } from '../middleware/auth.js';

const router = express.Router();

// ─── OBTENER PORTFOLIO (solo logueados) ─────────────────────
router.get('/', verificarToken, async (req, res) => {
    const db = await connectDB();
    if (!db) return res.status(500).json({ mensaje: 'Error al conectar con la base de datos.' });

    try {
        const habilidades = await db.query('SELECT * FROM habilidades ORDER BY tipo, nombre');
        const proyectos = await db.query('SELECT * FROM proyectos');
        const experiencias = await db.query('SELECT * FROM experiencias ORDER BY inicio DESC');
        const logros = await db.query('SELECT * FROM logros');

        res.json({
            habilidades: habilidades.rows,
            proyectos: proyectos.rows,
            experiencias: experiencias.rows,
            logros: logros.rows
        });
    } catch (error) {
        console.error('Error al obtener el portfolio:', error);
        res.status(500).json({ mensaje: 'Error al cargar el portfolio.' });
    } finally {
        db.release();
    }
});

// ─── CREAR HABILIDAD (solo admin) ───────────────────────────
router.post('/habilidades', verificarToken, esAdmin, async (req, res) => {
    const { nombre, nivel, tipo } = req.body;
    if (!nombre || !nivel || !tipo) {
        return res.status(400).json({ mensaje: 'Faltan datos.' });
    }

    const db = await connectDB();
    if (!db) return res.status(500).json({ mensaje: 'Error al conectar con la base de datos.' });

    try {
        await db.query(
            'INSERT INTO habilidades (nombre, nivel, tipo) VALUES ($1, $2, $3)',
            [nombre, nivel, tipo]
        );
        res.status(201).json({ mensaje: 'Habilidad creada.' });
    } catch (error) {
        console.error('Error al crear habilidad:', error);
        res.status(500).json({ mensaje: 'Error al crear habilidad.' });
    } finally {
        db.release();
    }
});

export default router;