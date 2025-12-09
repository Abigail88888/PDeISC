document.addEventListener('DOMContentLoaded', () => {
  // Accedemos a los elementos que vamos a usar
  const f = document.getElementById('formulario'); // el formulario
  const m = document.getElementById('mensaje'); // para mostrar mensajes
  const l = document.getElementById('lista'); // lista de personas
  const hijosSel = document.getElementById('tieneHijos'); // select sí/no hijos
  const hijosCont = document.getElementById('cantidadHijosContainer'); // div donde está el input de hijos
  const hijosInput = document.getElementById('hijos'); // input de cantidad de hijos

  // Cuando elige si tiene hijos, mostramos u ocultamos el campo
  hijosSel.onchange = () => {
    if (hijosSel.value === 'si') {
      hijosCont.style.display = 'block';
    } else {
      hijosCont.style.display = 'none';
      hijosInput.value = ''; 
    }
  };

  // para cuando se envía el formulario
  f.onsubmit = e => {
    e.preventDefault(); // evitamos que recargue la página
      //guardar los datos
    const d = {
      nombre: f.nombre.value.trim(),
      apellido: f.apellido.value.trim(),
      edad: f.edad.value,
      nacimiento: f.nacimiento.value,
      sexo: f.sexo.value,
      documento: f.documento.value.trim(),
      estado: f.estado.value,
      nacionalidad: f.nacionalidad.value.trim(),
      telefono: f.telefono.value.trim(),
      mail: f.mail.value.trim(),
      hijos: hijosSel.value === 'si' ? hijosInput.value : 0
    };

    // si no se rellenan las cosas bien 
    if (!d.nombre || !d.apellido || !d.edad || !d.mail) {
      m.textContent = 'Faltan campos obligatorios.';
      m.style.color = 'red';
      return;
    }

    // "guardar" los datos
    fetch('/guardar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(d)
    })
    .then(r => r.json().then(j => ({ ok: r.ok, j }))) // combinamos estado y json
    .then(r => {
      m.textContent = r.ok ? r.j.mensaje : (r.j.error || 'Error al guardar.');
      m.style.color = r.ok ? 'green' : 'red';

      if (r.ok) {
        f.reset(); // limpiamos el formulario
        hijosCont.style.display = 'none'; // ocultamos campo hijos
        cargarLista(); // actualizamos lista
      }
    })
    .catch(() => {
      m.textContent = 'Error de conexión.';
      m.style.color = 'red';
    });
  };

  // Función para mostrar la lista de personas
  function cargarLista() {
    fetch('/personas')
      .then(r => r.json())
      .then(p => {
        l.innerHTML = ''; 
        p.forEach(i => {
          
          l.innerHTML += `<li>${i.nombre} ${i.apellido}</li>`;
        });
      })
      .catch(() => {
        l.innerHTML = '<li>Error al cargar</li>';
      });
  }

  cargarLista();
});