import { listaBoletos, eliminarBoleto } from '../service/ticket-service.js';

export const cargarBoletos = async () => {
    try {
        const boletos = await listaBoletos();
        const tbody = document.getElementById('boletos-list');
        tbody.innerHTML = '';

        if (!boletos || boletos.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td colspan="4" class="text-center py-4">No hay boletos registrados</td>
            `;
            tbody.appendChild(row);
            return;
        }

        boletos.forEach(boleto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${boleto.id_cliente}</td>
                <td>${boleto.id_horario}</td>
                <td>${boleto.cantidad}</td>
                <td>$${boleto.precio_total.toFixed(2)}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error al cargar boletos:', error);
        alert('Error al cargar la lista de boletos: ' + error.message);
    }
};

export const eliminarBoletoCtrl = async (id) => {
    if (confirm('¿Estás seguro de eliminar este boleto? Esta acción no se puede deshacer.')) {
        try {
            await eliminarBoleto(id);
            alert('Boleto eliminado exitosamente');
            cargarBoletos();
        } catch (error) {
            console.error('Error al eliminar boleto:', error);
            alert('Error al eliminar el boleto: ' + error.message);
        }
    }
};

window.editarBoleto = async (id) => {
    try {
        const boleto = await detalleBoleto(id);
        if (boleto) {
            window.location.href = `actualizar_boleto.html?id=${id}`;
        } else {
            alert('No se encontró el boleto');
        }
    } catch (error) {
        console.error('Error al obtener detalles del boleto:', error);
        alert('Error al obtener detalles del boleto: ' + error.message);
    }
};

document.addEventListener('DOMContentLoaded', cargarBoletos);
