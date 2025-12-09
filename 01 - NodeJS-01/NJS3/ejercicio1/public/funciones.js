  //Defino cada funcion necesaria para mostrarcada componente
    let h1Element = null;
    let imgElement = null;

    function agregarH1() {
      if (!h1Element) {
        h1Element = document.createElement('h1');
        h1Element.textContent = 'Hola DOM';
        document.getElementById('contenido').appendChild(h1Element);
      }
    }

    function cambiarTexto() {
      if (h1Element) {
        h1Element.textContent = 'Chau DOM';
    }
  }

    function cambiarColor() {
      if (h1Element) {
        h1Element.style.color = 'pink';
    }
  }

    function agregarImagen() {
      if (!imgElement) {
        imgElement = document.createElement('img');
        imgElement.src = 'img/princi.jpg';
        document.getElementById('contenido').appendChild(imgElement);
    }   
  }

    function cambiarImagen() {
      if (imgElement) {
        imgElement.src = 'img/princi2.jpg';
    } 
  }

    function cambiarTamaño() {
      if (imgElement) {
        imgElement.style.width = '150px';
        imgElement.style.height = 'auto';
    }
  }