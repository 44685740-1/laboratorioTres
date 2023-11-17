
import {showSpinner, hideSpinner} from "./script.mjs";

function getUsersApi(callback) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', 'http://localhost/ApisLaboratoio/', true);

    xhr.onload = function () {
        if (xhr.status == 200) {
            var jsonResponse = xhr.response;
            callback(null, jsonResponse);
        } else {
            callback('Peticion fallo con el estado ' + xhr.status, null);
        }
    };

    xhr.onerror = function () {
        callback('Error de Network', null);
    };

    xhr.send();
}



function agregarUsuariosApi(userData) {
    return fetch('http://localhost/ApisLaboratoio/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        return data.id;
    })
    .catch(error => {
        hideSpinner();
        console.error('There was a problem with the fetch operation:', error);
    });
}

async function modificarUsuarioApi(userId, updatedUserData) {

    const apiUrl = 'http://localhost/ApisLaboratoio/';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: userId,
                nombre: updatedUserData.nombre,
                apellido: updatedUserData.apellido,
                edad: updatedUserData.edad,
                sueldo: updatedUserData.sueldo,
                ventas: updatedUserData.ventas,
                compras: updatedUserData.compras,
                telefono: updatedUserData.telefono
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        // Check if the response is a valid JSON
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const jsonResponse = await response.json();
            console.log('User modified successfully:', jsonResponse);
            return jsonResponse; // Return the modified user data if available
        } else {
            const textResponse = await response.text();
            console.log('Success response (non-JSON):', textResponse);
            return textResponse; // Return the non-JSON success response
        }
    } catch (error) {
        console.error('Error modifying user:', error.message);
        throw error;
    }
}



function eliminarUsuarioApi(IdUsuario) {
    const url = 'http://localhost/ApisLaboratoio/';

    return fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: IdUsuario }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error deleting user: ${response.status}`);
        }
        return response.text(); // Receive the response as text
    })
    .then(data => {
        // Check if the response is "Exito"
        if (data.trim().toLowerCase() === 'exito') {
            console.log('User deleted successfully');
        } else {
            throw new Error('Error deleting user');
        }
    })
    .catch(error => {
        console.error(error.message);
        throw error;
    });
}



export { getUsersApi, agregarUsuariosApi, modificarUsuarioApi, eliminarUsuarioApi};