const lista = document.getElementById("example");
const main = document.getElementById("main");


/* Simulamos con esta variables que no tenemos un presupuesto para un cliente y el monto necesario para aprobar el presupuesto
let presupuesto = false;*/
let aprobado = 100000;


const getPresupuestos = async () =>{
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/users');
        let data = await response.json();
        const presupuestos = [];
        data.forEach(element => {
            presupuestos.push({
                        name : element.name,
                        vendedor : element.company.name,
                        ubicación : element.address.city,
                        monto : "130000",
                        fechaInsta : "2010/06/09",
                        estado : "APROBADO"
                    });
        });
        const presupuestosJSON = JSON.stringify(presupuestos);
        localStorage.setItem("presupuestos", presupuestosJSON);
        } catch (error) {
            Swal.fire(  `NO SE PUEDE CONECTAR A LA BASE DE DATOS`);
        }
    
}


function mostrarPresupuestos() {
    const localPresupuestos = JSON.parse(localStorage.getItem("presupuestos"));
    if (!localPresupuestos) {
        getPresupuestos()
        const localPresupuestos = JSON.parse(localStorage.getItem("presupuestos"));
        return localPresupuestos
    } else {
        var template = ``;
    for(element in localPresupuestos){
        template +=`
                <tr>
                <td>${localPresupuestos[element].name}</td>
                <td>${localPresupuestos[element].vendedor}</td>
                <td>${localPresupuestos[element].ubicación}</td>
                <td>${localPresupuestos[element].monto}</td>
                <td>${localPresupuestos[element].fechaInsta}</td>
                <td>${localPresupuestos[element].estado}</td>
            </tr>
        `;
        
    };
    lista.innerHTML = template;
    return;
    }
    
}

mostrarPresupuestos()

/* Botón para cargar usuario nuevo a la lista de presupuestos*/
document.querySelector("#btnAdd").addEventListener("click", function(){
        
        
        /* En esta sección cargamos los datos del presupuesto en un modal que se despliega en la página, si la opción que se carga no es la correcta se lanza una alerta. */
            const cliente = document.getElementById("nomCli").value;
            const vendedorIns = document.getElementById("vendedor").value;
            const ubicacionIns = document.getElementById("ubicacion").value;
            const precioAntena = parseInt(document.getElementById("total").value);
            const fechaIn = document.getElementById("fecha").value;
            const precioTransporte = parseInt(document.getElementById("precioTransporte").value);
            let total = precioAntena + precioTransporte;
    
            /* Con este condicional vamos a aprobar el presupuesto en caso contrario vamos a tener que completar todo el formulario otra vez. */
            if (total < aprobado ) {
                Swal.fire({
                    icon: 'error',
                    title: 'Presupuesto DESAPROBADO',
                })
            } else {
                const localPresupuestos = JSON.parse(localStorage.getItem("presupuestos"));
                localPresupuestos.push({
                    name : cliente,
                    vendedor : vendedorIns,
                    ubicación : ubicacionIns,
                    monto : total,
                    fechaInsta : "2010/06/09",
                    estado : "APROBADO"
                });
                const presupuestosJSON = JSON.stringify(localPresupuestos);
                localStorage.setItem("presupuestos", presupuestosJSON);
                Swal.fire(
                    'Good job!',
                    'Cliente agregado',
                    'success'
                )
                mostrarPresupuestos();
            }
})

/* Botón para buscar un cliente de forma individual, el resultado es una leyenda con el monto total del presupuesto.*/
document.querySelector("#btnSearch").addEventListener("click", function(){
        Swal.fire({
        title: 'NOMBRE DEL CLIENTE A BUSCAR',
        input: 'text',
        inputLabel: 'NOMBRE CLIENTE',
        inputPlaceholder: 'NOMBRE CLIENTE'
        }).then((result) => {
        if (result.value) {
            const localPresupuestos = JSON.parse(localStorage.getItem("presupuestos"));
            let busquedaClient = localPresupuestos.find( elemento => elemento.name === result.value);
            if (busquedaClient) {
                Swal.fire(  `CLIENTE: ${busquedaClient.name}`,
                        `MONTO: ${busquedaClient.monto}`
                        );
            } else {
                    Swal.fire(  `NO EXISTE EL CLIENTE`);
            }
            
        }
        })
})

