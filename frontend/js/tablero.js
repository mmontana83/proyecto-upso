document.addEventListener("DOMContentLoaded", controlStock);
document.addEventListener("DOMContentLoaded", movimientoStock);
document.addEventListener("DOMContentLoaded", historialVentas);
document.addEventListener("DOMContentLoaded", rankingVentasCliente);
document.addEventListener("DOMContentLoaded", rankingVentasProducto);
document.addEventListener("DOMContentLoaded", rankingVentasServicio);
document.addEventListener("DOMContentLoaded", ventasTotales);
document.addEventListener("DOMContentLoaded", ventasTotalesMesActual);
document.addEventListener("DOMContentLoaded", clientesActivos);

async function controlStock() {
  
  function handleResponse(response)  {
    if (!response.ok){
        return Promise.reject(response);
    }
    else{
        return response.json();
    }
  };

  const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            // 'x-access-token': token,
            // 'user-id': id_usuario
        }
    };
    
    //fetch(`127.0.0.1:5000/usuario/${id_usuario}/dashboard/controlStock`, requestOptions)
    await fetch(`http://127.0.0.1:5000/usuario/20302022731/dashboard/controlStock`, requestOptions)
        .then(response => handleResponse(response))
        .then(
            (object) => {

              var labels = [];
              var data = [];

              for (var i = 0; i < object.length; i++){
                labels.push(object[i].Producto);
                data.push(object[i].Stock);
              }
              
              var existingChart = Chart.getChart("chartjsControlStock");

              if (existingChart) {
                existingChart.destroy();
              }

              var ctx1 = document.getElementById('chartjsControlStock').getContext('2d');
              var chart1 = new Chart(ctx1, {
                type: 'bar',
                data: {
                  labels: labels,
                  datasets: [{
                    label: 'Stock',
                    data: data
                  }]
                },
                options: {
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  },
                  responsive: true,
                  plugins: {
                    title: {
                      display: false                      
                    },
                    legend:{
                      display: false
                    }
                  }
                }
              });
            }
        )
        .catch((error) => { 
          // error.json().then(data => 
          //   Swal.fire({
          //       icon: "error",
          //       text: data.message
          //     })
          // );
          console.log(error);
        })
        .finally(() => {
            console.log("Promesa finalizada (resuelta o rechazada)");
        });
}

async function movimientoStock() {
  
  function handleResponse(response)  {
    if (!response.ok){
        return Promise.reject(response);
    }
    else{
        return response.json();
    }
  };

  const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            // 'x-access-token': token,
            // 'user-id': id_usuario
        }
    };
    
    //fetch(`127.0.0.1:5000/usuario/${id_usuario}/dashboard/controlStock`, requestOptions)
    await fetch(`http://127.0.0.1:5000/usuario/20302022731/dashboard/movimientoStock`, requestOptions)
        .then(response => handleResponse(response))
        .then(
          (dataMovimientoStock) => {

              var miTablaMovimientoStock = $('#tablaStockMovimiento').DataTable();

              //Agrego las filas a la tabla
              dataMovimientoStock.forEach(producto => {
                const fila = [producto.Producto,producto.Movimiento, producto.Fecha, producto.Precio, producto.Cliente, producto.Factura]
                miTablaMovimientoStock.row.add(fila).draw();
              });
            }
        )
        .catch((error) => { 
          error.json().then(data => 
            Swal.fire({
                icon: "error",
                text: data.message
              })
          );
        })
        .finally(() => {
            console.log("Promesa finalizada (resuelta o rechazada)");
        });
}

async function historialVentas() {
  
  function obtenerNombreDelMes(numeroMes) {
    var meses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
      // Verifica que el número de mes esté en el rango válido
    if (numeroMes >= 1 && numeroMes <= 12) {
      return meses[numeroMes - 1]; // Resta 1 ya que los arrays en JavaScript comienzan en índice 0
    } else {
      return "Mes no válido";
    }
  }

  function handleResponse(response)  {
    if (!response.ok){
        return Promise.reject(response);
    }
    else{
        return response.json();
    }
  };

  const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            // 'x-access-token': token,
            // 'user-id': id_usuario
        }
    };
    
    await fetch(`http://127.0.0.1:5000/usuario/20302022731/dashboard/historialVentas`, requestOptions)
        .then(response => handleResponse(response))
        .then(
            (object) => {
              //Preparo el dataset para crear el chart.
              // años representa cada línea
              // datasets va a contener las ventas por año
              años = Object.keys(object)

              var datasets = [];

              for (var i=0; i<años.length; i++){
                var año = años[i];
                var data = Object.values(object)[i];

                var ventas = [0,0,0,0,0,0,0,0,0,0,0,0];

                for (var j=0; j<data.length; j++){
                  if (data[j].Mes === null){
                    ventas[data[j].Mes - 1] = 0;
                  }else{
                    ventas[data[j].Mes - 1] = data[j].Venta
                  }
                }
                
                datasets.push({
                  label: año.toString(),
                  data: ventas
                });
              }
             
              var labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];


              var ctx2 = document.getElementById('chartjsHistorialVentas').getContext('2d');
              var chart2 = new Chart(ctx2, {
                type: 'line',
                data: {
                  labels: labels,
                  datasets: datasets
                },
                options: {
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  },
                  plugins: {
                    title: {
                      display: false
                    }
                  }
                }
              });
             }
        )
        .catch((error) => { 
          // error.json().then(data => 
          //   Swal.fire({
          //       icon: "error",
          //       text: data.message
          //     })
          // );
          console.error(error)
        })
        .finally(() => {
            console.log("Promesa finalizada (resuelta o rechazada)");
        });
}

