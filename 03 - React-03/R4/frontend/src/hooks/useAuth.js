import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * HOOK useAuth
 * Facilita el acceso al contexto de autenticación
 * 
 * Uso:
 * const { user, isAuthenticated, login, logout, isAdmin } = useAuth();
 */
export default function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  
  return context;
}

/**
 * Este hook es un simple wrapper del contexto.
 * Ya está implementado en AuthContext.jsx con la función useAuth(),
 * pero este archivo permite importarlo de manera más limpia:
 * 
 * import useAuth from '@/hooks/useAuth'
 * 
 * en lugar de:
 * 
 * import { useAuth } from '@/context/AuthContext'
 */