        document.addEventListener('DOMContentLoaded', () => {
            // Agarramos los elemntos del DOM
            const listaDeGenteDiv = document.getElementById('listaDeGente');
            const traerTodoConFetchBtn = document.getElementById('traerTodoConFetchBtn');
            const traerTodoConAxiosBtn = document.getElementById('traerTodoConAxiosBtn');

            // La dirección de la API desde donde sacamos los datos
            const URL_API = 'https://jsonplaceholder.typicode.com/users';

            // Función para mostrar mensaje de carga
            function mostrarCargando() {
                listaDeGenteDiv.innerHTML = '<p>Cargando...</p>';
            }

            // Funcion para mostrar el correo y el nombre 
            function mostrarGente(gente) {
                listaDeGenteDiv.innerHTML = ''; // Limpiamos la lista
                
                // Si la lista está vacía, mostramos que no hay datos
                if (gente.length === 0) {
                    listaDeGenteDiv.innerHTML = '<p>No hay usuarios que mostrar.</p>';
                    return;
                }
                // Recorremos cada persona de la lista
                const ul = document.createElement('ul');
                gente.forEach(persona => { 
                    const li = document.createElement('li');
                    li.innerHTML = `<strong>Nombre:</strong> ${persona.name} <br> <strong>Correo:</strong> ${persona.email}`;
                    ul.appendChild(li);
                });
                listaDeGenteDiv.appendChild(ul);
            }

            // Funcionalidad del boton de fetch
            traerTodoConFetchBtn.addEventListener('click', async () => {
                mostrarCargando(); 
                try {
                    const respuesta = await fetch(URL_API);
                    if (!respuesta.ok) { 
                        // En caso de error HTTP, el catch avisa
                        throw new Error(`Error HTTP: ${respuesta.status}`);
                    }
                    const gente = await respuesta.json();
                    mostrarGente(gente); 
                } catch (error) {
                    listaDeGenteDiv.innerHTML = ''; 
                    console.error('Fallo al traer con Fetch:', error);
                }
            });

            // Funcionalidad del boton de axios
            traerTodoConAxiosBtn.addEventListener('click', async () => {
                mostrarCargando(); 
                try {
                    const respuestaAxios = await axios.get(URL_API);
                    const gente = respuestaAxios.data; 
                    mostrarGente(gente); // Mostramos los datos si todo va bien
                } catch (error) {
                    listaDeGenteDiv.innerHTML = ''; 
                }
            });
        });