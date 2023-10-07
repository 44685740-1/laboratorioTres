import Vehiculo from "./Vehuculo";

class Terrestre extends Vehiculo {
    constructor(id,modelo,anoFab,velMax,cantPue,cantRue){
        if (typeof id !== 'number' || id <= 0) {
            throw new Error('El campo "id" debe ser un número positivo.');
        }
        if (typeof modelo !== 'string' || modelo === '') {
            throw new Error('El campo "modelo" no puede estar vacío.');
        }
        if (typeof anoFab !== 'number' || anoFab <= 1885) {
            throw new Error('El campo "anofab" debe ser un mayor a 1885.');
        }
        if (typeof velMax !== 'number' || velMax <= 0) {
            throw new Error('El campo "velMax" debe ser un número positivo.');
        }
        if (typeof cantPue !== 'number' || cantPue <= -1) {
            throw new Error('El campo "cantPue" debe ser mayor a -1.');
        }
        if (typeof cantRue !== 'number' || cantRue <= 0) {
            throw new Error('El campo "cantRue" debe ser un número mayor a cero.');
        }

        super(id,modelo,anoFab,velMax);
        this.cantPue = cantPue;
        this.cantRue = cantRue;
    }

    toString() {
        return `id ${this.id} modelo ${this.modelo} anoFab: ${this.anoFab} velMax ${this.anoFab} cantPue ${this.cantPue} cantRue ${this.cantRue}`;
    }

    toJson() {
        return JSON.stringify(this);
    }
}

export default Terrestre;