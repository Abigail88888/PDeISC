function agregarElemento(tipo) {
  const contenedor = document.getElementById("contenedor");
  let nuevoElemento;

  switch (tipo) {
    case "p":
      nuevoElemento = document.createElement("p");
      nuevoElemento.innerHTML = `Ariana Grande comenzó su carrera como actriz adolescente al aparecer en el musical de Broadway <strong>13</strong> en 2008. Luego saltó a la fama como Cat Valentine en <em>Victorious</em> y más tarde como cantante solista con su hermosa voz, me encanta su musica la verdad`;
      break;

    case "img":
      nuevoElemento = document.createElement("img");
      nuevoElemento.src = "./img/ariana.jpg";
      nuevoElemento.alt = "Ariana Grande";
      break;

    case "table":
      nuevoElemento = document.createElement("div");
      nuevoElemento.innerHTML = `
        <table>
          <tr><th>Nombre</th><th>Edad</th><th>Álbumes</th><th>Desde</th></tr>
          <tr><td>Ariana Grande</td><td>31</td><td>10</td><td>2008</td></tr>
        </table>
      `;
      break;

    case "ul":
      nuevoElemento = document.createElement("ul");
      nuevoElemento.innerHTML = `
        <li>Elemento 1</li>
        <li>Elemento 2</li>
        <li>Elemento 3</li>
      `;
      break;

    case "input":
      nuevoElemento = document.createElement("input");
      nuevoElemento.type = "text";
      nuevoElemento.placeholder = "Escribí un animal";
      break;
  }

  contenedor.appendChild(nuevoElemento);
}