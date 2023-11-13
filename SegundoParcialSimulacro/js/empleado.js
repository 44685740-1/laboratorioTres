import persona from "./persona.js";

class empleado extends persona{
    constructor(id,nombre,apellido,edad,sueldo,ventas){
        super(id,nombre,apellido,edad);
        this.sueldo = sueldo;
        this.ventas = ventas;
    }

    toString() {
        return `id ${this.id} nombre ${this.nombre} apellido ${this.apellido} Edad ${this.edad} Sueldo ${this.sueldo} Ventas ${this.ventas}`;
    }

    toJson() {
        return JSON.stringify(this);
    }
}

export default empleado;