async function rankingVentasCliente() {
  
  function handleResponse(response)  {
    if (!response.ok){
        return Promise.reject(response);
    }
    else{
        return response.json();
    }
  };

  const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            // 'x-access-token': token,
            // 'user-id': id_usuario
        }
    };
    
    //fetch(`127.0.0.1:5000/usuario/${id_usuario}/dashboard/rankingVentasByCliente`, requestOptions)
    await fetch(`http://127.0.0.1:5000/usuario/20302022731/dashboard/rankingVentasByCliente`, requestOptions)
        .then(response => handleResponse(response))
        .then(
            (object) => {

              var labels = [];
              var data = [];

              for (var i = 0; i < object.length; i++){
                labels.push(object[i].Cliente);
                data.push(object[i].Venta);
              }
                
              var ctx4 = document.getElementById('chartjsRankingVentasPorCliente').getContext('2d');
              var chart4 = new Chart(ctx4, {
                type: "bar",
                data: {
                  labels: labels,
                  datasets: [{
                    data: data                    
                  }]
                },
                options: {
                  indexAxis: 'y',
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  },
                  responsive: true,
                  plugins: {
                    title: {
                      display: false                      
                    },
                    legend:{
                      display: false
                    }
                  }
                }
              });
            }
        )
        .catch((error) => { 
          error.json().then(data => 
            Swal.fire({
                icon: "error",
                text: data.message
              })
          );
        })
        .finally(() => {
            console.log("Promesa finalizada (resuelta o rechazada)");
        });
}

async function rankingVentasProducto() {
  
  function handleResponse(response)  {
    if (!response.ok){
        return Promise.reject(response);
    }
    else{
        return response.json();
    }
  };

  const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            // 'x-access-token': token,
            // 'user-id': id_usuario
        }
    };
    
    await fetch(`http://127.0.0.1:5000/usuario/20302022731/dashboard/rankingVentasByProducto`, requestOptions)
        .then(response => handleResponse(response))
        .then(
            (object) => {

              var labels = [];
              var data = [];

              for (var i = 0; i < object.length; i++){
                labels.push(object[i].Producto);
                data.push(object[i].Venta);
              }
                
              var ctx5 = document.getElementById('chartjsRankingVentasPorProducto').getContext('2d');
              var chart5 = new Chart(ctx5, {
                type: 'bar',
                data: {
                  labels: labels,
                  datasets: [{
                    label: labels,
                    data: data
                  }]
                },
                options: {
                  indexAxis: 'y',
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  },
                  responsive: true,
                  plugins: {
                    title: {
                      display: false                      
                    },
                    legend:{
                      display: false
                    }
                  }
                }
              });
            }
        )
        .catch((error) => { 
          error.json().then(data => 
            Swal.fire({
                icon: "error",
                text: data.message
              })
          );
        })
        .finally(() => {
            console.log("Promesa finalizada (resuelta o rechazada)");
        });
}

async function rankingVentasServicio() {
  
  function handleResponse(response)  {
    if (!response.ok){
        return Promise.reject(response);
    }
    else{
        return response.json();
    }
  };

  const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            // 'x-access-token': token,
            // 'user-id': id_usuario
        }
    };
    
    await fetch(`http://127.0.0.1:5000/usuario/20302022731/dashboard/rankingVentasByServicio`, requestOptions)
        .then(response => handleResponse(response))
        .then(
            (object) => {

              var labels = [];
              var data = [];

              for (var i = 0; i < object.length; i++){
                labels.push(object[i].Servicio);
                data.push(object[i].Venta);
              }
                
              var ctx6 = document.getElementById('chartjsRankingVentasPorServicio').getContext('2d');
              var chart6 = new Chart(ctx6, {
                type: 'bar',
                data: {
                  labels: labels,
                  datasets: [{
                    label: 'Venta',
                    data: data
                  }]
                },
                options: {
                  indexAxis: 'y',
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  },
                  responsive: true,
                  plugins: {
                    title: {
                      display: false                      
                    },
                    legend:{
                      display: false
                    }
                  }
                }
              });
            }
        )
        .catch((error) => { 
          error.json().then(data => 
            Swal.fire({
                icon: "error",
                text: data.message
              })
          );
        })
        .finally(() => {
            console.log("Promesa finalizada (resuelta o rechazada)");
        });
}

