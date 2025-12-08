// seedDatabase.js - Script para poblar la base de datos con datos de ejemplo
const Parse = require('./connectBack4app.js');

/**
 * LIMPIAR TODAS LAS TABLAS (opcional - usar con cuidado)
 */
async function limpiarTablas() {
  console.log('\n🗑️  Limpiando tablas existentes...\n');
  
  try {
    // Habilidades
    const habilidadesQuery = new Parse.Query('Habilidades');
    const habilidades = await habilidadesQuery.find({ useMasterKey: true });
    await Parse.Object.destroyAll(habilidades, { useMasterKey: true });
    console.log(`✅ Eliminadas ${habilidades.length} habilidades`);

    // Proyectos
    const proyectosQuery = new Parse.Query('Proyectos');
    const proyectos = await proyectosQuery.find({ useMasterKey: true });
    await Parse.Object.destroyAll(proyectos, { useMasterKey: true });
    console.log(`✅ Eliminados ${proyectos.length} proyectos`);

    // Experiencias
    const experienciasQuery = new Parse.Query('Experiencias');
    const experiencias = await experienciasQuery.find({ useMasterKey: true });
    await Parse.Object.destroyAll(experiencias, { useMasterKey: true });
    console.log(`✅ Eliminadas ${experiencias.length} experiencias`);

    // Logros
    const logrosQuery = new Parse.Query('Logros');
    const logros = await logrosQuery.find({ useMasterKey: true });
    await Parse.Object.destroyAll(logros, { useMasterKey: true });
    console.log(`✅ Eliminados ${logros.length} logros`);

  } catch (error) {
    console.error('⚠️  Error al limpiar tablas:', error.message);
  }
}

/**
 * CREAR HABILIDADES DE EJEMPLO
 */
async function crearHabilidades() {
  console.log('\n💻 Creando habilidades...\n');
  
  const habilidades = [
    // Programación
    { nombre: 'JavaScript', nivel: 95, tipo: 'programacion' },
    { nombre: 'TypeScript', nivel: 85, tipo: 'programacion' },
    { nombre: 'React', nivel: 90, tipo: 'programacion' },
    { nombre: 'Node.js', nivel: 88, tipo: 'programacion' },
    { nombre: 'Express', nivel: 85, tipo: 'programacion' },
    { nombre: 'HTML', nivel: 95, tipo: 'programacion' },
    { nombre: 'CSS', nivel: 92, tipo: 'programacion' },
    { nombre: 'Tailwind', nivel: 88, tipo: 'programacion' },
    { nombre: 'PostgreSQL', nivel: 80, tipo: 'programacion' },
    { nombre: 'MongoDB', nivel: 75, tipo: 'programacion' },
    { nombre: 'Git', nivel: 85, tipo: 'programacion' },
    { nombre: 'Docker', nivel: 70, tipo: 'programacion' },
    { nombre: 'Python', nivel: 65, tipo: 'programacion' },
    { nombre: 'Vue', nivel: 60, tipo: 'programacion' },
    
    // Soft Skills
    { nombre: 'Trabajo en Equipo', nivel: 95, tipo: 'soft' },
    { nombre: 'Comunicación', nivel: 90, tipo: 'soft' },
    { nombre: 'Resolución de Problemas', nivel: 92, tipo: 'soft' },
    { nombre: 'Adaptabilidad', nivel: 88, tipo: 'soft' },
    { nombre: 'Creatividad', nivel: 85, tipo: 'soft' },
    { nombre: 'Liderazgo', nivel: 80, tipo: 'soft' },
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
      console.log(`  ✓ ${hab.nombre} (${hab.nivel}%)`);
      creadas++;
    } catch (err) {
      console.warn(`  ✗ Error con ${hab.nombre}:`, err.message);
    }
  }

  console.log(`\n✅ Total habilidades creadas: ${creadas}/${habilidades.length}\n`);
}

/**
 * CREAR PROYECTOS DE EJEMPLO
 */
