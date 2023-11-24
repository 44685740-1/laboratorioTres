import { personasData } from "./datos.js";
import persona from "./persona.js";
import futbolista from "./futbolista.js";
import profesional from "./profesional.js";

const tablaDatos = document.getElementById('tabla-datos');
const datoFiltrado = document.getElementById('filtro');
const btnCalcularPromedio = document.getElementById('btn-calcular-promedio');
const textBoxPromedio = document.getElementById('promedio-input');

//formularios
const formDatos = document.getElementById('form-datos');
const formAbm = document.getElementById('form-abm');

//text box del form ABM
const txtId = document.getElementById('id');
const txtNombre = document.getElementById('nombre');
const txtApellido = document.getElementById('apellido');
const txtEdad = document.getElementById('edad');
const txtEquipo = document.getElementById('equipo');
const txtPosicion = document.getElementById('posicion');
const txtCantGoles = document.getElementById('cantGoles');
const txtTitulo = document.getElementById('titulo');
const txtFacultad = document.getElementById('facultad');
const txtAñoGrad = document.getElementById('añoGrad');
//drop down de tipo form ABM
const dropDownTipo = document.getElementById('tipo');

//botones abm
const btnModificar = document.getElementById('modificar');
const btnCancelar = document.getElementById('cancelar');
const btnEliminar = document.getElementById('eliminar');
const btnAgregar = document.getElementById('boton-agregar');
const btnInsertar = document.getElementById('insertar');

//check box
const chkId = document.getElementById('col-id');
const chkNombre = document.getElementById('col-nombre');
const chkApellido = document.getElementById('col-apellido');
const chkEdad = document.getElementById('col-edad');
const chkEquipo = document.getElementById('col-equipo');
const chkPosicion = document.getElementById('col-posicion');
const chkCantGoles = document.getElementById('col-cantGoles');
const chkTitulo = document.getElementById('col-titulo');
const chkFacultad = document.getElementById('col-facultad');
const chkAñoGrad = document.getElementById('col-añoGrad');

//cabeceras
const columnHeaders = document.querySelectorAll('#tabla-datos th');
const cabeceraId = document.getElementById('id-header');
const cabeceraNombre = document.getElementById('nombre-header');
const cabeceraApellido = document.getElementById('apellido-header');
const cabeceraEdad = document.getElementById('edad-header');
const cabeceraEquipo = document.getElementById('equipo-header');
const cabeceraPosicion = document.getElementById('posicion-header');
const cabeceraCantGoles = document.getElementById('cantGoles-header');
const cabeceraTitulo = document.getElementById('titulo-header');
const cabeceraFacultad = document.getElementById('facultad-header');
const cabeceraAñoGrad = document.getElementById('añoGrad-header');

//flag punto g)
let flag = false;

document.addEventListener("DOMContentLoaded", () => {
    llenarTabla(personasData);
});

function llenarTabla(data) {
    limpiarTabla();
    data.forEach((dato) => {
        crearFila(dato);
    });
}

