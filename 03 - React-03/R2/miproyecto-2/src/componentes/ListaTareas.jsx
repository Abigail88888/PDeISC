    import { Link } from "react-router-dom";
    import { useState, useMemo, useCallback } from "react";

    /**
    * Componente principal optimizado para mostrar y gestionar la lista de tareas
    */
    export default function ListaTareas({ tareas, onToggle, onDelete, onUpdatePriority }) {
      // Estados para la gestión de la interfaz
      const [mensaje, setMensaje] = useState(null);
      const [filtroEstado, setFiltroEstado] = useState('todas');
      const [ordenarPor, setOrdenarPor] = useState('fecha');
      const [menuAbierto, setMenuAbierto] = useState(false);
      const [tareaAEliminar, setTareaAEliminar] = useState(null);
      const [modalConfirmacion, setModalConfirmacion] = useState(false);

      /** Muestra un mensaje temporal en la interfaz
      */
      const mostrarMensaje = useCallback((texto, tipo = "info") => {
        setMensaje({ texto, tipo });
        setTimeout(() => setMensaje(null), 4000);
      }, []);

      /** Confirma eliminación de tarea
      */
      const confirmarEliminacion = useCallback((tarea) => {
        if (!tarea.completa) {
          mostrarMensaje("Solo puedes eliminar tareas completadas", "warning");
          return;
        }
        
        setTareaAEliminar(tarea);
        setModalConfirmacion(true);
      }, [mostrarMensaje]);

      /** Ejecuta la eliminación de la tarea
      */
      const ejecutarEliminacion = useCallback(async () => {
        if (!tareaAEliminar) return;
        
        try {
          await onDelete(tareaAEliminar.id);
          mostrarMensaje("Tarea eliminada correctamente", "success");
        } catch (error) {
          mostrarMensaje(`Error: ${error.message}`, "error");
        } finally {
          setModalConfirmacion(false);
          setTareaAEliminar(null);
        }
      }, [tareaAEliminar, onDelete, mostrarMensaje]);

      /** Cancela la eliminación
      */
      const cancelarEliminacion = useCallback(() => {
        setModalConfirmacion(false);
        setTareaAEliminar(null);
      }, []);

      /** Maneja el cambio de prioridad
      */
      const manejarCambioPrioridad = useCallback(async (tareaId, esPrioridad) => {
        try {
          await onUpdatePriority(tareaId, esPrioridad);
          mostrarMensaje(
            `Tarea ${esPrioridad ? 'marcada' : 'desmarcada'} como prioritaria`, 
            "success"
          );
        } catch (error) {
          mostrarMensaje(`Error al actualizar prioridad: ${error.message}`, "error");
        }
      }, [onUpdatePriority, mostrarMensaje]);

      const formatearFecha = useCallback((fechaString) => {
        if (!fechaString) return '';
        
        // Convertir a string si no lo es
        let fechaLimpia = String(fechaString).trim();
        
        // Eliminar "0" sueltos al final 
        fechaLimpia = fechaLimpia.replace(/\s+0+$/, '');
        fechaLimpia = fechaLimpia.replace(/0+$/, '');
        
        // Eliminar otros caracteres problemáticos al final
        fechaLimpia = fechaLimpia.replace(/[O\u0000-\u001F\u007F-\u009F]+$/, '');
        
        return fechaLimpia.trim();
      }, []);

      {/* Fechas corregidas */}
    <div className="d-flex flex-wrap gap-3 texto-pequeño">
      <small className="texto-muted">
        <i className="fas fa-calendar me-1"></i>
        Creada: {formatearFecha(tareas.fecha)}
      </small>
      {tareas.completa && tarea.fechaTerminada ? (
        <small className="text-success">
          <i className="fas fa-check-circle me-1"></i>
          Completada: {formatearFecha(tareas.fechaTerminada)}
        </small>
      ) : null}
    </div>

      /** Filtra y ordena las tareas
      */
      const tareasFiltradas = useMemo(() => {
        let resultado = [...tareas];
        
        switch (filtroEstado) {
          case 'pendientes':
            resultado = resultado.filter(t => !t.completa);
            break;
          case 'completadas':
            resultado = resultado.filter(t => t.completa);
            break;
          default:
            break;
        }
        
        resultado.sort((a, b) => {
          switch (ordenarPor) {
            case 'titulo':
              return a.titulo.localeCompare(b.titulo);
            case 'prioridad':
              if (a.prioridad !== b.prioridad) {
                return b.prioridad - a.prioridad;
              }
              return new Date(b.created_at || b.fecha) - new Date(a.created_at || a.fecha);
            case 'fecha':
            default:
              return new Date(b.created_at || b.fecha) - new Date(a.created_at || a.fecha);
          }
        });
        
        return resultado;
      }, [tareas, filtroEstado, ordenarPor]);

      /**
      * Alterna el menú móvil
      */
      const alternarMenu = useCallback(() => {
        setMenuAbierto(prev => !prev);
      }, []);

      return (
        <div className="main-container">
          {/* Header corregido */}
          <header className="custom-header">
            <div className="container">
              <div className="row align-items-center">
                <div className="col">
                  <h1 className="d-flex align-items-center gap-3">
                    <i className="bi bi-list-check" style={{fontSize: '2rem'}}></i>
                    Mis Tareas
                  </h1>
                </div>
                
                {/* Botones desktop */}
                <div className="col-auto botones-desktop">
                  <Link to="/crear" className="boton-primario">
                    <i className="bi bi-plus-circle"></i>
                    Nueva Tarea
                  </Link>
                </div>
                
                {/* Menú hamburguesa móvil */}
                <div className="col-auto d-md-none">
                  <button 
                    className="menu-hamburguesa"
                    onClick={alternarMenu}
                    aria-label="Abrir menú"
                    type="button"
                  >
                    {/* Usar Font Awesome como alternativa */}
                    <i className="fas fa-bars"></i>
                  </button>
                  
                  {menuAbierto && (
                    <div className="menu-desplegable">
                      <Link 
                        to="/crear" 
                        className="boton-primario d-block text-center mb-2"
                        onClick={() => setMenuAbierto(false)}
                      >
                        <i className="bi bi-plus-circle"></i>
                        Nueva Tarea
                      </Link>
                      
                      <div className="border-top pt-2">
                        <label className="form-label texto-pequeño fw-bold">Mostrar:</label>
                        <select 
                          className="form-select form-select-sm mb-2"
                          value={filtroEstado}
                          onChange={(e) => {
                            setFiltroEstado(e.target.value);
                            setMenuAbierto(false);
                          }}
                        >
                          <option value="todas">Todas las tareas</option>
                          <option value="pendientes">Pendientes</option>
                          <option value="completadas">Completadas</option>
                        </select>
                        
                        <label className="form-label texto-pequeño fw-bold">Ordenar:</label>
                        <select 
                          className="form-select form-select-sm"
                          value={ordenarPor}
                          onChange={(e) => {
                            setOrdenarPor(e.target.value);
                            setMenuAbierto(false);
                          }}
                        >
                          <option value="fecha">Por fecha</option>
                          <option value="titulo">Por título</option>
                          <option value="prioridad">Por prioridad</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          <div className="container py-4 flex-grow-1">
            {/* Mensaje de estado */}
            {mensaje && (
              <div className={`alert ${
                mensaje.tipo === 'success' ? 'alert-success' : 
                mensaje.tipo === 'warning' ? 'alert-warning' : 'alert-danger'
              } text-center animacion-aparecer`} role="alert">
                <i className={`bi ${
                  mensaje.tipo === 'success' ? 'bi-check-circle' : 
                  mensaje.tipo === 'warning' ? 'bi-exclamation-triangle' : 'bi-x-circle'
                } me-2`}></i>
                {mensaje.texto}
              </div>
            )}

            {/* Filtros desktop */}
            <div className="contenedor-filtros d-none d-md-block">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="d-flex flex-wrap gap-2 align-items-center">
                    <span className="fw-bold texto-muted">Mostrar:</span>
                    <div className="btn-group" role="group">
                      <input 
                        type="radio" 
                        className="btn-check" 
                        name="filtro" 
                        id="todas"
                        checked={filtroEstado === 'todas'}
                        onChange={() => setFiltroEstado('todas')}
                      />
                      <label className="btn btn-outline-primary btn-sm" htmlFor="todas">
                      Todas ({tareas?.length || 0})
                      </label>

                      <input 
                        type="radio" 
                        className="btn-check" 
                        name="filtro" 
                        id="pendientes"
                        checked={filtroEstado === 'pendientes'}
                        onChange={() => setFiltroEstado('pendientes')}
                      />
                      <label className="btn btn-outline-warning btn-sm" htmlFor="pendientes">
                        Pendientes ({tareas.filter(t => !t.completa).length})
                      </label>

                      <input 
                        type="radio" 
                        className="btn-check" 
                        name="filtro" 
                        id="completadas"
                        checked={filtroEstado === 'completadas'}
                        onChange={() => setFiltroEstado('completadas')}
                      />
                      <label className="btn btn-outline-success btn-sm" htmlFor="completadas">
                        Completadas ({tareas.filter(t => t.completa).length})
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center justify-content-md-end">
                    <label className="fw-bold texto-muted me-2" htmlFor="ordenamiento">
                      Ordenar:
                    </label>
                    <select 
                      id="ordenamiento"
                      className="form-select form-select-sm" 
                      style={{width: 'auto'}}
                      value={ordenarPor}
                      onChange={(e) => setOrdenarPor(e.target.value)}
                    >
                      <option value="fecha">Fecha de creación</option>
                      <option value="titulo">Título A-Z</option>
                      <option value="prioridad">Por prioridad</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Lista de tareas limpia */}
            {tareasFiltradas.length === 0 ? (
              <div className="text-center py-5">
                <div className="mb-4">
                  <i className="bi bi-inbox display-1 texto-muted"></i>
                </div>
                <h4 className="texto-muted mb-3">
                  {filtroEstado === 'todas' ? 'No hay tareas creadas' : 
                  filtroEstado === 'pendientes' ? 'No hay tareas pendientes' :
                  'No hay tareas completadas'}
                </h4>
                <p className="texto-muted mb-4">
                  {filtroEstado === 'todas' ? 'Crea tu primera tarea para comenzar' : 
                  'Prueba cambiando el filtro o crea una nueva tarea'}
                </p>
                <Link to="/crear" className="boton-primario">
                  <i className="bi bi-plus-circle"></i>
                  Crear Tarea
                </Link>
              </div>
            ) : (
              <div>
                {tareasFiltradas.map((tarea) => (
                  <div key={tarea.id} className="animacion-aparecer">
                    <div className={`tarea-card ${
                      tarea.completa ? 'completada' : ''
                    } ${tarea.prioridad ? 'prioritaria' : ''}`}>
                      
                      {/* Checkbox */}
                      <div 
                        className={`checkbox-custom ${tarea.completa ? 'marcado' : ''}`}
                        onClick={() => onToggle(tarea.id)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Marcar tarea como ${tarea.completa ? 'pendiente' : 'completada'}`}
                      ></div>
                      
                      {/* Contenido de la tarea */}
                      <div className="flex-grow-1">
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <h5 className={`mb-0 ${tarea.completa ? 'text-decoration-line-through texto-muted' : ''}`}>
                            {tarea.titulo}
                          </h5>
                          {tarea.prioridad ? (
                            <i className="bi bi-star-fill estrella-prioridad" aria-label="Tarea prioritaria"></i>
                          ) : null }
                        </div>
                        
                        <p className="texto-muted mb-2">
                          {tarea.descripcion.length > 120 
                            ? tarea.descripcion.substring(0, 120) + "..." 
                            : tarea.descripcion
                          }
                        </p>
                      
                      {/* Botones móviles */}
                      <div className="d-flex d-md-none flex-column gap-2 grupo-botones-mobile">
                        <Link 
                          to={`/tarea/${tarea.id}`} 
                          className="boton-secundario text-center"
                        >
                          <i className="fas fa-eye me-1"></i>
                          Ver Detalles
                        </Link>
                        
                        <button
                          className={`${
                            tarea.prioridad ? 'boton-advertencia' : 'boton-outline-warning'
                          }`}
                          onClick={() => manejarCambioPrioridad(tarea.id, !tarea.prioridad)}
                        >
                          <i className={`fas fa-star me-1`}></i>
                          {tarea.prioridad ? 'Quitar Prioridad' : 'Marcar Prioritaria'}
                        </button>
                        
                        <button
                          className={`${
                            tarea.completa ? 'boton-secundario' : 'boton-exito'
                          }`}
                          onClick={() => onToggle(tarea.id)}
                        >
                          <i className={`fas ${
                            tarea.completa ? 'fa-undo' : 'fa-check'
                          } me-1`}></i>
                          {tarea.completa ? 'Marcar Pendiente' : 'Completar Tarea'}
                        </button>
                        
                        <button 
                          className="boton-peligro" 
                          onClick={() => confirmarEliminacion(tarea)}
                          disabled={!tarea.completa}
                        >
                          <i className="fas fa-trash me-1"></i>
                          Eliminar Tarea
                        </button>
                      </div>
                      
                      {/* Botones desktop con texto descriptivo */}
                      <div className="d-none d-md-flex gap-2 align-items-start">
                        <Link 
                          to={`/tarea/${tarea.id}`} 
                          className="boton-secundario"
                        >
                          <i className="bi bi-eye me-1"></i>
                          Ver Detalles
                        </Link>
                        
                        <button
                          className={`${
                            tarea.prioridad ? 'boton-advertencia' : 'boton-outline-warning'
                          }`}
                          onClick={() => manejarCambioPrioridad(tarea.id, !tarea.prioridad)}
                          title={tarea.prioridad ? "Quitar prioridad" : "Marcar como prioritaria"}
                        >
                          <i className={`fas ${tarea.prioridad ? 'fa-star' : 'fa-star'} me-1`}></i>
                          {tarea.prioridad ? 'Quitar Prioridad' : 'Marcar Prioritaria'}
                        </button>
                        
                        <button
                          className={`${
                            tarea.completa ? 'boton-secundario' : 'boton-exito'
                          }`}
                          onClick={() => onToggle(tarea.id)}
                          title={tarea.completa ? "Marcar como pendiente" : "Marcar como completada"}
                        >
                          <i className={`bi ${
                            tarea.completa ? 'bi-arrow-clockwise' : 'bi-check-lg'
                          } me-1`}></i>
                          {tarea.completa ? 'Marcar Pendiente' : 'Completar Tarea'}
                        </button>
                        
                        <button 
                          className="boton-peligro" 
                          onClick={() => confirmarEliminacion(tarea)}
                          disabled={!tarea.completa}
                          title={tarea.completa ? "Eliminar tarea" : "Solo se pueden eliminar tareas completadas"}
                        >
                          <i className="bi bi-trash me-1"></i>
                          Eliminar Tarea
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Modal de confirmación */}
          {modalConfirmacion && (
            <div className="modal-overlay" onClick={cancelarEliminacion}>
              <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
                <div className="mb-3">
                  <i className="bi bi-exclamation-triangle text-warning" style={{fontSize: '3rem'}}></i>
                </div>
                <h4 className="mb-3">Confirmar Eliminación</h4>
                <p className="texto-muted mb-4">
                  ¿Estás seguro de que deseas eliminar la tarea "{tareaAEliminar?.titulo}"?
                  <br />
                  <small>Esta acción no se puede deshacer.</small>
                </p>
                <div className="d-flex gap-3 justify-content-center">
                  <button 
                    className="boton-secundario"
                    onClick={cancelarEliminacion}
                  >
                    <i className="bi bi-x-circle me-1"></i>
                    Cancelar
                  </button>
                  <button 
                    className="boton-peligro"
                    onClick={ejecutarEliminacion}
                  >
                    <i className="bi bi-trash me-1"></i>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }