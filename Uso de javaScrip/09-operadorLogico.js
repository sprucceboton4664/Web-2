let edadPersonal = 17;
let conAcompanante = true;
const precioPasaje = 1000;
const ciudadesDestino = "sucre";
const ciudadesDisponibles = ["santiago", "bogota", "lima", "montevideo"];

if (precioPasaje === 1000) {
    console.log('El pasaje cuesta 1000');
}

console.log(`Verificando pasaje para ${ciudadesDestino}`);

if (ciudadesDisponibles.indexOf(ciudadesDestino) > -1 && (edadPersonal >= 18 || conAcompanante)) {
    console.log('Pasaje Disponible');
} else if (edadPersonal >= 16 && ciudadesDestino === "sucre") {
    console.log('Pasaje Disponible');
} else {
    console.log('Pasaje no disponible');
}