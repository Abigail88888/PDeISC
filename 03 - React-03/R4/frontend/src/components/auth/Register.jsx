import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

/**
 * REGISTER - Formulario de registro
 * Crea nuevo usuario y hace login automático
 */
export default function Register({ onSwitchToLogin, onRegisterSuccess }) {
  const { register } = useAuth();
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  /**
   * Calcular fuerza de contraseña
   */
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (password.length >= 10) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 10;
    return Math.min(strength, 100);
  };

  /**
   * Manejar cambios en inputs
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Calcular fuerza de contraseña
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    // Limpiar error
    if (error) setError('');
  };

  /**
   * Manejar submit
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones
    if (!formData.name || !formData.email || !formData.password) {
      setError(t('requiredFields'));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await register(
        formData.name,
        formData.email,
        formData.password,
        formData.phone || null
      );
      
      if (result.success) {
        onRegisterSuccess?.(result.user);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Error al registrarse. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Color según fuerza de contraseña
   */
  const getStrengthColor = () => {
    if (passwordStrength < 30) return 'bg-status-error';
    if (passwordStrength < 60) return 'bg-status-warning';
    return 'bg-status-success';
  };

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-block mb-4">
          <i className="fas fa-user-plus text-5xl text-syntax-green animate-float"></i>
        </div>
        <h1 className="text-3xl font-bold text-text-primary mb-2 font-mono">
          $ {t('register')}
        </h1>
        <p className="text-text-secondary font-mono text-sm">
          // Crea tu cuenta nueva ✨
        </p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre */}
        <div>
          <label className="block text-text-secondary text-sm font-mono mb-2">
            <i className="fas fa-user mr-2 text-syntax-blue"></i>
            {t('name')}
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Joaquin Perez"
            className="
              w-full px-4 py-3
              bg-code-bg-secondary
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

        {/* Email */}
        <div>
          <label className="block text-text-secondary text-sm font-mono mb-2">
            <i className="fas fa-envelope mr-2 text-syntax-cyan"></i>
            {t('email')}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="usuario@ejemplo.com"
            className="
              w-full px-4 py-3
              bg-code-bg-secondary
              border border-border-code
              rounded-lg
              text-text-primary
              placeholder-text-muted
              font-mono
              focus:outline-none
              focus:border-syntax-cyan
              focus:ring-2
              focus:ring-syntax-cyan/20
              transition-all
            "
            disabled={loading}
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-text-secondary text-sm font-mono mb-2">
            <i className="fas fa-lock mr-2 text-syntax-purple"></i>
            {t('password')}
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="
                w-full px-4 py-3 pr-12
                bg-code-bg-secondary
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
            >
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
          </div>
          
          {/* Barra de fuerza de contraseña */}
          {formData.password && (
            <div className="mt-2">
              <div className="h-1 bg-code-bg-tertiary rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getStrengthColor()} transition-all duration-300`}
                  style={{ width: `${passwordStrength}%` }}
                ></div>
              </div>
              <p className="text-xs text-text-muted mt-1 font-mono">
                Fuerza: {passwordStrength < 30 ? 'Débil' : passwordStrength < 60 ? 'Media' : 'Fuerte'}
              </p>
            </div>
          )}
        </div>

        {/* Confirmar Password */}
        <div>
          <label className="block text-text-secondary text-sm font-mono mb-2">
            <i className="fas fa-check-circle mr-2 text-syntax-green"></i>
            Confirmar contraseña
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            className="
              w-full px-4 py-3
              bg-code-bg-secondary
              border border-border-code
              rounded-lg
              text-text-primary
              placeholder-text-muted
              font-mono
              focus:outline-none
              focus:border-syntax-green
              focus:ring-2
              focus:ring-syntax-green/20
              transition-all
            "
            disabled={loading}
          />
        </div>

        {/* Celular (opcional) */}
        <div>
          <label className="block text-text-secondary text-sm font-mono mb-2">
            <i className="fas fa-phone mr-2 text-syntax-yellow"></i>
            {t('phone')}
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+54 9 11 1234-5678"
            className="
              w-full px-4 py-3
              bg-code-bg-secondary
              border border-border-code
              rounded-lg
              text-text-primary
              placeholder-text-muted
              font-mono
              focus:outline-none
              focus:border-syntax-yellow
              focus:ring-2
              focus:ring-syntax-yellow/20
              transition-all
            "
            disabled={loading}
          />
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
              console.error("{error}")
            </p>
          </div>
        )}

        {/* Botón Submit */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full py-3
            bg-gradient-to-r from-syntax-green to-syntax-cyan
            text-white font-bold font-mono
            rounded-lg
            hover:shadow-glow-green
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-300
            btn-code
          "
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="code-spinner w-5 h-5 border-2"></div>
              {t('loading')}
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <i className="fas fa-user-plus"></i>
              {t('registerButton')}
            </span>
          )}
        </button>
      </form>

      {/* Switch a Login */}
      <div className="mt-6 text-center">
        <p className="text-text-secondary text-sm font-mono">
          {t('alreadyAccount')}{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-syntax-blue hover:text-syntax-cyan transition-colors font-bold"
          >
            {t('login')} →
          </button>
        </p>
      </div>
    </div>
  );
}