async function crearProyectos() {
  console.log('📁 Creando proyectos...\n');
  
  const proyectos = [
    {
      titulo: 'E-commerce Full Stack',
      descripcion: 'Tienda online completa con carrito de compras, pasarela de pagos integrada (Stripe), panel de administración, gestión de inventario y sistema de envíos. Desarrollado con React, Node.js, Express y PostgreSQL.',
      url_demo: 'https://ecommerce-demo.vercel.app',
      url_codigo: 'https://github.com/usuario/ecommerce-fullstack',
      imagen: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80'
    },
    {
      titulo: 'App de Gestión de Tareas',
      descripcion: 'Aplicación web para gestionar proyectos y tareas con tableros tipo Kanban, notificaciones en tiempo real con WebSockets, asignación de usuarios, deadlines y sistema de comentarios. Stack: React, Node.js, Socket.io, MongoDB.',
      url_demo: 'https://task-manager-app.netlify.app',
      url_codigo: 'https://github.com/usuario/task-manager',
      imagen: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80'
    },
    {
      titulo: 'Portfolio Interactivo 3D',
      descripcion: 'Portfolio personal con animaciones 3D utilizando Three.js, transiciones suaves, modo oscuro/claro, sistema de contacto con email, blog integrado y completamente responsive. Tecnologías: React, Three.js, Tailwind CSS.',
      url_demo: 'https://mi-portfolio-3d.com',
      url_codigo: 'https://github.com/usuario/portfolio-3d',
      imagen: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80'
    },
    {
      titulo: 'Dashboard Analytics',
      descripcion: 'Panel de control con visualización de datos en tiempo real, gráficos interactivos, exportación de reportes a PDF/Excel, filtros avanzados y sistema de alertas. Construido con React, Chart.js, Node.js y PostgreSQL.',
      url_demo: 'https://analytics-dashboard-demo.com',
      url_codigo: 'https://github.com/usuario/analytics-dashboard',
      imagen: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
    },
    {
      titulo: 'Red Social para Desarrolladores',
      descripcion: 'Plataforma social enfocada en desarrolladores con sistema de posts, comentarios, likes, seguimiento de usuarios, feed personalizado, chat en tiempo real y compartir snippets de código. Stack: MERN (MongoDB, Express, React, Node.js).',
      url_demo: 'https://devconnect-social.com',
      url_codigo: 'https://github.com/usuario/dev-social-network',
      imagen: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80'
    },
    {
      titulo: 'API REST de Recetas',
      descripcion: 'API RESTful completa con autenticación JWT, CRUD de recetas, búsqueda y filtros avanzados, sistema de favoritos, calificaciones de usuarios, paginación y documentación con Swagger. Backend con Node.js, Express y MongoDB.',
      url_demo: 'https://recipes-api-docs.com',
      url_codigo: 'https://github.com/usuario/recipes-api',
      imagen: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&q=80'
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
      console.log(`  ✓ ${proj.titulo}`);
      creados++;
    } catch (err) {
      console.warn(`  ✗ Error con ${proj.titulo}:`, err.message);
    }
  }

  console.log(`\n✅ Total proyectos creados: ${creados}/${proyectos.length}\n`);
}

/**
 * CREAR EXPERIENCIAS DE EJEMPLO
 */
async function crearExperiencias() {
  console.log('💼 Creando experiencias...\n');
  
  const experiencias = [
    {
      puesto: 'Desarrollador Full Stack Senior',
      empresa: 'Tech Solutions SA',
      inicio: new Date('2022-06-01'),
      fin: null, // Trabajo actual
      descripcion: 'Desarrollo de aplicaciones web empresariales con React y Node.js. Liderazgo de equipo de 4 desarrolladores, implementación de arquitectura microservicios, optimización de rendimiento (mejora del 40% en tiempos de carga) y mentoría de desarrolladores junior.'
    },
    {
      puesto: 'Desarrollador Frontend',
      empresa: 'Digital Agency Argentina',
      inicio: new Date('2021-03-01'),
      fin: new Date('2022-05-31'),
      descripcion: 'Creación de interfaces modernas y responsivas para clientes corporativos. Implementación de diseños complejos con React y Tailwind CSS, optimización SEO, integración con APIs RESTful y trabajo directo con diseñadores UX/UI. Proyectos destacados para empresas Fortune 500.'
    },
    {
      puesto: 'Desarrollador Web Junior',
      empresa: 'StartUp Innovations',
      inicio: new Date('2020-01-15'),
      fin: new Date('2021-02-28'),
      descripcion: 'Desarrollo de landing pages y sitios web corporativos. Mantenimiento y actualización de sistemas existentes, corrección de bugs, implementación de nuevas funcionalidades y trabajo en equipo ágil con Scrum. Introducción al stack MERN.'
    },
    {
      puesto: 'Desarrollador Frontend (Freelance)',
      empresa: 'Proyectos Independientes',
      inicio: new Date('2019-06-01'),
      fin: new Date('2019-12-31'),
      descripcion: 'Desarrollo freelance de sitios web para pequeñas empresas y emprendedores. Creación de portfolios, e-commerce con WooCommerce, optimización de sitios existentes y consultoría en tecnologías web. Trabajo remoto con clientes de Argentina y España.'
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
      console.log(`  ✓ ${exp.puesto} en ${exp.empresa}`);
      creadas++;
    } catch (err) {
      console.warn(`  ✗ Error con ${exp.puesto}:`, err.message);
    }
  }

  console.log(`\n✅ Total experiencias creadas: ${creadas}/${experiencias.length}\n`);
}

