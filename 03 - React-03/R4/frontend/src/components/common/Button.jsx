/**
 * BUTTON - Componente de botón reutilizable
 * Con diferentes variantes y tamaños
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) {
  /**
   * VARIANTES DE ESTILO
   */
  const variants = {
    primary: `
      bg-gradient-to-r from-syntax-blue to-syntax-cyan
      text-white
      hover:shadow-glow-blue
      border-0
    `,
    secondary: `
      bg-code-bg-tertiary
      text-text-primary
      border border-border-code
      hover:bg-code-bg-primary
      hover:border-syntax-blue
    `,
    success: `
      bg-status-success
      text-white
      hover:bg-status-success/80
      border-0
    `,
    error: `
      bg-status-error
      text-white
      hover:bg-status-error/80
      border-0
    `,
    warning: `
      bg-status-warning
      text-white
      hover:bg-status-warning/80
      border-0
    `,
    outline: `
      bg-transparent
      text-syntax-blue
      border-2 border-syntax-blue
      hover:bg-syntax-blue/10
    `,
    ghost: `
      bg-transparent
      text-text-primary
      hover:bg-code-bg-tertiary
      border-0
    `,
  };

  /**
   * TAMAÑOS
   */
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  /**
   * Clases base
   */
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-mono font-bold
    rounded-lg
    transition-all duration-300
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-syntax-blue/50
    btn-code
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {/* Icono izquierdo */}
      {icon && iconPosition === 'left' && !loading && (
        <i className={icon}></i>
      )}

      {/* Spinner de carga */}
      {loading && (
        <div className="code-spinner w-5 h-5 border-2"></div>
      )}

      {/* Contenido */}
      {children}

      {/* Icono derecho */}
      {icon && iconPosition === 'right' && !loading && (
        <i className={icon}></i>
      )}
    </button>
  );
}

/**
 * BOTÓN CON ICONO (sin texto)
 */
export function IconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  className = '',
  ariaLabel,
  ...props
}) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-14 h-14 text-xl',
  };

  const variants = {
    primary: 'bg-syntax-blue text-white hover:shadow-glow-blue',
    secondary: 'bg-code-bg-tertiary text-text-primary hover:bg-code-bg-primary',
    ghost: 'bg-transparent text-text-primary hover:bg-code-bg-tertiary',
    error: 'bg-status-error text-white hover:bg-status-error/80',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      className={`
        flex items-center justify-center
        rounded-full
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-syntax-blue/50
        ${sizeClasses[size]}
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <div className="code-spinner w-4 h-4 border-2"></div>
      ) : (
        <i className={icon}></i>
      )}
    </button>
  );
}

/**
 * GRUPO DE BOTONES
 */
export function ButtonGroup({ children, className = '' }) {
  return (
    <div className={`flex gap-2 ${className}`}>
      {children}
    </div>
  );
}