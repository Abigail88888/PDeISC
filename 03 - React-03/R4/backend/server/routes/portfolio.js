// routes/portfolio.js
const express = require('express');
const Parse = require('../connectBack4app.js');
const { verificarToken, esAdmin } = require('../middleware/auth.js');

const router = express.Router();

// RUTAS PÚBLICAS

router.get('/', async (req, res) => {
  try {
    // Obtener habilidades
    const habilidadesQuery = new Parse.Query('Habilidades');
    habilidadesQuery.ascending('tipo');
    const habilidadesObj = await habilidadesQuery.find();
    const habilidades = habilidadesObj.map(obj => ({
      id: obj.id,
      nombre: obj.get('nombre'),
      nivel: obj.get('nivel'),
      tipo: obj.get('tipo')
    }));

    // Obtener proyectos
    const proyectosQuery = new Parse.Query('Proyectos');
    const proyectosObj = await proyectosQuery.find();
    const proyectos = proyectosObj.map(obj => ({
      id: obj.id,
      titulo: obj.get('titulo'),
      descripcion: obj.get('descripcion'),
      url_demo: obj.get('url_demo'),
      url_codigo: obj.get('url_codigo'),
      imagen: obj.get('imagen')
    }));

    // Obtener experiencias
    const experienciasQuery = new Parse.Query('Experiencias');
    experienciasQuery.descending('inicio');
    const experienciasObj = await experienciasQuery.find();
    const experiencias = experienciasObj.map(obj => ({
      id: obj.id,
      puesto: obj.get('puesto'),
      empresa: obj.get('empresa'),
      inicio: obj.get('inicio'),
      fin: obj.get('fin'),
      descripcion: obj.get('descripcion')
    }));

    // Obtener logros
    const logrosQuery = new Parse.Query('Logros');
    const logrosObj = await logrosQuery.find();
    const logros = logrosObj.map(obj => ({
      id: obj.id,
      titulo: obj.get('titulo'),
      descripcion: obj.get('descripcion')
    }));

    res.json({
      habilidades,
      proyectos,
      experiencias,
      logros
    });
  } catch (error) {
    console.error('Error al obtener portfolio:', error);
    res.status(500).json({ mensaje: 'Error al cargar el portfolio.' });
  }
});

// RUTAS PROTEGIDAS

// HABILIDADES
router.post('/habilidades', verificarToken, esAdmin, async (req, res) => {
  const { nombre, nivel, tipo } = req.body;
  
  if (!nombre || !nivel || !tipo) {
    return res.status(400).json({ mensaje: 'Faltan datos.' });
  }

  try {
    const Habilidad = Parse.Object.extend('Habilidades');
    const habilidad = new Habilidad();
    habilidad.set('nombre', nombre);
    habilidad.set('nivel', nivel);
    habilidad.set('tipo', tipo);
    
    await habilidad.save(null, { useMasterKey: true });
    res.status(201).json({ mensaje: 'Habilidad creada.', id: habilidad.id });
  } catch (error) {
    console.error('Error al crear habilidad:', error);
    res.status(500).json({ mensaje: 'Error al crear habilidad.' });
  }
});

router.put('/habilidades/:id', verificarToken, esAdmin, async (req, res) => {
  const { id } = req.params;
  const { nombre, nivel, tipo } = req.body;

  try {
    const query = new Parse.Query('Habilidades');
    const habilidad = await query.get(id, { useMasterKey: true });
    
    if (nombre) habilidad.set('nombre', nombre);
    if (nivel) habilidad.set('nivel', nivel);
    if (tipo) habilidad.set('tipo', tipo);
    
    await habilidad.save(null, { useMasterKey: true });
    res.json({ mensaje: 'Habilidad actualizada.' });
  } catch (error) {
    console.error('Error al actualizar habilidad:', error);
    res.status(500).json({ mensaje: 'Error al actualizar habilidad.' });
  }
});

router.delete('/habilidades/:id', verificarToken, esAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const query = new Parse.Query('Habilidades');
    const habilidad = await query.get(id, { useMasterKey: true });
    await habilidad.destroy({ useMasterKey: true });
    res.json({ mensaje: 'Habilidad eliminada.' });
  } catch (error) {
    console.error('Error al eliminar habilidad:', error);
    res.status(500).json({ mensaje: 'Error al eliminar habilidad.' });
  }
});

// PROYECTOS
router.post('/proyectos', verificarToken, esAdmin, async (req, res) => {
  const { titulo, descripcion, url_demo, url_codigo, imagen } = req.body;
  
  if (!titulo) {
    return res.status(400).json({ mensaje: 'El título es obligatorio.' });
  }

  try {
    const Proyecto = Parse.Object.extend('Proyectos');
    const proyecto = new Proyecto();
    proyecto.set('titulo', titulo);
    proyecto.set('descripcion', descripcion || '');
    proyecto.set('url_demo', url_demo || '');
    proyecto.set('url_codigo', url_codigo || '');
    proyecto.set('imagen', imagen || '');
    
    await proyecto.save(null, { useMasterKey: true });
    res.status(201).json({ mensaje: 'Proyecto creado.', id: proyecto.id });
  } catch (error) {
    console.error('Error al crear proyecto:', error);
    res.status(500).json({ mensaje: 'Error al crear proyecto.' });
  }
});

