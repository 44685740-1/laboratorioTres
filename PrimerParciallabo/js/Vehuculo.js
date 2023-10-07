class Vehiculo {
    constructor(id,modelo,anoFab,velMax) {
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

        this.id = id;
        this.modelo = modelo;
        this.anoFab = anoFab;
        this.velMax = velMax;
    }

    toString() {
        return `id ${this.id} modelo ${this.modelo} anoFab: ${this.anoFab} velMax ${this.anoFab}`;
    }

    toJson() {
        return JSON.stringify(this);
    }
}

export default Vehiculo;