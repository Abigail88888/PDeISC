import { usePortfolio } from '../../context/PortfolioContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

/**
 * PROYECTOS - Galería de proyectos con cards
 */
export default function Proyectos() {
  const { proyectos } = usePortfolio();
  const { t } = useLanguage();
  const { isAdmin } = useAuth();

  return (
    <section 
      id="proyectos"
      className="min-h-screen py-20 px-4 bg-code-bg-secondary"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            <i className="fas fa-folder-open text-syntax-green mr-3"></i>
            {t('projects')}
          </h2>
          <p className="text-text-secondary font-mono">
            // Algunos de los proyectos en los que he trabajado
          </p>
        </div>

        {/* Grid de proyectos */}
        {proyectos.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {proyectos.map((proyecto) => (
              <div
                key={proyecto.id}
                className="
                  bg-code-bg-primary
                  border border-border-code
                  rounded-lg
                  overflow-hidden
                  hover:border-syntax-green
                  hover:shadow-glow-green
                  transition-all
                  group
                "
              >
                {/* Imagen */}
                <div className="relative h-48 bg-code-bg-tertiary overflow-hidden">
                  {proyecto.imagen ? (
                    <img
                      src={proyecto.imagen}
                      alt={proyecto.titulo}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <i className="fas fa-code text-6xl text-text-muted"></i>
                    </div>
                  )}
                  
                  {/* Overlay con links */}
                  <div className="
                    absolute inset-0
                    bg-code-bg-primary/90
                    flex items-center justify-center gap-4
                    opacity-0 group-hover:opacity-100
                    transition-opacity
                  ">
                    {proyecto.url_demo && (
                      <a
                        href={proyecto.url_demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          w-12 h-12
                          flex items-center justify-center
                          bg-syntax-blue
                          rounded-full
                          text-white
                          hover:scale-110
                          transition-transform
                          shadow-glow-blue
                        "
                        title={t('viewDemo')}
                      >
                        <i className="fas fa-external-link-alt"></i>
                      </a>
                    )}
                    {proyecto.url_codigo && (
                      <a
                        href={proyecto.url_codigo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          w-12 h-12
                          flex items-center justify-center
                          bg-syntax-purple
                          rounded-full
                          text-white
                          hover:scale-110
                          transition-transform
                          shadow-glow-purple
                        "
                        title={t('viewCode')}
                      >
                        <i className="fab fa-github"></i>
                      </a>
                    )}
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-text-primary mb-2 font-mono">
                    {proyecto.titulo}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">
                    {proyecto.descripcion}
                  </p>

                  {/* Links como botones */}
                  <div className="flex gap-3">
                    {proyecto.url_demo && (
                      <a
                        href={proyecto.url_demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          flex-1
                          px-4 py-2
                          bg-syntax-blue/10
                          border border-syntax-blue
                          text-syntax-blue
                          text-center
                          font-mono text-sm
                          rounded-lg
                          hover:bg-syntax-blue/20
                          transition-all
                        "
                      >
                        <i className="fas fa-eye mr-2"></i>
                        Demo
                      </a>
                    )}
                    {proyecto.url_codigo && (
                      <a
                        href={proyecto.url_codigo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          flex-1
                          px-4 py-2
                          bg-syntax-purple/10
                          border border-syntax-purple
                          text-syntax-purple
                          text-center
                          font-mono text-sm
                          rounded-lg
                          hover:bg-syntax-purple/20
                          transition-all
                        "
                      >
                        <i className="fab fa-github mr-2"></i>
                        Code
                      </a>
                    )}
                  </div>
                </div>

                {/* Badge decorativo */}
                <div className="px-6 pb-4">
                  <div className="flex items-center gap-2 text-text-muted text-xs font-mono">
                    <i className="fas fa-code"></i>
                    <div className="flex-1 h-px bg-border-code"></div>
                    <span>proyecto #{proyecto.id}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <i className="fas fa-folder-open text-6xl text-text-muted mb-4"></i>
            <p className="text-text-muted font-mono">
              {t('noProjects')}
            </p>
          </div>
        )}

        {/* Botón Admin */}
        {isAdmin && (
          <div className="mt-12 text-center">
            <button className="
              px-6 py-3
              bg-status-success/10
              border border-status-success
              text-status-success
              font-mono
              rounded-lg
              hover:bg-status-success/20
              transition-all
            ">
              <i className="fas fa-plus mr-2"></i>
              Agregar Proyecto
            </button>
          </div>
        )}
      </div>
    </section>
  );
}