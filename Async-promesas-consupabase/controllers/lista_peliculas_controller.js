import { movieService } from "../service/movie-service.js";

const cargarPeliculas = async () => {
    try {
        const tbody = document.getElementById('peliculas-list');
        tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4">Cargando películas...</td></tr>';

        const peliculas = await movieService.listaPeliculas();
        
        tbody.innerHTML = '';
        if (Array.isArray(peliculas) && peliculas.length > 0) {
            peliculas.forEach(pelicula => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="pelicula-img-cell">
                        <img src="${pelicula.imagen_url || '/assets/images/default-movie.jpg'}" alt="${pelicula.titulo}" class="pelicula-img">
                    </td>
                    <td>${pelicula.titulo}</td>
                    <td>${pelicula.duracion} min</td>
                    <td>${pelicula.genero}</td>
                    <td>
                        <button onclick="editarPelicula('${pelicula.id}')" class="btn-edit" title="Editar">
                            <svg class="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                            </svg>
                        </button>
                        <button onclick="eliminarPelicula('${pelicula.id}')" class="btn-delete" title="Eliminar">
                            <svg class="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                        </button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        } else {
            tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4">No hay películas registradas</td></tr>';
        }
    } catch (error) {
        console.error('Error al cargar películas:', error);
        const tbody = document.getElementById('peliculas-list');
        tbody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-red-500">Error al cargar las películas: ${error.message}</td></tr>`;
    }
};

window.eliminarPelicula = async (id) => {
    if (confirm('¿Estás seguro de eliminar esta película? Esta acción no se puede deshacer.')) {
        try {
            const button = event.target.closest('button');
            const originalText = button.innerHTML;
            button.innerHTML = '<div class="spinner"></div>';
            button.disabled = true;
            await movieService.eliminarPelicula(id);
            button.innerHTML = originalText;
            button.disabled = false;
            alert('Película eliminada exitosamente');
            cargarPeliculas();
        } catch (error) {
            console.error('Error al eliminar película:', error);
            alert('Error al eliminar la película: ' + error.message);
        }
    }
};
const spinnerStyle = document.createElement('style');
spinnerStyle.textContent = `
    .spinner {
        width: 20px;
        height: 20px;
        border: 3px solid #f3f3f3;
        border-top: 3px solid #3498db;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(spinnerStyle);

window.editarPelicula = async (id) => {
    try {
        const pelicula = await movieService.detallePelicula(id);
        if (pelicula) {
            window.location.href = `actualizar_pelicula.html?id=${id}`;
        } else {
            alert('No se encontró la película');
        }
    } catch (error) {
        console.error('Error al obtener detalles de la película:', error);
        alert('Error al obtener detalles de la película: ' + error.message);
    }
};
document.addEventListener('DOMContentLoaded', cargarPeliculas);
