import { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

/**
 * MAPA DE ICONOS para cada tecnología
 */
const TECH_ICONS = {
  'JavaScript': { icon: 'fab fa-js-square', color: '#f7df1e' },
  'React': { icon: 'fab fa-react', color: '#61dafb' },
  'Node.js': { icon: 'fab fa-node-js', color: '#339933' },
  'Python': { icon: 'fab fa-python', color: '#3776ab' },
  'HTML': { icon: 'fab fa-html5', color: '#e34f26' },
  'CSS': { icon: 'fab fa-css3-alt', color: '#1572b6' },
  'PostgreSQL': { icon: 'fas fa-database', color: '#336791' },
  'Git': { icon: 'fab fa-git-alt', color: '#f05032' },
  'Docker': { icon: 'fab fa-docker', color: '#2496ed' },
  'TypeScript': { icon: 'fas fa-code', color: '#3178c6' },
  'Vue': { icon: 'fab fa-vuejs', color: '#4fc08d' },
  'Angular': { icon: 'fab fa-angular', color: '#dd0031' },
  'MongoDB': { icon: 'fas fa-leaf', color: '#47a248' },
  'Express': { icon: 'fas fa-server', color: '#000000' },
  'Tailwind': { icon: 'fas fa-wind', color: '#06b6d4' },
  // Soft Skills
  'Comunicación': { icon: 'fas fa-comments', color: '#58a6ff' },
  'Trabajo en Equipo': { icon: 'fas fa-users', color: '#3fb950' },
  'Liderazgo': { icon: 'fas fa-chess-king', color: '#d29922' },
  'Creatividad': { icon: 'fas fa-lightbulb', color: '#ff6ec7' },
  'Resolución de Problemas': { icon: 'fas fa-brain', color: '#bc8cff' },
  'Adaptabilidad': { icon: 'fas fa-sync-alt', color: '#39c5cf' },
};

/**
 * Obtener icono para una habilidad
 */
const getSkillIcon = (nombre) => {
  return TECH_ICONS[nombre] || { icon: 'fas fa-code', color: '#58a6ff' };
};

/**
 * HABILIDADES - Grid de skills con iconos brillantes
 */
export default function Habilidades() {
  const { habilidades } = usePortfolio();
  const { t } = useLanguage();
  const { isAdmin } = useAuth();
  const [filter, setFilter] = useState('all'); // all, programacion, soft

  // Filtrar habilidades
  const filteredSkills = habilidades.filter(skill => {
    if (filter === 'all') return true;
    return skill.tipo === filter;
  });

  // Separar por tipo
  const programmingSkills = habilidades.filter(s => s.tipo === 'programacion');
  const softSkills = habilidades.filter(s => s.tipo === 'soft');

  return (
    <section 
      id="habilidades"
      className="min-h-screen py-20 px-4 bg-code-bg-primary"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            <i className="fas fa-code text-syntax-purple mr-3"></i>
            {t('skills')}
          </h2>
          <p className="text-text-secondary font-mono">
            // Tecnologías y habilidades que domino
          </p>
        </div>

        {/* Filtros */}
        <div className="flex justify-center gap-4 mb-12">
          {[
            { key: 'all', label: 'Todas', icon: 'fa-list' },
            { key: 'programacion', label: t('programmingSkills'), icon: 'fa-code' },
            { key: 'soft', label: t('softSkills'), icon: 'fa-users' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`
                px-6 py-3
                font-mono text-sm
                rounded-lg
                transition-all
                ${filter === tab.key
                  ? 'bg-syntax-blue text-white shadow-glow-blue'
                  : 'bg-code-bg-secondary text-text-secondary hover:text-text-primary border border-border-code'
                }
              `}
            >
              <i className={`fas ${tab.icon} mr-2`}></i>
              {tab.label}
            </button>
          ))}
        </div>

        {/* HABILIDADES DE PROGRAMACIÓN */}
        {(filter === 'all' || filter === 'programacion') && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-text-primary mb-8 flex items-center gap-3">
              <i className="fas fa-laptop-code text-syntax-blue"></i>
              {t('programmingSkills')}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {programmingSkills.map((skill) => {
                const { icon, color } = getSkillIcon(skill.nombre);
                return (
                  <div
                    key={skill.id}
                    className="
                      bg-code-bg-secondary
                      border border-border-code
                      rounded-lg
                      p-6
                      hover:border-syntax-blue
                      transition-all
                      group
                      relative
                      overflow-hidden
                    "
                  >
                    {/* Icono con brillo */}
                    <div className="flex justify-center mb-4">
                      <i 
                        className={`${icon} text-6xl skill-icon`}
                        style={{ color }}
                      ></i>
                    </div>

                    {/* Nombre */}
                    <h4 className="text-text-primary font-bold font-mono text-center mb-3">
                      {skill.nombre}
                    </h4>

                    {/* Barra de nivel */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono text-text-muted">
                        <span>{t('level')}</span>
                        <span>{skill.nivel}%</span>
                      </div>
                      <div className="h-2 bg-code-bg-tertiary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-syntax-blue to-syntax-cyan transition-all duration-1000"
                          style={{ 
                            width: `${skill.nivel}%`,
                            boxShadow: `0 0 10px ${color}40`
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Efecto hover */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"
                      style={{ background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)` }}
                    ></div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SOFT SKILLS */}
        {(filter === 'all' || filter === 'soft') && (
          <div>
            <h3 className="text-2xl font-bold text-text-primary mb-8 flex items-center gap-3">
              <i className="fas fa-users text-syntax-green"></i>
              {t('softSkills')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {softSkills.map((skill) => {
                const { icon, color } = getSkillIcon(skill.nombre);
                return (
                  <div
                    key={skill.id}
                    className="
                      bg-code-bg-secondary
                      border border-border-code
                      rounded-lg
                      p-6
                      hover:border-syntax-green
                      transition-all
                      group
                    "
                  >
                    <div className="flex items-start gap-4">
                      {/* Icono */}
                      <div className="flex-shrink-0">
                        <i 
                          className={`${icon} text-4xl skill-icon`}
                          style={{ color }}
                        ></i>
                      </div>

                      {/* Contenido */}
                      <div className="flex-1">
                        <h4 className="text-text-primary font-bold font-mono mb-2">
                          {skill.nombre}
                        </h4>
                        
                        {/* Barra de nivel */}
                        <div className="space-y-1">
                          <div className="h-1.5 bg-code-bg-tertiary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-syntax-green to-syntax-cyan transition-all duration-1000"
                              style={{ width: `${skill.nivel}%` }}
                            ></div>
                          </div>
                          <p className="text-xs font-mono text-text-muted text-right">
                            {skill.nivel}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Mensaje si no hay habilidades */}
        {filteredSkills.length === 0 && (
          <div className="text-center py-20">
            <i className="fas fa-inbox text-6xl text-text-muted mb-4"></i>
            <p className="text-text-muted font-mono">
              No hay habilidades registradas
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
              Agregar Habilidad
            </button>
          </div>
        )}
      </div>
    </section>
  );
}