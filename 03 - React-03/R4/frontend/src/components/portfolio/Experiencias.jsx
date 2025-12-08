import { usePortfolio } from '../../context/PortfolioContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

/**
 * Formatear fecha
 */
const formatDate = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  const month = date.toLocaleDateString('es-ES', { month: 'short' });
  const year = date.getFullYear();
  return `${month} ${year}`;
};

/**
 * EXPERIENCIAS - Timeline vertical de experiencia laboral
 */
export default function Experiencias() {
  const { experiencias } = usePortfolio();
  const { t } = useLanguage();
  const { isAdmin } = useAuth();

  return (
    <section 
      id="experiencia"
      className="min-h-screen py-20 px-4 bg-code-bg-primary"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            <i className="fas fa-briefcase text-syntax-yellow mr-3"></i>
            {t('experience')}
          </h2>
          <p className="text-text-secondary font-mono">
            // Mi trayectoria profesional
          </p>
        </div>

        {/* Timeline */}
        {experiencias.length > 0 ? (
          <div className="relative">
            {/* Línea vertical */}
            <div className="
              absolute left-8 top-0 bottom-0 w-0.5
              bg-gradient-to-b from-syntax-yellow via-syntax-blue to-syntax-purple
              hidden md:block
            "></div>

            {/* Items */}
            <div className="space-y-12">
              {experiencias.map((exp, index) => (
                <div
                  key={exp.id}
                  className="relative pl-0 md:pl-20"
                >
                  {/* Punto en la línea */}
                  <div className="
                    hidden md:block
                    absolute left-6 top-0
                    w-5 h-5
                    bg-syntax-yellow
                    border-4 border-code-bg-primary
                    rounded-full
                    shadow-glow-blue
                    z-10
                  "></div>

                  {/* Card */}
                  <div className="
                    bg-code-bg-secondary
                    border border-border-code
                    rounded-lg
                    p-6
                    hover:border-syntax-yellow
                    hover:shadow-glow-blue
                    transition-all
                    group
                  ">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-text-primary mb-1">
                          {exp.puesto}
                        </h3>
                        <p className="text-syntax-cyan font-mono text-sm">
                          <i className="fas fa-building mr-2"></i>
                          {exp.empresa}
                        </p>
                      </div>

                      {/* Fecha */}
                      <div className="
                        px-4 py-2
                        bg-code-bg-tertiary
                        border border-border-code
                        rounded-lg
                        text-text-muted
                        font-mono text-sm
                        whitespace-nowrap
                      ">
                        <i className="fas fa-calendar mr-2"></i>
                        {formatDate(exp.inicio)} - {exp.fin ? formatDate(exp.fin) : t('present')}
                      </div>
                    </div>

                    {/* Descripción */}
                    {exp.descripcion && (
                      <p className="text-text-secondary leading-relaxed">
                        {exp.descripcion}
                      </p>
                    )}

                    {/* Línea decorativa */}
                    <div className="mt-4 pt-4 border-t border-border-code">
                      <div className="flex items-center gap-2 text-text-muted text-xs">
                        <i className="fas fa-briefcase"></i>
                        <div className="flex-1 h-px bg-border-code"></div>
                        <span className="font-mono">
                          {index + 1} / {experiencias.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <i className="fas fa-briefcase text-6xl text-text-muted mb-4"></i>
            <p className="text-text-muted font-mono">
              {t('noExperience')}
            </p>
          </div>
        )}

        {/* Botón Admin */}
        {isAdmin && (
          <div className="mt-12 text-center">
            <button className="
              px-6 py-3
              bg-status-warning/10
              border border-status-warning
              text-status-warning
              font-mono
              rounded-lg
              hover:bg-status-warning/20
              transition-all
            ">
              <i className="fas fa-plus mr-2"></i>
              Agregar Experiencia
            </button>
          </div>
        )}
      </div>
    </section>
  );
}