import { listarHorarios, eliminarHorario as eliminarHorarioService } from '../service/horario-service.js';

const formatDate = (dateString) => {
    if (!dateString) return 'Sin fecha';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

const formatTime = (timeString) => {
    if (!timeString) return 'Sin hora';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
};

const showError = (message) => {
    const tbody = document.getElementById('horarios-list');
    tbody.innerHTML = `
        <tr>
            <td colspan="5" class="px-6 py-8 text-center text-red-500">
                <i class="fas fa-exclamation-circle text-2xl mb-2"></i>
                <p>${message}</p>
            </td>
        </tr>
    `;
};

window.cargarHorarios = async () => {
    const tbody = document.getElementById('horarios-list');
    const loadingRow = document.getElementById('loading-row');
    
    try {
        loadingRow.style.display = '';
        
        const horarios = await listarHorarios();
        
        loadingRow.style.display = 'none';
        
        tbody.innerHTML = '';
        
        if (!horarios || horarios.length === 0) {
            const emptyTemplate = document.getElementById('empty-template');
            const emptyRow = emptyTemplate.content.cloneNode(true);
            tbody.appendChild(emptyRow);
            return;
        }
        
        horarios.sort((a, b) => {
            const dateA = new Date(`${a.fecha}T${a.hora}`);
            const dateB = new Date(`${b.fecha}T${b.hora}`);
            return dateA - dateB;
        });
        
        const template = document.getElementById('horario-template');
        
        horarios.forEach(horario => {
            const row = template.content.cloneNode(true);
            
            row.querySelector('.fecha').textContent = formatDate(horario.fecha);
            row.querySelector('.hora').textContent = formatTime(horario.hora);
            row.querySelector('.sala').textContent = `Sala ${horario.sala_id || horario.sala || 'N/A'}`;
            row.querySelector('.pelicula').textContent = horario.peliculas?.titulo || 'Sin película';
            
            const btnEdit = row.querySelector('.btn-edit');
            const btnDelete = row.querySelector('.btn-delete');
            
            btnEdit.onclick = () => editarHorario(horario.id);
            btnDelete.onclick = () => eliminarHorario(horario.id);
            
            tbody.appendChild(row);
        });
        
    } catch (error) {
        console.error('Error al cargar horarios:', error);
        showError('Error al cargar la lista de horarios. Por favor, inténtalo de nuevo.');
    }
};

window.eliminarHorario = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este horario? Esta acción no se puede deshacer.')) {
        return;
    }
    
    try {
        const deleteBtn = document.querySelector(`button[onclick="eliminarHorario('${id}')"]`);
        const originalText = deleteBtn.innerHTML;
        deleteBtn.disabled = true;
        deleteBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-1"></i> Eliminando...';
        
        await eliminarHorarioService(id);
        
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center';
        toast.innerHTML = `
            <i class="fas fa-check-circle mr-2"></i>
            Horario eliminado correctamente
        `;
        document.body.appendChild(toast);
        
        await cargarHorarios();
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
        
    } catch (error) {
        console.error('Error al eliminar horario:', error);
        alert('Error al eliminar el horario: ' + (error.message || 'Error desconocido'));
    }
};

window.editarHorario = (id) => {
    window.location.href = `editar_horario.html?id=${id}`;
};

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('lista_horarios.html')) {
        window.cargarHorarios();
    }
});