async function ventasTotales(){
  function handleResponse(response)  {
    if (!response.ok){
        return Promise.reject(response);
    }
    else{
        return response.json();
    }
  };

  const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            // 'x-access-token': token,
            // 'user-id': id_usuario
        }
    };
    
    await fetch(`http://127.0.0.1:5000/usuario/20302022731/dashboard/ventasTotales`, requestOptions)
        .then(response => handleResponse(response))
        .then(data => {
          const ventasTotales = document.getElementById("dashboard-ventasTotales");
          ventasTotales.textContent = `$ ${data.VentasTotales}`;
        })
        .catch((error) => { 
          error.json().then(data => 
            Swal.fire({
                icon: "error",
                text: data.message
              })
          );
        })
        .finally(() => {
            console.log("Promesa finalizada (resuelta o rechazada)");
        });
}

async function ventasTotalesMesActual(){
  function handleResponse(response)  {
    if (!response.ok){
        return Promise.reject(response);
    }
    else{
        return response.json();
    }
  };

  const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            // 'x-access-token': token,
            // 'user-id': id_usuario
        }
    };
    
    await fetch(`http://127.0.0.1:5000/usuario/20302022731/dashboard/ventasTotalesMesActual`, requestOptions)
        .then(response => handleResponse(response))
        .then(data => {
          const ventasTotalesMesActual = document.getElementById("dashboard-ventasTotalesMesActual");
          ventasTotalesMesActual.textContent = `$ ${data.VentasTotalesMesActual}`;
        })
        .catch((error) => { 
          error.json().then(data => 
            Swal.fire({
                icon: "error",
                text: data.message
              })
          );
        })
        .finally(() => {
            console.log("Promesa finalizada (resuelta o rechazada)");
        });
}

async function clientesActivos(){
  function handleResponse(response)  {
    if (!response.ok){
        return Promise.reject(response);
    }
    else{
        return response.json();
    }
  };

  const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            // 'x-access-token': token,
            // 'user-id': id_usuario
        }
    };
    
    await fetch(`http://127.0.0.1:5000/usuario/20302022731/dashboard/clientesActivos`, requestOptions)
        .then(response => handleResponse(response))
        .then(data => {
          const clientesTotales = document.getElementById("dashboard-clientesActivos");
          clientesTotales.textContent = `${data.ClientesActivos}`;
        })
        .catch((error) => { 
          error.json().then(data => 
            Swal.fire({
                icon: "error",
                text: data.message
              })
          );
        })
        .finally(() => {
            console.log("Promesa finalizada (resuelta o rechazada)");
        });
}

function actualizarDashboardVentas(){
  controlStock();
  movimientoStock();
  historialVentas();
  rankingVentasCliente();
  rankingVentasProducto();
  rankingVentasServicio();
  ventasTotales();
  ventasTotalesMesActual();
}

function actualizarDashboardProductos(){
  controlStock();
  movimientoStock();
}

function actualizarDashboardClientes(){
  clientesActivos();
}

// Esta función se utilizará para que el usuario pueda solicitar asistencia técnica
// function solicitarAsistencia(){
//   // Obtener el valor del campo de texto
//   var mensaje = document.getElementById('incidente').value;

//   // Verificar que el mensaje no esté vacío
//   if (mensaje.trim() !== '') {

//     encabezadoMensaje = `El usuario ID: ${sessionStorage.getItem("id_usuario")} - ${sessionStorage.getItem("nombre")} ${sessionStorage.getItem("apellido")}
//     solicita asistencia.\nMensaje: `;

//     // Crear el enlace para enviar por WhatsApp
//     var link = 'https://api.whatsapp.com/send?phone=+5492932614608&text=' + encodeURIComponent(encabezadoMensaje + mensaje);

//     // Abrir la ventana de WhatsApp en una nueva pestaña
//     window.open(link, '_blank');
//   } else {
//     Swal.fire({
//       icon: "error",
//       text: 'Por favor, ingresa un mensaje antes de enviarlo.'
//     })
//   }
// }

//#region Script para iniciliar la tabla de movimiento de stock
// Espera a que el documento HTML esté completamente cargado antes de ejecutar el código
$(document).ready(function() {
  // Inicializa la tabla con DataTables
  $('#tablaStockMovimiento').DataTable({
    // Configuración de paginación
    paging: true,           // Habilita la paginación
    pageLength: 10,         // Establece la cantidad de registros por página

    // Configuración del idioma para DataTables (en este caso, español)
    language: {
      url: 'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
    },

    // Configuración de las columnas
    columnDefs: [
      // Aplica la clase "text-center" a todas las columnas
      { className: "text-center", targets: "_all" }
    ] 
  });
});
//#endregion