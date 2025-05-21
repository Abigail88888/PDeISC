    // Creamos el tablero vacío
    let tablero = ["", "", "", "", "", "", "", "", ""];

    // Puntajes
    let puntosJugador = 0;
    let puntosCompu = 0;

    // Turno actual
    let turno = "X";

    // Jugador puede ser "X" o "O"
    let jugador = "";
    let computadora = "";

    // Elementos del DOM
    const game = document.getElementById("game");
    const turnoTexto = document.getElementById("turno");
    const resultado = document.getElementById("resultado");
    const reiniciar = document.getElementById("reiniciar");
    const puntajeX = document.getElementById("puntajeX");
    const puntajeO = document.getElementById("puntajeO");

    const contenedorSeleccion = document.querySelector(".contenedor-seleccion");
    const contenedorJuego = document.querySelector(".contenedor-juego");
    const eligeX = document.getElementById("eligeX");
    const eligeO = document.getElementById("eligeO");
    const botonSeleccionar = document.getElementById("botonSeleccionar");

    let eleccionTemporal = "";

    // Elegir letra
    eligeX.addEventListener("click", () => {
      eleccionTemporal = "X";
      botonSeleccionar.disabled = false;
      eligeX.classList.add("seleccionado");
      eligeO.classList.remove("seleccionado");
    });

    eligeO.addEventListener("click", () => {
      eleccionTemporal = "O";
      botonSeleccionar.disabled = false;
      eligeO.classList.add("seleccionado");
      eligeX.classList.remove("seleccionado");
    });

    // Confirmar selección
    botonSeleccionar.addEventListener("click", () => {
      jugador = eleccionTemporal;
      computadora = jugador === "X" ? "O" : "X";
      turno = "X";
      contenedorSeleccion.style.display = "none";
      contenedorJuego.style.display = "block";
      crearTablero();

      // Si el jugador eligió "O", empieza la compu
      if (jugador === "O") {
        turno = "X"; // Compu empieza
        turnoTexto.textContent = turno;
        setTimeout(jugadaComputadora, 500);
      }
    });

    // Crear tablero
    function crearTablero() {
      game.innerHTML = "";
      tablero = ["", "", "", "", "", "", "", "", ""];
      resultado.textContent = "";
      turnoTexto.textContent = turno;

      for (let i = 0; i < 9; i++) {
        const celda = document.createElement("div");
        celda.classList.add("cell");
        celda.dataset.index = i;
        celda.addEventListener("click", jugadaJugador);
        game.appendChild(celda);
      }
    }

    // Jugada del jugador
    function jugadaJugador(evento) {
      const indice = evento.target.dataset.index;

      if (tablero[indice] !== "" || turno !== jugador) return;

      tablero[indice] = jugador;
      evento.target.textContent = jugador;

      if (gano(jugador)) {
        resultado.textContent = "¡Ganaste vos!";
        puntosJugador++;
        actualizarPuntaje();
        desactivarCeldas();
        return;
      }

      if (empate()) {
        resultado.textContent = "Empate";
        return;
      }

      turno = computadora;
      turnoTexto.textContent = turno;

      setTimeout(jugadaComputadora, 1000);
    }

    // Jugada de la compu
    function jugadaComputadora() {
      const libres = tablero.map((val, i) => val === "" ? i : null).filter(i => i !== null);
      if (libres.length === 0) return;

      const aleatorio = libres[Math.floor(Math.random() * libres.length)];
      tablero[aleatorio] = computadora;

      const celda = document.querySelector(`.cell[data-index="${aleatorio}"]`);
      celda.textContent = computadora;

      if (gano(computadora)) {
        resultado.textContent = "¡Ganó la compu!";
        puntosCompu++;
        actualizarPuntaje();
        desactivarCeldas();
        return;
      }

      if (empate()) {
        resultado.textContent = "Empate";
        return;
      }

      turno = jugador;
      turnoTexto.textContent = turno;
    }

    // Ver si alguien ganó
    function gano(jugador) {
      const lineas = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
      ];

      return lineas.some(([a, b, c]) => tablero[a] === jugador && tablero[b] === jugador && tablero[c] === jugador);
    }

    // Ver si hubo empate
    function empate() {
      return !tablero.includes("");
    }

    // Actualiza los puntajes
    function actualizarPuntaje() {
      puntajeX.textContent = jugador === "X" ? puntosJugador : puntosCompu;
    puntajeO.textContent = jugador === "O" ? puntosJugador : puntosCompu;
    }

    // Bloquea todas las celdas
    function desactivarCeldas() {
      document.querySelectorAll(".cell").forEach(c => c.removeEventListener("click", jugadaJugador));
    }

    // Botón Reiniciar
    reiniciar.addEventListener("click", () => {
      crearTablero();
      turno = "X";
      turnoTexto.textContent = turno;

      // Si la compu empieza
      if (jugador === "O") {
        turno = "X";
        setTimeout(jugadaComputadora, 500);
      }
    });