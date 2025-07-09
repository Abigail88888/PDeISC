document.addEventListener('DOMContentLoaded', async () => {
    // Agarramos los elementos
    const campoBusqueda = document.getElementById('campoBusqueda');
    const listaUsuarios = document.getElementById('listaUsuarios'); 

    // La dirección de la API de donde sacamos los datos
    const url_api = 'https://jsonplaceholder.typicode.com/users'; 

    // Una variable para guardar TODOS los usuarios una vez que los cargamos
    let todosLosUsuarios = [];

    // Función para mostrar solo los nombres de los usuarios en la lista
    function mostrarUsuarios(usuarios) { 
        listaUsuarios.innerHTML = ''; 
        
        if (usuarios.length === 0) {
            listaUsuarios.innerHTML = '<p>No se encontraron usuarios que coincidan.</p>';
            return;
        }

        const ul = document.createElement('ul');
        usuarios.forEach(usuario => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>Nombre:</strong> ${usuario.name}`; 
            ul.appendChild(li);
        });
        listaUsuarios.appendChild(ul);
    }

    // Función para cargar los usuarios de la API al inicio
    async function usuarios_principio() { 
        try {
            listaUsuarios.innerHTML = '<p>Cargando usuarios de la API...</p>'; // Mensaje de carga
            
            // Use Axios.get() para obtener los datos
            const respuesta = await axios.get(url_api);
            todosLosUsuarios = respuesta.data; 

            mostrarUsuarios(todosLosUsuarios); 

        } catch (error) {
            console.error('Error al cargar los usuarios:', error);
            listaUsuarios.innerHTML = '<p style="color: red;">¡Error al cargar los usuarios! Intentá de nuevo.</p>';
        }
    }

    // Buscar y filtrar los nombres
    campoBusqueda.addEventListener('input', () => {
        const texto = campoBusqueda.value.toLowerCase().trim();

        if (texto === '') { 
            mostrarUsuarios(todosLosUsuarios); 
            return;
        }

        // Filtramos la lista completa de usuarios
        const usuariosFiltrados = todosLosUsuarios.filter(usuario => {
            return usuario.name.toLowerCase().includes(texto); 
        });

        mostrarUsuarios(usuariosFiltrados); 
    });

    // Llamamos a la función para cargar los usuarios cuando la página está lista
    usuarios_principio(); 
});