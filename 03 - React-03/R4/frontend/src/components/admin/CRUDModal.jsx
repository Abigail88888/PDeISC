import { useState, useEffect } from 'react';
import Modal from '../common/Modal';

/**
 * CRUD MODAL - Modal genérico para crear/editar elementos
 * Recibe configuración de campos y maneja el formulario
 */
export default function CRUDModal({ 
  isOpen, 
  onClose, 
  onSave, 
  title, 
  fields, 
  initialData = null,
  loading = false
}) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  // Inicializar datos del formulario
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Crear objeto vacío con todos los campos
      const emptyData = {};
      fields.forEach(field => {
        emptyData[field.name] = field.type === 'number' ? 0 : '';
      });
      setFormData(emptyData);
    }
    setErrors({});
  }, [initialData, fields, isOpen]);

  /**
   * Manejar cambios en inputs
   */
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  /**
   * Validar formulario
   */
  const validate = () => {
    const newErrors = {};
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} es obligatorio`;
      }
      // Validación de número
      if (field.type === 'number' && field.min !== undefined && formData[field.name] < field.min) {
        newErrors[field.name] = `Debe ser mayor o igual a ${field.min}`;
      }
      if (field.type === 'number' && field.max !== undefined && formData[field.name] > field.max) {
        newErrors[field.name] = `Debe ser menor o igual a ${field.max}`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Manejar submit
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await onSave(formData);
  };

  /**
   * Renderizar campo según tipo
   */
  const renderField = (field) => {
    const commonClasses = `
      w-full px-4 py-3
      bg-code-bg-tertiary
      border ${errors[field.name] ? 'border-status-error' : 'border-border-code'}
      rounded-lg
      text-text-primary
      placeholder-text-muted
      font-mono text-sm
      focus:outline-none
      focus:border-syntax-blue
      focus:ring-2
      focus:ring-syntax-blue/20
      transition-all
    `;

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            placeholder={field.placeholder}
            rows={field.rows || 4}
            className={commonClasses}
            disabled={loading}
          />
        );
      
      case 'select':
        return (
          <select
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            className={commonClasses}
            disabled={loading}
          >
            <option value="">Seleccionar...</option>
            {field.options?.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );
      
      case 'number':
        return (
          <input
            type="number"
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            placeholder={field.placeholder}
            min={field.min}
            max={field.max}
            className={commonClasses}
            disabled={loading}
          />
        );
      
      case 'date':
        return (
          <input
            type="date"
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            className={commonClasses}
            disabled={loading}
          />
        );
      
      default:
        return (
          <input
            type={field.type || 'text'}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            placeholder={field.placeholder}
            className={commonClasses}
            disabled={loading}
          />
        );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campos del formulario */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map(field => (
            <div
              key={field.name}
              className={field.fullWidth ? 'md:col-span-2' : ''}
            >
              <label className="block text-text-secondary text-sm font-mono mb-2">
                {field.icon && <i className={`${field.icon} mr-2 text-syntax-cyan`}></i>}
                {field.label}
                {field.required && <span className="text-status-error ml-1">*</span>}
              </label>
              {renderField(field)}
              {errors[field.name] && (
                <p className="text-status-error text-xs font-mono mt-1">
                  <i className="fas fa-exclamation-circle mr-1"></i>
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Botones */}
        <div className="flex gap-4 pt-4 border-t border-border-code">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              flex-1
              px-6 py-3
              bg-code-bg-tertiary
              border border-border-code
              text-text-primary
              font-mono
              rounded-lg
              hover:bg-code-bg-primary
              disabled:opacity-50
              transition-all
            "
          >
            <i className="fas fa-times mr-2"></i>
            Cancelar
          </button>

          <button
            type="submit"
            disabled={loading}
            className="
              flex-1
              px-6 py-3
              bg-gradient-to-r from-syntax-blue to-syntax-cyan
              text-white
              font-mono font-bold
              rounded-lg
              hover:shadow-glow-blue
              disabled:opacity-50
              transition-all
            "
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="code-spinner w-4 h-4 border-2"></div>
                Guardando...
              </span>
            ) : (
              <>
                <i className="fas fa-save mr-2"></i>
                Guardar
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}