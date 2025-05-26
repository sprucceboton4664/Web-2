const API_URL = 'https://romupelafyylrhrzqeyo.supabase.co/rest/v1/boletos';
const HEADERS = {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvbXVwZWxhZnl5bHJocnpxZXlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5NTMyNDQsImV4cCI6MjA2MzUyOTI0NH0.3rN3vSqgA1uvQZK8drwobs1Ennyc783g4bXYgmaaOk8',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvbXVwZWxhZnl5bHJocnpxZXlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5NTMyNDQsImV4cCI6MjA2MzUyOTI0NH0.3rN3vSqgA1uvQZK8drwobs1Ennyc783g4bXYgmaaOk8',
    'Content-Type': 'application/json'
};

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.text().catch(() => '');
        throw new Error(`Error ${response.status}: ${errorData || 'Error desconocido'}`);
    }
    try {
        return await response.json();
    } catch (error) {
        console.error('Error al parsear JSON:', error);
        throw new Error('Error al procesar la respuesta del servidor');
    }
};
const handleError = (error) => {
    console.error('Error en el servicio:', error);
    throw error;
};

export const listaBoletos = async () => {
    try {
        const response = await fetch(API_URL, {
            headers: HEADERS
        });
        return handleResponse(response);
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const crearBoleto = async (id_cliente, id_horario, cantidad, precio_total) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify({ id_cliente, id_horario, cantidad, precio_total })
        });
        return handleResponse(response);
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const eliminarBoleto = async (id) => {
    try {
        const response = await fetch(`${API_URL}?id=eq.${id}`, {
            method: 'DELETE',
            headers: HEADERS
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText}`);
        }
        
        return true;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const detalleBoleto = async (id) => {
    try {
        const response = await fetch(`${API_URL}?id=eq.${id}`, {
            headers: HEADERS
        });
        const data = await handleResponse(response);
        return data[0];
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const actualizarBoleto = async (id_cliente, id_horario, cantidad, precio_total, id) => {
    try {
        const response = await fetch(`${API_URL}?id=eq.${id}`, {
            method: 'PATCH',
            headers: {
                ...HEADERS,
                'Prefer': 'return=representation'
            },
            body: JSON.stringify({ id_cliente, id_horario, cantidad, precio_total })
        });
        return handleResponse(response);
    } catch (error) {
        handleError(error);
        throw error;
    }
};
