document.addEventListener('DOMContentLoaded', () => {
    // Acá agarramos los pedazos del HTML
    const listaDeGenteDiv = document.getElementById('listaDeGente');
    const traerNombresBtn = document.getElementById('traerNombresBtn');
    const traerCorreosBtn = document.getElementById('traerCorreosBtn');
    const traerTodoBtn = document.getElementById('traerTodoBtn');

    // La dirección de donde sacamos los datos
    const URL_API = 'https://jsonplaceholder.typicode.com/users';

    // Función para poner mensajes o errores
    function ponerMensaje(texto, esError = false) {
        listaDeGenteDiv.innerHTML = `<p style="color: ${esError ? 'red' : 'black'};">${texto}</p>`;
    }

    // Muestra solo los elementos que le pasemos
    function mostrarElementos(elementos, tipo) {
        listaDeGenteDiv.innerHTML = ''; // Limpiamos la lista
        if (elementos.length === 0) {
            ponerMensaje('No se encontró nada.');
            return;
        }
        const ul = document.createElement('ul');
        elementos.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${tipo}:</strong> ${item}`;
            ul.appendChild(li);
        });
        listaDeGenteDiv.appendChild(ul);
    }

    // Muestra nombres y correos juntos
    function mostrarNombresYCorreos(gente) {
        listaDeGenteDiv.innerHTML = ''; // Limpiamos la lista
        if (gente.length === 0) {
            ponerMensaje('No hay gente para mostrar.');
            return;
        }
        const ul = document.createElement('ul');
        gente.forEach(persona => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>Nombre:</strong> ${persona.name} <br> <strong>Correo:</strong> ${persona.email}`;
            ul.appendChild(li);
        });
        listaDeGenteDiv.appendChild(ul);
    }

    // --- Botón: Traer solo Nombres (con Fetch) ---
    traerNombresBtn.addEventListener('click', async () => {
        try {
            const respuesta = await fetch(URL_API);
            if (!respuesta.ok) {
                throw new Error(`Fallo la conexión: ${respuesta.status}`);
            }
            const gente = await respuesta.json();
            const nombres = gente.map(persona => persona.name);
            mostrarElementos(nombres, 'Nombre');
        } catch (error) {
            console.error('Error al traer nombres:', error);
            ponerMensaje(`Algo salió mal: ${error.message}`, true);
        }
    });

    // --- Botón: Traer Correos (con Axios) ---
    traerCorreosBtn.addEventListener('click', async () => {
        try {
            const respuestaAxios = await axios.get(URL_API);
            const correos = respuestaAxios.data.map(persona => persona.email);
            mostrarElementos(correos, 'Correo');
        } catch (error) {
            console.error('Error al traer correos:', error);
            ponerMensaje(`No se pudieron traer los correos: ${error.message}`, true);
        }
    });

    // --- Botón: Traer Todo (Fetch y Axios Combinado) ---
    traerTodoBtn.addEventListener('click', async () => {
        try {
            // Traemos nombres con Fetch
            const resNombres = await fetch(URL_API);
            if (!resNombres.ok) {
                throw new Error(`Fallo fetch: ${resNombres.status}`);
            }
            const dataNombres = await resNombres.json();

            // Traemos todo con Axios
            const resTodo = await axios.get(URL_API);
            const dataTodo = resTodo.data;

            // Juntamos los datos (asumimos que vienen en el mismo orden)
            const todaLaGente = dataNombres.map((persona, indice) => ({
                name: persona.name,
                email: dataTodo[indice] ? dataTodo[indice].email : 'No hay correo'
            }));

            mostrarNombresYCorreos(todaLaGente);

        } catch (error) {
            console.error('Error al traer todo:', error);
            ponerMensaje(`Error al cargar toda la data: ${error.message}`, true);
        }
    });
});