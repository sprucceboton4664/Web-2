import { movieService } from "../service/movie-service.js";
import { listarHorarios } from "../service/horario-service.js";

const form = document.querySelector("[data-form]");
const peliculaSelect = document.querySelector("[data-pelicula]");
const cantidadInput = document.querySelector("[data-cantidad]");
const precioInput = document.querySelector("[data-precio]");
const totalInput = document.querySelector("[data-total]");

const PRECIO_BOLETO = 50; // Precio fijo por boleto

const cargarPeliculas = async () => {
    try {
        const peliculas = await movieService.listaPeliculas();
        peliculaSelect.innerHTML = '<option value="">Selecciona una película</option>';
        
        peliculas.forEach(pelicula => {
            const option = document.createElement('option');
            option.value = pelicula.id;
            option.textContent = `${pelicula.titulo} (${pelicula.duracion} min)`;
            peliculaSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar películas:', error);
        alert('Error al cargar las películas. Por favor, inténtalo de nuevo.');
    }
};

const calcularTotal = () => {
    const cantidad = parseInt(cantidadInput.value) || 0;
    const total = cantidad * PRECIO_BOLETO;
    precioInput.value = PRECIO_BOLETO.toFixed(2);
    totalInput.value = total.toFixed(2);
};

cantidadInput.addEventListener('input', calcularTotal);

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const boletoData = {
            pelicula_id: peliculaSelect.value,
            cantidad: parseInt(cantidadInput.value),
            precio_unitario: parseFloat(precioInput.value),
            precio_total: parseFloat(totalInput.value),
            fecha: new Date().toISOString().split('T')[0]
        };

        // Aquí iría la lógica para guardar el boleto
        console.log('Datos del boleto:', boletoData);
        
        alert('Boleto vendido exitosamente');
        window.location.href = 'lista_boletos.html';
    } catch (error) {
        console.error('Error al vender boleto:', error);
        alert('Error al vender el boleto. Por favor, inténtalo de nuevo.');
    }
});

document.addEventListener('DOMContentLoaded', cargarPeliculas);
