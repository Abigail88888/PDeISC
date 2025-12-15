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

            {/* ✅ SI NO ESTÁ AUTENTICADO: Botón de Login MEJORADO */}
            {!isAuthenticated && (
              <button
                onClick={onLoginClick}
                className="
                  px-5 py-2.5
                  bg-gradient-to-r from-syntax-blue to-syntax-cyan
                  text-white font-bold font-mono
                  text-sm sm:text-base
                  rounded-lg
                  hover:shadow-glow-blue
                  hover:scale-105
                  active:scale-95
                  transition-all
                  flex items-center gap-2
                  min-w-[120px]
                  justify-center
                "
              >
                <i className="fas fa-sign-in-alt text-base"></i>
                <span>Admin Login</span>
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
                                w-full px-4 py-3
                                flex items-center gap-3
                                text-status-warning
                                hover:bg-status-warning/10
                                transition-colors
                                text-left
                              "
                            >
                              <i className="fas fa-tools w-5 text-lg"></i>
                              <span className="text-sm font-mono font-bold">Panel Admin</span>
                            </a>
                          )}

                          {/* ✅ Logout MEJORADO - MÁS VISIBLE */}
                          <button
                            onClick={handleLogout}
                            className="
                              w-full px-4 py-3
                              flex items-center gap-3
                              text-status-error
                              hover:bg-status-error/10
                              transition-colors
                              text-left
                              font-bold
                            "
                          >
                            <i className="fas fa-sign-out-alt w-5 text-lg"></i>
                            <span className="text-sm font-mono">Cerrar Sesión</span>
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

      {/* ✅ Modal de confirmación de logout MEJORADO */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-code-bg-primary/80 backdrop-blur-sm">
          <div className="bg-code-bg-secondary border-2 border-border-code rounded-xl p-8 max-w-sm w-full shadow-2xl">
            <div className="text-center mb-6">
              {/* Icono grande y visible */}
              <div className="
                w-20 h-20
                mx-auto mb-4
                bg-status-warning/20
                border-2 border-status-warning
                rounded-full
                flex items-center justify-center
                animate-pulse
              ">
                <i className="fas fa-sign-out-alt text-4xl text-status-warning"></i>
              </div>
              
              <h3 className="text-2xl font-bold text-text-primary mb-3 font-mono">
                ¿Cerrar Sesión?
              </h3>
              <p className="text-text-secondary text-sm">
                ¿Estás seguro que deseas cerrar tu sesión de administrador?
              </p>
            </div>

            {/* Botones mejorados */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="
                  flex-1 px-6 py-3
                  bg-code-bg-tertiary
                  border-2 border-border-code
                  text-text-primary
                  font-mono font-bold
                  rounded-lg
                  hover:bg-code-bg-primary
                  hover:border-syntax-blue
                  transition-all
                  flex items-center justify-center gap-2
                "
              >
                <i className="fas fa-times"></i>
                Cancelar
              </button>
              <button
                onClick={confirmLogout}
                className="
                  flex-1 px-6 py-3
                  bg-status-error
                  border-2 border-status-error
                  text-white font-mono font-bold
                  rounded-lg
                  hover:bg-status-error/80
                  hover:scale-105
                  active:scale-95
                  transition-all
                  flex items-center justify-center gap-2
                "
              >
                <i className="fas fa-sign-out-alt"></i>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}