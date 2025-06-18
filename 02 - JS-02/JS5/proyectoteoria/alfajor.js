        export class Alfajor{
            constructor(nombre, marca, peso, valor){
                this.nombre = nombre;
                this.marca = marca;
                this.peso = peso;
                this._precio = valor; // _variable privada
            }

            get precio(){
                return this._precio;
            }

            set precio(nuevoprecio){
                //Validacion 
                //Ideas: !NaN , distinto de "0" , mayor a 0

                this._precio = nuevoprecio;
            }
            
        }