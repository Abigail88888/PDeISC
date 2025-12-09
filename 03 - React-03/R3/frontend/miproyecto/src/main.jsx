import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './estilos.css' // Importar estilos personalizados
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css' // Para los iconos de Bootstrap

/**
 * Punto de entrada principal de la aplicación React
 * Configura el modo estricto y renderiza la aplicación principal
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)