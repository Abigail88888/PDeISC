// index.js - Servidor Express principal
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { initializeDatabase } = require('./connectBack4app.js');
const authRoutes = require('./routes/auth.js');
const portfolioRoutes = require('./routes/portfolio.js');

const app = express();
const PORT = process.env.PORT || 4000;


const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL, 
  'https://frontend-m51rvnsx8-portfolios-projects-9707c5a3.vercel.app',
  '/https:\/\/frontend-.*\.vercel\.app$/',
];

app.use(cors({
  origin: function (origin, callback) {
    // Permitir requests sin origin
    if (!origin) return callback(null, true);
    
    // Verificar si el origin está en la lista permitida
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
      }
      return allowedOrigin === origin;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn(`⚠️  Origin no permitido: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);

// Ruta de prueba 
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    mensaje: 'Backend funcionando correctamente.',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    nodeVersion: process.version,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    mensaje: 'Portfolio Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth/*',
      portfolio: '/api/portfolio/*'
    },
    environment: process.env.NODE_ENV || 'development'
  });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ 
    mensaje: 'Ruta no encontrada',
    ruta: req.path,
    metodo: req.method
  });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('❌ Error en el servidor:', err);
  res.status(500).json({ 
    mensaje: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
  });
});

async function startServer() {
  try {
    console.log('\n🚀 Iniciando servidor...\n');
    
    // Intentar inicializar base de datos
    try {
      const dbInitialized = await initializeDatabase();
      if (!dbInitialized) {
        console.warn('\n⚠️  La base de datos no se inicializó completamente.');
        console.warn('⚠️  El servidor arrancará de todos modos.\n');
      }
    } catch (dbError) {
      console.error('\n⚠️  Error al inicializar BD:', dbError.message);
      console.warn('⚠️  El servidor arrancará sin datos iniciales.\n');
    }
    
    // Iniciar servidor HTTP
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log('\n' + '='.repeat(60));
      console.log('✅ SERVIDOR INICIADO CORRECTAMENTE');
      console.log('='.repeat(60));
      console.log(`🌐 Puerto: ${PORT}`);
      console.log(`🔗 URL: ${process.env.RAILWAY_PUBLIC_DOMAIN || `http://localhost:${PORT}`}`);
      console.log(`📊 Entorno: ${process.env.NODE_ENV || 'development'}`);
      console.log(`\n📋 Endpoints disponibles:`);
      console.log(`   • Health: /api/health`);
      console.log(`   • Auth: /api/auth/*`);
      console.log(`   • Portfolio: /api/portfolio/*`);
      console.log('\n' + '='.repeat(60));
      console.log('💡 Presiona Ctrl+C para detener el servidor');
      console.log('='.repeat(60) + '\n');
    });

    // Manejo de errores del servidor
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`\n❌ El puerto ${PORT} ya está en uso.`);
        console.error('💡 Soluciones:');
        console.error('   1. Cierra la aplicación que usa ese puerto');
        console.error('   2. Cambia el puerto en .env: PORT=4001\n');
      } else {
        console.error('\n❌ Error del servidor:', error.message);
      }
      process.exit(1);
    });

    // Manejo de señales de terminación
    process.on('SIGTERM', () => {
      console.log('\n⏸️  SIGTERM recibido, cerrando servidor...');
      server.close(() => {
        console.log('✅ Servidor cerrado correctamente.\n');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      console.log('\n\n⏸️  CTRL+C detectado, cerrando servidor...');
      server.close(() => {
        console.log('✅ Servidor cerrado correctamente.\n');
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('\n❌ Error crítico al iniciar servidor:', error);
    console.error('\n🔧 Verifica:');
    console.error('   1. Que todas las dependencias estén instaladas: npm install');
    console.error('   2. Que el archivo .env esté configurado');
    console.error('   3. Que los archivos de rutas existan\n');
    process.exit(1);
  }
}

// Arrancar servidor
startServer();