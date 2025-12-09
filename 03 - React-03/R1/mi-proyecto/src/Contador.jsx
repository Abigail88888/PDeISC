    import React, { useState } from 'react';
    import './App.css';
    /*Funcion para tener un contador*/
    function Contador() {
      const [contador, setContador] = useState(0);
      /*Aplicamos funcionalidad*/
      const aumentar = () => setContador(contador + 1);
      const disminuir = () => setContador(contador - 1);
      /*Aplicamos funcionalidad a los botones*/
      return (
        <div className="contador">
          <h2>Contador: {contador}</h2>
          <button onClick={aumentar}>+</button>
          <button onClick={disminuir}>-</button>
        </div>
      );
    }

    export default Contador;