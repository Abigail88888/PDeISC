document.getElementById("registroForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const nombre = form.nombre.value;
  const edad = form.edad.value;
  const email = form.email.value;
  const genero = form.genero.value;
  const region = form.region.value;

  const preferencias = Array.from(form.querySelectorAll("input[name='preferencias']:checked"))
      .map(checkbox => checkbox.value)
      .join(", ");

  const resultado = `
    <p><strong>Nombre:</strong> ${nombre}</p>
    <p><strong>Edad:</strong> ${edad}</p>
    <p><strong>Correo:</strong> ${email}</p>
    <p><strong>Género:</strong> ${genero}</p>
    <p><strong>Preferencias:</strong> ${preferencias || "Ninguna"}</p>
    <p><strong>Región:</strong> ${region}</p>
    <hr>
  `;

  document.getElementById("resultado").innerHTML += resultado;
  form.reset();
});