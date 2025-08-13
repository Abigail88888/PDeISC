    import React from 'react';
    import './App.css';
    /* Creamos la funcion con sus parametros */
    function Tarjetita({ nombre, apellido, profesion, imagen }) {
      return (
        /* Hacemos la tarjeta */
        <div className="tarjeta">
          {/* Imagen de perfil */}
          <img src={imagen} alt={`${nombre} ${apellido}`} />
          {/* Nombre completo */}
          <h2>{nombre} {apellido}</h2>
          {/* Profesión o descripción */}
          <p>{profesion}</p>
        </div>
      );
    }

    export default Tarjetita;