function crearFila(dato) {
    //tienen que estar las keys igual que en el json
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td>${dato.id !== undefined ? dato.id : 'N/A'}</td>
        <td>${dato.nombre !== undefined ? dato.nombre : 'N/A'}</td>
        <td>${dato.apellido !== undefined ? dato.apellido : 'N/A'}</td>
        <td>${dato.edad !== undefined ? dato.edad : 'N/A'}</td>
        <td>${dato.equipo !== undefined ? dato.equipo : 'N/A'}</td>
        <td>${dato.posicion !== undefined ? dato.posicion : 'N/A'}</td>
        <td>${dato.cantidadGoles !== undefined ? dato.cantidadGoles : 'N/A'}</td>
        <td>${dato.titulo !== undefined ? dato.titulo : 'N/A'}</td>
        <td>${dato.facultad !== undefined ? dato.facultad : 'N/A'}</td>
        <td>${dato.añoGraduacion !== undefined ? dato.añoGraduacion : 'N/A'}</td>
    `;
    tablaDatos.querySelector('tbody').appendChild(fila);
}

function limpiarTabla() {
    const tbody = tablaDatos.querySelector('tbody');
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}

datoFiltrado.addEventListener("change", () => {
    const valorSeleccionado = datoFiltrado.value;
    switch (valorSeleccionado) {
        case "Todos":
            limpiarTabla();
            llenarTabla(personasData);
            break;
        case "Futbolistas":
            limpiarTabla();
            llenarTabla(personasData.filter(tieneEquipoOrPosicionOrCantGoles));
            break;
        case "Profesionales":
            limpiarTabla();
            llenarTabla(personasData.filter(tieneTituloOrFacultadOrAñoGrad));
            break;
    }
});

function tieneEquipoOrPosicionOrCantGoles(obj) {
    return obj.hasOwnProperty("equipo") || obj.hasOwnProperty("posicion") || obj.hasOwnProperty("cantidadGoles");
}

function tieneTituloOrFacultadOrAñoGrad(obj) {
    return obj.hasOwnProperty("titulo") || obj.hasOwnProperty("facultad") || obj.hasOwnProperty("añoGraduacion");
}

btnCalcularPromedio.addEventListener("click", () => {
    const valorSeleccionado = datoFiltrado.value;
    let acumulador = 0;
    let promedio = 0;
    switch (valorSeleccionado) {
        case "Todos":
            let listaPersonas = personasData;
            listaPersonas.map((persona) => {
                acumulador += parseInt(persona.edad);
            });
            promedio = acumulador / listaPersonas.length;
            break;
        case "Futbolistas":
            let listaFutbolista = personasData.filter(tieneEquipoOrPosicionOrCantGoles);
            listaFutbolista.map((futbolista) => {
                acumulador +=  parseInt(futbolista.edad);
            });
            promedio = acumulador / listaFutbolista.length;
            break;
        case "Profesionales":
            let listaProfesionales = personasData.filter(tieneTituloOrFacultadOrAñoGrad);
            listaProfesionales.map((profesional) => {
                acumulador += parseInt(profesional.edad);
            });
            promedio = acumulador / listaProfesionales.length;
            break;
    }
    textBoxPromedio.value = promedio.toFixed(3);
});

function switchForms() {
    if (formDatos.style.display === "none") {
        formDatos.style.display = "block";
        formAbm.style.display = "none";
    } else {
        formDatos.style.display = "none";
        formAbm.style.display = "block";
    }
}

//ABM
tablaDatos.addEventListener("dblclick", function (event) {
    desabilitarBotonInsertar();
    const targetRow = event.target.closest("tr");

    if (!targetRow.classList.contains("header-row")) {
        // Get the data from the triggered row
        const cells = targetRow.getElementsByTagName("td");
        const rowData = [];

        for (let j = 0; j < cells.length; j++) {
            rowData.push(cells[j].textContent);
        }

        // Display the data from the clicked row
        switchForms();
        let jsonData = convertToJSON(rowData);
        cargarTextBox(jsonData);
    }
});

function cargarTextBox(data) {
    if (tieneEquipoOrPosicionOrCantGoles(data) === true) {
        txtId.value = data["id"];
        txtNombre.value = data["nombre"];
        txtApellido.value = data["apellido"];
        txtEdad.value = data["edad"];
        txtEquipo.value = data["equipo"];
        txtPosicion.value = data["posicion"];
        txtCantGoles.value = data["cantGoles"];
        //Desbilito el drop down
        //tiene que tener el mismo valor que el select en el HTML
        dropDownTipo.value = "Futbolista";
        dropDownTipo.disabled = true;
        desabilitarCamposNoFutbolista();
        habilitarCamposFutbolista();
    }
    if (tieneTituloOrFacultadOrAñoGrad(data) === true) {
        txtId.value = data["id"];
        txtNombre.value = data["nombre"];
        txtApellido.value = data["apellido"];
        txtEdad.value = data["edad"];
        txtTitulo.value = data["titulo"];
        txtFacultad.value = data["facultad"];
        txtAñoGrad.value = data["añoGrad"];
        //Desbilito el drop down
        //tiene que tener el mismo valor que el select en el HTML
        dropDownTipo.value = "Profesional";
        dropDownTipo.disabled = true;
        desabilitarCamposNoProfesional();
        habilitarCamposProfesional();
    }
}

function convertToJSON(rowData) {
    const keys = ["id", "nombre", "apellido", "edad", "equipo", "posicion", "cantGoles", "titulo", "facultad", "añoGrad"];
    const json = {};

    for (let i = 0; i < keys.length; i++) {
        // Check if the value is not "N/A"
        if (rowData[i] !== "N/A") {
            json[keys[i]] = rowData[i];
        }
    }

    return json;
}

function esconderBotonesFormAbm() {
    btnModificar.style.visibility = 'hidden';
    btnModificar.disabled = true;
    btnEliminar.style.visibility = 'hidden';
    btnEliminar.disabled = true;
}

function mostrarBotonesFormAbm() {
    btnModificar.style.visibility = 'visible';
    btnModificar.disabled = false;
    btnEliminar.style.visibility = 'visible';
    btnEliminar.disabled = false;
}

function habilitarTodosCamposFormAbm() {
    //el id el unico campo desabilitado
    txtId.disabled = true;
    txtNombre.disabled = false
    txtApellido.disabled = false;
    txtEdad.disabled = false;
    dropDownTipo.disabled = false;
    txtEquipo.disabled = false;
    txtPosicion.disabled = false;
    txtCantGoles.disabled = false;
    txtTitulo.disabled = false;
    txtFacultad.disabled = false;
    txtAñoGrad.disabled = false;
}


function desabilitarCamposNoFutbolista() {
    txtTitulo.disabled = true;
    txtFacultad.disabled = true;
    txtAñoGrad.disabled = true;
}

function habilitarCamposFutbolista() {
    txtEquipo.disabled = false;
    txtPosicion.disabled = false;
    txtCantGoles.disabled = false;
}

function desabilitarCamposNoProfesional() {
    txtEquipo.disabled = true;
    txtPosicion.disabled = true;
    txtCantGoles.disabled = true;
}

function habilitarCamposProfesional() {
    txtTitulo.disabled = false;
    txtFacultad.disabled = false;
    txtAñoGrad.disabled = false;
}

function desabilitarBotonInsertar() {
    btnInsertar.style.visibility = 'hidden';
    btnInsertar.disabled = true;
}

function habilitarBotonInsertar() {
    btnInsertar.style.visibility = 'visible';
    btnInsertar.disabled = false;
}

btnCancelar.addEventListener("click", () => {
    switchForms();
    mostrarBotonesFormAbm();
});

btnModificar.addEventListener("click", () => {
    modificar();
    limpiarTabla();
    llenarTabla(personasData);
});

btnEliminar.addEventListener("click", () => {
    eliminar();
    limpiarTabla();
    llenarTabla(personasData);
});

function modificar() {
    let id = txtId.value;
    let nombre = txtNombre.value;
    let apellido = txtApellido.value;
    let edad = txtEdad.value;
    let equipo = txtEquipo.value;
    let posicion = txtPosicion.value;
    let cantGoles = txtCantGoles.value;
    let titulo = txtTitulo.value;
    let facultad = txtFacultad.value;
    let añoGrad = txtAñoGrad.value;

    let objeto = buscarIdLista(id);
    if (objeto != null) {
        for (let i = 0; i < personasData.length; i++) {
            if (personasData[i].id == id) {
                // Modify the object's properties with new data
                if (tieneEquipoOrPosicionOrCantGoles(personasData[i]) == true) {
                    let nuevoFutbolista = new futbolista(id, nombre, apellido, edad, equipo, posicion, cantGoles);
                    personasData.splice(i, 1, nuevoFutbolista);
                    alert("El Futbolista ha sido modificado");
                }

                if (tieneTituloOrFacultadOrAñoGrad(personasData[i]) == true) {
                    let nuevoProfesional = new profesional(id, nombre, apellido, edad, titulo, facultad, añoGrad);
                    personasData.splice(i, 1, nuevoProfesional);
                    alert("El Profesional ha sido modificado");
                }
                break;
            }
        }
    }
}


function buscarIdLista(id) {
    for (let i = 0; i < personasData.length; i++) {
        if (personasData[i].id == id) {
            return personasData[i]; // Return the object if found
        }
    }
    return null; // Return null if not found
}


function eliminar() {
    let id = txtId.value;
    for (let i = 0; i < personasData.length; i++) {
        if (personasData[i].id == id) {
            personasData.splice(i, 1);
            alert("La persona ha sido Eliminada");
        }
    }
}

//agregar
btnAgregar.addEventListener("click", () => {
    switchForms();
    limpiarFormAbm();
    txtId.value = parseInt(devolverIdMaximo()) + 1;
    esconderBotonesFormAbm();
    habilitarTodosCamposFormAbm();
    habilitarBotonInsertar();
});

dropDownTipo.addEventListener("change", () => {
    let valorSeleccionadoDropDown = dropDownTipo.value;

    switch (valorSeleccionadoDropDown) {
        case 'Futbolista':
            desabilitarCamposNoFutbolista();
            habilitarCamposFutbolista();
            break;
        case 'Profesional':
            desabilitarCamposNoProfesional();
            habilitarCamposProfesional();
            break;
    }
    //vacio los txt por si se ingresaron datos en los txt que inabilito
    limpiarFormAbmMenosId();
});


function agregar() {
    let id = txtId.value;
    let nombre = txtNombre.value;
    let apellido = txtApellido.value;
    let edad = txtEdad.value;
    let equipo = txtEquipo.value;
    let posicion = txtPosicion.value;
    let cantGoles = txtCantGoles.value;
    let titulo = txtTitulo.value;
    let facultad = txtFacultad.value;
    let añoGrad = txtAñoGrad.value;
    let tipo = dropDownTipo.value;

    if (tipo === "Futbolista") {
        if (txtNombre.value === "" || txtApellido.value === "" || txtEdad.value === "" || txtEquipo.value === "" || txtPosicion.value === "" || txtCantGoles.value === "") {
            alert("Falto completar alguno de los campos");
        } else {
            let nuevoFutbolista = new futbolista(id, nombre, apellido, edad, equipo, posicion, cantGoles);
            personasData.push(nuevoFutbolista);
            alert("Se agrego exitosamente el nuevo Futbolista");
        }

    }

    if (tipo == "Profesional") {
        if (txtNombre.value === "" || txtApellido.value === "" || txtEdad.value === "" || txtTitulo.value === "" || txtFacultad.value === "" || txtAñoGrad.value === "") {
            alert("Falto completar alguno de los campos");
        } else {
            let nuevoProfesional = new profesional(id, nombre, apellido, edad, titulo, facultad, añoGrad);
            personasData.push(nuevoProfesional);
            alert("Se agrego exitosamente el nuevo Profesional");
        }
    }
}

btnInsertar.addEventListener("click", () => {
    agregar();
    limpiarTabla();
    llenarTabla(personasData);
});


function devolverIdMaximo() {

    let flag = true;
    let idMaximo;
    let idMinimo;

    personasData.forEach(element => {
        if (flag == true) {
            idMaximo = element.id;
            idMinimo = element.id;
            flag = false
        } else {

            if (element.id > idMaximo) {
                idMaximo = element.id;
            }

            if (element.id < idMinimo) {
                idMinimo = element.id;
            }
        }
    });

    return idMaximo;
}

function limpiarFormAbm() {
    txtId.value = "";
    txtNombre.value = "";
    txtApellido.value = "";
    txtEdad.value = "";
    txtEquipo.value = "";
    txtPosicion.value = "";
    txtCantGoles.value = "";
    txtTitulo.value = "";
    txtFacultad.value = "";
    txtAñoGrad.value = "";
}

function limpiarFormAbmMenosId() {
    txtNombre.value = "";
    txtApellido.value = "";
    txtEdad.value = "";
    txtEquipo.value = "";
    txtPosicion.value = "";
    txtCantGoles.value = "";
    txtTitulo.value = "";
    txtFacultad.value = "";
    txtAñoGrad.value = "";
}

//punto h)
chkId.addEventListener("change", () => {
    const ocultar = !chkId.checked;
    cabeceraId.hidden = ocultar;
    ocultarMostrarColumna("Id", ocultar);
});

chkNombre.addEventListener("change", () => {
    const ocultar = !chkNombre.checked;
    cabeceraNombre.hidden = ocultar;
    ocultarMostrarColumna("Nombre", ocultar);
});

chkApellido.addEventListener("change", () => {
    const ocultar = !chkApellido.checked;
    cabeceraApellido.hidden = ocultar;
    ocultarMostrarColumna("Apellido", ocultar);
});

chkEdad.addEventListener("change", () => {
    const ocultar = !chkEdad.checked;
    cabeceraEdad.hidden = ocultar;
    ocultarMostrarColumna("Edad", ocultar);
});

chkEquipo.addEventListener("change", () => {
    const ocultar = !chkEquipo.checked;
    cabeceraEquipo.hidden = ocultar;
    ocultarMostrarColumna("Equipo", ocultar);
});


chkPosicion.addEventListener("change", () => {
    const ocultar = !chkPosicion.checked;
    cabeceraPosicion.hidden = ocultar;
    ocultarMostrarColumna("Posicion", ocultar);
});

chkCantGoles.addEventListener("change", () => {
    const ocultar = !chkCantGoles.checked;
    cabeceraCantGoles.hidden = ocultar;
    ocultarMostrarColumna("CantGoles", ocultar);
});

chkTitulo.addEventListener("change", () => {
    const ocultar = !chkTitulo.checked;
    cabeceraTitulo.hidden = ocultar;
    ocultarMostrarColumna("Titulo", ocultar);
});

chkFacultad.addEventListener("change", () => {
    const ocultar = !chkFacultad.checked;
    cabeceraFacultad.hidden = ocultar;
    ocultarMostrarColumna("Facultad", ocultar);
});

chkAñoGrad.addEventListener("change", () => {
    const ocultar = !chkAñoGrad.checked;
    cabeceraAñoGrad.hidden = ocultar;
    ocultarMostrarColumna("AñoGrad", ocultar);
});

function ocultarMostrarColumna(nombreColumna, ocultar) {
    const filas = tablaDatos.querySelectorAll('tbody tr');
    filas.forEach((fila) => {
        const celda = fila.querySelector(`td:nth-child(${getColumnIndex(nombreColumna)})`);
        if (celda) {
            celda.style.display = ocultar ? 'none' : '';
        }
    });
}


function getColumnIndex(nombreColumna) {
    const thList = document.querySelectorAll('th');
    for (let i = 0; i < thList.length; i++) {
        if (thList[i].textContent === nombreColumna) {
            return i + 1;
        }
    }
    return -1;
}

//punto g)
columnHeaders.forEach((header) => {
    header.addEventListener("click", (event) => {
        const columnaNombreId = event.target.id;

        switch (columnaNombreId) {
            case 'id-header':
                if (flag === false) {
                    let personasDataOrdenado = personasData.sort((a, b) => b.id - a.id);
                    limpiarTabla();
                    llenarTabla(personasDataOrdenado);
                    flag = true;
                }
                else {
                    let personasDataOrdenado = personasData.sort((a, b) => a.id - b.id);
                    limpiarTabla();
                    llenarTabla(personasDataOrdenado);
                    flag = false;
                }
                break;
            case 'nombre-header':
                if (flag === false) {
                    let personasDataOrdenado = personasData.sort((a, b) => a.nombre.localeCompare(b.nombre));
                    limpiarTabla();
                    llenarTabla(personasDataOrdenado);
                    flag = true;
                }
                else {
                    let personasDataOrdenado = personasData.sort((a, b) => b.nombre.localeCompare(a.nombre));
                    limpiarTabla();
                    llenarTabla(personasDataOrdenado);
                    flag = false;
                }
                break;
            case 'apellido-header':
                if (flag === false) {
                    let personasDataOrdenado = personasData.sort((a, b) => a.apellido.localeCompare(b.apellido));
                    limpiarTabla();
                    llenarTabla(personasDataOrdenado);
                    flag = true;
                }
                else {
                    let personasDataOrdenado = personasData.sort((a, b) => b.apellido.localeCompare(a.apellido));
                    limpiarTabla();
                    llenarTabla(personasDataOrdenado);
                    flag = false;
                }
                break;
            case 'edad-header':
                if (flag === false) {
                    let personasDataOrdenado = personasData.sort((a, b) => b.edad - a.edad);
                    limpiarTabla();
                    llenarTabla(personasDataOrdenado);
                    flag = true;
                }
                else {
                    let personasDataOrdenado = personasData.sort((a, b) => a.edad - b.edad);
                    limpiarTabla();
                    llenarTabla(personasDataOrdenado);
                    flag = false;
                }
                break;
            case 'equipo-header':
                if (flag === false) {
                    let personasDataOrdenado = personasData.sort((a, b) => a.equipo.localeCompare(b.equipo));
                    limpiarTabla();
                    llenarTabla(personasDataOrdenado);
                    flag = true;
                }
                else {
                    let personasDataOrdenado = personasData.sort((a, b) => b.equipo.localeCompare(a.equipo));
                    limpiarTabla();
                    llenarTabla(personasDataOrdenado);
                    flag = false;
                }
                break;
            case 'posicion-header':
                if (flag === false) {
                    let personasDataOrdenado = personasData.sort((a, b) => a.posicion.localeCompare(b.posicion));
                    limpiarTabla();
                    llenarTabla(personasDataOrdenado);
                    flag = true;
                }
                else {
                    let personasDataOrdenado = personasData.sort((a, b) => b.posicion.localeCompare(a.posicion));
                    limpiarTabla();
                    llenarTabla(personasDataOrdenado);
                    flag = false;
                }
                break;
            case 'cantGoles-header':
                if (flag === false) {
                    let personasDataOrdenado = personasData.sort((a, b) => b.cantidadGoles - a.cantidadGoles);
                    limpiarTabla();
                    llenarTabla(personasDataOrdenado);
                    flag = true;
                }
                else {
                    let personasDataOrdenado = personasData.sort((a, b) => a.cantidadGoles - b.cantidadGoles);
                    limpiarTabla();
                    llenarTabla(personasDataOrdenado);
                    flag = false;
                }
                break;
            case 'titulo-header':
                if (flag === false) {
                    let personasDataOrdenado = personasData.sort((a, b) => a.titulo.localeCompare(b.titulo));
                    limpiarTabla();
                    llenarTabla(personasDataOrdenado);
                    flag = true;
                }
                else {
                    let personasDataOrdenado = personasData.sort((a, b) => b.titulo.localeCompare(a.titulo));
                    limpiarTabla();
                    llenarTabla(personasDataOrdenado);
                    flag = false;
                }
                break;
            case 'facultad-header':
                if (flag === false) {
                    let personasDataOrdenado = personasData.sort((a, b) => a.facultad.localeCompare(b.facultad));
                    limpiarTabla();
                    llenarTabla(personasDataOrdenado);
                    flag = true;
                }
                else {
                    let personasDataOrdenado = personasData.sort((a, b) => b.facultad.localeCompare(a.facultad));
                    limpiarTabla();
                    llenarTabla(personasDataOrdenado);
                    flag = false;
                }
                break;
            case 'añoGrad-header':
                if (flag === false) {
                    let personasDataOrdenado = personasData.sort((a, b) => b.añoGraduacion - a.añoGraduacion);
                    limpiarTabla();
                    llenarTabla(personasDataOrdenado);
                    flag = true;
                }
                else {
                    let personasDataOrdenado = personasData.sort((a, b) => a.añoGraduacion - b.añoGraduacion);
                    limpiarTabla();
                    llenarTabla(personasDataOrdenado);
                    flag = false;
                }
                break;
        }
    });
});



