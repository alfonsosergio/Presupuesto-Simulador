const lista = document.getElementById("example");

/* Simulamos con esta variables que no tenemos un presupuesto para un cliente y el monto necesario para aprobar el presupuesto
let presupuesto = false;*/
let aprobado = 100000;


var presupuestos = [
    {
        name : "Michael Silva",
        vendedor : "Michel Jordan",
        ubicación : "Los Angeles",
        monto : 123500,
        fechaInsta : "2010/06/09",
        estado : "APROBADO"
    },
    {
        name : "Michael Silva",
        vendedor : "Michel Jordan",
        ubicación : "Los Angeles",
        monto : 123500,
        fechaInsta : "2010/06/09",
        estado : "APROBADO"
    },
    {
        name : "Michael Silva",
        vendedor : "Michel Jordan",
        ubicación : "Los Angeles",
        monto : 123500,
        fechaInsta : "2010/06/09",
        estado : "APROBADO"
    }
];


function mostrarPresupuestos() {
    var template = ``;
    for(element in presupuestos){
        template +=`
                <tr>
                <td>${presupuestos[element].name}</td>
                <td>${presupuestos[element].vendedor}</td>
                <td>${presupuestos[element].ubicación}</td>
                <td>${presupuestos[element].monto}</td>
                <td>${presupuestos[element].fechaInsta}</td>
                <td>${presupuestos[element].estado}</td>
            </tr>
        `;
        
    };
    lista.innerHTML = template;
    return;
}



/* Al cumplirse la condición vamos a confirmar que queremos cargar un presupuesto*/
document.querySelector("#btnAdd").addEventListener("click", function(){
        presupuesto = prompt("Escribir 'SI' para crear presupuesto" ).toUpperCase();
        
        /* En esta sección cargamos los datos del presupuesto, si la opción que se carga no es la correcta se lanza una alerta. */
        if (presupuesto === "SI") {
            cliente = prompt("Pasar nombre del cliente.");
            alert("El monto del presupuesto debe alcanzar los 100000 pesos");
            let ubicacionIns = prompt("Ciudad de la instalación");
            let vendedorIns = prompt("Vendedor a cargo de la venta");
            let precioAntenaAp = parseInt(prompt("Pasar precio de la antena AP"));
            let precioAntenaCpe = parseInt(prompt("Pasar precio de la antena CPE"));
            let precioTransporte = parseInt(prompt("Pasar precio Transporte"));
            let precioGeneral = parseInt(prompt("Pasar precio de insumos varios"));
    
            let total = precioAntenaAp + precioAntenaCpe + precioGeneral + precioTransporte;
    
            /* Con este condicional vamos a aprobar el presupuesto en caso contrario vamos a tener que completar todo el formulario otra vez. */
            if (total < aprobado ) {
                alert("Presupuesto DESAPROBADO");
                presupuesto = false;
            } else {
                alert("Presupuesto APROBAD");
                presupuestos.push({
                    name : cliente,
                    vendedor : vendedorIns,
                    ubicación : ubicacionIns,
                    monto : total,
                    fechaInsta : "2010/06/09",
                    estado : "APROBADO"
                });
                mostrarPresupuestos();
            }
        } else {
            presupuesto = false;
            alert("PARA CONTINUAR CON EL PROCESO DEBE CONTESTAR CON UN 'SI'");
        }
    
})


document.querySelector("#btnSearch").addEventListener("click", function(){
    let busClien = prompt("Escribir el nombre del cliente que estás buscando");
    let busquedaClient = presupuestos.find( elemento => elemento.name === busClien);
    alert(Object.values(busquedaClient));
})

document.querySelector("#btnFilter").addEventListener("click", function(){
    let filClien = prompt("Escribir el nombre del cliente que estás buscando");
    let filClient = presupuestos.filter( elemento => elemento.name === filClien);
    alert(JSON.stringify(filClient));
})



mostrarPresupuestos()