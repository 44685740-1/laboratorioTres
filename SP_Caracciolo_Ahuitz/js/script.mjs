import persona from "./persona.js";
import futbolista from "./futbolista.js";
import profesional from "./profesional.js";
import { getUsersApi, agregarUsuariosApi,modificarUsuarioApi, eliminarUsuarioApi} from './ajax.mjs';

const tablaDatos = document.getElementById('tabla-datos');
const frmLista = document.getElementById('frm-lista');
const frmAbm = document.getElementById('frm-abm');
const btnAgregarElemento = document.getElementById('agregar-elemento');

//text box form abm
let txtId = document.getElementById('id');
let txtNombre = document.getElementById('nombre');
let txtApellido = document.getElementById('apellido');
let txtEdad = document.getElementById('edad');
let txtEquipo = document.getElementById('equipo');
let txtPosicion = document.getElementById('posicion');
let txtCantidadGoles = document.getElementById('cantidadGoles');
let txtTitulo = document.getElementById('titulo');
let txtFacultad = document.getElementById('facultad');
let txtAnioGraduacion = document.getElementById('aniGraduacion');


//dropDown de tipo
let dropDownTipo = document.getElementById('tipo');

//botones Abm
const btnCancelar = document.getElementById('cancelar');
const btnAceptar = document.getElementById('aceptar');
const btnModificar = document.getElementById('modificar');
const btnEliminar = document.getElementById('eliminar');

//spinner and overlay
const spinner = document.getElementsByClassName('overlay');

//titulo con la accion del ABM
const tituloAccion = document.getElementById('accion-frm');


let listaUsuarios;        
getUsersApi((error, data) => {
    showSpinner();
    if (error) {
        alert('Error no se pudo cargar los datos de la api:', error);
        hideSpinner();
    } else {
        listaUsuarios = data;
        llenarTabla(listaUsuarios);
        hideSpinner();
    }
});

function llenarTabla(data) {
    limpiarTabla();
    data.forEach((dato) => {
        crearFila(dato);
    });
}



