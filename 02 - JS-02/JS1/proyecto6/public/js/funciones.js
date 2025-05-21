// public/js/ej6_unshift.js

const listaTareas = [];
const ulTareas = document.getElementById("listaTareas");
const inputTarea = document.getElementById("tareaInput");

function agregarTareaInicio() {
  const tarea = inputTarea.value.trim();
  if (tarea !== "") {
    listaTareas.unshift(tarea);
    mostrarTareas();
    inputTarea.value = "";
  }
}

function mostrarTareas() {
  ulTareas.innerHTML = "";
  listaTareas.forEach((tarea, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${tarea}`;
    ulTareas.appendChild(li);
  });
}