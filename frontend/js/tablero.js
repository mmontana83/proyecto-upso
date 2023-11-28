controlStock();
historialVentas();
movimientoStock();
rankingVentasCliente();
rankingVentasProducto();
rankingVentasServicio();

document.addEventListener("DOMContentLoaded", ventasTotales);
document.addEventListener("DOMContentLoaded", clientesActivos);
document.addEventListener("DOMContentLoaded", controlStock);

function controlStock() {
  
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
    fetch(`http://127.0.0.1:5000/usuario/20302022731/dashboard/controlStock`, requestOptions)
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

function movimientoStock() {
  
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
    fetch(`http://127.0.0.1:5000/usuario/20302022731/dashboard/movimientoStock`, requestOptions)
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

function historialVentas() {
  
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
    
    //fetch(`127.0.0.1:5000/usuario/${id_usuario}/dashboard/controlStock`, requestOptions)
    fetch(`http://127.0.0.1:5000/usuario/20302022731/dashboard/historialVentas`, requestOptions)
        .then(response => handleResponse(response))
        .then(
            (object) => {

              var years = [];
              var labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
              var data = [];

              // for (var i = 0; i < object.length; i++){
              //   years.push(object[i].Año)
              //   labels.push(obtenerNombreDelMes(object[i].Mes));
              //   data.push(object[i].Ventas);
              // }
                
              var ctx2 = document.getElementById('chartjsHistorialVentas').getContext('2d');

              // var datasets = Object.keys(object).map(function(Año) {
              //   return {
              //     label: 'Ventas ' + Año,
              //     data: object[Año],
              //     fill: false
              //   }
              // });

              var chart2 = new Chart(ctx2, {
                type: 'line',
                data: {
                  labels: labels,
                  datasets: [
                    {
                      label: 'Ventas 2021',
                      data: [1239,4233,4235,2332,8778,7866,12933,11002,15443,23221,32443,11232]
                    },
                    {
                      label: 'Ventas 2022',
                      data: [12239,43233,14235,23342,83778,78266,1233,11022,16443,22221,62443,13232]
                    },
                    {
                      label: 'Ventas 2023',
                      data: [12393,42333,42135,12332,84778,74866,42933,13002,45443,33221]
                    }
                  ]
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

function rankingVentasCliente() {
  
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
    fetch(`http://127.0.0.1:5000/usuario/20302022731/dashboard/rankingVentasByCliente`, requestOptions)
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

function rankingVentasProducto() {
  
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
    fetch(`http://127.0.0.1:5000/usuario/20302022731/dashboard/rankingVentasByProducto`, requestOptions)
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

function rankingVentasServicio() {
  
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
    fetch(`http://127.0.0.1:5000/usuario/20302022731/dashboard/rankingVentasByServicio`, requestOptions)
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

function ventasTotales(){
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
    fetch(`http://127.0.0.1:5000/usuario/20302022731/dashboard/ventasTotales`, requestOptions)
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

function clientesActivos(){
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
    
    fetch(`http://127.0.0.1:5000/usuario/20302022731/dashboard/clientesActivos`, requestOptions)
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

//#region Script para iniciliar la tabla de movimiento de stock
$(document).ready(function() {
  $('#tablaStockMovimiento').DataTable({
    paging: true,           // Habilita la paginación
    pageLength: 10,         // Establece la cantidad de registros por página
    language: {
      url: 'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
    },
    columnDefs: [
      { className: "text-center", targets: "_all" }
    ] 
  });
});
//#endregion