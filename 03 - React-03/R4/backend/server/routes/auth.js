// routes/auth.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { connectDB } from '../connectbbdd.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// ─── REGISTRO ───────────────────────────────────────────────
router.post('/register', async (req, res) => {
    const { nombre, email, contraseña, celular } = req.body;

    if (!nombre || !email || !contraseña) {
        return res.status(400).json({ mensaje: 'Faltan campos obligatorios.' });
    }

    const db = await connectDB();
    if (!db) return res.status(500).json({ mensaje: 'Error al conectar con la base de datos.' });

    try {
        const { rows } = await db.query('SELECT id FROM usuarios WHERE email = $1', [email]);
        if (rows.length > 0) {
            return res.status(400).json({ mensaje: 'El email ya está registrado.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(contraseña, salt);

        await db.query(
            'INSERT INTO usuarios (nombre, email, contraseña, celular, rol) VALUES ($1, $2, $3, $4, $5)',
            [nombre, email, hash, celular || null, 'user']
        );

        res.status(201).json({ mensaje: 'Usuario registrado exitosamente.' });
    } catch (error) {
        console.error('Error en /register:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    } finally {
        db.release(); // ✅ PostgreSQL: libera el cliente
    }
});

// ─── LOGIN ──────────────────────────────────────────────────
router.post('/login', async (req, res) => {
    const { email, contraseña } = req.body;

    if (!email || !contraseña) {
        return res.status(400).json({ mensaje: 'Email y contraseña son obligatorios.' });
    }

    const db = await connectDB();
    if (!db) return res.status(500).json({ mensaje: 'Error al conectar con la base de datos.' });

    try {
        const { rows } = await db.query(
            'SELECT id, nombre, email, contraseña, rol, celular FROM usuarios WHERE email = $1',
            [email]
        );
        if (rows.length === 0) {
            return res.status(400).json({ mensaje: 'Credenciales incorrectas.' });
        }

        const usuario = rows[0];
        const esValida = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!esValida) {
            return res.status(400).json({ mensaje: 'Credenciales incorrectas.' });
        }

        const token = jwt.sign(
            { id: usuario.id, rol: usuario.rol, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            mensaje: 'Inicio de sesión exitoso.',
            token,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol,
                celular: usuario.celular
            }
        });
    } catch (error) {
        console.error('Error en /login:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    } finally {
        db.release();
    }
});

// ─── RECUPERAR CONTRASEÑA ───────────────────────────────────
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ mensaje: 'Email es obligatorio.' });
    }

    const db = await connectDB();
    if (!db) return res.status(500).json({ mensaje: 'Error al conectar con la base de datos.' });

    try {
        const { rows } = await db.query('SELECT nombre FROM usuarios WHERE email = $1', [email]);
        if (rows.length === 0) {
            return res.status(400).json({ mensaje: 'No existe una cuenta con ese email.' });
        }

        const nombre = rows[0].nombre;
        const asunto = 'Recuperación de contraseña - Portfolio';
        const mensaje = `
            <h2>¡Hola ${nombre}!</h2>
            <p>Recibimos una solicitud para restablecer tu contraseña en el portfolio.</p>
            <p>Por ahora, contacta al administrador para restablecerla manualmente.</p>
            <p>Este es un trabajo práctico, así que la recuperación completa no está implementada.</p>
        `;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: asunto,
            html: mensaje
        });

        res.json({ mensaje: 'Se envió un email con instrucciones.' });
    } catch (error) {
        console.error('Error en /forgot-password:', error);
        res.status(500).json({ mensaje: 'No se pudo enviar el email.' });
    } finally {
        db.release();
    }
});

export default router;