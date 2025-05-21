const edades = [];

function agregarEdad() {
  const input = document.getElementById('edadInput');
  const edad = parseInt(input.value);
  if (!isNaN(edad)) {
    edades.push(edad);
    const li = document.createElement('li');
    li.textContent = `Edad: ${edad}`;
    document.getElementById('listaEdades').appendChild(li);
    input.value = '';
  }
}

document.getElementById('formFilter').addEventListener('submit', function(e) {
  e.preventDefault();
  const mayores = edades.filter(e => e >= 18);
  const listaMayores = document.getElementById('listaMayores');
  listaMayores.innerHTML = '';
  mayores.forEach(m => {
    const li = document.createElement('li');
    li.textContent = m;
    listaMayores.appendChild(li);
  });
});