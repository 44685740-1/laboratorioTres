
import persona from "./persona.js";
import empleado from "./empleado.js";
import cliente from "./cliente.js";
let listaUsuarios = JSON.parse(localStorage.getItem('myData'));

const tablaDatos = document.getElementById('tabla-datos');

//llenar tabla y mostrar los datos punto a)
document.addEventListener("DOMContentLoaded", () => {
    llenarTabla(listaUsuarios);
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


