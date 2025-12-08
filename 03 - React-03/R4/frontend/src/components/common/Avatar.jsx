/**
 * AVATAR - Círculo con iniciales del usuario
 * El color se genera automáticamente según el nombre
 */
export default function Avatar({ user, size = 'md', className = '' }) {
  // Tamaños disponibles
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-2xl',
    xl: 'w-24 h-24 text-4xl',
  };

  const sizeClass = sizes[size] || sizes.md;

  return (
    <div 
      className={`
        ${sizeClass} 
        rounded-full 
        flex items-center justify-center 
        font-bold 
        text-white 
        shadow-lg
        transition-all duration-300
        hover:scale-110
        ${className}
      `}
      style={{ 
        backgroundColor: user?.avatarColor || '#58a6ff',
        boxShadow: `0 0 20px ${user?.avatarColor || '#58a6ff'}40`
      }}
    >
      {user?.initials || '??'}
    </div>
  );
}

/**
 * AVATAR CON NOMBRE - Muestra avatar + nombre al lado
 */
export function AvatarWithName({ user, size = 'md', showRole = false }) {
  return (
    <div className="flex items-center gap-3">
      <Avatar user={user} size={size} />
      <div className="flex flex-col">
        <span className="text-text-primary font-semibold">
          {user?.nombre || 'Usuario'}
        </span>
        {showRole && (
          <span className="text-text-secondary text-sm">
            {user?.rol === 'admin' ? (
              <span className="flex items-center gap-1">
                <i className="fas fa-crown text-syntax-yellow"></i>
                Admin
              </span>
            ) : (
              'Usuario'
            )}
          </span>
        )}
      </div>
    </div>
  );
}