    import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
    import { useState, useEffect } from "react";
    import ListaTareas from "./componentes/ListaTareas";
    import DetalleTarea from "./componentes/DetalleTarea";
    import CrearTarea from "./componentes/CrearTarea";

    const API_BASE_URL = 'http://localhost:3000/api';

    function App() {
      const [tareas, setTareas] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      // Cargar tareas desde la API al iniciar
      useEffect(() => {
        cargarTareas();
      }, []);

      const cargarTareas = async () => {
        try {
          setLoading(true);
          const response = await fetch(`${API_BASE_URL}/tareas`);
          if (!response.ok) {
            throw new Error('Error al cargar tareas');
          }
          const data = await response.json();
          setTareas(data);
          setError(null);
        } catch (err) {
          console.error('Error cargando tareas:', err);
          setError('Error al cargar las tareas');
        } finally {
          setLoading(false);
        }
      };

      const toggleTarea = async (id) => {
        try {
          const tarea = tareas.find(t => t.id === id);
          const response = await fetch(`${API_BASE_URL}/tareas/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              completa: !tarea.completa
            })
          });

          if (!response.ok) {
            throw new Error('Error al actualizar tarea');
          }

          // Recargar tareas para obtener datos actualizados
          await cargarTareas();
        } catch (err) {
          console.error('Error al togglear tarea:', err);
          setError('Error al actualizar la tarea');
        }
      };

      const deleteTarea = async (id) => {
        try {
          const response = await fetch(`${API_BASE_URL}/tareas/${id}`, {
            method: 'DELETE'
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Error al eliminar tarea');
          }

          // Recargar tareas después de eliminar
          await cargarTareas();
        } catch (err) {
          console.error('Error al eliminar tarea:', err);
          // El error se manejará en el componente ListaTareas
          throw err;
        }
      };

      const agregarTarea = async (nuevaTareaData) => {
        try {
          const response = await fetch(`${API_BASE_URL}/tareas`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevaTareaData)
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Error al crear tarea');
          }

          // Recargar tareas después de crear
          await cargarTareas();
          return { success: true };
        } catch (err) {
          console.error('Error al crear tarea:', err);
          return { success: false, message: err.message };
        }
      };

      const updatePriorityTarea = async (id, esPrioridad) => {
        try {
          const response = await fetch(`${API_BASE_URL}/tareas/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              prioridad: esPrioridad
            })
          });

          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Error al actualizar prioridad');
          }

          // Recargar tareas para obtener datos actualizados
          await cargarTareas();
        } catch (err) {
          console.error('Error al actualizar prioridad:', err);
          throw err;
        }
      };

      const descargarTXT = (tarea) => {
        const contenido = `
    Título: ${tarea.titulo}
    Descripción: ${tarea.descripcion}
    Creada: ${tarea.fecha}
    ${tarea.completa ? " Completada en: " + tarea.fechaTerminada : "⏳ Pendiente"}
        `;
        const blob = new Blob([contenido], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${tarea.titulo}.txt`;
        link.click();
        URL.revokeObjectURL(url);
      };

      if (loading) {
        return (
          <div className="container mt-4 text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p>Cargando tareas...</p>
          </div>
        );
      }

      if (error) {
        return (
          <div className="container mt-4">
            <div className="alert alert-danger" role="alert">
              {error}
              <button 
                className="btn btn-outline-danger ms-3" 
                onClick={() => window.location.reload()}
              >
                Reintentar
              </button>
            </div>
          </div>
        );
      }

      return (
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <ListaTareas
                  tareas={tareas}
                  onToggle={toggleTarea}
                  onDelete={deleteTarea}
                  onDescargar={descargarTXT}
                  onUpdatePriority={updatePriorityTarea}
                />
              }
            />
            <Route 
              path="/tarea/:id" 
              element={<DetalleTarea tareas={tareas} onDescargar={descargarTXT} />} 
            />
            <Route 
              path="/crear" 
              element={<CrearTarea onAgregarTarea={agregarTarea} />} 
            />
          </Routes>
        </Router>
      );
    }

    export default App;