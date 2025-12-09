import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListadoUsuarios from './componentes/ListadoUsuarios';
import FormularioUsuario from './componentes/FormularioUsuario';
import Mensaje from './componentes/Mensaje';

/**
 * Componente principal de la aplicación
 * Maneja la navegación entre la lista de usuarios y el formulario de agregar usuario
 * Gestiona el estado global de usuarios y mensajes
 */
function App() {
  // Estados principales
  const [usuarios, setUsuarios] = useState([]);
  const [paginaActual, setPaginaActual] = useState('lista'); // 'lista' o 'formulario'
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '', visible: false });
  const [cargando, setCargando] = useState(false);

  // Cargar usuarios al iniciar la aplicación
  useEffect(() => {
    actualizarUsuarios();
  }, []);

  /**
   * Obtiene la lista actualizada de usuarios desde el servidor
   */
  const actualizarUsuarios = async () => {
    setCargando(true);
    try {
      const response = await fetch("http://localhost:3000/api/usuarios");
      const data = await response.json();
      
      if (response.ok) {
        // Normalizar los nombres de campos para compatibilidad
        const usuariosNormalizados = Array.isArray(data) ? data.map(usuario => ({
          ...usuario,
          FechaNacimiento: usuario.FechaNacimiento || usuario['Fecha de nacimiento'] || null
        })) : [];
        setUsuarios(usuariosNormalizados);
      } else {
        mostrarMensaje('Error al cargar usuarios', 'error');
        setUsuarios([]);
      }
    } catch (error) {
      console.error("Error cargando usuarios:", error);
      mostrarMensaje('Error de conexión al cargar usuarios', 'error');
      setUsuarios([]);
    } finally {
      setCargando(false);
    }
  };

  /**
   * Agrega un nuevo usuario
   * @param {Object} usuario - Datos del usuario a agregar
   */
  const agregarUsuario = async (usuario) => {
    setCargando(true);
    try {
      const response = await fetch("http://localhost:3000/api/agregarusuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });
      
      const data = await response.json();
      
      if (data.success) {
        mostrarMensaje(data.message, 'success');
        actualizarUsuarios();
        // Volver a la lista después de agregar exitosamente
        setTimeout(() => setPaginaActual('lista'), 1500);
      } else {
        mostrarMensaje(data.message || 'Error al agregar usuario', 'error');
      }
    } catch (error) {
      console.error("Error agregando usuario:", error);
      mostrarMensaje('Error de conexión al agregar usuario', 'error');
    } finally {
      setCargando(false);
    }
  };

  /**
   * Elimina un usuario por ID
   * @param {number} id - ID del usuario a eliminar
   */
  const borrarUsuario = async (id) => {
    if (!window.confirm('¿Está seguro que desea eliminar este usuario?')) {
      return;
    }

    setCargando(true);
    try {
      const response = await fetch(`http://localhost:3000/api/borrarusuarios/${id}`, { 
        method: "DELETE" 
      });
      
      const data = await response.json();
      
      if (data.success) {
        mostrarMensaje(data.message, 'success');
        actualizarUsuarios();
      } else {
        mostrarMensaje(data.message || 'Error al eliminar usuario', 'error');
      }
    } catch (error) {
      console.error("Error eliminando usuario:", error);
      mostrarMensaje('Error de conexión al eliminar usuario', 'error');
    } finally {
      setCargando(false);
    }
  };

  /**
   * Modifica un usuario existente
   * @param {number} id - ID del usuario a modificar
   * @param {Object} usuario - Nuevos datos del usuario
   */
  const modificarUsuario = async (id, usuario) => {
    setCargando(true);
    try {
      // RUTA CORREGIDA: cambiar consultarusuarios por modificarusuarios
      const response = await fetch(`http://localhost:3000/api/modificarusuarios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });
      
      const data = await response.json();
      
      if (data.success) {
        mostrarMensaje(data.message, 'success');
        actualizarUsuarios();
      } else {
        mostrarMensaje(data.message || 'Error al modificar usuario', 'error');
      }
    } catch (error) {
      console.error("Error modificando usuario:", error);
      mostrarMensaje('Error de conexión al modificar usuario', 'error');
    } finally {
      setCargando(false);
    }
  };

  /**
   * Muestra un mensaje temporal al usuario
   * @param {string} texto - Texto del mensaje
   * @param {string} tipo - Tipo de mensaje ('success', 'error', 'warning')
   */
  const mostrarMensaje = (texto, tipo) => {
    setMensaje({ texto, tipo, visible: true });
    setTimeout(() => {
      setMensaje(prev => ({ ...prev, visible: false }));
    }, 4000);
  };

  return (
    <div className="min-vh-100 bg-light">
      <div className="container py-4">
        {/* Header con navegación */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <h1 className="h2 mb-0 text-primary">
                {paginaActual === 'lista' ? 'Gestión de Usuarios' : 'Agregar Usuario'}
              </h1>
              
              {/* Botones de navegación */}
              <div className="mt-2 mt-md-0">
                {paginaActual === 'lista' ? (
                  <button
                    className="btn btn-success"
                    onClick={() => setPaginaActual('formulario')}
                    disabled={cargando}
                  >
                    <i className="bi bi-person-plus"></i> Agregar Usuario
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary"
                    onClick={() => setPaginaActual('lista')}
                    disabled={cargando}
                  >
                    <i className="bi bi-arrow-left"></i> Volver a la Lista
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Componente de mensajes */}
        <Mensaje mensaje={mensaje} />

        {/* Indicador de carga */}
        {cargando && (
          <div className="row mb-3">
            <div className="col-12">
              <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contenido principal basado en la página actual */}
        <div className="row">
          <div className="col-12">
            {paginaActual === 'lista' ? (
              <ListadoUsuarios
                usuarios={usuarios}
                borrarUsuario={borrarUsuario}
                modificarUsuario={modificarUsuario}
                cargando={cargando}
              />
            ) : (
              <FormularioUsuario
                agregarUsuario={agregarUsuario}
                cargando={cargando}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;