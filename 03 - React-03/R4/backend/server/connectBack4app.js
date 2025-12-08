// connectBack4app.js
const Parse = require('parse/node');
require('dotenv').config();

// CREDENCIALES DE BACK4APP
const APP_ID = "Q2WukQXWAAmYTZUIPPq4Uo7iENELuZBoxGI49Ncf";
const JS_KEY = "sMtLGCMT5D6sxxgehCGTR0kfyG7luA0t5yqXVTM0";
const MASTER_KEY = "rUaKJtCg46kuqu1qXWTYqEMoRAvnW7tHUxHAdgYL";
const SERVER_URL = 'https://parseapi.back4app.com';

Parse.initialize(APP_ID, JS_KEY, MASTER_KEY);
Parse.serverURL = SERVER_URL;

// Configurar opciones adicionales para evitar timeouts
Parse.CoreManager.set('REQUEST_ATTEMPT_LIMIT', 3);
Parse.CoreManager.set('REQUEST_TIMEOUT', 15000); // 15 segundos

console.log('🔌 Parse inicializado correctamente.');
console.log('📡 Conectado a:', SERVER_URL);

// VERIFICAR CONEXIÓN CON RETRY
async function verificarConexion(reintentos = 3) {
  for (let i = 0; i < reintentos; i++) {
    try {
      console.log(`\n🔄 Intento ${i + 1}/${reintentos} - Verificando conexión...`);
      
      // Test simple: crear y eliminar un objeto de prueba
      const TestObject = Parse.Object.extend("_TestConnection");
      const testObj = new TestObject();
      testObj.set("test", true);
      testObj.set("timestamp", new Date());
      
      await testObj.save(null, { useMasterKey: true });
      await testObj.destroy({ useMasterKey: true });
      
      console.log('✅ Conexión a Back4app establecida correctamente.');
      return true;
      
    } catch (error) {
      console.error(`❌ Intento ${i + 1} falló:`, error.message);
      
      if (i < reintentos - 1) {
        const espera = (i + 1) * 2000; // 2s, 4s, 6s...
        console.log(`⏳ Esperando ${espera / 1000}s antes de reintentar...`);
        await new Promise(resolve => setTimeout(resolve, espera));
      } else {
        throw new Error(`No se pudo conectar a Back4app después de ${reintentos} intentos: ${error.message}`);
      }
    }
  }
}

/**
 * CREAR USUARIO ADMIN (con mejor manejo de errores)
 */
async function crearUsuarioAdmin() {
  try {
    console.log('\n👤 Verificando usuario admin...');
    
    const userQuery = new Parse.Query(Parse.User);
    userQuery.equalTo('username', 'abiadmin');
    const existingAdmin = await userQuery.first({ useMasterKey: true });

    if (existingAdmin) {
      console.log('ℹ️  Usuario admin ya existe: abiadmin');
      return existingAdmin;
    }

    console.log('📝 Creando usuario admin...');
    const admin = new Parse.User();
    admin.set('username', 'abiadmin');
    admin.set('password', 'dinucci123');
    admin.set('email', 'abiadmin@portfolio.com');
    admin.set('nombre', 'Administrador');
    admin.set('rol', 'admin');
    admin.set('celular', '+54 9 223 000-0000');
    admin.set('notificaciones', true);

    await admin.signUp(null, { useMasterKey: true });
    console.log('✅ Usuario admin creado exitosamente');
    console.log('   📧 Usuario: abiadmin');
    console.log('   🔑 Contraseña: dinucci123');
    
    return admin;
    
  } catch (error) {
    if (error.code === 202) {
      console.log('ℹ️  Usuario admin ya existe (código 202).');
      return null;
    }
    console.error('❌ Error al crear admin:', error.message);
    throw error;
  }
}

