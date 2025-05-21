// Array de opciones con su nombre y su imagen 
const opciones = [
  { nombre: "piedra", imagen: "img/piedra.jpg" },
  { nombre: "papel", imagen: "img/papel.jpg" },
  { nombre: "tijera", imagen: "img/tijera.jpg" }
];

// Los puntajes iniciales
let puntajeJugador = 0;
let puntajeCPU = 0;

// Obtener referencias a elementos del DOM
const imagenJugador = document.getElementById("jugadorImg");
const imagenCPU = document.getElementById("cpuImg");
const resultado = document.getElementById("resultado");
const opcionesImgs = document.querySelectorAll("#opciones img");

// Clics sobre las imágenes de elección
opcionesImgs.forEach(img => {
  img.addEventListener("click", () => {
    // Obtener el nombre de la jugada desde el atributo alt
    const eleccionJugador = img.alt;

    // Llamar a la función principal del juego
    jugar(eleccionJugador);
  });
});

// Función principal que ejecuta una ronda del juego
function jugar(eleccionJugador) {
  // Elegir al azar una opción del array para la CPU
  const eleccionCPU = opciones[Math.floor(Math.random() * opciones.length)].nombre;

  // Buscar la imagen correspondiente para mostrar
  const imgJugador = opciones.find(op => op.nombre === eleccionJugador).imagen;
  const imgCPU = opciones.find(op => op.nombre === eleccionCPU).imagen;

  // Mostrar las imágenes seleccionadas
  imagenJugador.src = imgJugador;
  imagenCPU.src = imgCPU;

  // Determinar el ganador de la ronda
  const ganador = obtenerGanador(eleccionJugador, eleccionCPU);

  // Mostrar resultado y actualizar puntajes
  mostrarResultado(ganador);
}

// Función que determina quién gana 
function obtenerGanador(jugador, cpu) {
  if (jugador === cpu) return "empate";

  if (
    (jugador === "piedra" && cpu === "tijera") ||
    (jugador === "papel" && cpu === "piedra") ||
    (jugador === "tijera" && cpu === "papel")
  ) return "jugador";

  return "cpu";
}

// Mostrar el resultado y actualizar los puntajes en pantalla
function mostrarResultado(ganador) {
  if (ganador === "empate") {
    resultado.textContent = "¡Empate!";
  } else if (ganador === "jugador") {
    resultado.textContent = "¡Felicitaciones, ganaste!";
    puntajeJugador++;
  } else {
    resultado.textContent = "Perdiste :(";
    puntajeCPU++;
  }

  // Mostrar los puntajes actualizados
  document.getElementById("scoreJugador").textContent = puntajeJugador;
  document.getElementById("scoreCPU").textContent = puntajeCPU;
}