router.put('/proyectos/:id', verificarToken, esAdmin, async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, url_demo, url_codigo, imagen } = req.body;

  try {
    const query = new Parse.Query('Proyectos');
    const proyecto = await query.get(id, { useMasterKey: true });
    
    if (titulo) proyecto.set('titulo', titulo);
    if (descripcion !== undefined) proyecto.set('descripcion', descripcion);
    if (url_demo !== undefined) proyecto.set('url_demo', url_demo);
    if (url_codigo !== undefined) proyecto.set('url_codigo', url_codigo);
    if (imagen !== undefined) proyecto.set('imagen', imagen);
    
    await proyecto.save(null, { useMasterKey: true });
    res.json({ mensaje: 'Proyecto actualizado.' });
  } catch (error) {
    console.error('Error al actualizar proyecto:', error);
    res.status(500).json({ mensaje: 'Error al actualizar proyecto.' });
  }
});

router.delete('/proyectos/:id', verificarToken, esAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const query = new Parse.Query('Proyectos');
    const proyecto = await query.get(id, { useMasterKey: true });
    await proyecto.destroy({ useMasterKey: true });
    res.json({ mensaje: 'Proyecto eliminado.' });
  } catch (error) {
    console.error('Error al eliminar proyecto:', error);
    res.status(500).json({ mensaje: 'Error al eliminar proyecto.' });
  }
});

// EXPERIENCIAS
router.post('/experiencias', verificarToken, esAdmin, async (req, res) => {
  const { puesto, empresa, inicio, fin, descripcion } = req.body;
  
  if (!puesto || !empresa) {
    return res.status(400).json({ mensaje: 'Puesto y empresa son obligatorios.' });
  }

  try {
    const Experiencia = Parse.Object.extend('Experiencias');
    const experiencia = new Experiencia();
    experiencia.set('puesto', puesto);
    experiencia.set('empresa', empresa);
    experiencia.set('inicio', inicio ? new Date(inicio) : null);
    experiencia.set('fin', fin ? new Date(fin) : null);
    experiencia.set('descripcion', descripcion || '');
    
    await experiencia.save(null, { useMasterKey: true });
    res.status(201).json({ mensaje: 'Experiencia creada.', id: experiencia.id });
  } catch (error) {
    console.error('Error al crear experiencia:', error);
    res.status(500).json({ mensaje: 'Error al crear experiencia.' });
  }
});

router.put('/experiencias/:id', verificarToken, esAdmin, async (req, res) => {
  const { id } = req.params;
  const { puesto, empresa, inicio, fin, descripcion } = req.body;

  try {
    const query = new Parse.Query('Experiencias');
    const experiencia = await query.get(id, { useMasterKey: true });
    
    if (puesto) experiencia.set('puesto', puesto);
    if (empresa) experiencia.set('empresa', empresa);
    if (inicio) experiencia.set('inicio', new Date(inicio));
    if (fin !== undefined) experiencia.set('fin', fin ? new Date(fin) : null);
    if (descripcion !== undefined) experiencia.set('descripcion', descripcion);
    
    await experiencia.save(null, { useMasterKey: true });
    res.json({ mensaje: 'Experiencia actualizada.' });
  } catch (error) {
    console.error('Error al actualizar experiencia:', error);
    res.status(500).json({ mensaje: 'Error al actualizar experiencia.' });
  }
});

router.delete('/experiencias/:id', verificarToken, esAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const query = new Parse.Query('Experiencias');
    const experiencia = await query.get(id, { useMasterKey: true });
    await experiencia.destroy({ useMasterKey: true });
    res.json({ mensaje: 'Experiencia eliminada.' });
  } catch (error) {
    console.error('Error al eliminar experiencia:', error);
    res.status(500).json({ mensaje: 'Error al eliminar experiencia.' });
  }
});

// LOGROS
router.post('/logros', verificarToken, esAdmin, async (req, res) => {
  const { titulo, descripcion } = req.body;
  
  if (!titulo) {
    return res.status(400).json({ mensaje: 'El título es obligatorio.' });
  }

  try {
    const Logro = Parse.Object.extend('Logros');
    const logro = new Logro();
    logro.set('titulo', titulo);
    logro.set('descripcion', descripcion || '');
    
    await logro.save(null, { useMasterKey: true });
    res.status(201).json({ mensaje: 'Logro creado.', id: logro.id });
  } catch (error) {
    console.error('Error al crear logro:', error);
    res.status(500).json({ mensaje: 'Error al crear logro.' });
  }
});

router.put('/logros/:id', verificarToken, esAdmin, async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion } = req.body;

  try {
    const query = new Parse.Query('Logros');
    const logro = await query.get(id, { useMasterKey: true });
    
    if (titulo) logro.set('titulo', titulo);
    if (descripcion !== undefined) logro.set('descripcion', descripcion);
    
    await logro.save(null, { useMasterKey: true });
    res.json({ mensaje: 'Logro actualizado.' });
  } catch (error) {
    console.error('Error al actualizar logro:', error);
    res.status(500).json({ mensaje: 'Error al actualizar logro.' });
  }
});

router.delete('/logros/:id', verificarToken, esAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const query = new Parse.Query('Logros');
    const logro = await query.get(id, { useMasterKey: true });
    await logro.destroy({ useMasterKey: true });
    res.json({ mensaje: 'Logro eliminado.' });
  } catch (error) {
    console.error('Error al eliminar logro:', error);
    res.status(500).json({ mensaje: 'Error al eliminar logro.' });
  }
});

module.exports = router;