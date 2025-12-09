    import { useParams, useNavigate } from "react-router-dom";
    import { useState, useCallback } from "react";

    /**
     * Componente para mostrar los detalles completos de una tarea
     * Incluye funcionalidad de descarga mejorada y navegación optimizada
     * 
     * @param {Array} tareas - Array de tareas disponibles
     * @param {Function} onDescargar - Función para descargar tarea como TXT (opcional, manejamos internamente)
     */
    function DetalleTarea({ tareas }) {
      const { id } = useParams();
      const navigate = useNavigate();
      const [descargando, setDescargando] = useState(false);

      /**
       * Formatea la fecha eliminando caracteres extra como el "0" final
       * @param {string} fechaString - String de fecha a formatear
       * @returns {string} - Fecha formateada sin caracteres extras
       */
      const formatearFecha = useCallback((fechaString) => {
        if (!fechaString) return 'No disponible';
        
        // Convertir a string y limpiar agresivamente
        let fechaLimpia = String(fechaString).trim();
        
        // Eliminar "0" sueltos al final 
        fechaLimpia = fechaLimpia.replace(/\s+0+$/, '');
        fechaLimpia = fechaLimpia.replace(/0+$/, '');
        fechaLimpia = fechaLimpia.replace(/[O0]+\s*$/, '');
        
        // Eliminar otros caracteres problemáticos al final
        fechaLimpia = fechaLimpia.replace(/[O\u0000-\u001F\u007F-\u009F]+$/, '');
        
        return fechaLimpia.trim();
      }, []);

      /**
       * Maneja la descarga del archivo TXT con contenido optimizado
       * Incluye toda la información relevante incluyendo prioridad
       */
      const manejarDescarga = useCallback(async () => {
        if (!tarea) return;
        
        setDescargando(true);
        
        try {
          // Crear contenido optimizado para el archivo TXT
          const contenido = `
    ╔═══════════════════════════════════════╗
    ║            DETALLE DE TAREA           ║
    ╚═══════════════════════════════════════╝

     TÍTULO: ${tarea.titulo}

     DESCRIPCIÓN:
    ${tarea.descripcion}

     INFORMACIÓN TEMPORAL:
    • Fecha de creación: ${formatearFecha(tarea.fecha)}
    ${(tarea.completa && tarea.fechaTerminada) ? 
      `• Fecha de finalización: ${formatearFecha(tarea.fechaTerminada)}` : 
      '• Estado: Pendiente de completar'
    }

     PRIORIDAD: ${tarea.prioridad ? 'ALTA - Tarea marcada como prioritaria' : 'NORMAL - Prioridad estándar'}

     ESTADO: ${tarea.completa ? 'COMPLETADA' : 'PENDIENTE'}

    ${tarea.completa ? 
      ' ¡Excelente! Has completado esta tarea exitosamente.' : 
      ' Esta tarea aún está pendiente de completar.'
    }

    ═══════════════════════════════════════
     Generado desde: Mi Aplicación de Tareas
     Fecha de exportación: ${formatearFecha(new Date().toLocaleString())}
     ID de tarea: #${tarea.id}
    ═══════════════════════════════════════
          `;

          // Crear y descargar el archivo de forma optimizada
          const blob = new Blob([contenido], { type: "text/plain;charset=utf-8" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          
          link.href = url;
          link.download = `tarea-${tarea.titulo.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase()}-${tarea.id}.txt`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          
        } catch (error) {
          console.error('Error al descargar archivo:', error);
          alert('Error al generar el archivo de descarga. Inténtalo nuevamente.');
        } finally {
          setDescargando(false);
        }
      }, [tarea, formatearFecha]);

      /**
      * Maneja la navegación hacia atrás de forma optimizada
      */
      const manejarVolver = useCallback(() => {
        navigate("/");
      }, [navigate]);

      // Si no se encuentra la tarea, mostrar error
      if (!tarea) {
        return (
          <div className="contenedor-formulario">
            <div className="container flex-grow-1 d-flex align-items-center">
              <div className="formulario-centrado text-center">
                <div className="mb-4">
                  <i className="bi bi-exclamation-triangle display-1 text-warning"></i>
                </div>
                <h3 className="mb-3">Tarea no encontrada</h3>
                <p className="texto-muted mb-4">
                  La tarea que buscas no existe o ha sido eliminada.
                </p>
                <button 
                  className="boton-primario"
                  onClick={manejarVolver}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Volver a la Lista
                </button>
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className="contenedor-formulario">
          {/* Header optimizado */}
          <header className="custom-header">
            <div className="container">
              <div className="row align-items-center">
                <div className="col">
                  <h1 className="d-flex align-items-center gap-3">
                    <i className="bi bi-card-text" style={{fontSize: '2rem'}}></i>
                    Detalle de Tarea
                  </h1>
                </div>
                <div className="col-auto">
                  <button 
                    type="button" 
                    className="boton-secundario"
                    onClick={manejarVolver}
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Volver
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Contenedor principal */}
          <div className="container flex-grow-1 d-flex align-items-center py-4">
            <div className="formulario-centrado">
              
              {/* Estado y prioridad*/}
              <div className="d-flex flex-wrap gap-3 mb-4">
                <span className={`badge px-3 py-2 ${
                  tarea.completa ? 'bg-success' : 'bg-warning text-dark'
                }`}>
                  <i className={`bi ${
                    tarea.completa ? 'bi-check-circle' : 'bi-clock'
                  } me-2`}></i>
                  {tarea.completa ? 'Completada' : 'Pendiente'}
                </span>
                
                {tarea.prioridad ? (
                  <span className="badge bg-warning text-dark px-3 py-2">
                    <i className="bi bi-star-fill me-2"></i>
                    Prioritaria
                  </span>
                ) : null}
              </div>

              {/* Título */}
              <div className="mb-4">
                <h2 className={`mb-0 ${tarea.completa ? 'texto-muted text-decoration-line-through' : ''}`}>
                  {tarea.titulo}
                </h2>
              </div>

              {/* Descripción */}
              <div className="mb-4">
                <h5 className="text-primary mb-3 d-flex align-items-center gap-2">
                  <i className="bi bi-card-text"></i>
                  Descripción
                </h5>
                <div className="bg-light p-4 rounded border">
                  <p className="mb-0 lh-lg" style={{whiteSpace: 'pre-line', wordBreak: 'break-word'}}>
                    {tarea.descripcion}
                  </p>
                </div>
              </div>

              {/* Información temporal */}
              <div className="mb-4">
                <h5 className="text-primary mb-3 d-flex align-items-center gap-2">
                  <i className="bi bi-calendar-event"></i>
                  Información Temporal
                </h5>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="bg-light p-3 rounded border h-100">
                      <h6 className="texto-muted mb-2 d-flex align-items-center gap-2">
                        <i className="bi bi-plus-circle"></i>
                        Fecha de Creación
                      </h6>
                      <p className="mb-0 fw-bold">
                        {formatearFecha(tarea.fecha)}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="bg-light p-3 rounded border h-100">
                      <h6 className="texto-muted mb-2 d-flex align-items-center gap-2">
                        <i className={`bi ${
                          tarea.completa ? 'bi-check-circle-fill' : 'bi-clock-history'
                        }`}></i>
                        {tarea.completa ? 'Fecha de Finalización' : 'Estado'}
                      </h6>
                      <p className="mb-0 fw-bold">
                        {(tarea.completa && tarea.fechaTerminada) 
                          ? formatearFecha(tarea.fechaTerminada)
                          : tarea.completa 
                            ? 'Completada (sin fecha registrada)'
                            : 'Pendiente de completar'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="d-flex flex-column flex-md-row gap-3 justify-content-between pt-4 border-top">
                <button 
                  className="boton-secundario"
                  onClick={manejarVolver}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Volver a la Lista
                </button>
                
                <button 
                  className="boton-primario"
                  onClick={manejarDescarga}
                  disabled={descargando}
                >
                  {descargando ? (
                    <>
                      <div className="spinner me-2"></div>
                      Generando archivo...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-download me-2"></i>
                      Descargar como TXT
                    </>
                  )}
                </button>
              </div>

              {/* Información adicional sobre la descarga */}
              <div className="mt-4 p-3 bg-light rounded text-center">
                <small className="texto-muted d-flex align-items-center justify-content-center gap-2">
                  <i className="bi bi-info-circle"></i>
                  El archivo incluirá toda la información de esta tarea con formato estructurado
                </small>
              </div>
            </div>
          </div>
        </div>
      );
    }

    export default DetalleTarea;