const contenedor = document.getElementById('contenedor');
const resultado = document.getElementById('resultado');
const btnContar = document.getElementById('btnContar');

// Contar hijos al hacer clic en el botón
btnContar.addEventListener('click', () => {
  const hijos = contenedor.children.length;
  resultado.textContent = `El contenedor tiene ${hijos} elemento(s) hijo(s).`;
});

// También puedes contar al hacer clic en el contenedor si quieres
contenedor.addEventListener('click', () => {
  const hijos = contenedor.children.length;
  resultado.textContent = `El contenedor tiene ${hijos} elemento(s) hijo(s).`;
});
