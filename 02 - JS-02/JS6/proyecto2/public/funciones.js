        document.addEventListener('DOMContentLoaded', () => {
            // Agarramos los elementos del formulario
            const formulario = document.getElementById('formulario'); 
            const campoNombre = document.getElementById('campoNombre');
            const campoEmail = document.getElementById('campoEmail');
            const resultados = document.getElementById('resultados'); 
            const errorNombre = document.getElementById('errorNombre');
            const errorEmail = document.getElementById('errorEmail');

            // Dirección a donde vamos a enviar los datos (o sea a nuestro servidor)
            const url_api = 'http://localhost:3001/enviar-datos';

            // Función para validar el nombre (solo letras y espacios)
            function validar1(texto) {
                return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(texto);
            }

            // Función para validar el email (formato básico de correo)
            function validar2(texto) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto);
            }

            // Función principal que maneja el envío del formulario
            formulario.addEventListener('submit', async (evento) => { 
                evento.preventDefault(); 

                // Limpiamos mensajes de error anteriores y el resultado
                errorNombre.textContent = '';
                errorEmail.textContent = '';
                resultados.innerHTML = ''; 

                const nombre = campoNombre.value.trim(); 
                const email = campoEmail.value.trim();

                let hayError = false;

                // Validacion del nombre
                if (nombre === '') {
                    errorNombre.textContent = 'El nombre no puede estar vacío.';
                    hayError = true;
                } else if (!validar1(nombre)) {
                    errorNombre.textContent = 'El nombre solo puede tener letras y espacios.';
                    hayError = true;
                }

                // Validación del email 
                if (email === '') {
                    errorEmail.textContent = 'El correo no puede estar vacío.';
                    hayError = true;
                } else if (!validar2(email)) {
                    errorEmail.textContent = 'El formato del correo no es válido (ej. tu@dominio.com).';
                    hayError = true;
                }

                if (hayError) {
                    resultados.innerHTML = '<p style="color: red;">¡Hay un error en los datos, revisalos!</p>';
                    return;
                }

                // Enviamos los datos
                try {
                    const respuesta = await axios.post(url_api, {
                        nombre: nombre,
                        email: email
                    });

                    // Mostramos un mensaje de aviso
                    resultados.innerHTML = `
                        <p style="color: green;">Datos enviados correctamente</p>
                        <p>ID de la respuesta: <strong>${respuesta.data.id}</strong></p>
                    `;

                    // Limpiar el formulario después de enviar
                    formulario.reset();

                } catch (error) {
                    console.error('Error al enviar la data:', error.response ? error.response.data : error.message);
                    resultados.innerHTML = `<p style="color: red;">¡Falló el envío! Mirá la consola para más info.</p>`;
                }
            });
        });