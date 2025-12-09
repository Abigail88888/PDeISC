    import React, { useState } from 'react';
    import './App.css';

    function Formulario({ onSubmit }) {
      // Estado para almacenar el texto del input
      const [nombre, setNombre] = useState('');

      // Manejar el envío del formulario
      const manejarEnvio = (e) => {
        e.preventDefault();

        // Validar que solo tenga letras (acentos permitidos) y mínimo 2 caracteres
        const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{2,}$/;
        if (!soloLetras.test(nombre.trim())) {
          alert('Por favor ingrese solo letras y al menos 2 caracteres.');
          return;
        }

        // Ejecuta la función recibida desde App y limpia el input
        onSubmit(nombre.trim());
        setNombre('');
      };

      return (
        <form onSubmit={manejarEnvio} className="formulario">
          <h2>Formulario</h2>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <button type="submit">Enviar</button>
        </form>
      );
    }

    export default Formulario;
