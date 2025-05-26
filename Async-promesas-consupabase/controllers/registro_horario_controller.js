import { movieService } from "../service/movie-service.js";

const cargarPeliculas = async () => {
    try {
        console.log('Iniciando carga de películas...');
        const select = document.querySelector('[data-pelicula]');
        console.log('Select encontrado:', select ? 'Sí' : 'No');
        
        if (!select) {
            throw new Error('No se encontró el select de películas en el DOM');
        }
        
        console.log('Obteniendo lista de películas...');
        const peliculas = await movieService.listaPeliculas();
        console.log('Películas obtenidas:', peliculas);
        
        if (Array.isArray(peliculas) && peliculas.length > 0) {
            console.log('Encontradas', peliculas.length, 'películas');
            select.innerHTML = '<option value="">Selecciona una película</option>';
            
            peliculas.forEach(pelicula => {
                const option = document.createElement('option');
                option.value = pelicula.id;
                option.textContent = `${pelicula.titulo} (${pelicula.duracion} min)`;
                select.appendChild(option);
                console.log('Agregada película:', pelicula.titulo);
            });
        } else {
            console.log('No se encontraron películas');
            select.innerHTML = '<option value="">No hay películas disponibles</option>';
        }
    } catch (error) {
        console.error('Error al cargar películas:', error);
        const select = document.querySelector('[data-pelicula]');
        if (select) {
            select.innerHTML = `<option value="">Error al cargar películas: ${error.message}</option>`;
        }
    }
};

document.querySelector('[data-form]').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const formData = {
            pelicula_id: document.querySelector('[data-pelicula]').value,
            fecha: document.querySelector('[data-fecha]').value,
            hora: document.querySelector('[data-hora]').value,
            sala_id: document.querySelector('[data-sala]').value
        };

        console.log('Datos del formulario:', formData);
        
        console.log('Formulario enviado:', formData);
        
        window.location.href = 'lista_horarios.html';
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
        alert('Error al registrar el horario. Por favor, inténtalo de nuevo.');
    }
});

document.addEventListener('DOMContentLoaded', cargarPeliculas);
