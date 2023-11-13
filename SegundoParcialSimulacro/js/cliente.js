import persona from "./persona.js";

class cliente extends persona{
    constructor(id,nombre,apellido,edad,compras,telefono){
        super(id,nombre,apellido,edad);
        this.compras = compras;
        this.telefono = telefono;
    }

    toString() {
        return `id ${this.id} nombre ${this.nombre} apellido ${this.apellido} Edad ${this.edad} Compras ${this.compras} Telefono ${this.telefono}`;
    }

    toJson() {
        return JSON.stringify(this);
    }
}

export default cliente;