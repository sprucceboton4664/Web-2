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
const NotaAprobacion=51;
let i=0;
let materiaSelecionada=``;
do{
    if(datos[i].calificacion>=NotaAprobacion){
        materiaSelecionada=datos[i].materia;
        break;
    }
    i++;
}while(i<datos.length && materiaSelecionada=='')
if (materiaSelecionada!='')
    console.log(`no aprobaste la materia ${materiaSelecionada}`)
else
    console.log('Aprobaste todas las materias')

