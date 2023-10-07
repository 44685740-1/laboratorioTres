import Vehiculo from "./Vehuculo";

class Aereo extends Vehiculo {
    constructor(id,modelo,anoFab,velMax,altMax,autonomia) {
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
        if (typeof altMax !== 'number' || altMax <= 0) {
            throw new Error('El campo "altMax" debe ser un número positivo.');
        }
        if (typeof autonomia !== 'number' || autonomia <= 0) {
            throw new Error('El campo "autonomia" debe ser un número positivo.');
        }

        super(id,modelo,anoFab,velMax);
        this.altMax = altMax;
        this.autonomia = autonomia;
    }

    toString() {
        return `id ${this.id} modelo ${this.modelo} anoFab: ${this.anoFab} velMax ${this.anoFab} altMax ${this.altMax} autonomia ${this.autonomia}`;
    }

    toJson() {
        return JSON.stringify(this);
    }
}