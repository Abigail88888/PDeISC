import Modal from '../common/Modal';

/**
 * DELETE CONFIRM - Modal de confirmación para eliminar (sin alerts)
 */
export default function DeleteConfirm({ isOpen, onClose, onConfirm, itemName, loading }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="text-center py-4">
        {/* Icono de advertencia */}
        <div className="mb-6">
          <div className="
            w-20 h-20
            mx-auto
            flex items-center justify-center
            bg-status-error/10
            border-2 border-status-error
            rounded-full
            animate-pulse
          ">
            <i className="fas fa-exclamation-triangle text-4xl text-status-error"></i>
          </div>
        </div>

        {/* Título */}
        <h3 className="text-2xl font-bold text-text-primary mb-3 font-mono">
          ¿Estás seguro?
        </h3>

        {/* Mensaje */}
        <p className="text-text-secondary mb-2">
          Esta acción eliminará permanentemente:
        </p>
        {itemName && (
          <p className="text-text-primary font-mono font-bold mb-6 bg-code-bg-tertiary p-3 rounded border border-border-code">
            "{itemName}"
          </p>
        )}

        {/* Advertencia */}
        <div className="
          p-3
          bg-status-error/10
          border border-status-error
          rounded-lg
          mb-8
        ">
          <p className="text-status-error text-sm font-mono flex items-center justify-center gap-2">
            <i className="fas fa-info-circle"></i>
            Esta acción no se puede deshacer
          </p>
        </div>

        {/* Botones */}
        <div className="flex gap-4">
          <button
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
            onClick={onConfirm}
            disabled={loading}
            className="
              flex-1
              px-6 py-3
              bg-status-error
              text-white
              font-mono font-bold
              rounded-lg
              hover:bg-status-error/80
              disabled:opacity-50
              transition-all
            "
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="code-spinner w-4 h-4 border-2"></div>
                Eliminando...
              </span>
            ) : (
              <>
                <i className="fas fa-trash-alt mr-2"></i>
                Eliminar
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}