/* Botón para filtrar clientes por la persona que vendió la instalación.*/
document.querySelector("#btnFilter").addEventListener("click", function(){
    Swal.fire({
        title: 'BUSCAR CLIENTES POR VENDEDOR',
        input: 'text',
        inputLabel: 'NOMBRE VENDEDOR',
        inputPlaceholder: 'NOMBRE VENDEDOR'
        }).then((result) => {
        if (result.value) {
            const localPresupuestos = JSON.parse(localStorage.getItem("presupuestos"));
            let filClient = localPresupuestos.filter( elemento => elemento.vendedor === result.value);
            if (filClient.length != 0) {
                var template = ``;
                for(element in filClient){
                    template +=`
                            <tr>
                            <td>${filClient[element].name}</td>
                            <td>${filClient[element].vendedor}</td>
                            <td>${filClient[element].ubicación}</td>
                            <td>${filClient[element].monto}</td>
                            <td>${filClient[element].fechaInsta}</td>
                            <td>${filClient[element].estado}</td>
                        </tr>
                    `;  
            };
            lista.innerHTML = template;
            } else {
                Swal.fire( `NO EXISTE EL VENDEDOR`);
                mostrarPresupuestos();
            }
            
        }
        })
    
})  

/* Botón para cargar todos los clientes en la lista*/
document.querySelector("#pagePresupuesto").addEventListener("click", function(){
    mostrarPresupuestos();
})

/* Botón para eliminar clientes de un vendedor*/
document.querySelector("#removeClient").addEventListener("click", function(){
    Swal.fire({
        title: 'ELIMINAR CLIENTE POR VENDEDOR',
        input: 'text',
        inputLabel: 'NOMBRE VENDEDOR',
        inputPlaceholder: 'NOMBRE VENDEDOR'
        }).then((result) => {
        if (result.value) {
            const localPresupuestos = JSON.parse(localStorage.getItem("presupuestos"));
            let filClient = localPresupuestos.filter( elemento => elemento.vendedor != result.value);
            Swal.fire(
                'Good job!',
                'Cliente ELIMINADO',
                'success'
            )
            if (filClient.length < localPresupuestos.length) {
                var template = ``;
                for(element in filClient){
                    template +=`
                            <tr>
                            <td>${filClient[element].name}</td>
                            <td>${filClient[element].vendedor}</td>
                            <td>${filClient[element].ubicación}</td>
                            <td>${filClient[element].monto}</td>
                            <td>${filClient[element].fechaInsta}</td>
                            <td>${filClient[element].estado}</td>
                        </tr>
                    `;  
                    const presupuestosJSON = JSON.stringify(filClient);
                    localStorage.setItem("presupuestos", presupuestosJSON);
            };
            lista.innerHTML = template;
            } else {
                Swal.fire( `NO EXISTE EL CLIENTE`);
                mostrarPresupuestos();
            }
            
        }
        })
    
}) 
document.querySelector("#sectionAd").addEventListener("click", function(){
    var template = `
    <main>
        <div class="main2-grid">
            <a href="#" class="grid-item">
                <i class="bi bi-inboxes"></i>
                <p>Mis pedidos</p>
            </a>
            <a href="#" class="grid-item">
                <i class="bi bi-cloud-upload"></i>
                <p>Agregar un producto</p>
            </a>
            <a href="#" class="grid-item">
                <i class="bi bi-archive"></i>
                <p>Mis productos</p>
            </a>
            <a href="#" class="grid-item">
                <i class="bi bi-ui-checks"></i>
                <p>Categorías</p>
            </a>
            <a href="#" class="grid-item">
                <i class="bi bi-ticket-perforated"></i>
                <p>Cupones</p>
            </a>
            <a href="#" class="grid-item">
                <i class="bi bi-credit-card-2-back"></i>
                <p>Métodos de pago</p>
            </a>
            <a href="#" class="grid-item">
                <i class="bi bi-truck"></i>
                <p>Métodos de envío</p>
            </a>
            <a href="#" class="grid-item">
                <i class="bi bi-images"></i>
                <p>Carrusel de imágenes</p>
            </a>
            <a href="#" class="grid-item">
                <i class="bi bi-gear"></i>
                <p>Configuración</p>
            </a>
            <a href="#" class="grid-item">
                <i class="bi bi-palette"></i>
                <p>Personalizar</p>
            </a>
            <a href="#" class="grid-item">
                <i class="bi bi-people"></i>
                <p>Gestión de empleados</p>
            </a>
            <a href="#" class="grid-item">
                <i class="bi bi-emoji-heart-eyes"></i>
                <p>Ver mi sitio</p>
            </a>
        </div>
    </main>
    `;
    main.innerHTML = template;
    console.log(template);
}) 

/*
let container = document.getElementById("container");

const getCharacters = async () => {
  try {
    let response = await fetch("https://rickandmortyapi.com/api/character");
    let data = await response.json();
    let characters = data.results;

    characters.forEach((character) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h1>${character.name}</h1>
        <p>${character.status}</p>
        <p>${character.gender}</p>
        <img src="${character.image}">
        <hr/>
      `;
      container.append(div);
    });
  } catch (error) {
    console.log(error);
  }
};

getCharacters();

<div id="container"></div>

*/