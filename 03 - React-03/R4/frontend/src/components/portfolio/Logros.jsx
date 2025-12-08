import { usePortfolio } from '../../context/PortfolioContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

/**
 * ICONOS ALEATORIOS para logros
 */
const ACHIEVEMENT_ICONS = [
  { icon: 'fa-trophy', color: '#d29922' },
  { icon: 'fa-medal', color: '#ff6ec7' },
  { icon: 'fa-award', color: '#58a6ff' },
  { icon: 'fa-star', color: '#3fb950' },
  { icon: 'fa-certificate', color: '#bc8cff' },
  { icon: 'fa-crown', color: '#ff7b72' },
  { icon: 'fa-gem', color: '#39c5cf' },
];

/**
 * Obtener icono para un logro
 */
const getAchievementIcon = (index) => {
  return ACHIEVEMENT_ICONS[index % ACHIEVEMENT_ICONS.length];
};

/**
 * LOGROS - Grid de achievements/certificaciones
 */
export default function Logros() {
  const { logros } = usePortfolio();
  const { t } = useLanguage();
  const { isAdmin } = useAuth();

  return (
    <section 
      id="logros"
      className="min-h-screen py-20 px-4 bg-code-bg-secondary"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            <i className="fas fa-trophy text-syntax-cyan mr-3"></i>
            {t('achievements')}
          </h2>
          <p className="text-text-secondary font-mono">
            // Certificaciones, premios y logros destacados
          </p>
        </div>

        {/* Grid de logros */}
        {logros.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {logros.map((logro, index) => {
              const { icon, color } = getAchievementIcon(index);
              return (
                <div
                  key={logro.id}
                  className="
                    bg-code-bg-primary
                    border border-border-code
                    rounded-lg
                    p-6
                    hover:border-syntax-cyan
                    hover:shadow-glow-cyan
                    transition-all
                    group
                    relative
                    overflow-hidden
                  "
                >
                  {/* Efecto de fondo */}
                  <div 
                    className="
                      absolute top-0 right-0
                      w-32 h-32
                      opacity-5
                      group-hover:opacity-10
                      transition-opacity
                    "
                    style={{
                      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`
                    }}
                  ></div>

                  {/* Icono */}
                  <div className="relative mb-4">
                    <div className="
                      w-16 h-16
                      flex items-center justify-center
                      bg-code-bg-secondary
                      border-2 border-border-code
                      rounded-full
                      group-hover:border-syntax-cyan
                      transition-all
                    ">
                      <i 
                        className={`fas ${icon} text-3xl animate-pulse-glow`}
                        style={{ color }}
                      ></i>
                    </div>
                  </div>

                  {/* Título */}
                  <h3 className="text-lg font-bold text-text-primary mb-2 font-mono">
                    {logro.titulo}
                  </h3>

                  {/* Descripción */}
                  {logro.descripcion && (
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {logro.descripcion}
                    </p>
                  )}

                  {/* Badge decorativo */}
                  <div className="absolute top-4 right-4">
                    <div className="
                      w-8 h-8
                      flex items-center justify-center
                      bg-code-bg-tertiary
                      border border-border-code
                      rounded-full
                      text-text-muted
                      font-mono text-xs
                    ">
                      #{index + 1}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <i className="fas fa-trophy text-6xl text-text-muted mb-4"></i>
            <p className="text-text-muted font-mono">
              No hay logros registrados aún
            </p>
          </div>
        )}

        {/* Stats generales */}
        {logros.length > 0 && (
          <div className="
            mt-16 pt-8
            border-t border-border-code
            grid grid-cols-2 md:grid-cols-4 gap-6
          ">
            <div className="text-center">
              <div className="text-4xl font-bold text-syntax-cyan font-mono mb-2">
                {logros.length}
              </div>
              <p className="text-text-muted text-sm font-mono">
                Total de logros
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-syntax-green font-mono mb-2">
                <i className="fas fa-certificate"></i>
              </div>
              <p className="text-text-muted text-sm font-mono">
                Certificado
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-syntax-yellow font-mono mb-2">
                <i className="fas fa-star"></i>
              </div>
              <p className="text-text-muted text-sm font-mono">
                Destacado
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-syntax-purple font-mono mb-2">
                <i className="fas fa-rocket"></i>
              </div>
              <p className="text-text-muted text-sm font-mono">
                En progreso
              </p>
            </div>
          </div>
        )}

        {/* Botón Admin */}
        {isAdmin && (
          <div className="mt-12 text-center">
            <button className="
              px-6 py-3
              bg-status-info/10
              border border-status-info
              text-status-info
              font-mono
              rounded-lg
              hover:bg-status-info/20
              transition-all
            ">
              <i className="fas fa-plus mr-2"></i>
              Agregar Logro
            </button>
          </div>
        )}
      </div>
    </section>
  );
}