// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const Parse = require('../connectBack4app.js');
require('dotenv').config();

const router = express.Router();

// LOGIN 
router.post('/login', async (req, res) => {
  const { email, contraseña } = req.body;

  if (!email || !contraseña) {
    return res.status(400).json({ mensaje: 'Email y contraseña son obligatorios.' });
  }

  try {
    // Buscar usuario por email
    const userQuery = new Parse.Query(Parse.User);
    userQuery.equalTo('email', email);
    const user = await userQuery.first({ useMasterKey: true });

    if (!user) {
      return res.status(400).json({ mensaje: 'Credenciales incorrectas.' });
    }

    // Intentar login con Parse
    try {
      const loggedInUser = await Parse.User.logIn(user.get('username'), contraseña);
      
      // Generar JWT
      const token = jwt.sign(
        { 
          id: loggedInUser.id, 
          rol: loggedInUser.get('rol'), 
          email: loggedInUser.get('email') 
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        mensaje: 'Inicio de sesión exitoso.',
        token,
        usuario: {
          id: loggedInUser.id,
          nombre: loggedInUser.get('nombre'),
          email: loggedInUser.get('email'),
          rol: loggedInUser.get('rol'),
          celular: loggedInUser.get('celular')
        }
      });
    } catch (loginError) {
      return res.status(400).json({ mensaje: 'Credenciales incorrectas.' });
    }
  } catch (error) {
    console.error('Error en /login:', error);
    res.status(500).json({ 
      mensaje: 'Error interno del servidor.',
      error: error.message 
    });
  }
});

// VERIFICAR TOKEN
router.get('/verify', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Obtener usuario actualizado
    const userQuery = new Parse.Query(Parse.User);
    const user = await userQuery.get(decoded.id, { useMasterKey: true });

    res.json({
      valido: true,
      usuario: {
        id: user.id,
        nombre: user.get('nombre'),
        email: user.get('email'),
        rol: user.get('rol'),
        celular: user.get('celular')
      }
    });
  } catch (error) {
    res.status(401).json({ 
      valido: false,
      mensaje: 'Token inválido o expirado.' 
    });
  }
});

module.exports = router;