/**
 * TRADUCCIONES
 * Todos los textos de la aplicación en español e inglés
 * 
 * Nota: Este archivo es redundante con LanguageContext.jsx
 * que ya tiene las traducciones incluidas. Lo incluyo aquí
 * por si prefieres tener las traducciones separadas.
 */

export const translations = {
  es: {
    // Autenticación
    login: 'Iniciar Sesión',
    register: 'Registrarse',
    email: 'Correo electrónico',
    password: 'Contraseña',
    name: 'Nombre completo',
    phone: 'Celular (opcional)',
    loginButton: 'Entrar',
    registerButton: 'Crear cuenta',
    alreadyAccount: '¿Ya tienes cuenta?',
    noAccount: '¿No tienes cuenta?',
    logout: 'Cerrar sesión',
    
    // Mensajes
    welcome: 'Bienvenido',
    loading: 'Cargando...',
    error: 'Error',
    success: 'Éxito',
    loginSuccess: 'Sesión iniciada correctamente',
    registerSuccess: 'Usuario registrado exitosamente',
    loginError: 'Credenciales incorrectas',
    requiredFields: 'Por favor completa todos los campos',
    
    // Secciones del Portfolio
    about: 'Sobre mí',
    skills: 'Habilidades',
    projects: 'Proyectos',
    experience: 'Experiencia',
    achievements: 'Logros',
    contact: 'Contacto',
    
    // Habilidades
    programmingSkills: 'Habilidades de Programación',
    softSkills: 'Soft Skills',
    level: 'Nivel',
    
    // Proyectos
    viewDemo: 'Ver Demo',
    viewCode: 'Ver Código',
    noProjects: 'No hay proyectos aún',
    
    // Experiencia
    present: 'Actualidad',
    noExperience: 'No hay experiencias registradas',
    
    // Admin
    adminPanel: 'Panel de Administración',
    add: 'Agregar',
    edit: 'Editar',
    delete: 'Eliminar',
    save: 'Guardar',
    cancel: 'Cancelar',
    confirmDelete: '¿Estás seguro de eliminar este elemento?',
    deleteSuccess: 'Elemento eliminado correctamente',
    saveSuccess: 'Guardado exitosamente',
    
    // Campos de formulario
    title: 'Título',
    description: 'Descripción',
    position: 'Puesto',
    company: 'Empresa',
    startDate: 'Fecha de inicio',
    endDate: 'Fecha de fin',
    demoUrl: 'URL de demostración',
    codeUrl: 'URL del código',
    image: 'Imagen (URL)',
    skillName: 'Nombre de la habilidad',
    skillLevel: 'Nivel (1-100)',
    skillType: 'Tipo',
    
    // Perfil
    fullStackDev: 'Desarrollador Full Stack',
    webDeveloper: 'Desarrollador Web',
  },
  
  en: {
    // Authentication
    login: 'Login',
    register: 'Sign Up',
    email: 'Email address',
    password: 'Password',
    name: 'Full name',
    phone: 'Phone (optional)',
    loginButton: 'Sign In',
    registerButton: 'Create Account',
    alreadyAccount: 'Already have an account?',
    noAccount: "Don't have an account?",
    logout: 'Log out',
    
    // Messages
    welcome: 'Welcome',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    loginSuccess: 'Successfully logged in',
    registerSuccess: 'User registered successfully',
    loginError: 'Incorrect credentials',
    requiredFields: 'Please fill all required fields',
    
    // Portfolio Sections
    about: 'About me',
    skills: 'Skills',
    projects: 'Projects',
    experience: 'Experience',
    achievements: 'Achievements',
    contact: 'Contact',
    
    // Skills
    programmingSkills: 'Programming Skills',
    softSkills: 'Soft Skills',
    level: 'Level',
    
    // Projects
    viewDemo: 'View Demo',
    viewCode: 'View Code',
    noProjects: 'No projects yet',
    
    // Experience
    present: 'Present',
    noExperience: 'No experience recorded',
    
    // Admin
    adminPanel: 'Admin Panel',
    add: 'Add',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    confirmDelete: 'Are you sure you want to delete this item?',
    deleteSuccess: 'Item deleted successfully',
    saveSuccess: 'Saved successfully',
    
    // Form Fields
    title: 'Title',
    description: 'Description',
    position: 'Position',
    company: 'Company',
    startDate: 'Start date',
    endDate: 'End date',
    demoUrl: 'Demo URL',
    codeUrl: 'Code URL',
    image: 'Image (URL)',
    skillName: 'Skill name',
    skillLevel: 'Level (1-100)',
    skillType: 'Type',
    
    // Profile
    fullStackDev: 'Full Stack Developer',
    webDeveloper: 'Web Developer',
  }
};

/**
 * Función helper para obtener traducción
 */
export const getTranslation = (key, language = 'es') => {
  return translations[language]?.[key] || key;
};

export default translations;