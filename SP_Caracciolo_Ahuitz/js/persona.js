class persona{
    constructor(id,nombre,apellido,edad){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }

    toString() {
        return `id ${this.id} nombre ${this.nombre} apellido ${this.apellido} Edad ${this.edad}`;
    }

    toJson() {
        return JSON.stringify(this);
    }
}

export default persona;