const lista = document.getElementById("example");

var presupuestos ={
    1 : {
          "name" : "Michael Silva",
          "vendedor" : "Michel Jordan",
          "ubicación" : "Los Angeles",
          "monto" : "$123,500",
          "fechaInsta" : "2010/06/09",
          "estado" : "APROBADO"
    },
    2 : {
          "name" : "Michael Silva",
          "vendedor" : "Michel Jordan",
          "ubicación" : "Los Angeles",
          "monto" : "$123,500",
          "fechaInsta" : "2010/06/09",
          "estado" : "APROBADO"
    },
    3 : {
          "name" : "Michael Silva",
          "vendedor" : "Michel Jordan",
          "ubicación" : "Los Angeles",
          "monto" : "$123,500",
          "fechaInsta" : "2010/06/09",
          "estado" : "APROBADO"
    }
};

/* Simulamos con esta variables que no tenemos un presupuesto para un cliente y el monto necesario para aprobar el presupuesto*/
let presupuesto = false;
let aprobado = 100000;


/* Al cumplirse la condición vamos a confirmar que queremos cargar un presupuesto*/
document.querySelector("#btnAdd").addEventListener("click", function(){
    if (presupuesto === false) {
        presupuesto = prompt("Escribir 'SI' para crear presupuesto" ).toUpperCase();
        
        /* En esta sección cargamos los datos del presupuesto, si la opción que se carga no es la correcta se lanza una alerta. */
        if (presupuesto === "SI") {
            cliente = prompt("Pasar nombre del cliente.");
            alert("El monto del presupuesto debe alcanzar los 100000 pesos");
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
            }
        } else {
            presupuesto = false;
            alert("PARA CONTINUAR CON EL PROCESO DEBE CONTESTAR CON UN 'SI'");
        }
    }
})





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
    


}




mostrarPresupuestos()