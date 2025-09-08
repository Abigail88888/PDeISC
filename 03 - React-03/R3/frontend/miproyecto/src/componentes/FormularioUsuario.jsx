import React, { useState, useRef } from 'react';

const FormularioUsuario = ({ agregarUsuario, cargando }) => {
  // Estado inicial del formulario
  const [form, setForm] = useState({
    Nombre: '',
    Apellido: '',
    Direccion: '',
    Telefono: '',
    Celular: '',
    FechaNacimiento: '',
    Email: '',
    Ocupacion: ''
  });

  // Estados para checkboxes "no tiene"
  const [noTiene, setNoTiene] = useState({
    Direccion: false,
    Telefono: false,
    Celular: false,
    FechaNacimiento: false,
    Ocupacion: false
  });

  // Estados para validación
  const [errores, setErrores] = useState({});
  const [tocados, setTocados] = useState({});

  // Referencias para navegación
  const formRef = useRef(null);

  // Reglas de validación para cada campo
  const validaciones = {
    Nombre: {
      requerido: true,
      minLength: 2,
      maxLength: 15,
      pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      mensaje: 'El nombre debe tener entre 2 y 15 caracteres y solo contener letras'
    },
    Apellido: {
      requerido: true,
      minLength: 2,
      maxLength: 15,
      pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      mensaje: 'El apellido debe tener entre 2 y 15 caracteres y solo contener letras'
    },
    Direccion: {
      requerido: false,
      minLength: 5,
      maxLength: 100,
      pattern: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\.,#\-°º]+$/,
      mensaje: 'La dirección debe tener entre 5 y 100 caracteres. Ejemplo: "Calle Falsa 123, Ciudad"'
    },
    Telefono: {
      requerido: false,
      pattern: /^[\d\s\-\+\(\)]{7,15}$/,
      mensaje: 'El teléfono debe tener entre 7 y 15 dígitos. Ejemplo: "011-1234-5678"'
    },
    Celular: {
      requerido: false,
      pattern: /^[\d\s\-\+\(\)]{7,15}$/,
      mensaje: 'El celular debe tener entre 7 y 15 dígitos. Ejemplo: "011-9876-5432"'
    },
    FechaNacimiento: {
      requerido: false,
      custom: (value) => {
        if (!value) return true; // No requerido
        const fecha = new Date(value);
        const hoy = new Date();
        const hace100Anos = new Date();
        hace100Anos.setFullYear(hoy.getFullYear() - 100);
        
        return fecha <= hoy && fecha >= hace100Anos;
      },
      mensaje: 'Debe ser una fecha válida (no mayor a hoy, no menor a 100 años)'
    },
    Email: {
      requerido: true,
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      mensaje: 'Debe ser un email válido (ejemplo@mail.com)'
    },
    Ocupacion: {
      requerido: false,
      minLength: 3,
      maxLength: 50,
      pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      mensaje: 'La ocupación debe tener entre 3 y 50 caracteres y solo contener letras'
    }
  };

  /**
   * Valida un campo específico
   */
  const validarCampo = (campo, valor) => {
    const reglas = validaciones[campo];
    if (!reglas) return null;

    // Si está marcado "no tiene", el campo está válido
    if (noTiene[campo]) return null;

    // Campo requerido
    if (reglas.requerido && (!valor || !valor.trim())) {
      return `${campo} es obligatorio`;
    }

    // Si el campo no es requerido y está vacío, es válido
    if (!reglas.requerido && (!valor || !valor.trim())) {
      return null;
    }

    // Longitud mínima
    if (reglas.minLength && valor.length < reglas.minLength) {
      return reglas.mensaje;
    }

    // Longitud máxima
    if (reglas.maxLength && valor.length > reglas.maxLength) {
      return reglas.mensaje;
    }

    // Patrón
    if (reglas.pattern && !reglas.pattern.test(valor)) {
      return reglas.mensaje;
    }

    // Validación personalizada
    if (reglas.custom && !reglas.custom(valor)) {
      return reglas.mensaje;
    }

    return null;
  };

  /**
   * Valida todo el formulario
   */
  const validarFormulario = () => {
    const nuevosErrores = {};
    let esValido = true;

    Object.keys(validaciones).forEach(campo => {
      const error = validarCampo(campo, form[campo]);
      if (error) {
        nuevosErrores[campo] = error;
        esValido = false;
      }
    });

    setErrores(nuevosErrores);
    return esValido;
  };

  /**
   * Maneja cambios en los inputs
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setForm(prev => ({ ...prev, [name]: value }));
    setTocados(prev => ({ ...prev, [name]: true }));
    
    if (tocados[name]) {
      const error = validarCampo(name, value);
      setErrores(prev => ({ 
        ...prev, 
        [name]: error 
      }));
    }
  };

  /**
   * Maneja cambios en los checkboxes "no tiene"
   */
  const handleCheckboxChange = (campo) => {
    setNoTiene(prev => {
      const nuevoEstado = { ...prev, [campo]: !prev[campo] };
      
      // Si marca "no tiene", limpiar el campo
      if (nuevoEstado[campo]) {
        setForm(prevForm => ({ ...prevForm, [campo]: '' }));
        setErrores(prevErrores => ({ ...prevErrores, [campo]: null }));
      }
      
      return nuevoEstado;
    });
  };

  /**
   * Maneja el evento blur
   */
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTocados(prev => ({ ...prev, [name]: true }));
    
    const error = validarCampo(name, value);
    setErrores(prev => ({ ...prev, [name]: error }));
  };

  /**
   * Maneja eventos de teclado
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const inputs = formRef.current.querySelectorAll('input:not([disabled]), select, textarea');
      const currentIndex = Array.from(inputs).indexOf(e.target);
      
      if (currentIndex < inputs.length - 1) {
        inputs[currentIndex + 1].focus();
      } else {
        handleSubmit(e);
      }
    }
    
    if (e.key === 'Escape') {
      limpiarFormulario();
    }
  };

  /**
   * Maneja el envío del formulario
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const todosTocados = {};
    Object.keys(form).forEach(campo => {
      todosTocados[campo] = true;
    });
    setTocados(todosTocados);
    
    if (validarFormulario()) {
      // Preparar datos para enviar
      const datosEnvio = { ...form };
      
      // Limpiar campos marcados como "no tiene"
      Object.keys(noTiene).forEach(campo => {
        if (noTiene[campo]) {
          datosEnvio[campo] = '';
        }
      });
      
      agregarUsuario(datosEnvio);
      limpiarFormulario();
    }
  };

  /**
   * Limpia el formulario
   */
  const limpiarFormulario = () => {
    setForm({
      Nombre: '',
      Apellido: '',
      Direccion: '',
      Telefono: '',
      Celular: '',
      FechaNacimiento: '',
      Email: '',
      Ocupacion: ''
    });
    setNoTiene({
      Direccion: false,
      Telefono: false,
      Celular: false,
      FechaNacimiento: false,
      Ocupacion: false
    });
    setErrores({});
    setTocados({});
    
    const firstInput = formRef.current?.querySelector('input');
    firstInput?.focus();
  };

  const erroresActivos = Object.values(errores).filter(Boolean).length;

  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h4 className="mb-0">
          <i className="bi bi-person-plus-fill me-2"></i>
          Agregar Nuevo Usuario
        </h4>
      </div>
      
      <div className="card-body">
        {/* Resumen de errores */}
        {erroresActivos > 0 && (
          <div className="alert alert-warning mb-4">
            <i className="bi bi-exclamation-triangle me-2"></i>
            <strong>Por favor corrija los siguientes errores:</strong>
            <ul className="mb-0 mt-2">
              {Object.entries(errores).map(([campo, error]) => 
                error && (
                  <li key={campo}>
                    <strong>{campo}:</strong> {error}
                  </li>
                )
              )}
            </ul>
          </div>
        )}

        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="row g-4">
            {/* Nombre */}
            <div className="col-md-6">
              <label className="form-label">
                Nombre *
                <span className="text-muted ms-1">(2-15 caracteres, solo letras)</span>
              </label>
              <input
                type="text"
                name="Nombre"
                value={form.Nombre}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className={`form-control ${errores.Nombre ? 'is-invalid' : tocados.Nombre && !errores.Nombre ? 'is-valid' : ''}`}
                placeholder="Juan"
                disabled={cargando}
                autoFocus
              />
              {errores.Nombre && <div className="invalid-feedback">{errores.Nombre}</div>}
            </div>

            {/* Apellido */}
            <div className="col-md-6">
              <label className="form-label">
                Apellido *
                <span className="text-muted ms-1">(2-15 caracteres, solo letras)</span>
              </label>
              <input
                type="text"
                name="Apellido"
                value={form.Apellido}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className={`form-control ${errores.Apellido ? 'is-invalid' : tocados.Apellido && !errores.Apellido ? 'is-valid' : ''}`}
                placeholder="Pérez"
                disabled={cargando}
              />
              {errores.Apellido && <div className="invalid-feedback">{errores.Apellido}</div>}
            </div>

            {/* Dirección */}
            <div className="col-md-6">
              <label className="form-label">
                Dirección
                <span className="text-muted ms-1">(Ejemplo: Av. Rivadavia 1234, CABA)</span>
              </label>
              <div className="d-flex align-items-center mb-2">
                <input
                  type="checkbox"
                  id="noTieneDireccion"
                  className="form-check-input me-2"
                  checked={noTiene.Direccion}
                  onChange={() => handleCheckboxChange('Direccion')}
                />
                <label className="form-check-label text-muted" htmlFor="noTieneDireccion">
                  No tiene dirección
                </label>
              </div>
              <input
                type="text"
                name="Direccion"
                value={form.Direccion}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className={`form-control ${errores.Direccion ? 'is-invalid' : tocados.Direccion && !errores.Direccion ? 'is-valid' : ''}`}
                placeholder="Av. Corrientes 1234, CABA"
                disabled={cargando || noTiene.Direccion}
              />
              {errores.Direccion && <div className="invalid-feedback">{errores.Direccion}</div>}
            </div>

            {/* Teléfono */}
            <div className="col-md-6">
              <label className="form-label">
                Teléfono
                <span className="text-muted ms-1">(Ejemplo: 011-1234-5678)</span>
              </label>
              <div className="d-flex align-items-center mb-2">
                <input
                  type="checkbox"
                  id="noTieneTelefono"
                  className="form-check-input me-2"
                  checked={noTiene.Telefono}
                  onChange={() => handleCheckboxChange('Telefono')}
                />
                <label className="form-check-label text-muted" htmlFor="noTieneTelefono">
                  No tiene teléfono fijo
                </label>
              </div>
              <input
                type="tel"
                name="Telefono"
                value={form.Telefono}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className={`form-control ${errores.Telefono ? 'is-invalid' : tocados.Telefono && !errores.Telefono ? 'is-valid' : ''}`}
                placeholder="011-1234-5678"
                disabled={cargando || noTiene.Telefono}
              />
              {errores.Telefono && <div className="invalid-feedback">{errores.Telefono}</div>}
            </div>

            {/* Celular */}
            <div className="col-md-6">
              <label className="form-label">
                Celular
                <span className="text-muted ms-1">(Ejemplo: 011-9876-5432)</span>
              </label>
              <div className="d-flex align-items-center mb-2">
                <input
                  type="checkbox"
                  id="noTieneCelular"
                  className="form-check-input me-2"
                  checked={noTiene.Celular}
                  onChange={() => handleCheckboxChange('Celular')}
                />
                <label className="form-check-label text-muted" htmlFor="noTieneCelular">
                  No tiene celular
                </label>
              </div>
              <input
                type="tel"
                name="Celular"
                value={form.Celular}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className={`form-control ${errores.Celular ? 'is-invalid' : tocados.Celular && !errores.Celular ? 'is-valid' : ''}`}
                placeholder="011-9876-5432"
                disabled={cargando || noTiene.Celular}
              />
              {errores.Celular && <div className="invalid-feedback">{errores.Celular}</div>}
            </div>

            {/* Fecha de Nacimiento */}
            <div className="col-md-6">
              <label className="form-label">
                Fecha de Nacimiento
                <span className="text-muted ms-1">(Formato: DD/MM/AAAA)</span>
              </label>
              <div className="d-flex align-items-center mb-2">
                <input
                  type="checkbox"
                  id="noTieneFecha"
                  className="form-check-input me-2"
                  checked={noTiene.FechaNacimiento}
                  onChange={() => handleCheckboxChange('FechaNacimiento')}
                />
                <label className="form-check-label text-muted" htmlFor="noTieneFecha">
                  No especificar fecha de nacimiento
                </label>
              </div>
              <input
                type="date"
                name="FechaNacimiento"
                value={form.FechaNacimiento}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className={`form-control ${errores.FechaNacimiento ? 'is-invalid' : tocados.FechaNacimiento && !errores.FechaNacimiento ? 'is-valid' : ''}`}
                max={new Date().toISOString().split('T')[0]}
                disabled={cargando || noTiene.FechaNacimiento}
              />
              {errores.FechaNacimiento && <div className="invalid-feedback">{errores.FechaNacimiento}</div>}
            </div>

            {/* Email */}
            <div className="col-md-6">
              <label className="form-label">
                Email *
                <span className="text-muted ms-1">(Ejemplo: juan@ejemplo.com)</span>
              </label>
              <input
                type="email"
                name="Email"
                value={form.Email}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className={`form-control ${errores.Email ? 'is-invalid' : tocados.Email && !errores.Email ? 'is-valid' : ''}`}
                placeholder="juan@ejemplo.com"
                disabled={cargando}
              />
              {errores.Email && <div className="invalid-feedback">{errores.Email}</div>}
            </div>

            {/* Ocupación */}
            <div className="col-md-6">
              <label className="form-label">
                Ocupación
                <span className="text-muted ms-1">(Ejemplo: Desarrollador, Diseñador)</span>
              </label>
              <div className="d-flex align-items-center mb-2">
                <input
                  type="checkbox"
                  id="noTieneOcupacion"
                  className="form-check-input me-2"
                  checked={noTiene.Ocupacion}
                  onChange={() => handleCheckboxChange('Ocupacion')}
                />
                <label className="form-check-label text-muted" htmlFor="noTieneOcupacion">
                  Sin ocupación específica
                </label>
              </div>
              <input
                type="text"
                name="Ocupacion"
                value={form.Ocupacion}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className={`form-control ${errores.Ocupacion ? 'is-invalid' : tocados.Ocupacion && !errores.Ocupacion ? 'is-valid' : ''}`}
                placeholder="Desarrollador Web"
                disabled={cargando || noTiene.Ocupacion}
              />
              {errores.Ocupacion && <div className="invalid-feedback">{errores.Ocupacion}</div>}
            </div>
          </div>

          {/* Botones */}
          <div className="row mt-4">
            <div className="col-12">
              <div className="d-flex gap-3 flex-wrap">
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={cargando || erroresActivos > 0}
                >
                  {cargando ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Guardando...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-lg me-2"></i>
                      Agregar Usuario
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={limpiarFormulario}
                  disabled={cargando}
                >
                  <i className="bi bi-arrow-clockwise me-2"></i>
                  Limpiar Formulario
                </button>
              </div>
              
              {erroresActivos > 0 && (
                <div className="mt-3">
                  <small className="text-warning">
                    <i className="bi bi-exclamation-triangle me-1"></i>
                    Corrija {erroresActivos} error{erroresActivos !== 1 ? 'es' : ''} antes de continuar.
                  </small>
                </div>
              )}
            </div>
          </div>
        </form>
        
        {/* Estadísticas del formulario */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="card bg-light">
              <div className="card-body py-2">
                <div className="row text-center">
                  <div className="col-4">
                    <small className="text-muted">Campos Completados</small>
                    <div className="fw-bold text-primary">
                      {Object.values(form).filter(v => v.trim()).length} / {Object.keys(form).length}
                    </div>
                  </div>
                  <div className="col-4">
                    <small className="text-muted">Campos Válidos</small>
                    <div className="fw-bold text-success">
                      {Object.keys(form).length - erroresActivos} / {Object.keys(form).length}
                    </div>
                  </div>
                  <div className="col-4">
                    <small className="text-muted">Errores</small>
                    <div className={`fw-bold ${erroresActivos > 0 ? 'text-danger' : 'text-success'}`}>
                      {erroresActivos}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioUsuario;