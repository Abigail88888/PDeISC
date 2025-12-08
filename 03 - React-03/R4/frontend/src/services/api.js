import axios from 'axios';

// URL base del backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// Crear instancia de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    
    return Promise.reject(error);
  }
);

//ENDPOINTS DE AUTENTICACIÓN
export const authAPI = {
  login: (email, contraseña) => 
    api.post('/auth/login', { email, contraseña }),
  
  register: (nombre, email, contraseña, celular) =>
    api.post('/auth/register', { nombre, email, contraseña, celular }),
};

// ENDPOINTS DE PORTFOLIO
export const portfolioAPI = {
  // Obtener todo el portfolio
  getAll: () => api.get('/portfolio'),

  // HABILIDADES
  getHabilidades: () => api.get('/portfolio/habilidades'),
  createHabilidad: (data) => api.post('/portfolio/habilidades', data),
  updateHabilidad: (id, data) => api.put(`/portfolio/habilidades/${id}`, data),
  deleteHabilidad: (id) => api.delete(`/portfolio/habilidades/${id}`),

  // PROYECTOS
  getProyectos: () => api.get('/portfolio/proyectos'),
  createProyecto: (data) => api.post('/portfolio/proyectos', data),
  updateProyecto: (id, data) => api.put(`/portfolio/proyectos/${id}`, data),
  deleteProyecto: (id) => api.delete(`/portfolio/proyectos/${id}`),

  // EXPERIENCIAS
  getExperiencias: () => api.get('/portfolio/experiencias'),
  createExperiencia: (data) => api.post('/portfolio/experiencias', data),
  updateExperiencia: (id, data) => api.put(`/portfolio/experiencias/${id}`, data),
  deleteExperiencia: (id) => api.delete(`/portfolio/experiencias/${id}`),

  // LOGROS
  getLogros: () => api.get('/portfolio/logros'),
  createLogro: (data) => api.post('/portfolio/logros', data),
  updateLogro: (id, data) => api.put(`/portfolio/logros/${id}`, data),
  deleteLogro: (id) => api.delete(`/portfolio/logros/${id}`),
};

export default api;