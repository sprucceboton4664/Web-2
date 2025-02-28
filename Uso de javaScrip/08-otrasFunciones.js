const ciudadesDisponibles = ["Santiago", "Bogotá", "Lima", "Montevideo"];
const paisesDisponibles = ["Colombia", "Perú", "Uruguay", "Chile"];
const cantidadCiudades = ciudadesDisponibles.length;
console.log(`En la lista existen ${cantidadCiudades} ciudades`);

ciudadesDisponibles.shift();
console.log(`En la lista existen ${ciudadesDisponibles.length} ciudades`);
console.log(ciudadesDisponibles);

ciudadesDisponibles.pop();
console.log(`En la lista existen ${ciudadesDisponibles.length} ciudades`);
console.log(ciudadesDisponibles);

console.log(ciudadesDisponibles.sort());
console.log(`En la lista existen ${ciudadesDisponibles.length} ciudades`);

const listaPaisesCiudades = paisesDisponibles.concat(ciudadesDisponibles);
console.log(listaPaisesCiudades);