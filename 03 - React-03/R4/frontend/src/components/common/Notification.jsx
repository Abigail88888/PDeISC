import { useEffect } from 'react';

/**
 * NOTIFICATION - Toast/Alert estilo terminal
 * Tipos: success, error, warning, info
 */
export default function Notification({ message, type = 'info', onClose, duration = 4000 }) {
  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  // Configuración según tipo
  const config = {
    success: {
      icon: 'fa-check-circle',
      color: 'text-status-success',
      bg: 'bg-status-success/10',
      border: 'border-status-success',
      shadow: 'shadow-glow-green',
    },
    error: {
      icon: 'fa-times-circle',
      color: 'text-status-error',
      bg: 'bg-status-error/10',
      border: 'border-status-error',
      shadow: 'shadow-glow-blue',
    },
    warning: {
      icon: 'fa-exclamation-triangle',
      color: 'text-status-warning',
      bg: 'bg-status-warning/10',
      border: 'border-status-warning',
      shadow: '',
    },
    info: {
      icon: 'fa-info-circle',
      color: 'text-status-info',
      bg: 'bg-status-info/10',
      border: 'border-status-info',
      shadow: 'shadow-glow-blue',
    },
  };

  const style = config[type] || config.info;

  return (
    <div className={`
      notification-enter
      fixed top-4 right-4 z-50
      max-w-md
      p-4
      ${style.bg}
      ${style.border}
      border
      rounded-lg
      ${style.shadow}
      backdrop-blur-sm
      animate-slide-in-right
    `}>
      <div className="flex items-start gap-3">
        {/* Icono */}
        <i className={`fas ${style.icon} ${style.color} text-xl mt-0.5`}></i>

        {/* Mensaje */}
        <div className="flex-1">
          <p className="text-text-primary font-mono text-sm leading-relaxed">
            {message}
          </p>
        </div>

        {/* Botón cerrar */}
        {onClose && (
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors"
            aria-label="Cerrar notificación"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>

      {/* Barra de progreso */}
      {duration && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-border-code rounded-b-lg overflow-hidden">
          <div 
            className={`h-full ${style.border.replace('border-', 'bg-')}`}
            style={{
              animation: `shrink ${duration}ms linear`,
            }}
          ></div>
        </div>
      )}
    </div>
  );
}

/**
 * CONTENEDOR DE NOTIFICACIONES
 * Maneja múltiples notificaciones apiladas
 */
export function NotificationContainer({ notifications, removeNotification }) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      {notifications.map((notif) => (
        <Notification
          key={notif.id}
          message={notif.message}
          type={notif.type}
          onClose={() => removeNotification(notif.id)}
          duration={notif.duration}
        />
      ))}
    </div>
  );
}

// Agregar keyframe al CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes shrink {
    from { width: 100%; }
    to { width: 0%; }
  }
`;
document.head.appendChild(style);