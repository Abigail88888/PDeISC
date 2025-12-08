/**
 * CONSTANTES DE LA APLICACIÓN
 * Colores, URLs, configuraciones, etc.
 */

/**
 * COLORES DEL TEMA (Code Dark)
 */
export const COLORS = {
  // Fondos
  bg: {
    primary: '#0d1117',
    secondary: '#161b22',
    tertiary: '#1f2937',
  },
  
  // Colores de sintaxis
  syntax: {
    blue: '#58a6ff',
    purple: '#bc8cff',
    green: '#3fb950',
    yellow: '#d29922',
    orange: '#ff7b72',
    pink: '#ff6ec7',
    cyan: '#39c5cf',
  },
  
  // Estados
  status: {
    success: '#3fb950',
    error: '#f85149',
    warning: '#d29922',
    info: '#58a6ff',
  },
  
  // Texto
  text: {
    primary: '#c9d1d9',
    secondary: '#8b949e',
    muted: '#484f58',
  },
  
  // Bordes
  border: '#30363d',
};

/**
 * URLs DE LA APLICACIÓN
 */
export const URLS = {
  api: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  frontend: import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173',
};

/**
 * CONFIGURACIÓN DE LA APLICACIÓN
 */
export const APP_CONFIG = {
  name: 'Portfolio',
  version: '1.0.0',
  author: 'Tu Nombre',
  description: 'Portfolio profesional de desarrollador Full Stack',
};

/**
 * ROLES DE USUARIO
 */
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

/**
 * TIPOS DE HABILIDADES
 */
export const SKILL_TYPES = {
  PROGRAMMING: 'programacion',
  SOFT: 'soft',
};

/**
 * ICONOS DE TECNOLOGÍAS
 * Mapeo de nombre de tecnología a su icono FontAwesome
 */
export const TECH_ICONS = {
  // Lenguajes de programación
  'JavaScript': { icon: 'fab fa-js-square', color: '#f7df1e' },
  'TypeScript': { icon: 'fas fa-code', color: '#3178c6' },
  'Python': { icon: 'fab fa-python', color: '#3776ab' },
  'Java': { icon: 'fab fa-java', color: '#007396' },
  'C++': { icon: 'fas fa-code', color: '#00599c' },
  'PHP': { icon: 'fab fa-php', color: '#777bb4' },
  'Ruby': { icon: 'fas fa-gem', color: '#cc342d' },
  'Go': { icon: 'fas fa-code', color: '#00add8' },
  
  // Frontend
  'React': { icon: 'fab fa-react', color: '#61dafb' },
  'Vue': { icon: 'fab fa-vuejs', color: '#4fc08d' },
  'Angular': { icon: 'fab fa-angular', color: '#dd0031' },
  'Svelte': { icon: 'fas fa-bolt', color: '#ff3e00' },
  'HTML': { icon: 'fab fa-html5', color: '#e34f26' },
  'CSS': { icon: 'fab fa-css3-alt', color: '#1572b6' },
  'Sass': { icon: 'fab fa-sass', color: '#cc6699' },
  'Tailwind': { icon: 'fas fa-wind', color: '#06b6d4' },
  'Bootstrap': { icon: 'fab fa-bootstrap', color: '#7952b3' },
  
  // Backend
  'Node.js': { icon: 'fab fa-node-js', color: '#339933' },
  'Express': { icon: 'fas fa-server', color: '#000000' },
  'Django': { icon: 'fas fa-server', color: '#092e20' },
  'Flask': { icon: 'fas fa-flask', color: '#000000' },
  'Spring': { icon: 'fas fa-leaf', color: '#6db33f' },
  
  // Bases de datos
  'PostgreSQL': { icon: 'fas fa-database', color: '#336791' },
  'MySQL': { icon: 'fas fa-database', color: '#4479a1' },
  'MongoDB': { icon: 'fas fa-leaf', color: '#47a248' },
  'Redis': { icon: 'fas fa-database', color: '#dc382d' },
  'SQLite': { icon: 'fas fa-database', color: '#003b57' },
  
  // DevOps y herramientas
  'Git': { icon: 'fab fa-git-alt', color: '#f05032' },
  'GitHub': { icon: 'fab fa-github', color: '#181717' },
  'GitLab': { icon: 'fab fa-gitlab', color: '#fc6d26' },
  'Docker': { icon: 'fab fa-docker', color: '#2496ed' },
  'Kubernetes': { icon: 'fas fa-dharmachakra', color: '#326ce5' },
  'AWS': { icon: 'fab fa-aws', color: '#ff9900' },
  'Azure': { icon: 'fab fa-microsoft', color: '#0078d4' },
  'Linux': { icon: 'fab fa-linux', color: '#fcc624' },
  
  // Soft Skills (con iconos genéricos)
  'Comunicación': { icon: 'fas fa-comments', color: '#58a6ff' },
  'Trabajo en Equipo': { icon: 'fas fa-users', color: '#3fb950' },
  'Liderazgo': { icon: 'fas fa-chess-king', color: '#d29922' },
  'Creatividad': { icon: 'fas fa-lightbulb', color: '#ff6ec7' },
  'Resolución de Problemas': { icon: 'fas fa-brain', color: '#bc8cff' },
  'Adaptabilidad': { icon: 'fas fa-sync-alt', color: '#39c5cf' },
  'Pensamiento Crítico': { icon: 'fas fa-search', color: '#58a6ff' },
  'Gestión del Tiempo': { icon: 'fas fa-clock', color: '#d29922' },
  'Empatía': { icon: 'fas fa-heart', color: '#ff6ec7' },
  'Organización': { icon: 'fas fa-list-check', color: '#3fb950' },
};

/**
 * ICONOS PARA LOGROS
 */
export const ACHIEVEMENT_ICONS = [
  { icon: 'fa-trophy', color: '#d29922' },
  { icon: 'fa-medal', color: '#ff6ec7' },
  { icon: 'fa-award', color: '#58a6ff' },
  { icon: 'fa-star', color: '#3fb950' },
  { icon: 'fa-certificate', color: '#bc8cff' },
  { icon: 'fa-crown', color: '#ff7b72' },
  { icon: 'fa-gem', color: '#39c5cf' },
];

/**
 * DURACIONES DE ANIMACIÓN
 */
export const ANIMATION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 500,
};

/**
 * TIEMPOS DE ESPERA
 */
export const TIMEOUTS = {
  notification: 4000, // 4 segundos
  loadingScreen: 2500, // 2.5 segundos
  debounce: 300, // Para búsquedas
};

/**
 * VALIDACIONES
 */
export const VALIDATION = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: {
    minLength: 6,
    maxLength: 50,
  },
  skillLevel: {
    min: 1,
    max: 100,
  },
};

/**
 * MENSAJES DE ERROR COMUNES
 */
export const ERROR_MESSAGES = {
  networkError: 'Error de conexión. Verifica tu internet.',
  unauthorized: 'No tienes permisos para realizar esta acción.',
  notFound: 'Recurso no encontrado.',
  serverError: 'Error del servidor. Intenta más tarde.',
  validation: 'Por favor verifica los datos ingresados.',
};

/**
 * BREAKPOINTS RESPONSIVE (Tailwind)
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export default {
  COLORS,
  URLS,
  APP_CONFIG,
  USER_ROLES,
  SKILL_TYPES,
  TECH_ICONS,
  ACHIEVEMENT_ICONS,
  ANIMATION_DURATION,
  TIMEOUTS,
  VALIDATION,
  ERROR_MESSAGES,
  BREAKPOINTS,
};