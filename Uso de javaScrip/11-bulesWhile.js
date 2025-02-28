const ciudadesDisponibles = new Array("Santiago", "Bogotá", "Lima", "Montevideo");
const precioPasaje = new Array(200,300,100,400);
const precioDisponible=210;
let i=0;
while(precioPasaje[i]>precioDisponible && i<precioPasaje.length){
    i++;
}
if(i== ciudadesDisponibles.length)
    console.log('No hay pasajes disponibles')
    else 
        console.log(`El pasaje a ${ciudadesDisponibles[i]} cuesta ${precioPasaje[i]}`);
    