
import persona from "./persona.js";
import empleado from "./empleado.js";
import cliente from "./cliente.js";
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
let txtSueldo = document.getElementById('sueldo');
let txtVentas = document.getElementById('ventas');
let txtCompras = document.getElementById('compras');
let txtTelefono = document.getElementById('telefono');
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
        <td>${dato.sueldo || 'N/A'}</td>
        <td>${dato.ventas || 'N/A'}</td>
        <td>${dato.compras || 'N/A'}</td>
        <td>${dato.telefono || 'N/A'}</td>
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
    ventas: 1,
    sueldo: 1,
    telefono: 1,
    compras: 1
};

btnAceptar.addEventListener("click", () => {
    let tipo = dropDownTipo.value;
    showSpinner();
    agregarUsuariosApi(userData)
    .then(newUserId => {
        if (tipo == "Cliente") {
            if (txtNombre.value === "" || txtApellido.value === "" || txtEdad.value === "" || txtTelefono.value === "" || txtCompras.value === "") {
                alert("Falto completar alguno de los campos");  
                hideSpinner();        
            } else {
                const newUser = {
                    id: newUserId,
                    nombre: txtNombre.value,
                    apellido: txtApellido.value,
                    edad: txtEdad.value,
                    telefono: txtTelefono.value,
                    compras: txtCompras.value,
                };
                listaUsuarios.push(newUser);
                llenarTabla(listaUsuarios);
                alert("Se añadio el usuario Correctamente");
                hideSpinner();
            }
        }
        
        if (tipo == "Empleado") {
            if (txtNombre.value === "" || txtApellido.value === "" || txtEdad.value === "" || txtSueldo.value === "" || txtVentas.value === "") {
                alert("Falto completar alguno de los campos");       
                hideSpinner();   
            } else {
                const newUser = {
                    id: newUserId,
                    nombre: txtNombre.value,
                    apellido: txtApellido.value,
                    edad: txtEdad.value,
                    ventas: txtVentas.value,
                    sueldo: txtSueldo.value,
                };
                listaUsuarios.push(newUser);
                llenarTabla(listaUsuarios);
                alert("Se añadio el usuario Correctamente");
                hideSpinner();
            }
        }
    });
});


function limpiarFormAbm() {
    txtId.value = "";
    txtNombre.value = "";
    txtApellido.value = "";
    txtEdad.value = "";
    txtVentas.value = "";
    txtCompras.value = "";
    txtTelefono.value = "";
    txtSueldo.value = "";
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
        case 'Empleado':
            desabilitarCamposNoEmpleado();
            habilitarCamposEmpleado();
            break;
        case 'Cliente':
            desabilitarCamposNoCliente();
            habilitarCamposCliente();
            break;
    }
    limpiarFormAbm();
});


function desabilitarCamposNoEmpleado() {
    txtCompras.disabled = true;
    txtTelefono.disabled = true;
}

function habilitarCamposCliente() {
    txtCompras.disabled = false;
    txtTelefono.disabled = false;
}

function desabilitarCamposNoCliente() {
    txtSueldo.disabled = true;
    txtVentas.disabled = true;
}

function habilitarCamposEmpleado() {
    txtSueldo.disabled = false;
    txtVentas.disabled = false;
}


function tieneSueldoOrVentas(obj) {
    return obj.hasOwnProperty("sueldo") || obj.hasOwnProperty("ventas");
}


function tieneComprasOrTelefono(obj) {
    return obj.hasOwnProperty("compras") || obj.hasOwnProperty("telefono");
}


