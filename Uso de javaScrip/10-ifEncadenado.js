const ciudadesDestino = "sucre";
const ciudadesDisponibles = ["santiago", "bogota", "lima", "montevideo"];

let edad = 17;
let conAcompanante = false;

if (edad >= 18 || conAcompanante) {
    if (ciudadesDisponibles.indexOf(ciudadesDestino) > -1) {
        console.log('Pasaje Disponible');
    } else {
        console.log('Pasaje no disponible');
    }
} else {
    if (edad >= 16 && ciudadesDestino === "sucre") {
        console.log('Pasaje Disponible');
    } else {
        console.log('Pasaje no disponible');
    }
}