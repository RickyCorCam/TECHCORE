// =========================
// script.js
// =========================

// URL ORACLE APEX REST API
// AQUI DESPUES PONDRAS TU URL REAL
const API_HW = "http://localhost:3000/productos_hw";
const API_LICENCIAS = "http://localhost:3000/productos_licencias";
const API_ORDENES = "http://localhost:3000/ordenes";

const hardwareContainer = document.getElementById("hardware-container");
const licenciasContainer = document.getElementById("licencias-container");
const listaCarrito = document.getElementById("lista-carrito");
const totalHTML = document.getElementById("total");

let carrito = [];
let total = 0;

// =========================
// CARGAR HARDWARE
// =========================

async function cargarHardware(){

    try{

        const response = await fetch(API_HW);
        const data = await response.json();

        data.items.forEach(producto => {

            hardwareContainer.innerHTML += `
                <div class="card">
                    <h3>${producto.nombre_producto}</h3>

                    <p>
                        Marca: ${producto.marca}
                    </p>

                    <p>
                        Precio: $${producto.precio}
                    </p>

                    <button onclick="agregarCarrito(
                        '${producto.nombre_producto}',
                        ${producto.precio}
                    )">
                        Agregar
                    </button>
                </div>
            `;
        });

    }catch(error){
        console.log(error);
    }
}

// =========================
// CARGAR LICENCIAS
// =========================

async function cargarLicencias(){

    try{

        const response = await fetch(API_LICENCIAS);
        const data = await response.json();

        data.items.forEach(producto => {

            licenciasContainer.innerHTML += `
                <div class="card">
                    <h3>${producto.nombre_licencia}</h3>

                    <p>
                        Empresa: ${producto.empresa}
                    </p>

                    <p>
                        Precio: $${producto.precio}
                    </p>

                    <button onclick="agregarCarrito(
                        '${producto.nombre_licencia}',
                        ${producto.precio}
                    )">
                        Agregar
                    </button>
                </div>
            `;
        });

    }catch(error){
        console.log(error);
    }
}

// =========================
// AGREGAR AL CARRITO
// =========================

function agregarCarrito(nombre, precio){

    carrito.push(nombre);

    total += precio;

    actualizarCarrito();
}

// =========================
// ACTUALIZAR CARRITO
// =========================

function actualizarCarrito(){

    listaCarrito.innerHTML = "";

    carrito.forEach(producto => {

        listaCarrito.innerHTML += `
            <li>${producto}</li>
        `;
    });

    totalHTML.textContent = total.toFixed(2);
}

// =========================
// GUARDAR ORDEN
// =========================

async function guardarOrden(){

    if(carrito.length === 0){
        alert("El carrito esta vacio");
        return;
    }

    const orden = {
        productos_comprados: carrito.join(", "),
        total_compra: total
    };

    try{

        await fetch(API_ORDENES,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(orden)
        });

        alert("Compra realizada");

        carrito = [];
        total = 0;

        actualizarCarrito();

    }catch(error){
        console.log(error);
    }
}

// =========================
// EVENTO BOTON
// =========================

document
    .getElementById("btn-comprar")
    .addEventListener("click", guardarOrden);

// =========================
// INICIAR
// =========================

cargarHardware();
cargarLicencias();