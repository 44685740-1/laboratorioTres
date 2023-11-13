function esCadenaNoNula(variable) {
    return variable !== null && typeof variable === 'string';
}

function esEnteroMayorQueQuince(variable) {
    if (Number.isInteger(variable) && variable > 15) {
        return true;
    } else {
        return false;
    }
}


function esEnteroMayorQueCero(variable) {
    if (Number.isInteger(variable) && variable > 0) {
        return true;
    } else {
        return false;
    }
}


function esFloatMayorQueCero(variable) {
    if (typeof variable === 'number' && !Number.isNaN(variable) && variable > 0 && variable % 1 !== 0) {
        return true;
    } else {
        return false;
    }
}






