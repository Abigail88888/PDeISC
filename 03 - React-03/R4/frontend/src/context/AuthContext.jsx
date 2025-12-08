import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const AuthContext = createContext();

/**
 * PROVIDER - Maneja toda la lógica de autenticación
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /**
   * Inicializar - Revisar si hay sesión guardada
   */
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
      axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
    }
    
    setLoading(false);
  }, []);

  /**
   * GENERAR COLOR ÚNICO para avatar basado en el nombre
   */
  const getAvatarColor = (nombre) => {
    const colors = [
      '#58a6ff', '#bc8cff', '#3fb950', '#d29922',
      '#ff7b72', '#ff6ec7', '#39c5cf',
    ];
    const charCode = nombre.charCodeAt(0);
    const index = charCode % colors.length;
    return colors[index];
  };

  /**
   * OBTENER INICIALES del nombre
   */
  const getInitials = (nombre) => {
    if (!nombre) return '??';
    const parts = nombre.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  /**
   * LOGIN
   */
  const login = async (email, contraseña) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        contraseña,
      });

      const { token: newToken, usuario } = response.data;

      const userWithAvatar = {
        ...usuario,
        avatarColor: getAvatarColor(usuario.nombre),
        initials: getInitials(usuario.nombre),
      };

      setToken(newToken);
      setUser(userWithAvatar);
      setIsAuthenticated(true);

      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userWithAvatar));

      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

      return { success: true, user: userWithAvatar };
    } catch (error) {
      console.error('Error en login:', error);
      return {
        success: false,
        error: error.response?.data?.mensaje || 'Error al iniciar sesión',
      };
    }
  };

  /**
   * REGISTER
   */
  const register = async (nombre, email, contraseña, celular) => {
    try {
      await axios.post(`${API_URL}/auth/register`, {
        nombre,
        email,
        contraseña,
        celular,
      });

      return await login(email, contraseña);
    } catch (error) {
      console.error('Error en registro:', error);
      return {
        success: false,
        error: error.response?.data?.mensaje || 'Error al registrarse',
      };
    }
  };

  /**
   * LOGOUT
   */
  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  };

  // 🔥 CALCULAR isAdmin COMO VALOR BOOLEANO, NO FUNCIÓN
  const isAdmin = user?.rol === 'admin';

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    isAdmin, // ✅ Ahora es un booleano directamente
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * HOOK - Para usar el contexto
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
}