const SUPABASE_URL = 'https://romupelafyylrhrzqeyo.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvbXVwZWxhZnl5bHJocnpxZXlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5NTMyNDQsImV4cCI6MjA2MzUyOTI0NH0.3rN3vSqgA1uvQZK8drwobs1Ennyc783g4bXYgmaaOk8';

const TABLE = 'peliculas';
const API_URL = 'https://romupelafyylrhrzqeyo.supabase.co/rest/v1/peliculas';
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

export const listaPeliculas = async () => {
    try {
        console.log('Solicitando películas a:', `${API_URL}?select=*`);
        const response = await fetch(`${API_URL}?select=*`, {
            headers: HEADERS
        });
        
        console.log('Respuesta del servidor:', response.status, response.statusText);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.log('Texto del error:', errorText);
            throw new Error(`Error ${response.status}: ${errorText}`);
        }
        
        const data = await response.json();
        console.log('Datos recibidos:', data);
        
        if (!Array.isArray(data)) {
            console.log('La respuesta no es un array');
            return [];
        }
        
        return data;
    } catch (error) {
        console.error('Error al obtener la lista de películas:', error);
        throw new Error('No se pudieron cargar las películas. Por favor, inténtalo de nuevo.');
    }
};

export const crearPelicula = async (titulo, duracion, genero, sinopsis, imagen) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify({
                titulo,
                duracion: parseInt(duracion),
                genero,
                sinopsis,
                imagen_url: imagen
            })
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText}`);
        }
        try {
            return await response.json();
        } catch (error) {
            console.error('No se pudo parsear la respuesta como JSON:', error);
            return {};
        }
    } catch (error) {
        console.error('Error al crear la película:', error);
        throw error;
    }
};

export const detallePelicula = async (id) => {
    try {
        const response = await fetch(`${API_URL}?id=eq.${id}`, {
            headers: HEADERS
        });
        const data = await handleResponse(response);
        return data[0] || null;
    } catch (error) {
        console.error('Error al obtener detalles:', error);
        throw error;
    }
};

export const actualizarPelicula = async (titulo, duracion, genero, sinopsis, imagen, id) => {
    try {
        const response = await fetch(`${API_URL}?id=eq.${id}`, {
            method: 'PATCH',
            headers: {
                ...HEADERS,
                'Prefer': 'return=representation'
            },
            body: JSON.stringify({
                titulo,
                duracion: parseInt(duracion),
                genero,
                sinopsis,
                imagen_url: imagen
            })
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error al actualizar la película:', error);
        throw error;
    }
};

export const eliminarPelicula = async (id) => {
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
        console.error('Error al eliminar la película:', error);
        throw error;
    }
};

export const movieService = {
    crearPelicula,
    listaPeliculas,
    detallePelicula,
    actualizarPelicula,
    eliminarPelicula
};
