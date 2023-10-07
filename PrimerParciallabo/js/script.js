import { personasData } from "./datos.js";

const tablaDatos = document.getElementById('tabla-datos');
const datoFiltrado = document.getElementById('filtro'); 
const btnCalcularPromedioVelMax = document.getElementById('btn-calcular-promedio-velMax');
const textBoxPromedioVelMax = document.getElementById('promedio-velMax-input');
const btnAgregar = document.getElementById('boton-agregar');


//text box del form abm
const txtid = document.getElementById('id');
const txtModelo = document.getElementById('modelo');
const txtanofab = document.getElementById('anofab');
const txtvelmax = document.getElementById('velmax');
const dropDownTipo = document.getElementById('tipo');
const txtaltmax = document.getElementById('altmax');
const txtautonomia = document.getElementById('autonomia');
const txtcantpue = document.getElementById('cantpue');
const txtcantrue = document.getElementById('cantrue');
const btnAceptar = document.getElementById('aceptar');
const btnCancelar = document.getElementById('cancelar');


//check box
const chkid = document.getElementById('col-id"');
const chkmodelo = document.getElementById('col-modelo');
const chkanofab = document.getElementById('col-anoFab');
const chkvelmax = document.getElementById('col-velMax');
const chkaltmax = document.getElementById('col-altMax');
const chkautonomia = document.getElementById('col-autonomia');
const chkcantpue = document.getElementById('col-cantPue');
const chkcantrue = document.getElementById('col-cantRue');

//llenar tabla y mostrar los datos punto a)
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
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td>${dato.id}</td> 
        <td>${dato.modelo}</td>
        <td>${dato.anoFab}</td>
        <td>${dato.velMax}</td>
        <td>${dato.altMax || ''}</td>
        <td>${dato.autonomia || ''}</td>
        <td>${dato.cantPue}</td>
        <td>${dato.cantRue}</td>
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

    if (valorSeleccionado !== "Vehiculos") {
        const listaFiltrada = devolverPorFiltro(personasData, valorSeleccionado);

        llenarTabla(listaFiltrada);
    }
    else {
        limpiarTabla();
        llenarTabla(personasData);
    }
});

function devolverPorFiltro(data, filtro) {
    let listaFiltrada = [];
    let flagFiltro = false;
    data.forEach((dato) => {
        if ((filtro === "Aereos" && (dato.altMax !== undefined || dato.autonomia !== undefined)) || (filtro === "Terrestres" && dato.cantPue === undefined && dato.cantRue === undefined)) {
            listaFiltrada.push(dato);
            flagFiltro = true
        } 
    });

    //si no es aereo o terrestre le asigno la data de todos
    if (flagFiltro === false) {
        listaFiltrada = personasData;
    }
    return listaFiltrada;
}


//calcular Edad punto c)
btnCalcularPromedioVelMax.addEventListener("click", () => {
    const valorSeleccionado = datoFiltrado.value;

    let listaFiltrada = devolverPorFiltro(personasData, valorSeleccionado);

    let totalVelMax = 0;

    listaFiltrada.map((Vehiculos) => {
        totalVelMax += Vehiculos.velMax;
    });

    const promedioVelMax = totalVelMax / listaFiltrada.length;

    textBoxPromedioVelMax.value = promedioVelMax;
});

//agregar y mostrar el form datos punto d)
btnAgregar.addEventListener("click",() => {
    document.getElementsByClassName('form-abm')[0].hidden = false;

    txtid.value = devolverIdMaximo(personasData) + 1;
});



function devolverIdMaximo(data) {

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


btnAceptar.addEventListener("click", () => {

    if (txtid.value.trim() === '' || txtModelo.value.trim() === '' || txtanofab.value.trim() === '' || txtvelmax.value.trim() === '' || dropDownTipo.value.trim() === '' || txtaltmax.value.trim() === '' || txtautonomia.value.trim() === '' || txtcantpue.value.trim() === '' || txtcantrue.value.trim() === '') {
        alert("Por favor completá los campos correctamente");
    }
    else {
        const vehiculoNuevo = {
            id: devolverIdMaximo(personasData) + 1,
            modelo: txtModelo.value.trim(),
            anofab: txtanofab.value.trim(),
            velmax: txtvelmax.value.trim(),
            tipo: dropDownTipo.value.trim(),
            altmax: txtaltmax.value.trim(),
            autonomia: txtautonomia.value.trim(),
            cantpue: txtcantpue.value.trim(),
            cantRue: txtcantrue.value.trim()
        };

        personasData.push(vehiculoNuevo);
    }

    limpiarFormulario();
    llenarTabla(personasData);
    document.getElementsByClassName('form-abm')[0].hidden = true;
});

function limpiarFormulario() {
    txtid.value = '';
    txtModelo.value = '';
    txtanofab.value = '';
    txtvelmax.value = '';
    dropDownTipo.value = '';
    txtaltmax.value = '';
    txtautonomia.value = '';
    txtcantpue.value = '';
    txtcantrue.value = '';
}


//ocultar columna segun check box h)
chkid.addEventListener("change", () => {
    const ocultar = !chkid.checked; 
    cabeceraId.hidden = ocultar; 
    ocultarMostrarColumna("Id", ocultar);

});
chkmodelo.addEventListener("change", () => {
    const ocultar = !chkmodelo.checked;
    cabeceraNombre.hidden = ocultar;
    ocultarMostrarColumna("Nombre", ocultar);
});
chkanofab.addEventListener("change", () => {
    const ocultar = !chkanofab.checked;
    cabeceraApellido.hidden = ocultar;
    ocultarMostrarColumna("Apellido", ocultar);
});
chkvelmax.addEventListener("change", () => {
    const ocultar = !chkvelmax.checked;
    cabeceraEdad.hidden = ocultar;
    ocultarMostrarColumna("Edad", ocultar);
});
chkaltmax.addEventListener("change", () => {
    const ocultar = !chkaltmax.checked;
    cabeceraSueldo.hidden = ocultar;
    ocultarMostrarColumna("Sueldo", ocultar);
});
chkautonomia.addEventListener("change", () => {
    const ocultar = !chkautonomia.checked;
    cabeceraVentas.hidden = ocultar;
    ocultarMostrarColumna("Ventas", ocultar);
});
chkcantpue.addEventListener("change", () => {
    const ocultar = !chkcantpue.checked;
    cabeceraVentas.hidden = ocultar;
    ocultarMostrarColumna("Ventas", ocultar);
});
chkcantrue.addEventListener("change", () => {
    const ocultar = !chkcantrue.checked;
    cabeceraVentas.hidden = ocultar;
    ocultarMostrarColumna("Ventas", ocultar);
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

  