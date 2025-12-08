import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { AvatarWithName } from '../common/Avatar';
import { LanguageToggleCompact } from '../common/LanguageToggle';

/**
 * HEADER - Barra superior del portfolio
 * Muestra botón de login o dropdown de usuario según estado
 */
export default function Header({ onMenuToggle, onLoginClick }) {
  const { user, logout, isAdmin, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [showDropdown, setShowDropdown] = useState(false);

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    setShowDropdown(false);
    setShowLogoutConfirm(false);
  };

  return (
    <header className="
      sticky top-0 z-40
      bg-code-bg-secondary/80
      backdrop-blur-xl
      border-b border-border-code
      shadow-lg
    ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Título */}
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuToggle}
              className="
                lg:hidden
                w-10 h-10
                flex items-center justify-center
                text-text-primary
                hover:text-syntax-blue
                hover:bg-code-bg-tertiary
                rounded-lg
                transition-all
              "
              aria-label="Abrir menú"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>

            <div className="flex items-center gap-2">
              <i className="fas fa-code text-syntax-blue text-2xl animate-pulse"></i>
              <h1 className="text-xl font-bold font-mono text-text-primary hidden sm:block">
                Portfolio
                <span className="text-syntax-green">.</span>
                <span className="text-syntax-cyan">dev</span>
              </h1>
            </div>
          </div>

          {/* Navegación Desktop */}
          <nav className="hidden lg:flex items-center gap-6">
            <a
              href="#sobre-mi"
              className="text-text-secondary hover:text-syntax-blue transition-colors font-mono text-sm"
            >
              Sobre mí
            </a>
            <a
              href="#habilidades"
              className="text-text-secondary hover:text-syntax-purple transition-colors font-mono text-sm"
            >
              Habilidades
            </a>
            <a
              href="#proyectos"
              className="text-text-secondary hover:text-syntax-green transition-colors font-mono text-sm"
            >
              Proyectos
            </a>
            <a
              href="#experiencia"
              className="text-text-secondary hover:text-syntax-yellow transition-colors font-mono text-sm"
            >
              Experiencia
            </a>
            <a
              href="#logros"
              className="text-text-secondary hover:text-syntax-cyan transition-colors font-mono text-sm"
            >
              Logros
            </a>
          </nav>

          {/* Controles derecha */}
          <div className="flex items-center gap-3">
            {/* Botón de idioma */}
            <div className="hidden sm:block">
              <LanguageToggleCompact />
            </div>

            {/* SI NO ESTÁ AUTENTICADO: Botón de Login */}
            {!isAuthenticated && (
              <button
                onClick={onLoginClick}
                className="
                  px-4 py-2
                  bg-gradient-to-r from-syntax-blue to-syntax-cyan
                  text-white font-bold font-mono text-sm
                  rounded-lg
                  hover:shadow-glow-blue
                  transition-all
                  flex items-center gap-2
                "
              >
                <i className="fas fa-sign-in-alt"></i>
                <span className="hidden sm:inline">Admin Login</span>
              </button>
            )}

            {/* SI ESTÁ AUTENTICADO: Badge de Admin + Dropdown */}
            {isAuthenticated && (
              <>
                {/* Badge de Admin */}
                {isAdmin && (
                  <div className="
                    hidden sm:flex
                    items-center gap-2
                    px-3 py-1
                    bg-status-warning/10
                    border border-status-warning
                    rounded-full
                  ">
                    <i className="fas fa-crown text-status-warning text-xs"></i>
                    <span className="text-status-warning text-xs font-mono font-bold">
                      ADMIN
                    </span>
                  </div>
                )}

                {/* Dropdown de usuario */}
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="
                      flex items-center gap-2
                      px-3 py-2
                      hover:bg-code-bg-tertiary
                      rounded-lg
                      transition-all
                    "
                  >
                    <AvatarWithName user={user} size="sm" />
                    <i className={`
                      fas fa-chevron-down text-text-muted text-xs
                      transition-transform
                      ${showDropdown ? 'rotate-180' : ''}
                    `}></i>
                  </button>

                  {/* Dropdown menu */}
                  {showDropdown && (
                    <>
                      {/* Backdrop para cerrar */}
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowDropdown(false)}
                      ></div>

                      {/* Menu */}
                      <div className="
                        absolute right-0 top-full mt-2
                        w-56
                        bg-code-bg-secondary
                        border border-border-code
                        rounded-lg
                        shadow-2xl
                        overflow-hidden
                        z-20
                        animate-slide-in-right
                      ">
                        {/* Info de usuario */}
                        <div className="p-4 border-b border-border-code">
                          <p className="text-text-primary font-semibold font-mono text-sm">
                            {user?.nombre}
                          </p>
                          <p className="text-text-muted text-xs font-mono mt-1">
                            {user?.email}
                          </p>
                          {user?.celular && (
                            <p className="text-text-muted text-xs font-mono mt-1">
                              <i className="fas fa-phone mr-1"></i>
                              {user.celular}
                            </p>
                          )}
                        </div>

                        {/* Opciones */}
                        <div className="py-2">
                          {/* Ir al panel admin */}
                          {isAdmin && (
                            <a
                              href="#admin-panel"
                              onClick={() => setShowDropdown(false)}
                              className="
                                w-full px-4 py-2
                                flex items-center gap-3
                                text-status-warning
                                hover:bg-status-warning/10
                                transition-colors
                                text-left
                              "
                            >
                              <i className="fas fa-tools w-5"></i>
                              <span className="text-sm font-mono">Panel Admin</span>
                            </a>
                          )}

                          {/* Logout */}
                          <button
                            onClick={handleLogout}
                            className="
                              w-full px-4 py-2
                              flex items-center gap-3
                              text-status-error
                              hover:bg-status-error/10
                              transition-colors
                              text-left
                            "
                          >
                            <i className="fas fa-sign-out-alt w-5"></i>
                            <span className="text-sm font-mono">{t('logout')}</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal de confirmación de logout */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-code-bg-primary/80 backdrop-blur-sm">
          <div className="bg-code-bg-secondary border border-border-code rounded-lg p-6 max-w-sm w-full">
            <div className="text-center mb-6">
              <i className="fas fa-sign-out-alt text-4xl text-status-warning mb-4"></i>
              <h3 className="text-xl font-bold text-text-primary mb-2 font-mono">
                Cerrar Sesión
              </h3>
              <p className="text-text-secondary text-sm">
                ¿Estás seguro que deseas cerrar sesión?
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="
                  flex-1 px-4 py-2
                  bg-code-bg-tertiary
                  border border-border-code
                  text-text-primary
                  font-mono rounded-lg
                  hover:bg-code-bg-primary
                  transition-all
                "
              >
                Cancelar
              </button>
              <button
                onClick={confirmLogout}
                className="
                  flex-1 px-4 py-2
                  bg-status-error
                  text-white font-mono font-bold
                  rounded-lg
                  hover:bg-status-error/80
                  transition-all
                "
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}