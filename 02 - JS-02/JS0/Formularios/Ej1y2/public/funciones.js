    //Creo las variables necesarias
    const form = document.getElementById('formulario');
    const lista = document.getElementById('lista');
    const mensaje = document.getElementById('mensaje');
    //En esta funcion creo un json para poder mostrar las personas que voy agregando en el momento
    async function cargarPersonas() {
      const res = await fetch('/Personas');
      const personas = await res.json();
      lista.innerHTML = '';
      personas.forEach(p => {
        const li = document.createElement('li');
        li.textContent = `${p.username} - ${p.password}`;
        lista.appendChild(li);
      });
    }
    //Asigno los valores 
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();
      const confirm = document.getElementById('confirm').value.trim();
      //Sentencias de control para que el formulario este sea rellenado de manera correcta y no pongan cualquier cosa
      if (!username || !password || !confirm) {
        mensaje.textContent = 'Todos los campos son obligatorios.';
        return;
      }

      if (password !== confirm) {
        mensaje.textContent = 'Las contraseñas no coinciden.';
        return;
      }

      const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        mensaje.textContent = 'Usuario agregado correctamente.';
        form.reset();
        cargarPersonas();
      } else {
        const data = await res.json();
        mensaje.textContent = data.error || 'Error al agregar.';
      }
    });

    window.onload = cargarPersonas;