const datos =[
    {'materia':'programacion Web',
        'calificacion':70
    },
    {
        'materia':'Base de datos',
        'calificacion':80
    }
    ,
    {
        'materia':'ingles',
        'calificacion':90
    }
    ,
    {
        'materia':'programacion Movil',
        'calificacion':100
    }
    ,
    {
        'materia':'robotica',
        
        'calificacion':50
    }
    ,
    {
        'materia':'ingles2',
        'calificacion':60
    }
    ,
    {
        'materia':'programacion Web2',
        'calificacion':40
    }
    ,
    {
        'materia':'logica computacional',
        'calificacion':30
    }
    ,
    {
        'materia':'programacion2',
        'calificacion':20
    }
    ,
    {
        'materia':'base de datos2',
        'calificacion':10
    }

];
const procesarDatos = (datos) => {
    return datos
    .filter((dato) => dato.calificacion >= 51)
    ,map (dato =>{
        const {materia}=materia;
        return materia.length >5 ? calificacion.toUpperCase() : calificacion;
    }
    )
    }
const resultado = procesarDatos(datos);
console.log(resultado);