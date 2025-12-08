import { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { NotificationContainer } from './components/common/Notification';
import useNotification from './hooks/useNotification';

// Componentes de autenticación
import LoadingScreen from './components/layout/LoadingScreen';
import Login from './components/auth/Login';

// Componentes del portfolio
import Header from './components/layout/Header';
import MenuHamburguesa from './components/layout/MenuHamburguesa';
import ProfileCard from './components/profile/ProfileCard';
import Habilidades from './components/portfolio/Habilidades';
import Proyectos from './components/portfolio/Proyectos';
import Experiencias from './components/portfolio/Experiencias';
import Logros from './components/portfolio/Logros';
import AdminPanel from './components/admin/AdminPanel';

/**
 * APP - Componente principal de la aplicación
 * PORTFOLIO PÚBLICO + LOGIN SOLO PARA ADMIN
 */
function App() {
  const { isAuthenticated, loading: authLoading, isAdmin, user } = useAuth();
  const { notifications, removeNotification, showSuccess } = useNotification();
  
  const [showLoading, setShowLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  /**
   * Mostrar loading screen inicial
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  /**
   * Manejar autenticación exitosa
   */
  const handleAuthSuccess = (user) => {
    showSuccess(`¡Bienvenido, ${user.nombre}!`);
    setShowLoginModal(false);
  };

  /**
   * Si está cargando
   */
  if (showLoading || authLoading) {
    return <LoadingScreen onLoadingComplete={() => setShowLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-code-bg-primary">
      {/* Header - muestra botón de login si no está autenticado */}
      <Header 
        onMenuToggle={() => setMenuOpen(!menuOpen)}
        onLoginClick={() => setShowLoginModal(true)}
      />

      {/* Menú hamburguesa (móvil) */}
      <MenuHamburguesa 
        isOpen={menuOpen} 
        onClose={() => setMenuOpen(false)}
        onLoginClick={() => setShowLoginModal(true)}
      />

      {/* Contenido principal - SIEMPRE VISIBLE */}
      <main>
        {/* Sección de perfil */}
        <ProfileCard />

        {/* Sección de habilidades */}
        <Habilidades />

        {/* Sección de proyectos */}
        <Proyectos />

        {/* Sección de experiencia */}
        <Experiencias />

        {/* Sección de logros */}
        <Logros />

        {/* PANEL DE ADMIN */}
        {isAuthenticated && isAdmin && (
          <AdminPanel />
        )}

        {/* ✨ BOTONES FLOTANTES MEJORADOS Y ALINEADOS ✨ */}
        <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-4">
          {/* BOTÓN PANEL ADMIN - Solo visible para admins */}
          {isAuthenticated && isAdmin && (
            <a
              href="#admin-panel"
              className="
                group
                w-14 h-14
                bg-gradient-to-br from-status-warning to-syntax-yellow
                text-white
                rounded-full
                shadow-2xl
                hover:scale-110
                hover:shadow-[0_0_30px_rgba(210,153,34,0.6)]
                active:scale-95
                transition-all duration-300
                flex items-center justify-center
                relative
                overflow-hidden
              "
              title="Panel de Administración"
            >
              {/* Efecto de brillo al hover */}
              <div className="
                absolute inset-0 
                bg-white/0 
                group-hover:bg-white/20
                transition-all duration-300
                rounded-full
              "></div>
              
              {/* Icono */}
              <i className="fas fa-tools text-xl relative z-10 group-hover:rotate-12 transition-transform"></i>
              
              {/* Badge de notificación (opcional) */}
              <span className="
                absolute -top-1 -right-1
                w-5 h-5
                bg-status-error
                text-white
                text-xs
                font-bold
                rounded-full
                flex items-center justify-center
                animate-pulse
                border-2 border-code-bg-primary
              ">
                !
              </span>
            </a>
          )}

          {/* BOTÓN VOLVER ARRIBA */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="
              group
              w-14 h-14
              bg-gradient-to-br from-syntax-blue to-syntax-cyan
              text-white
              rounded-full
              shadow-2xl
              hover:scale-110
              hover:shadow-[0_0_30px_rgba(88,166,255,0.6)]
              active:scale-95
              transition-all duration-300
              flex items-center justify-center
              relative
              overflow-hidden
            "
            aria-label="Volver arriba"
          >
            {/* Efecto de brillo al hover */}
            <div className="
              absolute inset-0 
              bg-white/0 
              group-hover:bg-white/20
              transition-all duration-300
              rounded-full
            "></div>
            
            {/* Icono con animación */}
            <i className="
              fas fa-arrow-up 
              text-xl 
              relative z-10 
              group-hover:-translate-y-1
              transition-transform
            "></i>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="
        bg-code-bg-secondary
        border-t border-border-code
        py-12
      ">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="mb-6">
            <i className="fas fa-code text-4xl text-syntax-blue mb-4"></i>
          </div>
          <p className="text-text-secondary font-mono mb-2">
            Desarrollado con <i className="fas fa-heart text-status-error"></i> por Joaquín Dinucci
          </p>
          <p className="text-text-muted text-sm font-mono">
            React + Vite + Tailwind CSS + Back4app
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="
                w-10 h-10
                flex items-center justify-center
                text-text-muted
                hover:text-syntax-blue
                transition-colors
              "
            >
              <i className="fab fa-github text-xl"></i>
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="
                w-10 h-10
                flex items-center justify-center
                text-text-muted
                hover:text-syntax-blue
                transition-colors
              "
            >
              <i className="fab fa-linkedin text-xl"></i>
            </a>
            <a 
              href="mailto:contacto@ejemplo.com"
              className="
                w-10 h-10
                flex items-center justify-center
                text-text-muted
                hover:text-syntax-blue
                transition-colors
              "
            >
              <i className="fas fa-envelope text-xl"></i>
            </a>
          </div>
        </div>
      </footer>

      {/* Modal de Login */}
      {showLoginModal && !isAuthenticated && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-code-bg-primary/80 backdrop-blur-sm">
          <div className="relative max-w-md w-full">
            <button
              onClick={() => setShowLoginModal(false)}
              className="
                absolute -top-12 right-0
                w-10 h-10
                flex items-center justify-center
                bg-code-bg-secondary
                border border-border-code
                rounded-full
                text-text-muted
                hover:text-status-error
                hover:border-status-error
                transition-all
              "
            >
              <i className="fas fa-times"></i>
            </button>

            <Login onLoginSuccess={handleAuthSuccess} />
          </div>
        </div>
      )}

      {/* Sistema de notificaciones */}
      <NotificationContainer 
        notifications={notifications} 
        removeNotification={removeNotification} 
      />
    </div>
  );
}

export default App;