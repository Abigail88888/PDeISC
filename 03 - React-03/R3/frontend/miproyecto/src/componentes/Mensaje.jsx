import React from 'react';

/**
 * Componente para mostrar mensajes de éxito, error o advertencia
 * @param {Object} props - Props del componente
 * @param {Object} props.mensaje - Objeto con texto, tipo y visibilidad del mensaje
 * @param {string} props.mensaje.texto - Texto del mensaje a mostrar
 * @param {string} props.mensaje.tipo - Tipo de mensaje ('success', 'error', 'warning')
 * @param {boolean} props.mensaje.visible - Si el mensaje debe ser visible
 */
const Mensaje = ({ mensaje }) => {
  if (!mensaje.visible || !mensaje.texto) {
    return null;
  }

  /**
   * Determina la clase CSS según el tipo de mensaje
   * @param {string} tipo - Tipo de mensaje
   * @returns {string} Clase CSS de Bootstrap
   */
  const obtenerClase = (tipo) => {
    switch (tipo) {
      case 'success':
        return 'alert-success';
      case 'error':
        return 'alert-danger';
      case 'warning':
        return 'alert-warning';
      default:
        return 'alert-info';
    }
  };

  /**
   * Obtiene el ícono apropiado según el tipo de mensaje
   * @param {string} tipo - Tipo de mensaje
   * @returns {string} Clase del ícono
   */
  const obtenerIcono = (tipo) => {
    switch (tipo) {
      case 'success':
        return 'bi bi-check-circle-fill';
      case 'error':
        return 'bi bi-exclamation-triangle-fill';
      case 'warning':
        return 'bi bi-exclamation-circle-fill';
      default:
        return 'bi bi-info-circle-fill';
    }
  };

  return (
    <div className="row mb-3">
      <div className="col-12">
        <div 
          className={`alert ${obtenerClase(mensaje.tipo)} alert-dismissible fade show d-flex align-items-center`} 
          role="alert"
        >
          <i className={`${obtenerIcono(mensaje.tipo)} me-2`}></i>
          <div className="flex-grow-1">
            {mensaje.texto}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mensaje;