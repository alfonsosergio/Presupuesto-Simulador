/* Simulamos con estas variables que el cliente no existe y no tiene un presupuesto */
let presupuesto = false;
let cliente = false;
let aprobado = 100000;

while (presupuesto === false) {
    presupuesto = prompt("Escribir 'SI' para crear presupuesto" ).toUpperCase();
    
            
    if (presupuesto === "SI") {
        cliente = prompt("Pasar nombre del cliente");
        let precioAntenaAp = parseInt(prompt("Pasar precio de la antena AP"));
        let precioAntenaCpe = parseInt(prompt("Pasar precio de la antena CPE"));
        let precioTransporte = parseInt(prompt("Pasar precio Transporte"));
        let precioGeneral = parseInt(prompt("Pasar precio de insumos varios"));

        let total = precioAntenaAp + precioAntenaCpe + precioGeneral + precioTransporte;

        
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