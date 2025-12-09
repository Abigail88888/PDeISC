export class estudiante {
    constructor (nombre, apellido, edad){
        this.name = nombre;
        this.ape = apellido;
        this.age= edad;
    }

    Saludar(){
        console.log(`Hola soy ${this.name}-${this.ape} y tengo ${this.age}`);
    }

};