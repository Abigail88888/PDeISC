import { createContext, useContext, useState, useEffect } from 'react';

/**
 * TRADUCCIONES - Todos los textos de la aplicación
 */
const translations = {
  es: {
    // Auth
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
    
    // Secciones
    about: 'Sobre mí',
    skills: 'Habilidades',
    projects: 'Proyectos',
    experience: 'Experiencia',
    achievements: 'Logros',
    contact: 'Contacto',
    
    // Skills
    programmingSkills: 'Habilidades de Programación',
    softSkills: 'Soft Skills',
    level: 'Nivel',
    
    // Projects
    viewDemo: 'Ver Demo',
    viewCode: 'Ver Código',
    noProjects: 'No hay proyectos aún',
    
    // Experience
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
    
    // Fields
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
    
    // Profile
    fullStackDev: 'Desarrollador Full Stack',
    webDeveloper: 'Desarrollador Web',
  },
  
  en: {
    // Auth
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
    
    // Sections
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
    
    // Fields
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

// Crear el contexto
const LanguageContext = createContext();

/**
 * PROVIDER - Envuelve la app y provee el idioma
 */
export function LanguageProvider({ children }) {
  // Obtener idioma guardado o usar español por defecto
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'es';
  });

  // Guardar idioma cuando cambie
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Función para cambiar idioma
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  // Función para obtener traducción
  const t = (key) => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    toggleLanguage,
    t, // función para traducir
    isSpanish: language === 'es',
    isEnglish: language === 'en',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * HOOK - Para usar el contexto en componentes
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage debe usarse dentro de LanguageProvider');
  }
  return context;
}