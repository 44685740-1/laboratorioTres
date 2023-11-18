import persona from "./persona.js";

class profesional extends persona{
    constructor(id,nombre,apellido,edad,titulo,facultad,anioGraduacion){
        super(id,nombre,apellido,edad);
        this.titulo = titulo;
        this.facultad = facultad;
        this.anioGraduacion = anioGraduacion;
    }

    toString() {
        return `id ${this.id} nombre ${this.nombre} apellido ${this.apellido} Edad ${this.edad} Titulo ${this.titulo} Facultad ${this.facultad} Ano Graduacion ${this.anioGraduacion}`;
    }

    toJson() {
        return JSON.stringify(this);
    }
}

export default profesional;