//CREAR HABILIDADES
async function crearHabilidades() {
  try {
    console.log('\n🎯 Creando habilidades...');
    
    const habilidades = [
      { nombre: 'JavaScript', nivel: 95, tipo: 'programacion' },
      { nombre: 'React', nivel: 90, tipo: 'programacion' },
      { nombre: 'Node.js', nivel: 85, tipo: 'programacion' },
      { nombre: 'HTML', nivel: 95, tipo: 'programacion' },
      { nombre: 'CSS', nivel: 90, tipo: 'programacion' },
      { nombre: 'Tailwind', nivel: 88, tipo: 'programacion' },
      { nombre: 'PostgreSQL', nivel: 80, tipo: 'programacion' },
      { nombre: 'Git', nivel: 85, tipo: 'programacion' },
      { nombre: 'Trabajo en Equipo', nivel: 95, tipo: 'soft' },
      { nombre: 'Comunicación', nivel: 90, tipo: 'soft' },
      { nombre: 'Resolución de Problemas', nivel: 92, tipo: 'soft' },
    ];

    const Habilidad = Parse.Object.extend('Habilidades');
    let creadas = 0;
    
    for (const hab of habilidades) {
      try {
        const habilidad = new Habilidad();
        habilidad.set('nombre', hab.nombre);
        habilidad.set('nivel', hab.nivel);
        habilidad.set('tipo', hab.tipo);
        await habilidad.save(null, { useMasterKey: true });
        creadas++;
      } catch (err) {
        console.warn(`⚠️  No se pudo crear habilidad "${hab.nombre}":`, err.message);
      }
    }

    console.log(`✅ Habilidades creadas: ${creadas}/${habilidades.length}`);
  } catch (error) {
    console.error('❌ Error al crear habilidades:', error.message);
    throw error;
  }
}

// CREAR PROYECTOS
async function crearProyectos() {
  try {
    console.log('\n📁 Creando proyectos...');
    
    const proyectos = [
      {
        titulo: 'E-commerce Full Stack',
        descripcion: 'Tienda online con React, Node.js y PostgreSQL',
        url_demo: 'https://ejemplo-ecommerce.com',
        url_codigo: 'https://github.com/usuario/ecommerce',
        imagen: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800'
      },
      {
        titulo: 'App de Gestión de Tareas',
        descripcion: 'Aplicación para gestionar proyectos con notificaciones en tiempo real',
        url_demo: 'https://ejemplo-tasks.com',
        url_codigo: 'https://github.com/usuario/tasks',
        imagen: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800'
      },
      {
        titulo: 'Portfolio Interactivo',
        descripcion: 'Portfolio personal con animaciones 3D y modo oscuro',
        url_demo: 'https://mi-portfolio.com',
        url_codigo: 'https://github.com/usuario/portfolio',
        imagen: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800'
      }
    ];

    const Proyecto = Parse.Object.extend('Proyectos');
    let creados = 0;
    
    for (const proj of proyectos) {
      try {
        const proyecto = new Proyecto();
        proyecto.set('titulo', proj.titulo);
        proyecto.set('descripcion', proj.descripcion);
        proyecto.set('url_demo', proj.url_demo);
        proyecto.set('url_codigo', proj.url_codigo);
        proyecto.set('imagen', proj.imagen);
        await proyecto.save(null, { useMasterKey: true });
        creados++;
      } catch (err) {
        console.warn(`⚠️  No se pudo crear proyecto "${proj.titulo}":`, err.message);
      }
    }

    console.log(`✅ Proyectos creados: ${creados}/${proyectos.length}`);
  } catch (error) {
    console.error('❌ Error al crear proyectos:', error.message);
    throw error;
  }
}

// EXPERIENCIAS
async function crearExperiencias() {
  try {
    console.log('\n💼 Creando experiencias...');
    
    const experiencias = [
      {
        puesto: 'Desarrollador Full Stack',
        empresa: 'Tech Solutions SA',
        inicio: new Date('2022-06-01'),
        fin: null,
        descripcion: 'Desarrollo de aplicaciones web con React y Node.js'
      },
      {
        puesto: 'Desarrollador Frontend',
        empresa: 'Digital Agency',
        inicio: new Date('2021-03-01'),
        fin: new Date('2022-05-31'),
        descripcion: 'Creación de interfaces modernas y responsivas'
      }
    ];

    const Experiencia = Parse.Object.extend('Experiencias');
    let creadas = 0;
    
    for (const exp of experiencias) {
      try {
        const experiencia = new Experiencia();
        experiencia.set('puesto', exp.puesto);
        experiencia.set('empresa', exp.empresa);
        experiencia.set('inicio', exp.inicio);
        experiencia.set('fin', exp.fin);
        experiencia.set('descripcion', exp.descripcion);
        await experiencia.save(null, { useMasterKey: true });
        creadas++;
      } catch (err) {
        console.warn(`⚠️  No se pudo crear experiencia "${exp.puesto}":`, err.message);
      }
    }

    console.log(`✅ Experiencias creadas: ${creadas}/${experiencias.length}`);
  } catch (error) {
    console.error('❌ Error al crear experiencias:', error.message);
    throw error;
  }
}

