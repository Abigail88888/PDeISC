import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

/**
 * LOGIN STANDALONE - Solo formulario de login (sin opción de registro)
 * Diseñado para administradores
 */
export default function Login({ onLoginSuccess }) {
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Manejar cambios en inputs
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
  };

  /**
   * Manejar submit
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        onLoginSuccess?.(result.user);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="
      w-full
      bg-code-bg-secondary/95
      backdrop-blur-xl
      border border-border-code
      rounded-2xl
      p-8
      shadow-2xl
    ">
      {/* Línea decorativa superior tipo terminal */}
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border-code">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-status-error"></div>
          <div className="w-3 h-3 rounded-full bg-status-warning"></div>
          <div className="w-3 h-3 rounded-full bg-status-success"></div>
        </div>
        <span className="text-text-muted text-xs font-mono ml-2">
          ~/portfolio/admin/login
        </span>
      </div>

      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-block mb-4">
          <i className="fas fa-shield-alt text-5xl text-syntax-blue animate-pulse"></i>
        </div>
        <h1 className="text-3xl font-bold text-text-primary mb-2 font-mono">
          Admin Access
        </h1>
        <p className="text-text-secondary font-mono text-sm">
          // Inicia sesión para gestionar el portfolio
        </p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-text-secondary text-sm font-mono mb-2">
            <i className="fas fa-envelope mr-2 text-syntax-cyan"></i>
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="admin@ejemplo.com"
            autoComplete="email"
            className="
              w-full px-4 py-3
              bg-code-bg-tertiary
              border border-border-code
              rounded-lg
              text-text-primary
              placeholder-text-muted
              font-mono
              focus:outline-none
              focus:border-syntax-blue
              focus:ring-2
              focus:ring-syntax-blue/20
              transition-all
            "
            disabled={loading}
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-text-secondary text-sm font-mono mb-2">
            <i className="fas fa-lock mr-2 text-syntax-purple"></i>
            Contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="current-password"
              className="
                w-full px-4 py-3 pr-12
                bg-code-bg-tertiary
                border border-border-code
                rounded-lg
                text-text-primary
                placeholder-text-muted
                font-mono
                focus:outline-none
                focus:border-syntax-purple
                focus:ring-2
                focus:ring-syntax-purple/20
                transition-all
              "
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="
                absolute right-3 top-1/2 -translate-y-1/2
                text-text-muted hover:text-text-primary
                transition-colors
              "
              tabIndex={-1}
            >
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="
            p-3 
            bg-status-error/10 
            border border-status-error 
            rounded-lg
            animate-fade-in
          ">
            <p className="text-status-error text-sm font-mono flex items-center gap-2">
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </p>
          </div>
        )}

        {/* Botón Submit */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full py-3
            bg-gradient-to-r from-syntax-blue to-syntax-cyan
            text-white font-bold font-mono
            rounded-lg
            hover:shadow-glow-blue
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-300
            btn-code
          "
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="code-spinner w-5 h-5 border-2"></div>
              Iniciando sesión...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <i className="fas fa-sign-in-alt"></i>
              Iniciar Sesión
            </span>
          )}
        </button>
      </form>

      {/* Info adicional */}
      <div className="mt-6 pt-6 border-t border-border-code text-center">
        <p className="text-text-muted text-xs font-mono">
          <i className="fas fa-shield-alt mr-1"></i>
          Acceso restringido solo para administradores
        </p>
      </div>
    </div>
  );
}