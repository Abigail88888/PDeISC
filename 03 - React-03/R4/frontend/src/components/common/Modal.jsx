import { useEffect } from 'react';

/**
 * MODAL - Componente base para modales
 * Backdrop con blur, cierre con ESC, sin scroll del body
 */
export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  // Tamaños disponibles
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
  };

  // Prevenir scroll cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 modal-backdrop animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div
        className={`
          relative
          ${sizes[size]}
          w-full
          bg-code-bg-secondary
          border border-border-code
          rounded-xl
          shadow-2xl
          animate-slide-in-right
          max-h-[90vh]
          overflow-hidden
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="
          flex items-center justify-between
          p-6
          border-b border-border-code
          bg-code-bg-tertiary
        ">
          {/* Terminal circles */}
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-status-error"></div>
              <div className="w-3 h-3 rounded-full bg-status-warning"></div>
              <div className="w-3 h-3 rounded-full bg-status-success"></div>
            </div>
            {title && (
              <h2 className="text-xl font-bold text-text-primary font-mono ml-2">
                {title}
              </h2>
            )}
          </div>

          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="
              w-8 h-8
              flex items-center justify-center
              text-text-muted
              hover:text-status-error
              hover:bg-code-bg-primary
              rounded
              transition-all
            "
            aria-label="Cerrar modal"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Contenido */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
}