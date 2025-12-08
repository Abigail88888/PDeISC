import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

/**
 * MENU HAMBURGUESA - Menú lateral para móvil
 * Con botón de login si no está autenticado
 */
export default function MenuHamburguesa({ isOpen, onClose, onLoginClick }) {
  const { user, isAdmin, isAuthenticated } = useAuth();
  const { t } = useLanguage();

  // Prevenir scroll cuando el menú está abierto
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

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    onClose();
  };

  const handleLoginClick = () => {
    onClose();
    onLoginClick();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="
          fixed inset-0 z-40
          bg-code-bg-primary/80
          backdrop-blur-sm
          lg:hidden
          animate-fade-in
        "
        onClick={onClose}
      ></div>

      {/* Menú */}
      <aside className={`
        fixed top-0 left-0 bottom-0 z-50
        w-80 max-w-[85vw]
        bg-code-bg-secondary
        border-r border-border-code
        shadow-2xl
        overflow-y-auto
        lg:hidden
        ${isOpen ? 'animate-slide-in-left' : ''}
      `}>
        {/* Header del menú */}
        <div className="
          sticky top-0
          flex items-center justify-between
          p-4
          bg-code-bg-tertiary
          border-b border-border-code
        ">
          <div className="flex items-center gap-2">
            <i className="fas fa-bars text-syntax-blue"></i>
            <span className="font-mono font-bold text-text-primary">
              Menú
            </span>
          </div>
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
            aria-label="Cerrar menú"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Info de usuario O botón de login */}
        {isAuthenticated ? (
          <div className="p-4 border-b border-border-code">
            <div className="flex items-center gap-3 mb-2">
              <div
                className="
                  w-12 h-12
                  rounded-full
                  flex items-center justify-center
                  font-bold text-white text-lg
                "
                style={{
                  backgroundColor: user?.avatarColor || '#58a6ff',
                  boxShadow: `0 0 20px ${user?.avatarColor || '#58a6ff'}40`
                }}
              >
                {user?.initials}
              </div>
              <div>
                <p className="text-text-primary font-semibold font-mono">
                  {user?.nombre}
                </p>
                {isAdmin && (
                  <span className="
                    inline-flex items-center gap-1
                    text-xs font-mono text-status-warning
                  ">
                    <i className="fas fa-crown"></i>
                    Admin
                  </span>
                )}
              </div>
            </div>
            <p className="text-text-muted text-xs font-mono">
              {user?.email}
            </p>
          </div>
        ) : (
          <div className="p-4 border-b border-border-code">
            <button
              onClick={handleLoginClick}
              className="
                w-full
                px-4 py-3
                bg-gradient-to-r from-syntax-blue to-syntax-cyan
                text-white font-bold font-mono
                rounded-lg
                hover:shadow-glow-blue
                transition-all
                flex items-center justify-center gap-2
              "
            >
              <i className="fas fa-sign-in-alt"></i>
              Admin Login
            </button>
          </div>
        )}

        {/* Navegación */}
        <nav className="p-4">
          <p className="text-text-muted text-xs font-mono uppercase mb-3">
            // Navegación
          </p>
          
          <div className="space-y-2">
            {[
              { id: 'sobre-mi', icon: 'fa-user', label: 'Sobre mí', color: 'text-syntax-blue' },
              { id: 'habilidades', icon: 'fa-code', label: 'Habilidades', color: 'text-syntax-purple' },
              { id: 'proyectos', icon: 'fa-folder', label: 'Proyectos', color: 'text-syntax-green' },
              { id: 'experiencia', icon: 'fa-briefcase', label: 'Experiencia', color: 'text-syntax-yellow' },
              { id: 'logros', icon: 'fa-trophy', label: 'Logros', color: 'text-syntax-cyan' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="
                  w-full
                  flex items-center gap-3
                  px-4 py-3
                  text-text-secondary
                  hover:text-text-primary
                  hover:bg-code-bg-tertiary
                  rounded-lg
                  transition-all
                  group
                "
              >
                <i className={`fas ${item.icon} ${item.color} w-5`}></i>
                <span className="font-mono text-sm group-hover:translate-x-1 transition-transform">
                  {item.label}
                </span>
                <i className="fas fa-chevron-right ml-auto text-xs opacity-0 group-hover:opacity-100 transition-opacity"></i>
              </button>
            ))}
          </div>
        </nav>

        {/* Panel de Admin */}
        {isAuthenticated && isAdmin && (
          <div className="p-4 border-t border-border-code">
            <p className="text-text-muted text-xs font-mono uppercase mb-3">
              // Admin Panel
            </p>
            <button
              onClick={() => {
                handleNavClick('admin-panel');
              }}
              className="
                w-full
                flex items-center gap-3
                px-4 py-3
                bg-status-warning/10
                border border-status-warning
                text-status-warning
                hover:bg-status-warning/20
                rounded-lg
                transition-all
                group
              "
            >
              <i className="fas fa-tools w-5"></i>
              <span className="font-mono text-sm">
                Panel Admin
              </span>
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="
          absolute bottom-0 left-0 right-0
          p-4
          bg-code-bg-tertiary
          border-t border-border-code
        ">
          <div className="flex items-center justify-center gap-2 text-text-muted text-xs font-mono">
            <i className="fas fa-code"></i>
            <span>Portfolio v1.0</span>
          </div>
        </div>
      </aside>
    </>
  );
}