import { movieService } from "../service/movie-service.js";
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

if (!id) {
    alert('ID de película no encontrado');
    window.location.href = 'lista_peliculas.html';
    return;
}
const cargarDatosPelicula = async () => {
    try {
        const pelicula = await movieService.detallePelicula(id);
        if (pelicula) {
            document.querySelector("[data-titulo]").value = pelicula.titulo;
            document.querySelector("[data-duracion]").value = pelicula.duracion;
            document.querySelector("[data-genero]").value = pelicula.genero;
            document.querySelector("[data-sinopsis]").value = pelicula.sinopsis;
            document.querySelector("[data-imagen]").value = pelicula.imagen_url;
            document.getElementById("imagen-preview").src = pelicula.imagen_url;
        }
    } catch (error) {
        console.error('Error al cargar datos de la película:', error);
        alert('Error al cargar los datos de la película');
    }
};
const imagenInput = document.querySelector("[data-imagen]");
const imagenPreview = document.getElementById("imagen-preview");

imagenInput.addEventListener("input", (evento) => {
    const url = evento.target.value;
    if (url) {
        imagenPreview.src = url;
        imagenPreview.style.display = "block";
    } else {
        imagenPreview.style.display = "none";
    }
});
const formulario = document.querySelector("[data-form]");

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    
    const titulo = document.querySelector("[data-titulo]").value;
    const duracion = document.querySelector("[data-duracion]").value;
    const genero = document.querySelector("[data-genero]").value;
    const sinopsis = document.querySelector("[data-sinopsis]").value;
    const imagen = document.querySelector("[data-imagen]").value;

    if (!titulo || !duracion || !genero || !sinopsis || !imagen) {
        alert('Por favor, completa todos los campos');
        return;
    }

    try {
        await movieService.actualizarPelicula(titulo, duracion, genero, sinopsis, imagen, id);
        alert('Película actualizada exitosamente');
        window.location.href = "lista_peliculas.html";
    } catch (error) {
        console.error('Error al actualizar película:', error);
        alert('Error al actualizar la película: ' + error.message);
    }
});
document.addEventListener('DOMContentLoaded', cargarDatosPelicula);
