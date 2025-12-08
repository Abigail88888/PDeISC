import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

/**
 * PROFILE CARD - Tarjeta de presentación con animación flip
 * Frente: Avatar grande con nombre
 * Atrás: Profesión y descripción
 */
export default function ProfileCard() {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <section 
      id="sobre-mi"
      className="min-h-screen flex items-center justify-center py-20 px-4"
    >
      <div className="max-w-4xl w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Flip Card - Foto de perfil */}
          <div className="flex justify-center">
            <div className="flip-card">
              <div className="flip-card-inner">
                {/* FRENTE - Avatar */}
                <div className="flip-card-front">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div
                        className="
                          w-40 h-40
                          rounded-full
                          flex items-center justify-center
                          font-bold text-white text-6xl
                          shadow-2xl
                        "
                        style={{
                          backgroundColor: user?.avatarColor || '#58a6ff',
                        }}
                      >
                        {user?.initials}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ATRÁS - Profesión */}
                <div className="flip-card-back">
                  <div className="w-full h-full flex items-center justify-center p-6">
                    <div className="text-center">
                      <i className="fas fa-code text-5xl text-white mb-4"></i>
                      <h3 className="text-white font-bold text-xl font-mono">
                        {t('fullStackDev')}
                      </h3>
                      <p className="text-white/80 text-sm mt-2">
                        React • Node.js • PostgreSQL
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Información textual */}
          <div className="space-y-6">
            {/* Saludo */}
            <div>
              <p className="text-syntax-blue font-mono text-sm mb-2">
                {t('welcome')} 👋
              </p>
              <h1 className="text-5xl font-bold text-text-primary mb-2">
                {user?.nombre}
              </h1>
              <h2 className="text-2xl text-syntax-green font-mono">
                {'<'} {t('fullStackDev')} {'/>'} 
              </h2>
            </div>

            {/* Descripción */}
            <div className="space-y-4">
              <p className="text-text-secondary leading-relaxed">
                Desarrollador apasionado por crear experiencias web innovadoras 
                y funcionales. Especializado en tecnologías modernas del ecosistema 
                JavaScript y desarrollo full stack.
              </p>

              <div className="flex flex-wrap gap-2">
                {['React', 'Node.js', 'PostgreSQL', 'Tailwind', 'Express'].map((tech) => (
                  <span
                    key={tech}
                    className="
                      px-3 py-1
                      bg-code-bg-secondary
                      border border-border-code
                      rounded-full
                      text-text-primary
                      text-sm font-mono
                      hover:border-syntax-blue
                      hover:text-syntax-blue
                      transition-all
                      cursor-default
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Datos de contacto */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3 text-text-secondary">
                <i className="fas fa-envelope text-syntax-cyan w-5"></i>
                <span className="font-mono text-sm">{user?.email}</span>
              </div>
              {user?.celular && (
                <div className="flex items-center gap-3 text-text-secondary">
                  <i className="fas fa-phone text-syntax-green w-5"></i>
                  <span className="font-mono text-sm">{user?.celular}</span>
                </div>
              )}
              <div className="flex items-center gap-3 text-text-secondary">
                <i className="fas fa-map-marker-alt text-syntax-purple w-5"></i>
                <span className="font-mono text-sm">Mar del Plata, Argentina</span>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-wrap gap-4 pt-6">
              <a
                href="#proyectos"
                className="
                  px-6 py-3
                  bg-gradient-to-r from-syntax-blue to-syntax-cyan
                  text-white font-bold font-mono
                  rounded-lg
                  hover:shadow-glow-blue
                  transition-all
                  btn-code
                  inline-flex items-center gap-2
                "
              >
                <i className="fas fa-folder"></i>
                Ver Proyectos
              </a>
              <a
                href="#habilidades"
                className="
                  px-6 py-3
                  bg-code-bg-secondary
                  border border-border-code
                  text-text-primary font-mono
                  rounded-lg
                  hover:border-syntax-purple
                  hover:text-syntax-purple
                  transition-all
                  inline-flex items-center gap-2
                "
              >
                <i className="fas fa-code"></i>
                Habilidades
              </a>
            </div>

            {/* Indicador de scroll */}
            <div className="pt-8 flex justify-center md:justify-start">
              <div className="animate-float">
                <i className="fas fa-chevron-down text-syntax-blue text-2xl"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Stats rápidos (opcional) */}
        <div className="
          grid grid-cols-2 md:grid-cols-4 gap-6
          mt-16 pt-8
          border-t border-border-code
        ">
          {[
            { icon: 'fa-code', value: '15+', label: 'Proyectos' },
            { icon: 'fa-laptop-code', value: '3+', label: 'Años exp.' },
            { icon: 'fa-trophy', value: '10+', label: 'Logros' },
            { icon: 'fa-star', value: '20+', label: 'Skills' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="
                text-center
                p-4
                bg-code-bg-secondary/50
                border border-border-code
                rounded-lg
                hover:border-syntax-blue
                transition-all
                group
              "
            >
              <i className={`fas ${stat.icon} text-3xl text-syntax-blue mb-2 group-hover:animate-pulse`}></i>
              <p className="text-2xl font-bold text-text-primary font-mono">
                {stat.value}
              </p>
              <p className="text-text-muted text-sm font-mono mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}