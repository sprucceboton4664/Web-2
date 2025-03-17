(()=>{
const btn = document.querySelector('[data-form-btn]');
console.log(btn);

const createTask=(evento)=>{
    evento.preventDefault();
    const input = document.querySelector('[data-form-input]');
    //este data sirve que es una funcion para recuperar el texto de mi imput
    console.log(input.value);
    const valor = input.value;
    const lista = document.querySelector('[data-list]');
    const task = document.createElement('li');
    task.classList.add('card');
    input.values = '';
    /*const contenido = `
        <div>
            <i class="fas fa-check-square icon"></i>
            <span class="task">${valor}</span>
        </div>
        <i class="far fa-trash-alt icon"></i>
    `;*/
    const contTask = document.createElement('div');
    consTask.appendChild(checkComplete());
    const litleTask = document.createElement('span');
    litleTask.classList.add('task');
    litleTask.innerText = value;
    constTask.appendChild(litleTask);
    const content ='<i class="fas fa-check-square icon"></i>';
    task.appendChild(contTask)
    lista.appendChild(task);
    console.log(contenido);
}
btn.addEventListener('click', createTask);
const checkComplete = () => {
    const i = document.createElement('i'); // Creación de un icono
    i.classList.add('fa-duotone', 'fa-solid', 'fa-poo', 'icon'); // Cambiado aquí
    i.addEventListener('click', color);
    return i;
}
const color = (evento)=>{
    const element= evento.target;
    element.classList.add
    element.classList.remove('fas');
    element.classList.add('completeIcon');
    element.classL
    ist.remove('far');
}
})();