import { useLanguage } from '../../context/LanguageContext';

/**
 * LANGUAGE TOGGLE - Botón para cambiar idioma ES/EN
 * Estilo switch moderno
 */
export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const isSpanish = language === 'es';

  return (
    <button
      onClick={toggleLanguage}
      className="
        relative
        flex items-center gap-2
        px-4 py-2
        bg-code-bg-secondary
        border border-border-code
        rounded-lg
        hover:bg-code-bg-tertiary
        transition-all duration-300
        group
      "
      aria-label="Cambiar idioma"
    >
      {/* Icono de globo */}
      <i className="fas fa-globe text-syntax-blue group-hover:text-syntax-cyan transition-colors"></i>

      {/* Switch visual */}
      <div className="flex items-center gap-1">
        <span className={`
          text-sm font-mono font-bold transition-colors
          ${isSpanish ? 'text-syntax-green' : 'text-text-muted'}
        `}>
          ES
        </span>
        
        <div className="relative w-10 h-5 bg-code-bg-tertiary rounded-full">
          <div 
            className={`
              absolute top-0.5 w-4 h-4 rounded-full
              bg-gradient-to-r from-syntax-blue to-syntax-cyan
              transition-all duration-300 ease-in-out
              ${isSpanish ? 'left-0.5' : 'left-5'}
            `}
          ></div>
        </div>
        
        <span className={`
          text-sm font-mono font-bold transition-colors
          ${!isSpanish ? 'text-syntax-green' : 'text-text-muted'}
        `}>
          EN
        </span>
      </div>
    </button>
  );
}

/**
 * LANGUAGE TOGGLE SIMPLE - Versión compacta para móvil
 */
export function LanguageToggleCompact() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="
        w-10 h-10
        flex items-center justify-center
        bg-code-bg-secondary
        border border-border-code
        rounded-full
        hover:bg-code-bg-tertiary
        hover:scale-110
        transition-all duration-300
      "
      aria-label="Cambiar idioma"
    >
      <span className="text-sm font-mono font-bold text-syntax-blue">
        {language.toUpperCase()}
      </span>
    </button>
  );
}