document.addEventListener('DOMContentLoaded', function () {
    tablaDatos.addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-modificar')) {
            const clickedRow = event.target.closest('tr');

            let id = clickedRow.querySelector('td:nth-child(1)').innerText;
            let nombre = clickedRow.querySelector('td:nth-child(2)').innerText;
            let apellido = clickedRow.querySelector('td:nth-child(3)').innerText;
            let edad = clickedRow.querySelector('td:nth-child(4)').innerText;
            let sueldo = clickedRow.querySelector('td:nth-child(5)').innerText;
            let ventas = clickedRow.querySelector('td:nth-child(6)').innerText;
            let compras  = clickedRow.querySelector('td:nth-child(7)').innerText;
            let telefono = clickedRow.querySelector('td:nth-child(8)').innerText;

            if (sueldo != "N/A" && ventas != "N/A") {
                const nuevoEmpleado = {
                    id: id,
                    nombre: nombre,
                    apellido: apellido,
                    edad: edad,
                    sueldo: sueldo,
                    ventas: ventas,
                };
                cargarTxtFrmAbm(nuevoEmpleado);
            }

            if (compras != "N/A" && telefono != "N/A") {
                const nuevoCliente = {
                    id: id,
                    nombre: nombre,
                    apellido: apellido,
                    edad: edad,
                    compras: compras,
                    telefono: telefono
                };
                cargarTxtFrmAbm(nuevoCliente);
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
            let sueldo = clickedRow.querySelector('td:nth-child(5)').innerText;
            let ventas = clickedRow.querySelector('td:nth-child(6)').innerText;
            let compras  = clickedRow.querySelector('td:nth-child(7)').innerText;
            let telefono = clickedRow.querySelector('td:nth-child(8)').innerText;

            if (sueldo != "N/A" && ventas != "N/A") {
                const nuevoEmpleado = {
                    id: id,
                    nombre: nombre,
                    apellido: apellido,
                    edad: edad,
                    sueldo: sueldo,
                    ventas: ventas,
                };
                cargarTxtFrmAbm(nuevoEmpleado);
            }

            if (compras != "N/A" && telefono != "N/A") {
                const nuevoCliente = {
                    id: id,
                    nombre: nombre,
                    apellido: apellido,
                    edad: edad,
                    compras: compras,
                    telefono: telefono
                };
                cargarTxtFrmAbm(nuevoCliente);
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
    if (tieneComprasOrTelefono(usuario) === true) {
        limpiarFormAbm();
        dropDownTipo.value = "Cliente";
        dropDownTipo.disabled = true;
        txtId.value = usuario.id;
        txtNombre.value = usuario.nombre;
        txtApellido.value = usuario.apellido;
        txtEdad.value = usuario.edad;
        txtCompras.value = usuario.compras;
        txtTelefono.value = usuario.telefono;
        desabilitarCamposNoCliente();
        habilitarCamposCliente();
    }

    if(tieneSueldoOrVentas(usuario) === true){
        limpiarFormAbm();
        dropDownTipo.value = "Empleado";
        dropDownTipo.disabled = true;
        txtId.value = usuario.id;
        txtNombre.value = usuario.nombre;
        txtApellido.value = usuario.apellido;
        txtEdad.value = usuario.edad;
        txtSueldo.value = usuario.sueldo;
        txtVentas.value = usuario.ventas;
        desabilitarCamposNoEmpleado();
        habilitarCamposEmpleado();
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
    } catch (error) {
        alert('Error Modificando el Usuario:', error.message);
        hideSpinner();
    }
}

btnModificar.addEventListener("click", () => {

    let usuarioModificado = {
        id: txtId.value,
        nombre: txtNombre.value,
        apellido: txtApellido.value,
        edad: txtEdad.value,
        compras: txtCompras.value,
        telefono: txtTelefono.value,
        sueldo: txtSueldo.value,
        ventas: txtVentas.value
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
    })
    .catch(error => {
        alert("Error Eliminando el Usuario", error.message);
        hideSpinner();
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


function showSpinner() {
    document.getElementById('overlay').style.display = 'flex';
}


function hideSpinner() {
    document.getElementById('overlay').style.display = 'none';
}


export {showSpinner, hideSpinner};

