// =========================
// API ORDENES
// =========================

const API_ORDENES = "https://api-tienda-9zw4.onrender.com/ordenes";

// =========================
// TABLA HTML
// =========================

const tablaOrdenes = document.getElementById("tabla-ordenes");

// =========================
// CARGAR ORDENES
// =========================

async function cargarOrdenes(){

    try{

        const response = await fetch(API_ORDENES);
        const data = await response.json();

        data.forEach(orden => {

            tablaOrdenes.innerHTML += `
                <tr>
                    <td>${orden.id_orden}</td>
                    <td>${orden.productos_comprados}</td>
                    <td>$${orden.total_compra}</td>
                    <td>${orden.fecha_orden}</td>
                </tr>
            `;
        });

    }catch(error){
        console.log(error);
    }
}

// =========================
// NAVEGACION
// =========================

function abrirTienda(){

    window.location.href = "index.html";
}

function abrirInventarios(){

    window.location.href = "inventarios.html";
}

// =========================
// INICIAR
// =========================

cargarOrdenes();