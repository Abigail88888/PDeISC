import { useState, useCallback } from 'react';

/**
 * HOOK USENOTIFICATION
 * Maneja el estado de las notificaciones
 * 
 * Uso:
 * const { notifications, showNotification, removeNotification } = useNotification();
 * 
 * showNotification('¡Guardado!', 'success');
 * showNotification('Error al guardar', 'error');
 */
export default function useNotification() {
  const [notifications, setNotifications] = useState([]);

  /**
   * Mostrar notificación
   * @param {string} message - Mensaje a mostrar
   * @param {string} type - Tipo: success, error, warning, info
   * @param {number} duration - Duración en ms (default: 4000)
   */
  const showNotification = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random();
    
    const newNotification = {
      id,
      message,
      type,
      duration,
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto-remover después de la duración
    if (duration) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }

    return id;
  }, []);

  /**
   * Remover notificación específica
   */
  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  }, []);

  /**
   * Limpiar todas las notificaciones
   */
  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  /**
   * Helpers para tipos específicos
   */
  const showSuccess = useCallback((message, duration) => {
    return showNotification(message, 'success', duration);
  }, [showNotification]);

  const showError = useCallback((message, duration) => {
    return showNotification(message, 'error', duration);
  }, [showNotification]);

  const showWarning = useCallback((message, duration) => {
    return showNotification(message, 'warning', duration);
  }, [showNotification]);

  const showInfo = useCallback((message, duration) => {
    return showNotification(message, 'info', duration);
  }, [showNotification]);

  return {
    notifications,
    showNotification,
    removeNotification,
    clearAll,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
}