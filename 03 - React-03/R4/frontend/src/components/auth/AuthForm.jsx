import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import LanguageToggle from '../common/LanguageToggle';

/**
 * AUTH FORM - Contenedor principal de autenticación
 * Alterna entre Login y Register con animaciones
 */
export default function AuthForm({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-code-bg-primary flex items-center justify-center p-4 relative overflow-hidden">
      {/* Fondo animado con puntos de código */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 text-syntax-blue text-6xl animate-float">{'<>'}</div>
        <div className="absolute top-20 right-20 text-syntax-purple text-4xl animate-float" style={{animationDelay: '0.5s'}}>{'{ }'}</div>
        <div className="absolute bottom-20 left-20 text-syntax-green text-5xl animate-float" style={{animationDelay: '1s'}}>{'[ ]'}</div>
        <div className="absolute bottom-10 right-10 text-syntax-cyan text-3xl animate-float" style={{animationDelay: '1.5s'}}>{'( )'}</div>
        <div className="absolute top-1/2 left-1/4 text-syntax-yellow text-7xl animate-float" style={{animationDelay: '2s'}}>;</div>
        <div className="absolute top-1/3 right-1/4 text-syntax-pink text-4xl animate-float" style={{animationDelay: '2.5s'}}>→</div>
      </div>

      {/* Botón de cambio de idioma */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageToggle />
      </div>

      {/* Contenedor del formulario */}
      <div className="
        w-full max-w-md
        bg-code-bg-secondary/50
        backdrop-blur-xl
        border border-border-code
        rounded-2xl
        p-8
        shadow-2xl
        relative
        z-10
      ">
        {/* Línea decorativa superior tipo terminal */}
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border-code">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-status-error"></div>
            <div className="w-3 h-3 rounded-full bg-status-warning"></div>
            <div className="w-3 h-3 rounded-full bg-status-success"></div>
          </div>
          <span className="text-text-muted text-xs font-mono ml-2">
            ~/portfolio/auth
          </span>
        </div>

        {/* Formulario con animación */}
        <div className={`transition-all duration-500 ${isLogin ? 'animate-fade-in' : 'animate-fade-in'}`}>
          {isLogin ? (
            <Login
              onSwitchToRegister={() => setIsLogin(false)}
              onLoginSuccess={onAuthSuccess}
            />
          ) : (
            <Register
              onSwitchToLogin={() => setIsLogin(true)}
              onRegisterSuccess={onAuthSuccess}
            />
          )}
        </div>

        {/* Footer con info */}
        <div className="mt-8 pt-6 border-t border-border-code text-center">
          <p className="text-text-muted text-xs font-mono">
            <i className="fas fa-code mr-1"></i>
            Desarrollado con React + Vite
          </p>
        </div>
      </div>

      {/* Efecto de partículas en las esquinas */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-syntax-blue/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-syntax-purple/5 rounded-full filter blur-3xl"></div>
    </div>
  );
}