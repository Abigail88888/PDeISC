import { useContext } from 'react';
import { PortfolioContext } from '../context/PortfolioContext';

/**
 * HOOK usePortfolio
 * Facilita el acceso al contexto del portfolio
 * 
 * Uso:
 * const { 
 *   habilidades, 
 *   proyectos, 
 *   experiencias, 
 *   logros,
 *   createHabilidad,
 *   updateProyecto,
 *   deleteExperiencia
 * } = usePortfolio();
 */
export default function usePortfolio() {
  const context = useContext(PortfolioContext);
  
  if (!context) {
    throw new Error('usePortfolio debe usarse dentro de PortfolioProvider');
  }
  
  return context;
}

/**
 * Este hook es un wrapper del contexto PortfolioContext.
 * Proporciona acceso a:
 * 
 * - Datos:
 *   - habilidades: []
 *   - proyectos: []
 *   - experiencias: []
 *   - logros: []
 *   - loading: boolean
 *   - error: string | null
 * 
 * - Métodos CRUD para Habilidades:
 *   - createHabilidad(data)
 *   - updateHabilidad(id, data)
 *   - deleteHabilidad(id)
 * 
 * - Métodos CRUD para Proyectos:
 *   - createProyecto(data)
 *   - updateProyecto(id, data)
 *   - deleteProyecto(id)
 * 
 * - Métodos CRUD para Experiencias:
 *   - createExperiencia(data)
 *   - updateExperiencia(id, data)
 *   - deleteExperiencia(id)
 * 
 * - Métodos CRUD para Logros:
 *   - createLogro(data)
 *   - updateLogro(id, data)
 *   - deleteLogro(id)
 * 
 * - Otros:
 *   - refresh() - Recargar todos los datos
 */