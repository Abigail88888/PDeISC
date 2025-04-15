     //Hago las funciones para cada operacion    
     function sumar(n1, n2){
        console.log(n1 + n2);
    }

    function restar(n1, n2){
        console.log(n1 - n2);
    }

    function multiplicar(n1, n2){
        console.log(n1 * n2);
    }

    function dividir(n1, n2){
        console.log(n1 / n2);
    }

    module.exports = {
        sumar,
        restar,
        multiplicar,
        dividir
    };