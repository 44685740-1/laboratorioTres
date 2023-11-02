import { VehiculosData } from "./datos.js";
import Vehiculos from "./vehiculo.js";
import Terrestres from "./terrestre.js";
import Aereo from "./aereo.js";


const tablaDatos = document.getElementById('tabla-datos');
const datoFiltrado = document.getElementById('filtro');
const btnCalcularPromedioVelMax = document.getElementById('btn-calcular-promedio-velMax');
const textBoxPromedioVelMax = document.getElementById('promedio-velMax-input');

//formularios
const formDatos = document.getElementById('form-datos');
const formAbm = document.getElementById('form-abm');


//text box del form abm
let txtid = document.getElementById('id');
let txtModelo = document.getElementById('modelo');
let txtanofab = document.getElementById('anofab');
let txtvelmax = document.getElementById('velmax');
let dropDownTipo = document.getElementById('tipo');
let txtaltmax = document.getElementById('altmax');
let txtautonomia = document.getElementById('autonomia');
let txtcantpue = document.getElementById('cantpue');
let txtcantrue = document.getElementById('cantrue');



//botones abm
const btnAceptar = document.getElementById('aceptar');
const btnCancelar = document.getElementById('cancelar');
const btnEliminar = document.getElementById('eliminar');
const btnAgregar = document.getElementById('boton-agregar');
const btnInsertar = document.getElementById('insertar');

//check box
const chkId = document.getElementById('col-id');
const chkmodelo = document.getElementById('col-modelo');
const chkanoFab = document.getElementById('col-anoFab');
const chkVelMax = document.getElementById('col-velMax');
const chkAltMax = document.getElementById('col-altMax');
const chkAutonomia = document.getElementById('col-autonomia');
const chkCantPue = document.getElementById('col-cantPue');
const chkCantRue = document.getElementById('col-cantRue');

//headers
const columnHeaders = document.querySelectorAll('#tabla-datos th');
const cabeceraId = document.getElementById('id-header');
const cabeceraModelo = document.getElementById('modelo-header');
const cabeceraAnoFab = document.getElementById('anoFab-header');
const cabeceraVelMax = document.getElementById('velMax-header');
const cabeceraAltMax = document.getElementById('altMAx-header');
const cabeceraAutonomia = document.getElementById('autonomia-header');
const cabeceraCantPue = document.getElementById('cantpue-header');
const cabeceraCantRue = document.getElementById('cantrue-header');

let flag = false;


