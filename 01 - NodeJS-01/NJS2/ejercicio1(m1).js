    //Primer modulo con funciones para obtener la fecha y hora actual
   export function obtenerHora() {
        return new Date().toLocaleTimeString();
    }

    export function obtenerFecha() {
        return new Date().toLocaleDateString();
    }

    export function obtenerTimestamp() {
        return Date.now();
    }