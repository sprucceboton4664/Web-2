const SUPABASE_URL = 'https://abcdefghijklmnopqrst.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3BxcnN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NzY5MzgsImV4cCI6MjA2MjQ1MjkzOH0.abcdefghijklmnopqrstuvwxyz0123456789';

const TABLE_PETS = 'pets';
const TABLE_CLIENTES = 'clientes';

const API_PETS_URL = `${SUPABASE_URL}/rest/v1/${TABLE_PETS}`;
const API_CLIENTES_URL = `${SUPABASE_URL}/rest/v1/${TABLE_CLIENTES}`;

const HEADERS = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json'
};


const listaPets = () => {
    return fetch(`${API_PETS_URL}?select=*,clientes(nombre)`, {
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al obtener mascotas');
        return res.json();
    })
    .then(data => data.map(pet => ({
        ...pet,
        nombre_dueno: pet.clientes ? pet.clientes.nombre : null
    })));
};


const obtenerClientes = () => {
    return fetch(`${API_CLIENTES_URL}?select=id,nombre,email`, {
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al obtener clientes');
        return res.json();
    });
};


const crearPet = (nombre, especie, edad, fecha_nacimiento, sexo, id_dueno) => {
    if (!id_dueno) {
        return Promise.reject(new Error('Debe seleccionar un dueño'));
    }
    
    const pet = {
        nombre,
        especie,
        edad,
        fecha_nacimiento,
        sexo,
        id_dueno,
        id: uuid.v4()
    };
    
    return fetch(API_PETS_URL, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(pet)
    })
    .then(async (res) => {
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || 'Error al crear mascota');
        }
        const text = await res.text();
        return text ? JSON.parse(text) : pet;
    });
};


const eliminarPet = (id) => {
    return fetch(`${API_PETS_URL}?id=eq.${id}`, {
        method: 'DELETE',
        headers: HEADERS
    })
    .then(async (res) => {
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || 'Error al eliminar mascota');
        }
        if (res.ok) {
            location.reload();
        }
        const text = await res.text();
        return text ? JSON.parse(text) : { id };
    });
};


const detallePet = (id) => {
    return fetch(`${API_PETS_URL}?id=eq.${id}&select=*,clientes(nombre,email)`, {
        headers: HEADERS
    })
    .then(async (res) => {
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || 'Error al obtener mascota');
        }
        const data = await res.json();
        return data[0] ? {
            ...data[0],
            nombre_dueno: data[0].clientes ? data[0].clientes.nombre : null
        } : null;
    });
};


const actualizarPet = (nombre, especie, edad, fecha_nacimiento, sexo, id_dueno, id) => {
    if (!id_dueno) {
        return Promise.reject(new Error('Debe seleccionar un dueño'));
    }
    
    return fetch(`${API_PETS_URL}?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
            ...HEADERS,
            'Prefer': 'return=representation'
        },
        body: JSON.stringify({
            nombre,
            especie,
            edad,
            fecha_nacimiento,
            sexo,
            id_dueno
        })
    })
    .then(async (res) => {
        if (!res.ok) {
            const error = await res.text();
            throw new Error(error || 'Error al actualizar mascota');
        }
        const data = await res.json();
        return data[0];
    });
};

export const petService = {
    listaPets,
    obtenerClientes,
    crearPet,
    eliminarPet,
    detallePet,
    actualizarPet
};
