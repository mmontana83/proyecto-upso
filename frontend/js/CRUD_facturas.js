////////////////////    CRUD        ///////////////////////////////////////////////////
const M_inputNroFactura = document.getElementById("M-inputNroFactura");
const M_inputNombre = document.getElementById("M-inputNombre");
const M_inputDireccion = document.getElementById("M-inputDireccion");
const M_inputCuit = document.getElementById("M-inputCuit");
const M_inputCondicionIVA = document.getElementById("M-inputCondicionIVA");
const M_inputCondicionVenta = document.getElementById("M-inputCondicionVenta");
const M_inputTipoComprobante = document.getElementById("M-inputTipoComprobante");
const M_inputFecha = document.getElementById("M-inputFecha");
const M_inputPTotal = document.getElementById("M-inputPTotal");
 
function getAll_Facturas(){
    function handleResponse(response)  {
        if (!response.ok){
            return Promise.reject(response)
        }
        else{
            return response.json()
        }
    }

    const requestOptions = {
        method : 'GET',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'x-access-token': token,
            'user-id': id_usuario       
        }
    }

    fetch(`http://127.0.0.1:5000/usuario/${id_usuario}/facturas`, requestOptions)
        .then( response => handleResponse(response) )
        .then(
            (data) => {
                let miTablaFacturas = $('#tablaFacturas').DataTable();

                miTablaFacturas.clear();

                data.forEach(factura => {
                    const fila = [factura.nroFactura, factura.id_cliente, factura.razonSocial, factura.fecha, factura.tipoFactura, factura.total];
                    fila.push(`<td>
                    <span onclick="getFactura(${factura.id_cliente},${factura.nroFactura})" class="material-symbols-outlined d-flex justify-content-center table-toggle" data-bs-toggle="modal" data-bs-target="#M-verFactura">
                    visibility
                    </span>
                    </td>`)
                    miTablaFacturas.row.add(fila).draw();
                });
            }
        )
        .catch( (error) => { 
            error.json().then(data => 
                Swal.fire({
                    icon: "error",
                    text: data.message
                  })
            );
        })
        .finally( () => { 
            console.log("Promesa finalizada (resuelta o rechazada)");
        })
}

function getFactura(id_cliente, nroFactura) {
    function handleResponse(response)  {

        if (!response.ok){
            return Promise.reject(response)
        }
        else{
            return response.json()
        }
    }

    const requestOptions = {
        method : 'GET',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'x-access-token': token,
            'user-id': id_usuario
        }
    }

    fetch(`http://127.0.0.1:5000//usuario/${id_usuario}/cliente/${id_cliente}/factura/${nroFactura}`, requestOptions)
        .then( response => handleResponse(response))
        .then(
            (factura) => {
                //Guardo la factura para luego imprimirla.
                sessionStorage.removeItem('factura');
                sessionStorage.setItem('factura', JSON.stringify(factura));
                
                const tableBody = document.getElementById('M-tablaFactura');
                let list = ``;
                factura.detalle.forEach(detalle => {
                    let fila = 
                    `<tr> 
                        <td>${detalle.producto}</td>
                        <td>${detalle.cantidad} </td>
                        <td>${detalle.precio}</td>
                        <td>${detalle.precioTotal}</td>
                    </tr>`;
                    list += fila;
                });
                tableBody.innerHTML = list;

                M_inputNroFactura.value = factura.encabezado.nroFactura
                M_inputNombre.value = factura.encabezado.razonSocial
                M_inputDireccion.value = factura.encabezado.direccion
                M_inputCuit.value = factura.encabezado.id_cliente
                M_inputCondicionIVA.value = factura.encabezado.condicionIVA
                M_inputCondicionVenta.value = factura.encabezado.condicionVenta
                M_inputTipoComprobante.value = factura.encabezado.tipoFactura
                M_inputFecha.value = factura.encabezado.fecha
                M_inputPTotal.value = factura.encabezado.total
            }
        )
        .catch(error => {
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

function insertFactura(id_cliente, factura){
    
    function handleResponse(response)  {
        if (!response.ok){
            return Promise.reject(response);
        }
        else{
            return response.json();
        }
    }
    
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'x-access-token': token,
            'user-id': id_usuario
        },
        body: JSON.stringify(factura) 
    };

    fetch(`http://127.0.0.1:5000/usuario/${id_usuario}/cliente/${id_cliente}/factura`, requestOptions)
        .then(response => handleResponse(response))
        .then(data => {
            Swal.fire({
                title: "Factura Nueva",
                text: `La factura fue generada con éxito.\n¿Desea imprimirla?`,
                icon: "success",
                showCancelButton: false,
                showDenyButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí",
                denyButtonText: "No"
              })
              .then((result) => {
                actualizarDashboardVentas();
                if (result.isConfirmed) {

                    const requestOptions = {
                        method: 'GET',
                        headers: {
                            'Accept': '*/*',
                            'Content-Type': 'application/json',
                            'x-access-token': token,
                            'user-id': id_usuario
                        }
                    };

                    //Obtengo el último nro de la nueva factura
                    fetch(`http://127.0.0.1:5000/usuario/${id_usuario}/ultimoNroFactura`, requestOptions)
                    .then(response => handleResponse(response))
                    .then(data =>{
                        const requestOptions = {
                            method: 'GET',
                            headers: {
                                'Accept': '*/*',
                                'Content-Type': 'application/json',
                                'x-access-token': token,
                                'user-id': id_usuario
                            }
                        };
                        
                        //Obtengo la última factura
                        fetch(`http://127.0.0.1:5000//usuario/${id_usuario}/cliente/${data.id_cliente}/factura/${data.ultimoNroFactura}`, requestOptions)
                        .then(response => handleResponse(response))
                        .then(
                            factura =>{
                                sessionStorage.removeItem('factura');
                                sessionStorage.setItem('factura', JSON.stringify(factura));
                                imprimirFacturaPDF();
                                toggleSection('section5');
                            }
                        )
                        .catch(error => {
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
                    })
                    .catch(error => {
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
                else{
                    getAll_Facturas();
                    toggleSection('section6');
                }
                
            });
            
        })
        .catch(error => {
            error.json().then(data => 
                Swal.fire({
                    icon: "error",
                    text: data.message
                    })
            );

            toggleSection('section6');
        })
        .finally(() => {
            console.log("Promesa finalizada (resuelta o rechazada)");
        });
}

//#region Configuración del DataTable Facturas
$(document).ready(function() {
    // Inicializa la tabla con DataTables
    miTablafacturas = $('#tablaFacturas').DataTable({
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
        { className: "text-center", targets: "_all" },
        
        // Deshabilita ordenamiento para la quinta columna
        { "orderable": false, "targets": [6] }
        ] 
    });
 });
 //#endregion
