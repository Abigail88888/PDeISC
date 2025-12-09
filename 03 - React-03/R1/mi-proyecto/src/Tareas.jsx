    import React from 'react';
    import './App.css';

    /* Recibe el estado y el setter desde App para persistencia*/
    function ListaTareas({ tareas, setTareas }) {
      const [nuevaTarea, setNuevaTarea] = React.useState('');

      const agregarTarea = () => {
        if (nuevaTarea.trim() === '') return;
        setTareas([...tareas, { texto: nuevaTarea, completada: false }]);
        setNuevaTarea('');
      };

      const toggleCompletada = (index) => {
        const nuevas = [...tareas];
        nuevas[index].completada = !nuevas[index].completada;
        setTareas(nuevas);
      };

      return (
        <div className="ej4-tareas">
          <h2>Lista de Tareas</h2>
          <input
            type="text"
            value={nuevaTarea}
            onChange={(e) => setNuevaTarea(e.target.value)}
            placeholder="Escribí una tarea"
          />
          <button onClick={agregarTarea}>Agregar</button>
          <ul>
            {tareas.map((tarea, i) => (
              <li key={i}>
                <input
                  type="checkbox"
                  checked={tarea.completada}
                  onChange={() => toggleCompletada(i)}
                />
                <span className={tarea.completada ? 'completada' : ''}>
                  {tarea.texto}
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    export default ListaTareas;
