document.addEventListener('DOMContentLoaded', () => {
  // Arrays vacíos
  const animales = [];
  const compras = [];
  const vaciado = [];
  const productosEliminados = [];

  // Inputs
  const animalInput = document.getElementById('animalInput');
  const productoInput = document.getElementById('productoInput');

  // Mensajes
  const animalEliminado = document.getElementById('animalEliminado');
  const productoEliminado = document.getElementById('productoEliminado');
  const lista = document.getElementById('lista');
  const mensaje = document.getElementById('mensaje');

  // Agregar animal con validación
  document.getElementById('btnAgregarAnimal').addEventListener('click', () => {
    const valor = animalInput.value.trim();
    if (valor && isNaN(valor)) {
      animales.push(valor);
      animalInput.value = '';
      animalEliminado.textContent = `Animal agregado: ${valor}`;
      animalEliminado.style.color = 'green';
    } else {
      animalEliminado.textContent = 'Ingrese un animal válido';
      animalEliminado.style.color = 'red';
    }
  });

  // Eliminar último animal
  document.getElementById('btnEliminarAnimal').addEventListener('click', () => {
    const eliminado = animales.pop();
    animalEliminado.textContent = eliminado
      ? `Animal eliminado: ${eliminado}`
      : 'No hay más animales para eliminar.';
    animalEliminado.style.color = eliminado ? 'green' : 'red';
  });

  // Agregar producto
  document.getElementById('btnAgregarProducto').addEventListener('click', () => {
    const valor = productoInput.value.trim();
    if (valor && isNaN(valor)) {
      compras.push(valor);
      productoInput.value = '';
      productoEliminado.textContent = `Producto agregado: ${valor}`;
      productoEliminado.style.color = 'green';
    } else {
      productoEliminado.textContent = 'Ingrese un producto válido (no números).';
      productoEliminado.style.color = 'red';
    }
  });

  // Eliminar último producto
  document.getElementById('btnEliminarProducto').addEventListener('click', () => {
    const eliminado = compras.pop();
      if (eliminado) {
        productosEliminados.push(eliminado); // lo guardamos para mostrar
        productoEliminado.textContent = `Producto eliminado: ${eliminado}`;
        productoEliminado.style.color = 'green';
      }   else {
        productoEliminado.textContent = 'No hay más productos para eliminar.';
        productoEliminado.style.color = 'red';
      }
  });

  // Vaciar array con pop() y while
  document.getElementById('btnVaciar').addEventListener('click', () => {
    let listaTemp = [ ...animales, ...compras ]; // una lista con todos los datos que haya
    vaciado.length = 0; // limpiamos antes de llenar

    while (listaTemp.length > 0) {
      vaciado.push(listaTemp.pop());
    }

    mensaje.textContent = vaciado.length
      ? 'Se vació el array correctamente'
      : 'No había elementos para vaciar.';
    mensaje.style.color = vaciado.length ? 'green' : 'red';
  });

  document.getElementById('btnVaciar').addEventListener('click', () => {
    let listaTemp = [...compras, ...animales];
    vaciado.length = 0;
  
    while (listaTemp.length > 0) {
      vaciado.push(listaTemp.pop());
    }
  
    mensaje.textContent = vaciado.length
      ? 'Se vació el array correctamente'
      : 'No había elementos para vaciar.';
    mensaje.style.color = vaciado.length ? 'green' : 'red';
  
    renderizarLista(); // mostrar la lista sin esperar submit
  });

  function renderizarLista() {
    lista.innerHTML = '';
  
    if (animales.length) {
      lista.innerHTML += `<li><strong>Animales:</strong> ${animales.join(', ')}</li>`;
    }
  
    if (compras.length) {
      lista.innerHTML += `<li><strong>Compras:</strong> ${compras.join(', ')}</li>`;
    }
  
    if (productosEliminados.length) {
      lista.innerHTML += `<li><strong>Productos eliminados:</strong> ${productosEliminados.join(', ')}</li>`;
    }
  
    if (vaciado.length) {
      lista.innerHTML += `<li><strong>Array vaciado (con pop):</strong> ${vaciado.join(', ')}</li>`;
    }
  }
  

  // Enviar datos y mostrarlos en la lista
  document.getElementById('formPop').addEventListener('submit', (e) => {
    e.preventDefault();
  
    if (animales.length === 0 && compras.length === 0 && vaciado.length === 0 && productosEliminados.length === 0) {
      mensaje.textContent = 'No hay datos para mostrar.';
      mensaje.style.color = 'red';
      return;
    }
  
    mensaje.textContent = '';
    renderizarLista(); 
  });
});