const SUPABASE_URL = 'https://romupelafyylrhrzqeyo.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvbXVwZWxhZnl5bHJocnpxZXlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5NTMyNDQsImV4cCI6MjA2MzUyOTI0NH0.3rN3vSqgA1uvQZK8drwobs1Ennyc783g4bXYgmaaOk8';

const TABLE = 'horarios';
const API_URL = `${SUPABASE_URL}/rest/v1/${TABLE}`;

const HEADERS = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json'
};

const listaHorarios = () => {
    return fetch(`${API_URL}?select=*,peliculas(titulo)`, {
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Error al obtener los horarios');
        }
        return res.json();
    });
};

const crearHorario = (fecha, hora, sala, id_pelicula) => {
    return fetch(API_URL, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ fecha, hora, sala, id_pelicula })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Error al crear el horario');
        }
        return res.json();
    });
};

const eliminarHorario = (id) => {
    return fetch(`${API_URL}?id=eq.${id}`, {
        method: 'DELETE',
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Error al eliminar el horario');
        }
        return res.json();
    });
};

const detalleHorario = (id) => {
    return fetch(`${API_URL}?id=eq.${id}`, {
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Error al obtener el horario');
        }
        return res.json();
    });
};

const actualizarHorario = (fecha, hora, sala, id_pelicula, id) => {
    return fetch(`${API_URL}?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
            ...HEADERS,
            'Prefer': 'return=representation'
        },
        body: JSON.stringify({ fecha, hora, sala, id_pelicula })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Error al actualizar el horario');
        }
        return res.json();
    });
};

export const scheduleService = {
    listaHorarios,
    crearHorario,
    eliminarHorario,
    detalleHorario,
    actualizarHorario
};
