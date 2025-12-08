// middleware/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware para proteger rutas, requiere un token JWT válido.

const verificarToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado. Token no proporcionado.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // { id, rol, email }
    next();
  } catch (err) {
    return res.status(401).json({ mensaje: 'Token inválido o expirado.' });
  }
};

// Middleware para verificar que el usuario sea admin.

const esAdmin = (req, res, next) => {
  if (req.usuario.rol !== 'admin') {
    return res.status(403).json({ mensaje: 'Acceso restringido. Solo administradores.' });
  }
  next();
};

module.exports = { verificarToken, esAdmin };