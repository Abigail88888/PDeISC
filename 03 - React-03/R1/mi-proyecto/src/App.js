    /*Importamos lo necesario*/
    import React, { useState, useEffect } from 'react';
    import logo from './logo.svg';
    import fotoPerfil from './billie.jpg';
    import './App.css';
    import Saludo from './Hola.jsx';
    import Tarjetita from './Tarjetita.jsx';
    import Contador from './Contador.jsx';
    import ListaTareas from './Tareas.jsx';
    import Formulario from './Formulario.jsx';

    function App() {
      const [nombreMostrado, setNombreMostrado] = useState('');
      const [tareas, setTareas] = useState([]);

      /* Cargar datos al inicio usando localStorage */
      useEffect(() => {
        const nombreGuardado = localStorage.getItem('nombreMostrado');
        const tareasGuardadas = localStorage.getItem('tareas');
        if (nombreGuardado) setNombreMostrado(nombreGuardado);
        if (tareasGuardadas) setTareas(JSON.parse(tareasGuardadas));
      }, []);

      /* Guardar datos en localStorage cuando cambien */
      useEffect(() => {
        localStorage.setItem('nombreMostrado', nombreMostrado);
        localStorage.setItem('tareas', JSON.stringify(tareas));
      }, [nombreMostrado, tareas]);

      /* Reiniciar todo */
      const reiniciarTodo = () => {
        setNombreMostrado('');
        setTareas([]);
        localStorage.clear();
      };
      /*Mostramos los componentes en la pagina*/
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <div>
              <Saludo />
              <Tarjetita
                nombre="Billie"
                apellido="Eilish"
                profesion="Cantante y compositora"
                imagen={fotoPerfil}
              />
              <Contador />
              <ListaTareas tareas={tareas} setTareas={setTareas} />
              <Formulario onSubmit={(nombre) => setNombreMostrado(nombre)} />
              {nombreMostrado && <h3>¡Hola, {nombreMostrado}!</h3>}
              <button onClick={reiniciarTodo}>Reiniciar todo</button>
            </div>
          </header>
        </div>
      );
    }

    export default App;