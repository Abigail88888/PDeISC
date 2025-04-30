//Creamos los nodos
function crearNodos() {
    const contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = ""; // esto limpia antes de crear
  
    for (let i = 1; i <= 5; i++) {
      const enlace = document.createElement("a");
      enlace.href = "https://github.com/Abigail88888/PDeISC/tree/master/01%20-%20NodeJS-01";
      enlace.textContent = `Enlace ${i}`;
      enlace.target = "_blank";
      enlace.id = `link${i}`;
      contenedor.appendChild(enlace);
      contenedor.appendChild(document.createElement("br"));
    }
  }
  
  function modificarNodos() {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";
  
    for (let i = 1; i <= 5; i++) {
      const enlace = document.getElementById(`link${i}`);
      if (enlace) {
        const anterior = enlace.href;
        enlace.href = "https://abigaildinucci-1744640601930.atlassian.net/jira/software/projects/CRM/issues/CRM-7?jql=project%20%3D%20%22CRM%22%20ORDER%20BY%20created%20DESC";
        resultado.innerHTML += `Modificado enlace ${i}:<br>Antes: ${anterior}<br>Ahora: ${enlace.href}<br><br>`;
      }
    }
  }  