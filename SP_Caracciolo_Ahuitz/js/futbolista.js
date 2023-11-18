import persona from "./persona.js";

class futbolista extends persona{
    constructor(id,nombre,apellido,edad,equipo,posicion,cantidadGoles){
        super(id,nombre,apellido,edad);
        this.equipo = equipo;
        this.posicion = posicion;
        this.cantidadGoles = cantidadGoles;
    }

    toString() {
        return `id ${this.id} nombre ${this.nombre} apellido ${this.apellido} Edad ${this.edad} Equipo ${this.equipo} Posicion ${this.posicion} Cantidad De Goles ${this.cantidadGoles}`;
    }

    toJson() {
        return JSON.stringify(this);
    }
}

export default futbolista;