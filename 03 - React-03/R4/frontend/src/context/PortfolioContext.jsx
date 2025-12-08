import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const PortfolioContext = createContext();

/**
 * PORTFOLIO PROVIDER - Datos del portfolio PÚBLICOS
 * Se cargan sin necesidad de autenticación
 * Solo las operaciones CRUD requieren auth de admin
 */
export function PortfolioProvider({ children }) {
  const { token } = useAuth();
  
  const [portfolioData, setPortfolioData] = useState({
    habilidades: [],
    proyectos: [],
    experiencias: [],
    logros: [],
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * CARGAR DATOS del portfolio (PÚBLICO - sin auth)
   */
  const fetchPortfolio = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Llamada sin token - endpoint público
      const response = await axios.get(`${API_URL}/portfolio`);
      setPortfolioData(response.data);
    } catch (err) {
      console.error('Error al cargar portfolio:', err);
      setError(err.response?.data?.mensaje || 'Error al cargar datos');
    } finally {
      setLoading(false);
    }
  }, []); // Sin dependencia del token

  // Cargar datos al montar (sin esperar autenticación)
  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  /**
   * OPERACIONES CRUD - Requieren token de admin
   */

  // ──────────── HABILIDADES ────────────

  const createHabilidad = async (data) => {
    if (!token) return { success: false, error: 'No autorizado' };
    try {
      await axios.post(`${API_URL}/portfolio/habilidades`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchPortfolio();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.mensaje };
    }
  };

  const updateHabilidad = async (id, data) => {
    if (!token) return { success: false, error: 'No autorizado' };
    try {
      await axios.put(`${API_URL}/portfolio/habilidades/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchPortfolio();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.mensaje };
    }
  };

  const deleteHabilidad = async (id) => {
    if (!token) return { success: false, error: 'No autorizado' };
    try {
      await axios.delete(`${API_URL}/portfolio/habilidades/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchPortfolio();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.mensaje };
    }
  };

  // ──────────── PROYECTOS ────────────

  const createProyecto = async (data) => {
    if (!token) return { success: false, error: 'No autorizado' };
    try {
      await axios.post(`${API_URL}/portfolio/proyectos`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchPortfolio();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.mensaje };
    }
  };

  const updateProyecto = async (id, data) => {
    if (!token) return { success: false, error: 'No autorizado' };
    try {
      await axios.put(`${API_URL}/portfolio/proyectos/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchPortfolio();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.mensaje };
    }
  };

  const deleteProyecto = async (id) => {
    if (!token) return { success: false, error: 'No autorizado' };
    try {
      await axios.delete(`${API_URL}/portfolio/proyectos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchPortfolio();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.mensaje };
    }
  };

  // ──────────── EXPERIENCIAS ────────────

  const createExperiencia = async (data) => {
    if (!token) return { success: false, error: 'No autorizado' };
    try {
      await axios.post(`${API_URL}/portfolio/experiencias`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchPortfolio();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.mensaje };
    }
  };

  const updateExperiencia = async (id, data) => {
    if (!token) return { success: false, error: 'No autorizado' };
    try {
      await axios.put(`${API_URL}/portfolio/experiencias/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchPortfolio();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.mensaje };
    }
  };

  const deleteExperiencia = async (id) => {
    if (!token) return { success: false, error: 'No autorizado' };
    try {
      await axios.delete(`${API_URL}/portfolio/experiencias/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchPortfolio();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.mensaje };
    }
  };

  // ──────────── LOGROS ────────────

  const createLogro = async (data) => {
    if (!token) return { success: false, error: 'No autorizado' };
    try {
      await axios.post(`${API_URL}/portfolio/logros`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchPortfolio();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.mensaje };
    }
  };

  const updateLogro = async (id, data) => {
    if (!token) return { success: false, error: 'No autorizado' };
    try {
      await axios.put(`${API_URL}/portfolio/logros/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchPortfolio();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.mensaje };
    }
  };

  const deleteLogro = async (id) => {
    if (!token) return { success: false, error: 'No autorizado' };
    try {
      await axios.delete(`${API_URL}/portfolio/logros/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchPortfolio();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.mensaje };
    }
  };

  const value = {
    ...portfolioData,
    loading,
    error,
    refresh: fetchPortfolio,
    // Habilidades
    createHabilidad,
    updateHabilidad,
    deleteHabilidad,
    // Proyectos
    createProyecto,
    updateProyecto,
    deleteProyecto,
    // Experiencias
    createExperiencia,
    updateExperiencia,
    deleteExperiencia,
    // Logros
    createLogro,
    updateLogro,
    deleteLogro,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio debe usarse dentro de PortfolioProvider');
  }
  return context;
}