        document.addEventListener('DOMContentLoaded', async () => {
            // Referencia al div donde se mostrarán los alumnos
            const listaAlumnosTec = document.getElementById('listaAlumnosTec');

            // URL de la API otra vez
            const url_miapi = 'http://localhost:3003/api/alumnostec5';

            // Muestra la lista de alumnos en el HTML
            function mostrarListaDeAlumnos(alumnos) {
                listaAlumnosTec.innerHTML = ''; // Limpia el contenido previo

                if (alumnos.length === 0) {
                    listaAlumnosTec.innerHTML = '<p>No hay alumnos para mostrar.</p>';
                    return;
                }

                const ul = document.createElement('ul');
                alumnos.forEach(alumno => {
                    const li = document.createElement('li');

                    // Prepara el HTML para las materias adeudadas
                    let materiasTexto = 'Ninguna';
                    if (alumno.materiasAdeudadas && alumno.materiasAdeudadas.length > 0) {
                        // Crea una lista interna para las materias
                        const listaMaterias = alumno.materiasAdeudadas.map(m => 
                            `<li class="materias-adeudadas-lista">${m.nombre} (Cantidad: ${m.cantidad})</li>`
                        ).join(''); // Une los <li> en un solo string
                        materiasTexto = `<ul>${listaMaterias}</ul>`;
                    }

                    // Armado del contenido en lista con todos los datos
                    li.innerHTML = `
                        <p><strong>ID:</strong> ${alumno.id}</p>
                        <p><strong>Nombre:</strong> ${alumno.nombre}</p>
                        <p><strong>Apellido:</strong> ${alumno.apellidos}</p>
                        <p><strong>Curso:</strong> ${alumno.curso}</p>
                        <p><strong>División:</strong> ${alumno.division}</p>
                        <p><strong>Ciclo:</strong> ${alumno.ciclo}</p>
                        <p><strong>Especialidad:</strong> ${alumno.especialidad}</p>
                        <p><strong>Materias Adeudadas:</strong></p>
                        ${materiasTexto}
                    `;
                    ul.appendChild(li);
                });
                listaAlumnosTec.appendChild(ul);
            }

            // Cargar los alumnos de la API al iniciar la página
            try {
                // Axios para hacer la petición GET
                const respuesta = await axios.get(url_miapi);
                const alumnos = respuesta.data; 

                mostrarListaDeAlumnos(alumnos); 

            } catch (error) {
                console.error('Error al cargar los alumnos:', error);
                listaAlumnosTec.innerHTML = '<p style="color: red;">¡Error al cargar los alumnos! Mirá la consola.</p>';
            }
        });