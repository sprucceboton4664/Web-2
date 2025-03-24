const App = (() => {
    const cambiarColorFondo = () => {
        const colores = ['#f0f8ff', '#faebd7', '#ffebcd', '#8a2be2', '#5f9ea0'];
        document.body.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
    };
    const mostrarMensajeImagen = () => {
        const fotoPersonal = document.getElementById('fotoPersonal');
        fotoPersonal.addEventListener('click', () => {
            alert('¡Hola! Esta es una foto personal.');
        });
    };
    const cambiarTextoPresentacion = () => {
        const cambiarTextoBtn = document.getElementById('cambiarTextoBtn');
        const descripcion = document.getElementById('descripcion');
        cambiarTextoBtn.addEventListener('click', () => {
            descripcion.textContent = 'Este es el nuevo texto de presentación. ¡Gracias por visitar mi página!';
        });
    };
    const mostrarAlerta = () => {
        const mostrarAlertaBtn = document.getElementById('mostrarAlertaBtn');
        mostrarAlertaBtn.addEventListener('click', () => {
            alert('¡Hola! Esta es una alerta.');
        });
    };
    const reproducirSonido = () => {
        const reproducirSonidoBtn = document.getElementById('reproducirSonidoBtn');
        reproducirSonidoBtn.addEventListener('click', () => {
            const audio = new Audio('assets/sonido.mp3');
            audio.play();
        });
    };
    const agregarTarea = () => {
        const formTareas = document.getElementById('formTareas');
        const nuevaTarea = document.getElementById('nuevaTarea');
        const listaTareas = document.getElementById('listaTareas');

        formTareas.addEventListener('submit', (event) => {
            event.preventDefault();
            const tareaTexto = nuevaTarea.value.trim();
            if (tareaTexto !== '') {
                const li = document.createElement('li');
                li.textContent = tareaTexto;
                const botonEliminar = document.createElement('button');
                botonEliminar.textContent = 'Eliminar';
                botonEliminar.addEventListener('click', () => {
                    listaTareas.removeChild(li);
                });
                li.appendChild(botonEliminar);
                listaTareas.appendChild(li);
                nuevaTarea.value = '';
            }
        });
    };

    const init = () => {
        cambiarColorFondo();
        mostrarMensajeImagen();
        cambiarTextoPresentacion();
        mostrarAlerta();
        reproducirSonido();
        agregarTarea();
    };

    return { init };
})();

document.addEventListener('DOMContentLoaded', App.init);