    import { useState, useCallback } from "react";
    import { useNavigate } from "react-router-dom";

    /**
    * Componente para crear una nueva tarea
     @param {Function} onAgregarTarea - Función para agregar nueva tarea a la lista
    */
    function CrearTarea({ onAgregarTarea }) {
      // Estados para el formulario
      const [titulo, setTitulo] = useState("");
      const [descripcion, setDescripcion] = useState("");
      const [prioridad, setPrioridad] = useState(false);
      const [sinDescripcion, setSinDescripcion] = useState(false);
      const [error, setError] = useState("");
      const [enviando, setEnviando] = useState(false);
      
      const navigate = useNavigate();

      /**
      * Aplicar límites específicos y validaciones mejoradas
      * @returns {boolean} - true si los datos son válidos, false en caso contrario
      */
      const validarFormulario = useCallback(() => {
        const tituloLimpio = titulo.trim();
        const descripcionLimpia = descripcion.trim();

        // Validación del título con límite de 20 caracteres
        if (!tituloLimpio) {
          setError("El título es obligatorio");
          return false;
        }

        if (tituloLimpio.length < 3) {
          setError("El título debe tener al menos 3 caracteres");
          return false;
        }

        if (tituloLimpio.length > 20) {
          setError("El título no puede superar los 20 caracteres");
          return false;
        }

        if (/^\d+$/.test(tituloLimpio)) {
          setError("El título no puede ser solo números");
          return false;
        }

        // Validación de la descripción (solo si no está marcada como sin descripción)
        if (!sinDescripcion) {
          if (!descripcionLimpia) {
            setError("La descripción es obligatoria o marca la casilla 'Sin descripción'");
            return false;
          }

          if (descripcionLimpia.length < 5) {
            setError("La descripción debe tener al menos 5 caracteres");
            return false;
          }

          // Validar que la descripción no sea solo números
          if (/^\d+$/.test(descripcionLimpia)) {
            setError("La descripción debe contener texto, no solo números");
            return false;
          }
        }

        // Limpiar errores si todo está correcto
        setError("");
        return true;
      }, [titulo, descripcion, sinDescripcion]);

      /**
      * Maneja el envío del formulario de forma optimizada
      * Incluye validación, envío de datos y navegación
      * @param {Event} e - Evento del formulario
      */
      const manejarEnvio = useCallback(async (e) => {
        e.preventDefault();
        
        if (!validarFormulario()) return;
        
        setEnviando(true);
        
        try {
          const datosNuevaTarea = {
            titulo: titulo.trim(),
            descripcion: sinDescripcion ? "Sin descripción especificada" : descripcion.trim(),
            prioridad: prioridad
          };

          const resultado = await onAgregarTarea(datosNuevaTarea);
          
          if (resultado.success) {
            // Limpiar formulario
            setTitulo("");
            setDescripcion("");
            setPrioridad(false);
            setSinDescripcion(false);
            setError("");
            
            // Navegar inmediatamente
            navigate("/");
          } else {
            setError(resultado.message || "Error al crear la tarea");
          }
        } catch (err) {
          setError("Error inesperado. Inténtalo nuevamente");
          console.error("Error al crear tarea:", err);
        } finally {
          setEnviando(false);
        }
      }, [titulo, descripcion, prioridad, sinDescripcion, validarFormulario, onAgregarTarea, navigate]);

      /**
      * Maneja la navegación hacia atrás con confirmación si hay datos
      */
      const manejarVolver = useCallback(() => {
        const hayDatos = titulo.trim() || descripcion.trim();
        
        if (hayDatos && !enviando) {
          const confirmar = window.confirm(
            "¿Estás seguro de que quieres salir? Se perderán los datos no guardados."
          );
          if (!confirmar) return;
        }
        
        navigate("/");
      }, [titulo, descripcion, enviando, navigate]);

      /**
      * Limpia todos los campos del formulario
      */
      const limpiarFormulario = useCallback(() => {
        setTitulo("");
        setDescripcion("");
        setPrioridad(false);
        setSinDescripcion(false);
        setError("");
      }, []);

      /**
      * Maneja el cambio en el checkbox de "sin descripción"
      * @param {Event} e - Evento del checkbox
      */
      const manejarSinDescripcion = useCallback((e) => {
        const marcado = e.target.checked;
        setSinDescripcion(marcado);
        if (marcado) {
          setDescripcion("");
          setError("");
        }
      }, []);

      return (
        <div className="contenedor-formulario">
          {/* Header optimizado */}
          <header className="custom-header">
            <div className="container">
              <div className="row align-items-center">
                <div className="col">
                  <h1 className="d-flex align-items-center gap-3">
                    <i className="bi bi-plus-circle" style={{fontSize: '2rem'}}></i>
                    Nueva Tarea
                  </h1>
                </div>
                <div className="col-auto">
                  <button 
                    type="button" 
                    className="boton-secundario"
                    onClick={manejarVolver}
                    disabled={enviando}
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Volver
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Contenedor principal centrado */}
          <div className="container flex-grow-1 d-flex align-items-center py-4">
            <div className="formulario-centrado">
              
              {/* Mensaje de error */}
              {error && (
                <div className="alert alert-danger d-flex align-items-center mb-4 animacion-aparecer" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  <div>{error}</div>
                </div>
              )}
              
              <form onSubmit={manejarEnvio} noValidate>
                
                {/* Campo Título */}
                <div className="mb-4">
                  <label htmlFor="titulo" className="form-label fw-bold d-flex align-items-center gap-2">
                    <i className="bi bi-card-heading"></i>
                    Título de la tarea *
                    <small className="texto-muted">
                      ({titulo.length}/20)
                    </small>
                  </label>
                  <input
                    id="titulo"
                    type="text"
                    className={`input-personalizado ${error && titulo.length === 0 ? "is-invalid" : ""}`}
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value.slice(0, 20))}
                    placeholder="Ej: Estudiar para examen"
                    disabled={enviando}
                    maxLength={20}
                    autoComplete="off"
                    autoFocus
                  />
                  <div className="form-text d-flex align-items-center gap-1">
                    <i className="bi bi-info-circle"></i>
                    Máximo 20 caracteres, mínimo 3, no puede ser solo números
                  </div>
                </div>

                {/* Checkbox para descripción opcional */}
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="sinDescripcion"
                      checked={sinDescripcion}
                      onChange={manejarSinDescripcion}
                      disabled={enviando}
                    />
                    <label className="form-check-label fw-bold" htmlFor="sinDescripcion">
                      <i className="bi bi-text-paragraph me-1"></i>
                      Crear tarea sin descripción detallada
                    </label>
                  </div>
                  <small className="texto-muted">
                    Marca esta opción si no necesitas agregar una descripción
                  </small>
                </div>

                {/* Campo Descripción condicional */}
                {!sinDescripcion && (
                  <div className="mb-4">
                    <label htmlFor="descripcion" className="form-label fw-bold d-flex align-items-center gap-2">
                      <i className="bi bi-card-text"></i>
                      Descripción detallada *
                    </label>
                    <textarea
                      id="descripcion"
                      className={`textarea-personalizado ${error && descripcion.length === 0 ? "is-invalid" : ""}`}
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                      rows={4}
                      placeholder="Describe detalladamente qué necesitas hacer..."
                      disabled={enviando}
                    />
                    <div className="form-text d-flex align-items-center gap-1">
                      <i className="bi bi-info-circle"></i>
                      Mínimo 5 caracteres, debe contener texto (no solo números)
                    </div>
                  </div>
                )}

                {/* Campo Prioridad optimizado */}
                <div className="mb-4">
                  <div className="card bg-light border-0 p-3">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="prioridad"
                        checked={prioridad}
                        onChange={(e) => setPrioridad(e.target.checked)}
                        disabled={enviando}
                      />
                      <label className="form-check-label fw-bold d-flex align-items-center gap-2" htmlFor="prioridad">
                        <i className="bi bi-star text-warning"></i>
                        Marcar como tarea prioritaria
                      </label>
                    </div>
                    <small className="texto-muted mt-2">
                      Las tareas prioritarias aparecen primero y se destacan visualmente
                    </small>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="d-flex flex-column flex-md-row gap-3 justify-content-between pt-3 border-top">
                  {/* Botones secundarios */}
                  <div className="d-flex gap-2">
                    <button 
                      type="button" 
                      className="boton-secundario"
                      onClick={manejarVolver}
                      disabled={enviando}
                    >
                      <i className="bi bi-x-circle"></i>
                      Cancelar
                    </button>
                    
                    <button 
                      type="button" 
                      className="boton-secundario"
                      onClick={limpiarFormulario}
                      disabled={enviando || (!titulo && !descripcion)}
                    >
                      <i className="bi bi-eraser"></i>
                      Limpiar
                    </button>
                  </div>
                  
                  {/* Botón principal */}
                  <button 
                    className="boton-primario" 
                    type="submit"
                    disabled={enviando || !titulo.trim() || (!sinDescripcion && !descripcion.trim())}
                  >
                    {enviando ? (
                      <>
                        <div className="spinner me-2"></div>
                        Guardando...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        Crear Tarea
                      </>
                    )}
                  </button>
                </div>

                {/* Consejitos */}
                <div className="mt-4 p-3 bg-light rounded">
                  <h6 className="texto-muted mb-2 d-flex align-items-center gap-2">
                    <i className="bi bi-lightbulb"></i>
                    Consejos para crear tareas efectivas:
                  </h6>
                  <ul className="texto-muted small mb-0 ps-3">
                    <li>Usa títulos claros y específicos (máximo 20 caracteres)</li>
                    <li>Si agregas descripción, incluye pasos o contexto importante</li>
                    <li>Marca como prioritaria solo las tareas realmente urgentes</li>
                    <li>Puedes crear tareas simples sin descripción si no es necesaria</li>
                  </ul>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }

    export default CrearTarea;