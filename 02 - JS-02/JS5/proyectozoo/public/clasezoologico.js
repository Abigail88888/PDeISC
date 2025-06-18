    // Clase CzooAnimal pero usando lo de getters y setters
    export class CZooAnimal {
      constructor(id, nombre, jaula, tipo, peso) {
        this._id = id;
        this._nombre = nombre;
        this._jaula = jaula;
        this._tipo = tipo;
        this._peso = peso;
      }

      get IdAnimal() {
        return this._id;
      }

      get nombre() {
        return this._nombre;
      }

      get JaulaNumero() {
        return this._jaula;
      }

      get IdTypeAnimal() {
        return this._tipo;
      }

      get peso() {
        return this._peso;
      }

      set IdAnimal(value) {
        this._id = value;
      }

      set nombre(value) {
        this._nombre = value;
      }

      set JaulaNumero(value) {
        this._jaula = value;
      }

      set IdTypeAnimal(value) {
        this._tipo = value;
      }

      set peso(value) {
        this._peso = value;
      }
    }