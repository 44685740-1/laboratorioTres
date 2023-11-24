import persona from "./persona.js";

class profesional extends persona {
    constructor(id,nombre,apellido,edad,titulo,facultad,añoGraduacion){
        super(id,nombre,apellido,edad);
        this.titulo = titulo;
        this.facultad = facultad;
        this.añoGraduacion = añoGraduacion;
    }

    toString() {
        return `id ${this.id} Nombre ${this.nombre} Apellido: ${this.apellido} Edad ${this.edad} Titulo ${this.titulo} Facultad ${this.facultad} Año de Graduacion ${this.añoGraduacion}`;
    }

    toJson() {
        return JSON.stringify(this);
    }
}

export default profesional;
