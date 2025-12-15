import { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import CRUDModal from './CRUDModal';
import DeleteConfirm from './DeleteConfirm';
import useNotification from '../../hooks/useNotification';

/**
 * ADMIN PANEL - Panel de administración completo MEJORADO
 * Sistema CRUD para Habilidades, Proyectos, Experiencias y Logros
 */
export default function AdminPanel() {
  const portfolio = usePortfolio();
  const { showSuccess, showError } = useNotification();

  // Estados para modales
  const [activeModal, setActiveModal] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * CONFIGURACIÓN DE CAMPOS para cada tipo
   */
  const fieldConfigs = {
    habilidad: [
      { 
        name: 'nombre', 
        label: 'Nombre de la habilidad', 
        type: 'text', 
        required: true,
        icon: 'fas fa-code',
        placeholder: 'Ej: JavaScript, React, Python...'
      },
      { 
        name: 'nivel', 
        label: 'Nivel (1-100)', 
        type: 'number', 
        required: true,
        min: 1,
        max: 100,
        icon: 'fas fa-chart-line',
        placeholder: '1-100'
      },
      { 
        name: 'tipo', 
        label: 'Tipo de habilidad', 
        type: 'select',
        required: true,
        icon: 'fas fa-tag',
        options: [
          { value: 'programacion', label: 'Programación' },
          { value: 'soft', label: 'Soft Skills' }
        ]
      },
    ],
    proyecto: [
      { 
        name: 'titulo', 
        label: 'Título del proyecto', 
        type: 'text', 
        required: true,
        icon: 'fas fa-heading',
        placeholder: 'Nombre del proyecto',
        fullWidth: true
      },
      { 
        name: 'descripcion', 
        label: 'Descripción', 
        type: 'textarea', 
        required: true,
        icon: 'fas fa-align-left',
        placeholder: 'Describe tu proyecto...',
        rows: 4,
        fullWidth: true
      },
      { 
        name: 'url_demo', 
        label: 'URL de demostración', 
        type: 'url',
        icon: 'fas fa-external-link-alt',
        placeholder: 'https://ejemplo.com'
      },
      { 
        name: 'url_codigo', 
        label: 'URL del código (GitHub)', 
        type: 'url',
        icon: 'fab fa-github',
        placeholder: 'https://github.com/usuario/repo'
      },
      { 
        name: 'imagen', 
        label: 'URL de imagen', 
        type: 'url',
        icon: 'fas fa-image',
        placeholder: 'https://ejemplo.com/imagen.jpg',
        fullWidth: true
      },
    ],
    experiencia: [
      { 
        name: 'puesto', 
        label: 'Puesto', 
        type: 'text', 
        required: true,
        icon: 'fas fa-user-tie',
        placeholder: 'Ej: Desarrollador Full Stack'
      },
      { 
        name: 'empresa', 
        label: 'Empresa', 
        type: 'text', 
        required: true,
        icon: 'fas fa-building',
        placeholder: 'Nombre de la empresa'
      },
      { 
        name: 'inicio', 
        label: 'Fecha de inicio', 
        type: 'date', 
        required: true,
        icon: 'fas fa-calendar-alt'
      },
      { 
        name: 'fin', 
        label: 'Fecha de fin (vacío si es actual)', 
        type: 'date',
        icon: 'fas fa-calendar-check'
      },
      { 
        name: 'descripcion', 
        label: 'Descripción', 
        type: 'textarea',
        icon: 'fas fa-align-left',
        placeholder: 'Describe tus responsabilidades...',
        rows: 4,
        fullWidth: true
      },
    ],
    logro: [
      { 
        name: 'titulo', 
        label: 'Título del logro', 
        type: 'text', 
        required: true,
        icon: 'fas fa-trophy',
        placeholder: 'Título del logro',
        fullWidth: true
      },
      { 
        name: 'descripcion', 
        label: 'Descripción', 
        type: 'textarea',
        icon: 'fas fa-align-left',
        placeholder: 'Describe el logro...',
        rows: 3,
        fullWidth: true
      },
    ],
  };

  /**
   * Abrir modal para crear
   */
  const handleCreate = (type) => {
    setEditingItem(null);
    setActiveModal(type);
  };

  /**
   * Abrir modal para editar
   */
  const handleEdit = (type, item) => {
    // Formatear fechas si es experiencia
    if (type === 'experiencia') {
      const formattedItem = {
        ...item,
        inicio: item.inicio ? new Date(item.inicio).toISOString().split('T')[0] : '',
        fin: item.fin ? new Date(item.fin).toISOString().split('T')[0] : '',
      };
      setEditingItem(formattedItem);
    } else {
      setEditingItem(item);
    }
    setActiveModal(type);
  };

  /**
   * Abrir confirmación de eliminación
   */
  const handleDeleteClick = (type, item) => {
    setDeletingItem({ type, item });
  };

  /**
   * Guardar (crear o actualizar)
   */
  const handleSave = async (type, data) => {
    setLoading(true);
    let result;

    try {
      if (editingItem) {
        // Actualizar
        switch (type) {
          case 'habilidad':
            result = await portfolio.updateHabilidad(editingItem.id, data);
            break;
          case 'proyecto':
            result = await portfolio.updateProyecto(editingItem.id, data);
            break;
          case 'experiencia':
            result = await portfolio.updateExperiencia(editingItem.id, data);
            break;
          case 'logro':
            result = await portfolio.updateLogro(editingItem.id, data);
            break;
        }
        showSuccess('Actualizado correctamente');
      } else {
        // Crear
        switch (type) {
          case 'habilidad':
            result = await portfolio.createHabilidad(data);
            break;
          case 'proyecto':
            result = await portfolio.createProyecto(data);
            break;
          case 'experiencia':
            result = await portfolio.createExperiencia(data);
            break;
          case 'logro':
            result = await portfolio.createLogro(data);
            break;
        }
        showSuccess('Creado correctamente');
      }

      if (result.success) {
        setActiveModal(null);
        setEditingItem(null);
      } else {
        showError(result.error || 'Error al guardar');
      }
    } catch (error) {
      showError('Error inesperado');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Confirmar eliminación
   */
  const handleDeleteConfirm = async () => {
    if (!deletingItem) return;
    
    setLoading(true);
    let result;

    try {
      switch (deletingItem.type) {
        case 'habilidad':
          result = await portfolio.deleteHabilidad(deletingItem.item.id);
          break;
        case 'proyecto':
          result = await portfolio.deleteProyecto(deletingItem.item.id);
          break;
        case 'experiencia':
          result = await portfolio.deleteExperiencia(deletingItem.item.id);
          break;
        case 'logro':
          result = await portfolio.deleteLogro(deletingItem.item.id);
          break;
      }

      if (result.success) {
        showSuccess('Eliminado correctamente');
        setDeletingItem(null);
      } else {
        showError(result.error || 'Error al eliminar');
      }
    } catch (error) {
      showError('Error inesperado');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Renderizar tabla de items - MEJORADA CON BOTONES MÁS VISIBLES
   */
  const renderTable = (type, items, columns) => {
    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-border-code bg-code-bg-tertiary">
              {columns.map(col => (
                <th key={col.key} className="text-left p-4 text-text-primary font-mono text-sm font-bold">
                  {col.label}
                </th>
              ))}
              <th className="text-center p-4 text-text-primary font-mono text-sm font-bold min-w-[200px]">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="text-center p-12 text-text-muted">
                  <div className="flex flex-col items-center gap-3">
                    <i className="fas fa-inbox text-4xl opacity-50"></i>
                    <p className="font-mono">No hay elementos aún</p>
                    <p className="text-xs">Haz clic en "Agregar" para crear el primero</p>
                  </div>
                </td>
              </tr>
            ) : (
              items.map(item => (
                <tr key={item.id} className="border-b border-border-code hover:bg-code-bg-tertiary/50 transition-colors">
                  {columns.map(col => (
                    <td key={col.key} className="p-4 text-text-primary font-mono text-sm">
                      {col.render ? col.render(item[col.key], item) : item[col.key]}
                    </td>
                  ))}
                  <td className="p-4">
                    <div className="flex justify-center gap-3 flex-wrap">
                      {/* ✅ BOTÓN EDITAR MEJORADO - MÁS GRANDE Y CLARO */}
                      <button
                        onClick={() => handleEdit(type, item)}
                        className="
                          group
                          px-5 py-2.5
                          bg-syntax-blue/20
                          border-2 border-syntax-blue
                          text-syntax-blue
                          rounded-lg
                          hover:bg-syntax-blue
                          hover:text-white
                          hover:shadow-glow-blue
                          transition-all
                          flex items-center gap-2
                          font-mono text-sm font-bold
                          min-w-[110px]
                          justify-center
                        "
                        title="Editar elemento"
                      >
                        <i className="fas fa-edit text-base"></i>
                        <span>Editar</span>
                      </button>

                      {/* ✅ BOTÓN ELIMINAR MEJORADO - MÁS GRANDE Y CLARO */}
                      <button
                        onClick={() => handleDeleteClick(type, item)}
                        className="
                          group
                          px-5 py-2.5
                          bg-status-error/20
                          border-2 border-status-error
                          text-status-error
                          rounded-lg
                          hover:bg-status-error
                          hover:text-white
                          hover:shadow-lg
                          transition-all
                          flex items-center gap-2
                          font-mono text-sm font-bold
                          min-w-[110px]
                          justify-center
                        "
                        title="Eliminar elemento"
                      >
                        <i className="fas fa-trash-alt text-base"></i>
                        <span>Eliminar</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <section 
      id="admin-panel"
      className="min-h-screen py-20 px-4 bg-code-bg-primary"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            <i className="fas fa-tools text-status-warning mr-3"></i>
            Panel de Administración
          </h2>
          <p className="text-text-secondary font-mono">
            // Gestiona tu portfolio desde aquí
          </p>
        </div>

        <div className="space-y-12">
          {/* HABILIDADES */}
          <div className="bg-code-bg-secondary border-2 border-border-code rounded-xl p-6 hover:border-syntax-purple/50 transition-all">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h3 className="text-2xl font-bold text-text-primary flex items-center gap-3">
                <i className="fas fa-code text-syntax-purple text-3xl"></i>
                <span>Habilidades</span>
                <span className="text-base text-text-muted font-mono bg-code-bg-tertiary px-3 py-1 rounded-full">
                  {portfolio.habilidades.length}
                </span>
              </h3>
              <button
                onClick={() => handleCreate('habilidad')}
                className="
                  w-full sm:w-auto
                  px-6 py-3
                  bg-syntax-purple/10
                  border-2 border-syntax-purple
                  text-syntax-purple
                  font-mono font-bold
                  rounded-lg
                  hover:bg-syntax-purple
                  hover:text-white
                  hover:shadow-glow-purple
                  transition-all
                  flex items-center justify-center gap-2
                "
              >
                <i className="fas fa-plus-circle text-lg"></i>
                Agregar Habilidad
              </button>
            </div>
            {renderTable('habilidad', portfolio.habilidades, [
              { key: 'nombre', label: 'Nombre' },
              { 
                key: 'tipo', 
                label: 'Tipo', 
                render: (val) => (
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-mono font-bold
                    ${val === 'programacion' 
                      ? 'bg-syntax-blue/20 text-syntax-blue border-2 border-syntax-blue' 
                      : 'bg-syntax-green/20 text-syntax-green border-2 border-syntax-green'
                    }
                  `}>
                    {val === 'programacion' ? 'Programación' : 'Soft Skill'}
                  </span>
                )
              },
              { 
                key: 'nivel', 
                label: 'Nivel', 
                render: (val) => (
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-3 bg-code-bg-tertiary rounded-full overflow-hidden border border-border-code">
                      <div 
                        className="h-full bg-gradient-to-r from-syntax-blue to-syntax-cyan transition-all duration-300"
                        style={{ width: `${val}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-syntax-cyan">{val}%</span>
                  </div>
                )
              },
            ])}
          </div>

          {/* PROYECTOS */}
          <div className="bg-code-bg-secondary border-2 border-border-code rounded-xl p-6 hover:border-syntax-green/50 transition-all">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h3 className="text-2xl font-bold text-text-primary flex items-center gap-3">
                <i className="fas fa-folder-open text-syntax-green text-3xl"></i>
                <span>Proyectos</span>
                <span className="text-base text-text-muted font-mono bg-code-bg-tertiary px-3 py-1 rounded-full">
                  {portfolio.proyectos.length}
                </span>
              </h3>
              <button
                onClick={() => handleCreate('proyecto')}
                className="
                  w-full sm:w-auto
                  px-6 py-3
                  bg-syntax-green/10
                  border-2 border-syntax-green
                  text-syntax-green
                  font-mono font-bold
                  rounded-lg
                  hover:bg-syntax-green
                  hover:text-white
                  hover:shadow-glow-green
                  transition-all
                  flex items-center justify-center gap-2
                "
              >
                <i className="fas fa-plus-circle text-lg"></i>
                Agregar Proyecto
              </button>
            </div>
            {renderTable('proyecto', portfolio.proyectos, [
              { key: 'titulo', label: 'Título' },
              { 
                key: 'descripcion', 
                label: 'Descripción', 
                render: (val) => (
                  <span className="block max-w-md truncate" title={val}>
                    {val?.substring(0, 60)}{val?.length > 60 ? '...' : ''}
                  </span>
                )
              },
              {
                key: 'url_demo',
                label: 'Demo',
                render: (val) => val ? (
                  <i className="fas fa-check-circle text-status-success text-lg"></i>
                ) : (
                  <i className="fas fa-times-circle text-text-muted text-lg"></i>
                )
              },
              {
                key: 'url_codigo',
                label: 'Código',
                render: (val) => val ? (
                  <i className="fas fa-check-circle text-status-success text-lg"></i>
                ) : (
                  <i className="fas fa-times-circle text-text-muted text-lg"></i>
                )
              },
            ])}
          </div>

          {/* EXPERIENCIAS */}
          <div className="bg-code-bg-secondary border-2 border-border-code rounded-xl p-6 hover:border-syntax-yellow/50 transition-all">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h3 className="text-2xl font-bold text-text-primary flex items-center gap-3">
                <i className="fas fa-briefcase text-syntax-yellow text-3xl"></i>
                <span>Experiencias</span>
                <span className="text-base text-text-muted font-mono bg-code-bg-tertiary px-3 py-1 rounded-full">
                  {portfolio.experiencias.length}
                </span>
              </h3>
              <button
                onClick={() => handleCreate('experiencia')}
                className="
                  w-full sm:w-auto
                  px-6 py-3
                  bg-syntax-yellow/10
                  border-2 border-syntax-yellow
                  text-syntax-yellow
                  font-mono font-bold
                  rounded-lg
                  hover:bg-syntax-yellow
                  hover:text-white
                  hover:shadow-lg
                  transition-all
                  flex items-center justify-center gap-2
                "
              >
                <i className="fas fa-plus-circle text-lg"></i>
                Agregar Experiencia
              </button>
            </div>
            {renderTable('experiencia', portfolio.experiencias, [
              { key: 'puesto', label: 'Puesto' },
              { key: 'empresa', label: 'Empresa' },
              { 
                key: 'inicio', 
                label: 'Inicio', 
                render: (val) => val ? new Date(val).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' }) : '-'
              },
              { 
                key: 'fin', 
                label: 'Fin', 
                render: (val) => val ? new Date(val).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' }) : (
                  <span className="text-status-success font-bold">Actual</span>
                )
              },
            ])}
          </div>

          {/* LOGROS */}
          <div className="bg-code-bg-secondary border-2 border-border-code rounded-xl p-6 hover:border-syntax-cyan/50 transition-all">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h3 className="text-2xl font-bold text-text-primary flex items-center gap-3">
                <i className="fas fa-trophy text-syntax-cyan text-3xl"></i>
                <span>Logros</span>
                <span className="text-base text-text-muted font-mono bg-code-bg-tertiary px-3 py-1 rounded-full">
                  {portfolio.logros.length}
                </span>
              </h3>
              <button
                onClick={() => handleCreate('logro')}
                className="
                  w-full sm:w-auto
                  px-6 py-3
                  bg-syntax-cyan/10
                  border-2 border-syntax-cyan
                  text-syntax-cyan
                  font-mono font-bold
                  rounded-lg
                  hover:bg-syntax-cyan
                  hover:text-white
                  hover:shadow-glow-cyan
                  transition-all
                  flex items-center justify-center gap-2
                "
              >
                <i className="fas fa-plus-circle text-lg"></i>
                Agregar Logro
              </button>
            </div>
            {renderTable('logro', portfolio.logros, [
              { key: 'titulo', label: 'Título' },
              { 
                key: 'descripcion', 
                label: 'Descripción', 
                render: (val) => (
                  <span className="block max-w-md truncate" title={val}>
                    {val?.substring(0, 70)}{val?.length > 70 ? '...' : ''}
                  </span>
                )
              },
            ])}
          </div>
        </div>
      </div>

      {/* Modales */}
      {activeModal && (
        <CRUDModal
          isOpen={true}
          onClose={() => {
            setActiveModal(null);
            setEditingItem(null);
          }}
          onSave={(data) => handleSave(activeModal, data)}
          title={`${editingItem ? 'Editar' : 'Crear'} ${
            activeModal === 'habilidad' ? 'Habilidad' :
            activeModal === 'proyecto' ? 'Proyecto' :
            activeModal === 'experiencia' ? 'Experiencia' : 'Logro'
          }`}
          fields={fieldConfigs[activeModal]}
          initialData={editingItem}
          loading={loading}
        />
      )}

      <DeleteConfirm
        isOpen={!!deletingItem}
        onClose={() => setDeletingItem(null)}
        onConfirm={handleDeleteConfirm}
        itemName={deletingItem?.item?.titulo || deletingItem?.item?.nombre || deletingItem?.item?.puesto}
        loading={loading}
      />
    </section>
  );
}