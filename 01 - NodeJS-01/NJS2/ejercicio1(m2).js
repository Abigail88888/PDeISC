    //Segundo modulo para mostrar las vocales incluso con acento
    export function mostrarVocales(texto) {
        var resultado = texto.match(/[aeiouáéíóú]/gi);

        return resultado ? resultado.join(' ') : '';
    }