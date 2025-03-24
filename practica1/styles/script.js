document.addEventListener('DOMContentLoaded', () => {
    const descripcion = document.getElementById('descripcion');
    const fotoPersonal = document.getElementById('fotoPersonal');

    // Cambiar el color de fondo automáticamente al cargar la página
    const colores = ['#f0f8ff', '#faebd7', '#ffebcd', '#8a2be2', '#5f9ea0'];
    document.body.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];

    // Mostrar un mensaje emergente al hacer clic en la imagen
    fotoPersonal.addEventListener('click', () => {
        alert('¡Hola! Esta es una foto personal.');
    });
});