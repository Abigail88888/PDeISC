import React, { useState, useRef, useEffect } from 'react';
import Buscador from './Buscador';

const ListadoUsuarios = ({ usuarios, borrarUsuario, modificarUsuario, cargando }) => {
  // Estados para gestionar filtros y edición
  const [filtro, setFiltro] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [editandoId, setEditandoId] = useState(null);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [form, setForm] = useState({});
  
  // Estados para checkboxes en edición
  const [noTieneEdit, setNoTieneEdit] = useState({
    Direccion: false,
    Telefono: false,
    Celular: false,
    FechaNacimiento: false,
    Ocupacion: false
  });
  
  // Referencias para navegación por teclado
  const listRef = useRef(null);
  const editFormRef = useRef(null);

  // Filtra usuarios según el término de búsqueda y el campo seleccionado
  const usuariosFiltrados = usuarios.filter((usuario) => {
    if (!filtro.trim()) return true;
    
    const termino = filtro.toLowerCase().trim();
    
    if (filtroTipo === 'todos') {
      // Buscar en todos los campos
      const campos = ['Nombre', 'Apellido', 'Email', 'Direccion', 'Telefono', 'Celular', 'Ocupacion'];
      return campos.some(campo => 
        String(usuario[campo] || '').toLowerCase().includes(termino)
      );
    } else {
      // Buscar en campo específico
      return String(usuario[filtroTipo] || '').toLowerCase().includes(termino);
    }
  });

  // Convierte fecha de MySQL (YYYY-MM-DD) a formato para input date
  const convertirFechaParaInput = (fechaMySQL) => {
    if (!fechaMySQL) return '';
    // Si ya está en formato YYYY-MM-DD, devolverla tal como está
    if (typeof fechaMySQL === 'string' && fechaMySQL.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return fechaMySQL;
    }
    // Convertir otros formatos
    try {
      const fecha = new Date(fechaMySQL);
      return fecha.toISOString().split('T')[0];
    } catch {
      return '';
    }
  };

  /**
   * Inicia la edición de un usuario
   * @param {Object} usuario - Usuario a editar
   */
  const handleEdit = (usuario) => {
    setEditandoId(usuario.ID);
    
    // Determinar qué campos están vacíos para marcar checkboxes
    const nuevosNoTiene = {
      Direccion: !usuario.Direccion || String(usuario.Direccion).trim() === '',
      Telefono: !usuario.Telefono || String(usuario.Telefono).trim() === '',
      Celular: !usuario.Celular || String(usuario.Celular).trim() === '',
      FechaNacimiento: !usuario.FechaNacimiento,
      Ocupacion: !usuario.Ocupacion || String(usuario.Ocupacion).trim() === ''
    };
    
    setNoTieneEdit(nuevosNoTiene);
    
    setForm({
      ID: usuario.ID,
      Nombre: usuario.Nombre || '',
      Apellido: usuario.Apellido || '',
      Direccion: usuario.Direccion || '',
      Telefono: usuario.Telefono || '',
      Celular: usuario.Celular || '',
      FechaNacimiento: convertirFechaParaInput(usuario.FechaNacimiento),
      Email: usuario.Email || '',
      Ocupacion: usuario.Ocupacion || '',
    });
    
    // Enfocar el primer campo del formulario de edición
    setTimeout(() => {
      const firstInput = editFormRef.current?.querySelector('input:not([disabled])');
      firstInput?.focus();
    }, 100);
  };

  /**
   * Maneja cambios en los campos del formulario de edición
   * @param {Event} e - Evento del input
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Maneja cambios en los checkboxes de edición
   */
  const handleCheckboxEditChange = (campo) => {
    setNoTieneEdit(prev => {
      const nuevoEstado = { ...prev, [campo]: !prev[campo] };
      
      // Si marca "no tiene", limpiar el campo
      if (nuevoEstado[campo]) {
        setForm(prevForm => ({ ...prevForm, [campo]: '' }));
      }
      
      return nuevoEstado;
    });
  };

  /**
   * Guarda los cambios del usuario editado
   * @param {number} id - ID del usuario a actualizar
   */
  const handleUpdate = (id) => {
    // Validaciones básicas
    if (!form.Nombre.trim() || !form.Apellido.trim() || !form.Email.trim()) {
      alert('Los campos Nombre, Apellido y Email son obligatorios');
      return;
    }
    
    if (form.Email && !form.Email.includes('@')) {
      alert('Por favor ingrese un email válido');
      return;
    }
    
    // Preparar datos para enviar
    const datosEnvio = { ...form };
    
    // Limpiar campos marcados como "no tiene"
    Object.keys(noTieneEdit).forEach(campo => {
      if (noTieneEdit[campo]) {
        datosEnvio[campo] = '';
      }
    });
    
    modificarUsuario(id, datosEnvio);
    setEditandoId(null);
    setNoTieneEdit({
      Direccion: false,
      Telefono: false,
      Celular: false,
      FechaNacimiento: false,
      Ocupacion: false
    });
  };

  // Cancela la edición
  const cancelarEdicion = () => {
    setEditandoId(null);
    setForm({});
    setNoTieneEdit({
      Direccion: false,
      Telefono: false,
      Celular: false,
      FechaNacimiento: false,
      Ocupacion: false
    });
  };

  /**
   * Maneja la navegación por teclado en la lista
   * @param {KeyboardEvent} e - Evento de teclado
   * @param {number} index - Índice del usuario actual
   * @param {Object} usuario - Datos del usuario
   */
  const handleKeyNavigation = (e, index, usuario) => {
    const totalUsuarios = usuariosFiltrados.length;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (index < totalUsuarios - 1) {
          setUsuarioSeleccionado(usuariosFiltrados[index + 1].ID);
          setTimeout(() => {
            const nextElement = listRef.current?.children[index + 1];
            nextElement?.focus();
          }, 10);
        }
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        if (index > 0) {
          setUsuarioSeleccionado(usuariosFiltrados[index - 1].ID);
          setTimeout(() => {
            const prevElement = listRef.current?.children[index - 1];
            prevElement?.focus();
          }, 10);
        }
        break;
        
      case 'Enter':
        e.preventDefault();
        handleEdit(usuario);
        break;
        
      case 'Delete':
        e.preventDefault();
        if (window.confirm(`¿Está seguro de eliminar a ${usuario.Nombre} ${usuario.Apellido}?`)) {
          borrarUsuario(usuario.ID);
        }
        break;
        
      default:
        break;
    }
  };

  /**
   * Maneja eventos de teclado en el formulario de edición
   * @param {KeyboardEvent} e - Evento de teclado
   * @param {number} id - ID del usuario
   */
  const handleEditKeyDown = (e, id) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      handleUpdate(id);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelarEdicion();
    }
  };

  /**
   * Formatea la fecha para mostrar
   * @param {string} fecha - Fecha en formato ISO
   * @returns {string} Fecha formateada
   */
  const formatearFecha = (fecha) => {
  if (!fecha) return 'No especificada';
  try {
    let fechaObj;
    if (typeof fecha === 'string') {
      // Si es ISO string, crear fecha directamente
      fechaObj = new Date(fecha);
    } else {
      fechaObj = new Date(fecha);
    }
    
    // Verificar si la fecha es válida
    if (isNaN(fechaObj.getTime())) {
      return 'Fecha inválida';
    }
    
    return fechaObj.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch {
    return 'Error en fecha';
  }
};

  // Mostrar mensaje si no hay usuarios
  if (!cargando && usuarios.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-people display-1 text-muted"></i>
        <h3 className="text-muted mt-3">No hay usuarios registrados</h3>
        <p className="text-muted">Comience agregando su primer usuario</p>
      </div>
    );
  }

  return (
    <div>
      {/* Componente de búsqueda */}
      <Buscador setFiltro={setFiltro} setFiltroTipo={setFiltroTipo} />
      
      {/* Estadísticas */}
      <div className="row mb-3">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">
              <i className="bi bi-list-ul me-2"></i>
              Lista de Usuarios
            </h5>
            <div className="badge bg-primary fs-6">
              {filtro ? `${usuariosFiltrados.length} de ${usuarios.length}` : `${usuarios.length} usuario${usuarios.length !== 1 ? 's' : ''}`}
            </div>
          </div>
        </div>
      </div>

      {/* Lista de usuarios */}
      <div ref={listRef} className="list-group">
        {usuariosFiltrados.length === 0 && filtro && (
          <div className="text-center py-4">
            <i className="bi bi-search display-4 text-muted"></i>
            <h5 className="text-muted mt-3">No se encontraron usuarios</h5>
            <p className="text-muted">Intente con otros términos de búsqueda</p>
          </div>
        )}

        {usuariosFiltrados.map((usuario, index) => (
          <div
            key={usuario.ID}
            className={`list-group-item ${usuarioSeleccionado === usuario.ID ? 'list-group-item-primary' : ''} ${editandoId === usuario.ID ? 'border-warning' : ''}`}
            tabIndex={0}
            onFocus={() => setUsuarioSeleccionado(usuario.ID)}
            onKeyDown={(e) => handleKeyNavigation(e, index, usuario)}
            style={{ cursor: editandoId === usuario.ID ? 'default' : 'pointer' }}
          >
            {editandoId === usuario.ID ? (
              /* Formulario de edición inline */
              <div ref={editFormRef}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="mb-0 text-warning">
                    <i className="bi bi-pencil-square me-2"></i>
                    Editando Usuario #{usuario.ID}
                  </h6>
                  <div>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleUpdate(usuario.ID)}
                      onKeyDown={(e) => handleEditKeyDown(e, usuario.ID)}
                    >
                      <i className="bi bi-check-lg me-1"></i>
                      Guardar
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={cancelarEdicion}
                    >
                      <i className="bi bi-x-lg me-1"></i>
                      Cancelar
                    </button>
                  </div>
                </div>
                
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Nombre *</label>
                    <input
                      type="text"
                      name="Nombre"
                      value={form.Nombre || ''}
                      onChange={handleChange}
                      onKeyDown={(e) => handleEditKeyDown(e, usuario.ID)}
                      className="form-control"
                      placeholder="Nombre"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Apellido *</label>
                    <input
                      type="text"
                      name="Apellido"
                      value={form.Apellido || ''}
                      onChange={handleChange}
                      onKeyDown={(e) => handleEditKeyDown(e, usuario.ID)}
                      className="form-control"
                      placeholder="Apellido"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Dirección</label>
                    <div className="d-flex align-items-center mb-2">
                      <input
                        type="checkbox"
                        id={`noTieneDireccionEdit${usuario.ID}`}
                        className="form-check-input me-2"
                        checked={noTieneEdit.Direccion}
                        onChange={() => handleCheckboxEditChange('Direccion')}
                      />
                      <label className="form-check-label text-muted" htmlFor={`noTieneDireccionEdit${usuario.ID}`}>
                        No tiene dirección
                      </label>
                    </div>
                    <input
                      type="text"
                      name="Direccion"
                      value={form.Direccion || ''}
                      onChange={handleChange}
                      onKeyDown={(e) => handleEditKeyDown(e, usuario.ID)}
                      className="form-control"
                      placeholder="Dirección"
                      disabled={noTieneEdit.Direccion}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Teléfono</label>
                    <div className="d-flex align-items-center mb-2">
                      <input
                        type="checkbox"
                        id={`noTieneTelefonoEdit${usuario.ID}`}
                        className="form-check-input me-2"
                        checked={noTieneEdit.Telefono}
                        onChange={() => handleCheckboxEditChange('Telefono')}
                      />
                      <label className="form-check-label text-muted" htmlFor={`noTieneTelefonoEdit${usuario.ID}`}>
                        No tiene teléfono
                      </label>
                    </div>
                    <input
                      type="tel"
                      name="Telefono"
                      value={form.Telefono || ''}
                      onChange={handleChange}
                      onKeyDown={(e) => handleEditKeyDown(e, usuario.ID)}
                      className="form-control"
                      placeholder="Teléfono"
                      disabled={noTieneEdit.Telefono}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Celular</label>
                    <div className="d-flex align-items-center mb-2">
                      <input
                        type="checkbox"
                        id={`noTieneCelularEdit${usuario.ID}`}
                        className="form-check-input me-2"
                        checked={noTieneEdit.Celular}
                        onChange={() => handleCheckboxEditChange('Celular')}
                      />
                      <label className="form-check-label text-muted" htmlFor={`noTieneCelularEdit${usuario.ID}`}>
                        No tiene celular
                      </label>
                    </div>
                    <input
                      type="tel"
                      name="Celular"
                      value={form.Celular || ''}
                      onChange={handleChange}
                      onKeyDown={(e) => handleEditKeyDown(e, usuario.ID)}
                      className="form-control"
                      placeholder="Celular"
                      disabled={noTieneEdit.Celular}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Fecha de Nacimiento</label>
                    <div className="d-flex align-items-center mb-2">
                      <input
                        type="checkbox"
                        id={`noTieneFechaEdit${usuario.ID}`}
                        className="form-check-input me-2"
                        checked={noTieneEdit.FechaNacimiento}
                        onChange={() => handleCheckboxEditChange('FechaNacimiento')}
                      />
                      <label className="form-check-label text-muted" htmlFor={`noTieneFechaEdit${usuario.ID}`}>
                        No especificar fecha
                      </label>
                    </div>
                    <input
                      type="date"
                      name="FechaNacimiento"
                      value={form.FechaNacimiento || ''}
                      onChange={handleChange}
                      onKeyDown={(e) => handleEditKeyDown(e, usuario.ID)}
                      className="form-control"
                      disabled={noTieneEdit.FechaNacimiento}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      name="Email"
                      value={form.Email || ''}
                      onChange={handleChange}
                      onKeyDown={(e) => handleEditKeyDown(e, usuario.ID)}
                      className="form-control"
                      placeholder="email@ejemplo.com"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Ocupación</label>
                    <div className="d-flex align-items-center mb-2">
                      <input
                        type="checkbox"
                        id={`noTieneOcupacionEdit${usuario.ID}`}
                        className="form-check-input me-2"
                        checked={noTieneEdit.Ocupacion}
                        onChange={() => handleCheckboxEditChange('Ocupacion')}
                      />
                      <label className="form-check-label text-muted" htmlFor={`noTieneOcupacionEdit${usuario.ID}`}>
                        Sin ocupación
                      </label>
                    </div>
                    <input
                      type="text"
                      name="Ocupacion"
                      value={form.Ocupacion || ''}
                      onChange={handleChange}
                      onKeyDown={(e) => handleEditKeyDown(e, usuario.ID)}
                      className="form-control"
                      placeholder="Ocupación"
                      disabled={noTieneEdit.Ocupacion}
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* Vista normal del usuario */
              <div className="d-flex flex-column flex-lg-row justify-content-between">
                <div className="flex-grow-1 mb-3 mb-lg-0">
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="mb-2">
                        <i className="bi bi-person-circle me-2 text-primary"></i>
                        <strong>{usuario.Nombre} {usuario.Apellido}</strong>
                        <span className="badge bg-light text-dark ms-2"># {usuario.ID}</span>
                      </h6>
                      
                      <div className="mb-1">
                        <i className="bi bi-envelope me-2 text-muted"></i>
                        <small>{usuario.Email || 'No especificado'}</small>
                      </div>
                      
                      <div className="mb-1">
                        <i className="bi bi-geo-alt me-2 text-muted"></i>
                        <small>{usuario.Direccion || 'No especificada'}</small>
                      </div>
                      
                      <div className="mb-1">
                        <i className="bi bi-briefcase me-2 text-muted"></i>
                        <small>{usuario.Ocupacion || 'No especificada'}</small>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="mb-1">
                        <i className="bi bi-telephone me-2 text-muted"></i>
                        <small>Tel: {usuario.Telefono || 'No especificado'}</small>
                      </div>
                      
                      <div className="mb-1">
                        <i className="bi bi-phone me-2 text-muted"></i>
                        <small>Cel: {usuario.Celular || 'No especificado'}</small>
                      </div>
                      
                      <div className="mb-1">
                        <i className="bi bi-calendar-event me-2 text-muted"></i>
                        <small>Nac: {formatearFecha(usuario.FechaNacimiento)}</small>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="d-flex flex-column flex-sm-row gap-2">
                  <button
                    className="btn btn-outline-warning btn-sm"
                    onClick={() => handleEdit(usuario)}
                    disabled={cargando}
                  >
                    <i className="bi bi-pencil me-1"></i>
                    Editar
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => {
                      if (window.confirm(`¿Está seguro de eliminar a ${usuario.Nombre} ${usuario.Apellido}?`)) {
                        borrarUsuario(usuario.ID);
                      }
                    }}
                    disabled={cargando}
                  >
                    <i className="bi bi-trash me-1"></i>
                    Eliminar
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListadoUsuarios;