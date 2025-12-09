import React, { useState, useRef, useEffect } from 'react';

 // Componente de búsqueda avanzada para usuarios

const Buscador = ({ setFiltro, setFiltroTipo }) => {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [campoBusqueda, setCampoBusqueda] = useState('todos');
  const inputRef = useRef(null);
  const selectRef = useRef(null);

  // Opciones de campos para buscar
  const camposBusqueda = [
    { value: 'todos', label: 'Todos los campos' },
    { value: 'Nombre', label: 'Nombre' },
    { value: 'Apellido', label: 'Apellido' },
    { value: 'Email', label: 'Email' },
    { value: 'Direccion', label: 'Dirección' },
    { value: 'Telefono', label: 'Teléfono' },
    { value: 'Celular', label: 'Celular' },
    { value: 'Ocupacion', label: 'Ocupación' }
  ];

  // Aplicar filtro cuando cambie el término o el campo
  useEffect(() => {
    setFiltro(terminoBusqueda);
    setFiltroTipo(campoBusqueda);
  }, [terminoBusqueda, campoBusqueda, setFiltro, setFiltroTipo]);

  /** Maneja el cambio en el input de búsqueda
   @param {Event} e - Evento del input
   */
  const handleInputChange = (e) => {
    setTerminoBusqueda(e.target.value);
  };

  /** Maneja el cambio en el selector de campo
    @param {Event} e - Evento del select
   */
  const handleSelectChange = (e) => {
    setCampoBusqueda(e.target.value);
    // Enfocar el input después de cambiar el campo
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  /**
   * Maneja los eventos de teclado en el input
   * @param {KeyboardEvent} e - Evento de teclado
   */
  const handleInputKeyDown = (e) => {
    switch (e.key) {
      case 'Tab':
        // Tab pasa al selector si está presionado, o al siguiente elemento
        if (e.shiftKey) {
          // Shift+Tab - comportamiento por defecto
          return;
        }
        e.preventDefault();
        selectRef.current?.focus();
        break;
      case 'Enter':
        // Enter aplica la búsqueda (ya se aplica automáticamente por el useEffect)
        inputRef.current?.blur();
        break;
      case 'Escape':
        // Escape limpia la búsqueda
        setTerminoBusqueda('');
        inputRef.current?.blur();
        break;
      default:
        break;
    }
  };

  /**
   * Maneja los eventos de teclado en el selector
   * @param {KeyboardEvent} e - Evento de teclado
   */
  const handleSelectKeyDown = (e) => {
    if (e.key === 'Enter') {
      inputRef.current?.focus();
    }
  };

  // Limpia la búsqueda
  const limpiarBusqueda = () => {
    setTerminoBusqueda('');
    setCampoBusqueda('todos');
    inputRef.current?.focus();
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title mb-3">
          <i className="bi bi-search me-2"></i>
          Buscar Usuarios
        </h5>
        
        <div className="row g-3">
          {/* Campo de búsqueda */}
          <div className="col-md-8">
            <div className="position-relative">
              <input
                ref={inputRef}
                type="text"
                className="form-control"
                placeholder="Escriba su búsqueda..."
                value={terminoBusqueda}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                aria-label="Campo de búsqueda"
              />
              
              {/* Botón para limpiar búsqueda */}
              {terminoBusqueda && (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary position-absolute top-50 end-0 translate-middle-y me-2"
                  onClick={limpiarBusqueda}
                  aria-label="Limpiar búsqueda"
                  style={{ zIndex: 5 }}
                >
                  <i className="bi bi-x"></i>
                </button>
              )}
            </div>
            
            {/* Texto de ayuda */}
            <div className="form-text">
              <small>
                <strong>Atajos:</strong> Tab (siguiente campo), Enter (aplicar), Esc (limpiar)
              </small>
            </div>
          </div>
          
          {/* Selector de campo */}
          <div className="col-md-4">
            <select
              ref={selectRef}
              className="form-select"
              value={campoBusqueda}
              onChange={handleSelectChange}
              onKeyDown={handleSelectKeyDown}
              aria-label="Campo donde buscar"
            >
              {camposBusqueda.map(campo => (
                <option key={campo.value} value={campo.value}>
                  {campo.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Información de búsqueda activa */}
        {terminoBusqueda && (
          <div className="mt-3">
            <div className="alert alert-info py-2 mb-0">
              <i className="bi bi-info-circle me-2"></i>
              <strong>Buscando:</strong> "{terminoBusqueda}" 
              {campoBusqueda !== 'todos' && ` en ${camposBusqueda.find(c => c.value === campoBusqueda)?.label}`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Buscador;