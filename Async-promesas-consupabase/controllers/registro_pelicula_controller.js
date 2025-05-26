import { movieService } from "../service/movie-service.js";
const validarUrlImagen = (url) => {
    try {
        const urlObj = new URL(url);
        const extension = urlObj.pathname.split('.').pop().toLowerCase();
        return ['jpg', 'jpeg', 'png', 'gif'].includes(extension);
    } catch (error) {
        return false;
    }
};

// Validar tamaño de imagen usando fetch
const validarTamañoImagen = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) return false;
        
        const blob = await response.blob();
        const image = new Image();
        image.src = URL.createObjectURL(blob);
        
        return new Promise((resolve) => {
            image.onload = () => {
                const maxAncho = 225;
                const maxAlto = 225;
                const isValid = image.width <= maxAncho && image.height <= maxAlto;
                resolve(isValid);
            };
        });
    } catch (error) {
        return false;
    }
};

const formulario = document.querySelector("[data-form]");
const imagenInput = document.querySelector("[data-imagen]");
const imagenPreview = document.getElementById("imagen-preview");
imagenInput.addEventListener("input", (evento) => {
    const url = evento.target.value;
    if (url && validarUrlImagen(url)) {
        imagenPreview.src = url;
        imagenPreview.style.display = "block";
    } else {
        imagenPreview.style.display = "none";
    }
});
const validarDuracion = (duracion) => {
    const numero = parseInt(duracion);
    return !isNaN(numero) && numero > 0;
};

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    
    const titulo = document.querySelector("[data-titulo]").value.trim();
    const duracion = document.querySelector("[data-duracion]").value.trim();
    const genero = document.querySelector("[data-genero]").value.trim();
    const sinopsis = document.querySelector("[data-sinopsis]").value.trim();
    const imagen = document.querySelector("[data-imagen]").value.trim();
    if (!titulo) {
        alert('Por favor, ingresa un título de película');
        return;
    }

    if (!validarDuracion(duracion)) {
        alert('Por favor, ingresa una duración válida (número mayor a 0)');
        return;
    }

    if (!genero) {
        alert('Por favor, selecciona un género');
        return;
    }

    if (!sinopsis) {
        alert('Por favor, ingresa una sinopsis');
        return;
    }

    if (!imagen || !validarUrlImagen(imagen)) {
        alert('Por favor, ingresa una URL válida de imagen (solo JPG, JPEG, PNG o GIF)');
        return;
    }
    try {
        const isValidSize = await validarTamañoImagen(imagen);
        if (!isValidSize) {
            alert('La imagen es demasiado grande. Por favor, usa una imagen con dimensiones máximas de 500x750px');
            return;
        }
    } catch (error) {
        console.error('Error al validar tamaño de imagen:', error);
        alert('No se pudo validar el tamaño de la imagen. Por favor, intenta con otra URL.');
        return;
    }

    try {
        const response = await movieService.crearPelicula(titulo, duracion, genero, sinopsis, imagen);
        console.log('Respuesta del servidor:', response);
        alert('Película creada exitosamente');
        window.location.href = "../screens/registro_completado_pelicula.html";
    } catch (error) {
        console.error('Error completo:', error);
        console.error('Error message:', error.message);
        let errorMessage = error.message;
        if (error.message.includes('Error 400')) {
            errorMessage = 'Error: Datos inválidos. Por favor verifica los campos.';
        } else if (error.message.includes('Error 401')) {
            errorMessage = 'Error: No autorizado. Verifica tus credenciales.';
        } else if (error.message.includes('Error 403')) {
            errorMessage = 'Error: No tienes permisos para realizar esta acción.';
        } else if (error.message.includes('Error 404')) {
            errorMessage = 'Error: No se encontró el recurso.';
        } else if (error.message.includes('Error 500')) {
            errorMessage = 'Error: Error interno del servidor. Por favor intenta más tarde.';
        }
        
        alert(errorMessage);
    }
}); 