//CREAR LOGROS
async function crearLogros() {
  try {
    console.log('\n🏆 Creando logros...');
    
    const logros = [
      {
        titulo: 'Certificación Full Stack Developer',
        descripcion: 'Certificación en desarrollo full stack con MERN'
      },
      {
        titulo: 'Hackathon 2023 - Primer Lugar',
        descripcion: 'Ganador del hackathon regional con proyecto de app de salud'
      },
      {
        titulo: 'Contribuidor Open Source',
        descripcion: 'Más de 50 contribuciones a proyectos open source en GitHub'
      }
    ];

    const Logro = Parse.Object.extend('Logros');
    let creados = 0;
    
    for (const log of logros) {
      try {
        const logro = new Logro();
        logro.set('titulo', log.titulo);
        logro.set('descripcion', log.descripcion);
        await logro.save(null, { useMasterKey: true });
        creados++;
      } catch (err) {
        console.warn(`⚠️  No se pudo crear logro "${log.titulo}":`, err.message);
      }
    }

    console.log(`✅ Logros creados: ${creados}/${logros.length}`);
  } catch (error) {
    console.error('❌ Error al crear logros:', error.message);
    throw error;
  }
}

// VERIFICAR SI YA EXISTEN DATOS
async function verificarDatosExistentes() {
  try {
    const habilidadesQuery = new Parse.Query('Habilidades');
    const count = await habilidadesQuery.count({ useMasterKey: true });
    return count > 0;
  } catch (error) {
    // Si la tabla no existe, retornar false
    return false;
  }
}

//CREAR TABLAS CON DATOS
async function crearTablasConDatos() {
  try {
    const datosExisten = await verificarDatosExistentes();
    
    if (datosExisten) {
      console.log('\nℹ️  Ya existen datos en la base de datos. Saltando creación...');
      return;
    }

    console.log('\n📦 Creando tablas y datos de ejemplo...');

    await crearHabilidades();
    await crearProyectos();
    await crearExperiencias();
    await crearLogros();

    console.log('\n✅ Todas las tablas creadas con datos de ejemplo.');
  } catch (error) {
    console.error('❌ Error al crear tablas:', error.message);
    // No lanzar error aquí, permitir que el servidor arranque
  }
}

// INICIALIZAR BASE DE DATOS
async function initializeDatabase() {
  try {
    console.log('\n🔄 Inicializando base de datos en Back4app...\n');

    // 1. Verificar conexión con reintentos
    await verificarConexion(3);

    // 2. Crear usuario admin
    await crearUsuarioAdmin();

    // 3. Crear tablas y datos
    await crearTablasConDatos();

    console.log('\n✅ Base de datos inicializada correctamente.\n');
    return true;
    
  } catch (error) {
    console.error('\n❌ ERROR CRÍTICO:', error.message);
    console.error('\n🔧 POSIBLES SOLUCIONES:');
    console.error('   1. Verifica tu conexión a internet');
    console.error('   2. Verifica que las credenciales sean correctas en Back4app');
    console.error('   3. Verifica que "Allow Client Class Creation" esté habilitado');
    console.error('   4. Intenta actualizar las dependencias: npm update');
    console.error('   5. Verifica tu versión de Node.js (recomendado: 18+)\n');
    
    return false;
  }
}

module.exports = Parse;
module.exports.initializeDatabase = initializeDatabase;