/**
 * CREAR LOGROS DE EJEMPLO
 */
async function crearLogros() {
  console.log('🏆 Creando logros...\n');
  
  const logros = [
    {
      titulo: 'Certificación Full Stack Developer',
      descripcion: 'Certificación profesional en desarrollo full stack con MERN (MongoDB, Express, React, Node.js) otorgada por Platzi. Más de 400 horas de formación práctica.'
    },
    {
      titulo: 'Hackathon Nacional 2023 - Primer Lugar',
      descripcion: 'Ganador del hackathon regional de innovación tecnológica con un proyecto de app de salud mental basada en IA. Competencia con más de 50 equipos participantes.'
    },
    {
      titulo: 'Contribuidor Open Source',
      descripcion: 'Más de 100 contribuciones a proyectos open source en GitHub, incluyendo React, Node.js y herramientas de desarrollo. Pull requests aceptados en repositorios con millones de descargas.'
    },
    {
      titulo: 'Certificación React Advanced',
      descripcion: 'Certificado avanzado en React incluyendo hooks, context API, optimización de rendimiento, arquitectura de aplicaciones escalables y patrones de diseño modernos.'
    },
    {
      titulo: 'Speaker en Meetup.js Argentina',
      descripcion: 'Charla técnica sobre "Optimización de aplicaciones React en producción" en Meetup.js Buenos Aires con más de 150 asistentes. Presentación de casos de estudio reales.'
    },
    {
      titulo: 'Proyecto Featured en Product Hunt',
      descripcion: 'Proyecto personal destacado en Product Hunt con más de 500 upvotes y cobertura en medios especializados de tecnología. Herramienta para desarrolladores con más de 10k usuarios.'
    },
    {
      titulo: 'Certificación Node.js Professional',
      descripcion: 'Certificación profesional en Node.js incluyendo arquitectura de APIs RESTful, microservicios, manejo de base de datos, autenticación y seguridad, testing y deployment.'
    },
    {
      titulo: 'Mentor en CoderHouse',
      descripcion: 'Mentor de desarrollo web y JavaScript ayudando a más de 30 estudiantes en su camino hacia el desarrollo profesional. Sesiones de mentoría individual y revisión de código.'
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
      console.log(`  ✓ ${log.titulo}`);
      creados++;
    } catch (err) {
      console.warn(`  ✗ Error con ${log.titulo}:`, err.message);
    }
  }

  console.log(`\n✅ Total logros creados: ${creados}/${logros.length}\n`);
}

/**
 * VERIFICAR DATOS EXISTENTES
 */
async function verificarDatos() {
  console.log('\n📊 Verificando datos en la base de datos...\n');
  
  try {
    const habilidadesCount = await new Parse.Query('Habilidades').count({ useMasterKey: true });
    const proyectosCount = await new Parse.Query('Proyectos').count({ useMasterKey: true });
    const experienciasCount = await new Parse.Query('Experiencias').count({ useMasterKey: true });
    const logrosCount = await new Parse.Query('Logros').count({ useMasterKey: true });

    console.log(`  📌 Habilidades:  ${habilidadesCount}`);
    console.log(`  📌 Proyectos:    ${proyectosCount}`);
    console.log(`  📌 Experiencias: ${experienciasCount}`);
    console.log(`  📌 Logros:       ${logrosCount}`);
    console.log('');
  } catch (error) {
    console.error('❌ Error al verificar datos:', error.message);
  }
}

/**
 * FUNCIÓN PRINCIPAL
 */
async function main() {
  console.log('\n' + '='.repeat(60));
  console.log('🌱 SEED DATABASE - POBLAR BASE DE DATOS CON EJEMPLOS');
  console.log('='.repeat(60));

  try {
    // Verificar datos actuales
    await verificarDatos();

    // Preguntar si desea limpiar (en producción, esto debería ser un parámetro)
    // Por ahora, comentamos el limpiar para no borrar datos existentes
    // await limpiarTablas();

    // Crear todos los datos
    await crearHabilidades();
    await crearProyectos();
    await crearExperiencias();
    await crearLogros();

    // Verificar resultado final
    console.log('='.repeat(60));
    console.log('📊 RESULTADO FINAL:');
    console.log('='.repeat(60));
    await verificarDatos();

    console.log('✅ ¡Base de datos poblada exitosamente!\n');
    console.log('💡 Ahora puedes:');
    console.log('   1. Iniciar el servidor: npm start');
    console.log('   2. Iniciar el frontend: npm run dev');
    console.log('   3. Iniciar sesión con: abiadmin / dinucci123');
    console.log('   4. Ver el panel admin al final de la página\n');

  } catch (error) {
    console.error('\n❌ ERROR CRÍTICO:', error.message);
    console.error(error);
  }

  process.exit(0);
}

// Ejecutar
main();