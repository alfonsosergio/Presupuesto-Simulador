/* Simulamos con esta variables que no tenemos un presupuesto para un cliente y el monto necesario para aprobar el presupuesto*/
let presupuesto = false;
let aprobado = 100000;


/* Al cumplirse la condición vamos a confirmar que queremos cargar un presupuesto*/
while (presupuesto === false) {
    presupuesto = prompt("Escribir 'SI' para crear presupuesto" ).toUpperCase();
    
    /* En esta sección cargamos los datos del presupuesto, si la opción que se carga no es la correcta se lanza una alerta. */
    if (presupuesto === "SI") {
        cliente = prompt("Pasar nombre del cliente");
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