function crearFila(dato) {
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td>${dato.id}</td> 
        <td>${dato.nombre}</td>
        <td>${dato.apellido}</td>
        <td>${dato.edad}</td>
        <td>${dato.equipo || 'N/A'}</td>
        <td>${dato.posicion || 'N/A'}</td>
        <td>${dato.cantidadGoles || 'N/A'}</td>
        <td>${dato.titulo || 'N/A'}</td>
        <td>${dato.facultad || 'N/A'}</td>
        <td>${dato.añoGraduacion || 'N/A'}</td>
        <td><button class="btn-modificar" ">Modificar</button></td>
        <td><button class="btn-eliminar" ">Eliminar</button></td>
    `;
    
    tablaDatos.querySelector('tbody').appendChild(fila);
}


function limpiarTabla() {
    const tbody = tablaDatos.querySelector('tbody');
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}


function switchForms() {
    if (frmLista.style.display === "none") {
        frmLista.style.display = "block";
        frmAbm.style.display = "none";
    } else {
        frmLista.style.display = "none";
        frmAbm.style.display = "block";
    }
}

btnCancelar.addEventListener("click", () => {
    switchForms();
});


btnAgregarElemento.addEventListener("click", () => {
    limpiarFormAbm();
    ocultarBtnEliminarModificar();
    MostrarBtnAceptar();
    tituloAccion.innerText = "Agregar Usuario";
    switchForms();
});


const userData = {
    id: 1,
    nombre: '',
    apellido: '',
    edad: 1,
    equipo: '',
    posicion: '',
    cantidadGoles: 1,
    titulo: '',
    facultad: '',
    añoGraduacion: 1
};

btnAceptar.addEventListener("click", () => {
    let tipo = dropDownTipo.value;
    showSpinner();
    agregarUsuariosApi(userData)
    .then(newUserId => {
        if (tipo == "Futbolista") {
            if (txtNombre.value === "" || txtApellido.value === "" || txtEdad.value === "" || txtEquipo.value === "" || txtPosicion.value === "" || txtCantidadGoles.value === "") {
                alert("Falto completar alguno de los campos");  
                hideSpinner();
                switchForms();        
            } else {
                const newUser = {
                    id: newUserId,
                    nombre: txtNombre.value,
                    apellido: txtApellido.value,
                    edad: txtEdad.value,
                    equipo: txtEquipo.value,
                    posicion: txtPosicion.value,
                    cantidadGoles: txtCantidadGoles.value
                };
                listaUsuarios.push(newUser);
                llenarTabla(listaUsuarios);
                alert("Se añadio el usuario Correctamente");
                hideSpinner();
                switchForms();
            }
        }
        
        if (tipo == "Profesional") {
            if (txtNombre.value === "" || txtApellido.value === "" || txtEdad.value === "" || txtTitulo.value === "" || txtFacultad.value === "" || txtAnioGraduacion.value === "") {
                alert("Falto completar alguno de los campos");       
                hideSpinner(); 
                switchForms();  
            } else {
                const newUser = {
                    id: newUserId,
                    nombre: txtNombre.value,
                    apellido: txtApellido.value,
                    edad: txtEdad.value,
                    titulo: txtTitulo.value,
                    facultad: txtFacultad.value,
                    añoGraduacion: txtAnioGraduacion.value
                };
                listaUsuarios.push(newUser);
                llenarTabla(listaUsuarios);
                alert("Se añadio el usuario Correctamente");
                hideSpinner();
                switchForms();
            }
        }
    });
});

function limpiarFormAbm() {
    txtId.value = "";
    txtNombre.value = "";
    txtApellido.value = "";
    txtEdad.value = "";
    txtEquipo.value = "";
    txtPosicion.value = "";
    txtCantidadGoles.value = "";
    txtTitulo.value = "";
    txtFacultad.value = "";
    txtAnioGraduacion.value = "";
}

function ocultarBtnEliminarModificar() {
    btnEliminar.style.visibility = 'hidden';
    btnModificar.style.visibility = 'hidden';
    btnEliminar.disabled = true;
    btnModificar.disabled = true;
}

function mostrarBtnEliminarModificar() {
    btnEliminar.style.visibility = 'visible';
    btnModificar.style.visibility = 'visible';
    btnEliminar.disabled = false;
    btnModificar.disabled = false;
}

function mostrarBtnEliminar() {
    btnEliminar.style.visibility = 'visible';
    btnEliminar.disabled = false;
}

function mostrarBtnModificar() {
    btnModificar.style.visibility = 'visible';
    btnModificar.disabled = false;
}

function ocultarBtnEliminar() {
    btnEliminar.style.visibility = 'hidden';
    btnEliminar.disabled = true;
}

function ocultarBtnModificar() {
    btnModificar.style.visibility = 'hidden';
    btnModificar.disabled = true;
}

function ocultarBtnAceptar() {
    btnAceptar.style.visibility = 'hidden';
    btnAceptar.disabled = true;
}

function MostrarBtnAceptar() {
    btnAceptar.style.visibility = 'visible';
    btnAceptar.disabled = false;
}



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
    limpiarFormAbm();
});


function desabilitarCamposNoFutbolista() {
    txtTitulo.disabled = true;
    txtFacultad.disabled = true;
    txtAnioGraduacion.disabled = true;
}

function habilitarCamposProfesional() {
    txtTitulo.disabled = false;
    txtFacultad.disabled = false;
    txtAnioGraduacion.disabled = false;
}

function desabilitarCamposNoProfesional() {
    txtEquipo.disabled = true;
    txtPosicion.disabled = true;
    txtCantidadGoles.disabled = true;
}

function habilitarCamposFutbolista() {
    txtEquipo.disabled = false;
    txtPosicion.disabled = false;
    txtCantidadGoles.disabled = false;
}

function tieneEquipoOrPosicionOrCantidadGoles(obj) {
    return obj.hasOwnProperty("equipo") || obj.hasOwnProperty("posicion") || obj.hasOwnProperty("cantidadGoles");
}


function tieneTituloOrFacultadOrAnioGraduacion(obj) {
    return obj.hasOwnProperty("titulo") || obj.hasOwnProperty("facultad") || obj.hasOwnProperty("anioGraduacion");
}



document.addEventListener('DOMContentLoaded', function () {
    tablaDatos.addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-modificar')) {
            const clickedRow = event.target.closest('tr');

            let id = clickedRow.querySelector('td:nth-child(1)').innerText;
            let nombre = clickedRow.querySelector('td:nth-child(2)').innerText;
            let apellido = clickedRow.querySelector('td:nth-child(3)').innerText;
            let edad = clickedRow.querySelector('td:nth-child(4)').innerText;
            let equipo = clickedRow.querySelector('td:nth-child(5)').innerText;
            let posicion = clickedRow.querySelector('td:nth-child(6)').innerText;
            let cantidadGoles  = clickedRow.querySelector('td:nth-child(7)').innerText;
            let titulo = clickedRow.querySelector('td:nth-child(8)').innerText;
            let facultad = clickedRow.querySelector('td:nth-child(9)').innerText;
            let anioGraduacion = clickedRow.querySelector('td:nth-child(10)').innerText;

            if (equipo != "N/A" && posicion != "N/A") {
                const nuevoFutbolista = {
                    id: id,
                    nombre: nombre,
                    apellido: apellido,
                    edad: edad,
                    equipo: equipo,
                    posicion: posicion,
                    cantidadGoles: cantidadGoles
                };
                cargarTxtFrmAbm(nuevoFutbolista);
            }

            if (titulo != "N/A" && facultad != "N/A" && anioGraduacion != "N/A") {
                const nuevoProfesional = {
                    id: id,
                    nombre: nombre,
                    apellido: apellido,
                    edad: edad,
                    titulo: titulo,
                    facultad: facultad,
                    anioGraduacion: anioGraduacion
                };
                cargarTxtFrmAbm(nuevoProfesional);
            }

            mostrarBtnModificar();
            ocultarBtnEliminar();
            ocultarBtnAceptar();
            tituloAccion.innerText = "Modificar Usuario";
            switchForms();
        }

        if (event.target.classList.contains('btn-eliminar')) {
            const clickedRow = event.target.closest('tr');

            let id = clickedRow.querySelector('td:nth-child(1)').innerText;
            let nombre = clickedRow.querySelector('td:nth-child(2)').innerText;
            let apellido = clickedRow.querySelector('td:nth-child(3)').innerText;
            let edad = clickedRow.querySelector('td:nth-child(4)').innerText;
            let equipo = clickedRow.querySelector('td:nth-child(5)').innerText;
            let posicion = clickedRow.querySelector('td:nth-child(6)').innerText;
            let cantidadGoles  = clickedRow.querySelector('td:nth-child(7)').innerText;
            let titulo = clickedRow.querySelector('td:nth-child(8)').innerText;
            let facultad = clickedRow.querySelector('td:nth-child(9)').innerText;
            let anioGraduacion = clickedRow.querySelector('td:nth-child(10)').innerText;

            if (equipo != "N/A" && posicion != "N/A") {
                const nuevoFutbolista = {
                    id: id,
                    nombre: nombre,
                    apellido: apellido,
                    edad: edad,
                    equipo: equipo,
                    posicion: posicion,
                    cantidadGoles: cantidadGoles
                };
                cargarTxtFrmAbm(nuevoFutbolista);
            }

            

            if (titulo != "N/A" && facultad != "N/A" && anioGraduacion != "N/A") {
                const nuevoProfesional = {
                    id: id,
                    nombre: nombre,
                    apellido: apellido,
                    edad: edad,
                    titulo: titulo,
                    facultad: facultad,
                    anioGraduacion: anioGraduacion
                };
                cargarTxtFrmAbm(nuevoProfesional);
            }
            


            mostrarBtnEliminar();
            ocultarBtnModificar();
            ocultarBtnAceptar();
            tituloAccion.innerText = "Eliminar Usuario";
            switchForms();
        }
    });
});

function cargarTxtFrmAbm(usuario) {
    if (tieneEquipoOrPosicionOrCantidadGoles(usuario) === true) {
        limpiarFormAbm();
        dropDownTipo.value = "Futbolista";
        dropDownTipo.disabled = true;
        txtId.value = usuario.id;
        txtNombre.value = usuario.nombre;
        txtApellido.value = usuario.apellido;
        txtEdad.value = usuario.edad;
        txtEquipo.value = usuario.equipo;
        txtPosicion.value = usuario.posicion;
        txtCantidadGoles.value = usuario.cantidadGoles;
        desabilitarCamposNoFutbolista();
        habilitarCamposFutbolista();
    }

    if(tieneTituloOrFacultadOrAnioGraduacion(usuario) === true){
        limpiarFormAbm();
        dropDownTipo.value = "Profesional";
        dropDownTipo.disabled = true;
        txtId.value = usuario.id;
        txtNombre.value = usuario.nombre;
        txtApellido.value = usuario.apellido;
        txtEdad.value = usuario.edad;
        txtTitulo.value = usuario.titulo;
        txtFacultad.value = usuario.facultad;
        txtAnioGraduacion.value = usuario.anioGraduacion;
        desabilitarCamposNoProfesional();
        habilitarCamposProfesional();
    }
}

async function modificarUsuario(id,usuario) {
    showSpinner();
    try {
        await modificarUsuarioApi(id, usuario);
        listaUsuarios.splice(id,1,usuario);
        llenarTabla(listaUsuarios);
        alert("El Usuario fue Modificado Correctamente");
        hideSpinner();
        switchForms();
    } catch (error) {
        alert('Error Modificando el Usuario:', error.message);
        hideSpinner();
        switchForms();
    }
}

btnModificar.addEventListener("click", () => {

    let usuarioModificado = {
        id: txtId.value,
        nombre: txtNombre.value,
        apellido: txtApellido.value,
        edad: txtEdad.value,
        equipo: txtEquipo.value,
        posicion: txtPosicion.value,
        cantidadGoles: txtCantidadGoles.value,
        titulo: txtTitulo.value,
        facultad: txtFacultad.value,
        añoGraduacion: txtAnioGraduacion.value
    }

    modificarUsuario(txtId.value, usuarioModificado);
});

function eliminarUsuario(id){
    showSpinner();
    eliminarUsuarioApi(id)
    .then(() => {
        eliminarUsuarioPorId(id);
        alert("El Usuario ha sido Eliminado");
        llenarTabla(listaUsuarios);
        hideSpinner();
        switchForms();
    })
    .catch(error => {
        alert("Error Eliminando el Usuario", error.message);
        hideSpinner();
        switchForms();
    })
}



function eliminarUsuarioPorId(id) {
    for (let i = 0; i < listaUsuarios.length; i++) {
        if (listaUsuarios[i].id == id) {
            listaUsuarios.splice(i, 1);
        }
    }
}

btnEliminar.addEventListener("click", () => {
    eliminarUsuario(txtId.value);
});


//spinners
function showSpinner() {
    document.getElementById('overlay').style.display = 'flex';
}


function hideSpinner() {
    document.getElementById('overlay').style.display = 'none';
}


export {showSpinner, hideSpinner};