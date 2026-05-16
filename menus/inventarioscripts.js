// =========================
// APIs
// =========================

const API_HW = "https://api-tienda-9zw4.onrender.com/productos_hw";
const API_LICENCIAS = "https://api-tienda-9zw4.onrender.com/productos_licencias";

// =========================
// TABLAS HTML
// =========================

const tablaHardware = document.getElementById("tabla-hardware");
const tablaLicencias = document.getElementById("tabla-licencias");

// =========================
// CARGAR HARDWARE
// =========================

async function cargarHardware(){

    try{

        const response = await fetch(API_HW);
        const data = await response.json();

        data.forEach(producto => {

            tablaHardware.innerHTML += `
                <tr>
                    <td>${producto.id_producto_hw}</td>
                    <td>${producto.nombre_producto}</td>
                    <td>${producto.categoria}</td>
                    <td>${producto.marca}</td>
                    <td>$${producto.precio}</td>
                    <td>${producto.stock}</td>
                    <td>${producto.descripcion}</td>
                </tr>
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

        data.forEach(licencia => {

            tablaLicencias.innerHTML += `
                <tr>
                    <td>${licencia.id_licencia}</td>
                    <td>${licencia.nombre_licencia}</td>
                    <td>${licencia.tipo_licencia}</td>
                    <td>${licencia.empresa}</td>
                    <td>$${licencia.precio}</td>
                    <td>${licencia.duracion}</td>
                    <td>${licencia.descripcion}</td>
                </tr>
            `;
        });

    }catch(error){
        console.log(error);
    }
}

// =========================
// INICIAR
// =========================

cargarHardware();
cargarLicencias();