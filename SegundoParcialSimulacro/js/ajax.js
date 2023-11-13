
document.addEventListener('DOMContentLoaded', function () {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json'; // Establecer el tipo de respuesta que se espera

    xhr.open('GET', 'http://localhost/ApisLaboratoio/', true);

    xhr.onload = function () {
        if (xhr.status == 200) {
            var jsonResponse = xhr.response; // Aquí ya se obtiene el objeto JSON directamente
            // Almacenar en localStorage
            localStorage.setItem('myData', JSON.stringify(jsonResponse));
        } else {
            console.error('Request failed with status ' + xhr.status);
        }
    };

    xhr.onerror = function () {
        console.error('Network error occurred');
    };

    xhr.send();
});