//llenar tabla y mostrar los datos punto a)
document.addEventListener("DOMContentLoaded", () => {
    llenarTabla(VehiculosData);
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
        <td>${dato.modelo}</td>
        <td>${dato.anoFab}</td>
        <td>${dato.velMax}</td>
        <td>${dato.altMax || '-'}</td>
        <td>${dato.autonomia || '-'}</td>
        <td>${dato.cantPue || '-'}</td>
        <td>${dato.cantRue || '-'}</td>
    `;
    tablaDatos.querySelector('tbody').appendChild(fila);
}

function limpiarTabla() {
    const tbody = tablaDatos.querySelector('tbody');
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}

//cambiar la info de la tabla segun del filtro punto b)

datoFiltrado.addEventListener("change", () => {
    const valorSeleccionado = datoFiltrado.value;
    switch (valorSeleccionado) {
        case "Vehiculos":
            limpiarTabla();
            llenarTabla(VehiculosData);
            break;
        case "Aereos":
            limpiarTabla();
            llenarTabla(VehiculosData.filter(tieneAltMaxOrAutonomia));
            break;
        case "Terrestres":
            limpiarTabla();
            llenarTabla(VehiculosData.filter(tieneCantPueOrCantRue));
            break;
    }
});


function tieneAltMaxOrAutonomia(obj) {
    return obj.hasOwnProperty("altMax") || obj.hasOwnProperty("autonomia");
}

function tieneCantPueOrCantRue(obj) {
    return obj.hasOwnProperty("cantPue") || obj.hasOwnProperty("cantRue");
}


btnCalcularPromedioVelMax.addEventListener("click", () => {
    const valorSeleccionado = datoFiltrado.value;
    let acumuladorVelMax = 0;
    let promedioVelMax = 0;
    switch (valorSeleccionado) {
        case "Vehiculos":
            let listaVehiculos = VehiculosData;
            listaVehiculos.map((Vehiculos) => {
                acumuladorVelMax += Vehiculos.velMax;
            });
            promedioVelMax = acumuladorVelMax / listaVehiculos.length;
            break;
        case "Aereos":
            let listaAereos = VehiculosData.filter(tieneAltMaxOrAutonomia);
            listaAereos.map((Aereos) => {
                acumuladorVelMax += Aereos.velMax;
            });
            promedioVelMax = acumuladorVelMax / listaAereos.length;
            break;
        case "Terrestres":
            let listaTerrestre = VehiculosData.filter(tieneCantPueOrCantRue);
            listaTerrestre.map((Terrestres) => {
                acumuladorVelMax += Terrestres.velMax;
            });
            promedioVelMax = acumuladorVelMax / listaTerrestre.length;
            break;
    }
    textBoxPromedioVelMax.value = promedioVelMax.toFixed(3);
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

    if (tieneAltMaxOrAutonomia(data) === true) {
        txtid.value = data["id"];
        txtModelo.value = data["modelo"];
        txtanofab.value = data["anoFab"];
        txtvelmax.value = data["velMax"];
        txtaltmax.value = data["altMax"];
        txtautonomia.value = data["autonomia"];
        //Desbilito el drop down
        dropDownTipo.value = "Aereo";
        dropDownTipo.disabled = true;
        desabilitarCamposNoAereo();
        habilitarCamposAereo();
    }
    if (tieneCantPueOrCantRue(data) === true) {
        txtid.value = data["id"];
        txtModelo.value = data["modelo"];
        txtanofab.value = data["anoFab"];
        txtvelmax.value = data["velMax"];
        txtcantpue.value = data["cantPue"];
        txtcantrue.value = data["cantRue"];
        //Desbilito el drop down
        dropDownTipo.value = "Terrestre";
        dropDownTipo.disabled = true;
        desabilitarCamposNoTerrestre();
        habilitarCamposTerrestre();
    }
}


function convertToJSON(rowData) {

    const keys = ["id", "modelo", "anoFab", "velMax", "altMax", "autonomia", "cantPue", "cantRue"];
    const json = {};

    for (let i = 0; i < keys.length; i++) {
        // Check if the value is not "-"
        if (rowData[i] !== "-") {
            json[keys[i]] = rowData[i];
        }
    }

    return json;
}


btnCancelar.addEventListener("click", () => {
    switchForms();
    mostrarBotonesFormAbm();
});

btnAceptar.addEventListener("click", () => {
    modificar();
    limpiarTabla();
    llenarTabla(VehiculosData);
});

btnEliminar.addEventListener("click", () => {
    eliminar();
    limpiarTabla();
    llenarTabla(VehiculosData);
});


function modificar() {
    let id = txtid.value;
    let modelo = txtModelo.value;
    let altMax = txtaltmax.value;
    let anoFab = txtanofab.value;
    let velMax = txtvelmax.value;
    let autonomia = txtautonomia.value;
    let cantPue = txtcantpue.value;
    let cantRue = txtcantrue.value;


    let objeto = buscarIdLista(id);
    if (objeto != null) {
        for (let i = 0; i < VehiculosData.length; i++) {
            if (VehiculosData[i].id == id) {
                // Modify the object's properties with new data
                if (tieneAltMaxOrAutonomia(VehiculosData[i]) == true) {
                    let nuevoAereo = new Aereo(id, modelo, anoFab, velMax, altMax, autonomia);
                    VehiculosData.splice(i, 1, nuevoAereo);
                    alert("El Aereo ha sido modificado");
                }

                if (tieneCantPueOrCantRue(VehiculosData[i]) == true) {
                    let nuevoTerrestre = new Terrestres(id, modelo, anoFab, velMax, cantPue, cantRue);
                    VehiculosData.splice(i, 1, nuevoTerrestre);
                    alert("El Terrestre ha sido modificado");
                }
                break;
            }
        }
    }
}


function buscarIdLista(id) {
    for (let i = 0; i < VehiculosData.length; i++) {
        if (VehiculosData[i].id == id) {
            return VehiculosData[i]; // Return the object if found
        }
    }
    return null; // Return null if not found
}


function eliminar() {
    let id = txtid.value;
    for (let i = 0; i < VehiculosData.length; i++) {
        if (VehiculosData[i].id == id) {
            VehiculosData.splice(i, 1);
            alert("El vehiculo ha sido Eliminado");
        }
    }
}


//punto h)
chkId.addEventListener("change", () => {
    const ocultar = !chkId.checked;
    cabeceraId.hidden = ocultar;
    ocultarMostrarColumna("Id", ocultar);
});

chkmodelo.addEventListener("change", () => {
    const ocultar = !chkmodelo.checked;
    cabeceraModelo.hidden = ocultar;
    ocultarMostrarColumna("Modelo", ocultar);
});

chkanoFab.addEventListener("change", () => {
    const ocultar = !chkanoFab.checked;
    cabeceraAnoFab.hidden = ocultar;
    ocultarMostrarColumna("Año fab", ocultar);
});

chkVelMax.addEventListener("change", () => {
    const ocultar = !chkVelMax.checked;
    cabeceraVelMax.hidden = ocultar;
    ocultarMostrarColumna("vel max", ocultar);
});

chkAltMax.addEventListener("change", () => {
    const ocultar = !chkAltMax.checked;
    cabeceraAltMax.hidden = ocultar;
    ocultarMostrarColumna("alt max", ocultar);
});


chkAutonomia.addEventListener("change", () => {
    const ocultar = !chkAutonomia.checked;
    cabeceraAutonomia.hidden = ocultar;
    ocultarMostrarColumna("autonomia", ocultar);
});

chkCantPue.addEventListener("change", () => {
    const ocultar = !chkCantPue.checked;
    cabeceraCantPue.hidden = ocultar;
    ocultarMostrarColumna("cant pue", ocultar);
});

chkCantRue.addEventListener("change", () => {
    const ocultar = !chkCantRue.checked;
    cabeceraCantRue.hidden = ocultar;
    ocultarMostrarColumna("cant rue", ocultar);
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

//agregar bton Punto d)

btnAgregar.addEventListener("click", () => {
    switchForms();
    limpiarFormAbm();
    txtid.value = parseInt(devolverIdMaximo())  + 1;
    esconderBotonesFormAbm();
    habilitarTodosCamposFormAbm();
    habilitarBotonInsertar();
});

function esconderBotonesFormAbm() {
    btnAceptar.style.visibility = 'hidden';
    btnAceptar.disabled = true;
    btnEliminar.style.visibility = 'hidden';
    btnEliminar.disabled = true;
}

function mostrarBotonesFormAbm() {
    btnAceptar.style.visibility = 'visible';
    btnAceptar.disabled = false;
    btnEliminar.style.visibility = 'visible';
    btnEliminar.disabled = false;
}

function habilitarTodosCamposFormAbm() {
    //el id el unico campo desabilitado
    txtid.disabled = true;
    txtModelo.disabled = false
    txtanofab.disabled = false; 
    txtvelmax.disabled = false; 
    dropDownTipo.disabled = false; 
    txtaltmax.disabled = false; 
    txtautonomia.disabled = false; 
    txtcantpue.disabled = false;
    txtcantrue.disabled = false; 
    dropDownTipo.disabled = false;
}


function desabilitarCamposNoTerrestre() {
    txtaltmax.disabled = true;
    txtautonomia.disabled = true;
}

function habilitarCamposAereo() {
    txtaltmax.disabled = false;
    txtautonomia.disabled = false;
}

function desabilitarCamposNoAereo() {
    txtcantpue.disabled = true;
    txtcantrue.disabled = true;
}

function habilitarCamposTerrestre() {
    txtcantpue.disabled = false;
    txtcantrue.disabled = false;
}

function desabilitarBotonInsertar() {
    btnInsertar.style.visibility = 'hidden';
    btnInsertar.disabled = true;
}

function habilitarBotonInsertar() {
    btnInsertar.style.visibility = 'visible';
    btnInsertar.disabled = false;
}

dropDownTipo.addEventListener("change", () => {
    let valorSeleccionadoDropDown = dropDownTipo.value;

    switch (valorSeleccionadoDropDown) {
        case 'Aereo':
            desabilitarCamposNoAereo();
            habilitarCamposAereo();
            break;
        case 'Terrestre':
            desabilitarCamposNoTerrestre();
            habilitarCamposTerrestre();
            break;
    }
    //vacio los txt por si se ingresaron datos en los txt que inabilito
    limpiarFormAbmMenosId();
});

function agregar() {
    let id = txtid.value;
    let modelo = txtModelo.value;
    let altMax = txtaltmax.value;
    let anoFab = txtanofab.value;
    let velMax = txtvelmax.value;
    let autonomia = txtautonomia.value;
    let cantPue = txtcantpue.value;
    let cantRue = txtcantrue.value;
    let tipo = dropDownTipo.value;

    if (tipo === "Aereo") {
        if (txtModelo.value === "" || txtanofab.value === "" || txtvelmax.value === "" || txtaltmax.value === "" || txtautonomia.value === "") {
            alert("Falto completar alguno de los campos");          
        } else 
        {
            let nuevoAereo = new Aereo(id, modelo, anoFab, velMax, altMax, autonomia);
            VehiculosData.push(nuevoAereo);
            alert("Se agrego exitosamente el nuevo Aereo");
        }

    }

    if (tipo == "Terrestre") {
        if (txtModelo.value === "" || txtanofab.value === "" || txtvelmax.value === "" || txtcantpue.value === "" || txtcantrue.value === ""){
            alert("Falto completar alguno de los campos");
        } else {
            let nuevoTerrestre = new Terrestres(id, modelo, anoFab, velMax, cantPue, cantRue);
            VehiculosData.push(nuevoTerrestre);
            alert("Se agrego exitosamente el nuevo Terrestre");
        }
    }
}


btnInsertar.addEventListener("click", () => {
    agregar();
    limpiarTabla();
    llenarTabla(VehiculosData);
});


function devolverIdMaximo() {

    let flag = true;
    let idMaximo;
    let idMinimo;

    VehiculosData.forEach(element => {
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
    txtid.value = "";
    txtModelo.value = "";
    txtanofab.value = "";
    txtvelmax.value = "";
    txtaltmax.value = "";
    txtautonomia.value = "";
    txtcantpue.value = "";
    txtcantrue.value = "";
}

function limpiarFormAbmMenosId() {
    txtModelo.value = "";
    txtanofab.value = "";
    txtvelmax.value = "";
    txtaltmax.value = "";
    txtautonomia.value = "";
    txtcantpue.value = "";
    txtcantrue.value = "";
}

//punto g)
columnHeaders.forEach((header) => {
    header.addEventListener("click", (event) => {
        const columnaNombreId = event.target.id;

        switch (columnaNombreId) {
            case 'id-header':
                if (flag === false) {
                    let VehiculosDataOrdenado = VehiculosData.sort((a, b) => b.id - a.id);
                    limpiarTabla();
                    llenarTabla(VehiculosDataOrdenado);
                    flag = true;
                }
                else {
                    let VehiculosDataOrdenado = VehiculosData.sort((a, b) => a.id - b.id);
                    limpiarTabla();
                    llenarTabla(VehiculosDataOrdenado);
                    flag = false;
                }
                break;
            case 'modelo-header':
                if (flag === false) {
                    let VehiculosDataOrdenado = VehiculosData.sort((a, b) => a.modelo.localeCompare(b.modelo));
                    limpiarTabla();
                    llenarTabla(VehiculosDataOrdenado);
                    flag = true;
                }
                else {
                    let VehiculosDataOrdenado = VehiculosData.sort((a, b) => b.modelo.localeCompare(a.modelo));
                    limpiarTabla();
                    llenarTabla(VehiculosDataOrdenado);
                    flag = false;
                }
                break;
            case 'anoFab-header':
                if (flag === false) {
                    let VehiculosDataOrdenado = VehiculosData.sort((a, b) => b.anoFab - a.anoFab);
                    limpiarTabla();
                    llenarTabla(VehiculosDataOrdenado);
                    flag = true;
                }
                else {
                    let VehiculosDataOrdenado = VehiculosData.sort((a, b) => a.anoFab - b.anoFab);
                    limpiarTabla();
                    llenarTabla(VehiculosDataOrdenado);
                    flag = false;
                }
                break;
            case 'velMax-header':
                if (flag === false) {
                    let VehiculosDataOrdenado = VehiculosData.sort((a, b) => b.velMax - a.velMax);
                    limpiarTabla();
                    llenarTabla(VehiculosDataOrdenado);
                    flag = true;
                }
                else {
                    let VehiculosDataOrdenado = VehiculosData.sort((a, b) => a.velMax - b.velMax);
                    limpiarTabla();
                    llenarTabla(VehiculosDataOrdenado);
                    flag = false;
                }
                break;
            case 'altMAx-header':
                if (flag === false) {
                    let VehiculosDataOrdenado = VehiculosData.sort((a, b) => b.altMax - a.altMax);
                    limpiarTabla();
                    llenarTabla(VehiculosDataOrdenado);
                    flag = true;
                }
                else {
                    let VehiculosDataOrdenado = VehiculosData.sort((a, b) => a.altMax - b.altMax);
                    limpiarTabla();
                    llenarTabla(VehiculosDataOrdenado);
                    flag = false;
                }
                break;
            case 'autonomia-header':
                if (flag === false) {
                    let VehiculosDataOrdenado = VehiculosData.sort((a, b) => b.autonomia - a.autonomia);
                    limpiarTabla();
                    llenarTabla(VehiculosDataOrdenado);
                    flag = true;
                }
                else {
                    let VehiculosDataOrdenado = VehiculosData.sort((a, b) => a.autonomia - b.autonomia);
                    limpiarTabla();
                    llenarTabla(VehiculosDataOrdenado);
                    flag = false;
                }
                break;
            case 'cantpue-header':
                if (flag === false) {
                    let VehiculosDataOrdenado = VehiculosData.sort((a, b) => b.cantPue - a.cantPue);
                    limpiarTabla();
                    llenarTabla(VehiculosDataOrdenado);
                    flag = true;
                }
                else {
                    let VehiculosDataOrdenado = VehiculosData.sort((a, b) => a.cantPue - b.cantPue);
                    limpiarTabla();
                    llenarTabla(VehiculosDataOrdenado);
                    flag = false;
                }
                break;
            case 'cantrue-header':
                if (flag === false) {
                    let VehiculosDataOrdenado = VehiculosData.sort((a, b) => b.cantRue - a.cantRue);
                    limpiarTabla();
                    llenarTabla(VehiculosDataOrdenado);
                    flag = true;
                }
                else {
                    let VehiculosDataOrdenado = VehiculosData.sort((a, b) => a.cantRue - b.cantRue);
                    limpiarTabla();
                    llenarTabla(VehiculosDataOrdenado);
                    flag = false;
                }
                break;
        }
    });
});
