////////////////////    CRUD        ///////////////////////////////////////////////////
const M_inputNombre = document.getElementById("M-inputNombre");
const M_inputCuit = document.getElementById("M-inputCuit");
const M_inputNroFactura = document.getElementById("M-inputNroFactura");
const M_inputFecha = document.getElementById("M-inputFecha");
const M_inputDireccion = document.getElementById("M-inputDireccion");
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
            'Content-Type': 'application/json',
            'user-id':id_usuario
        }
    }

    fetch(`http://127.0.0.1:5000/usuario/${id_usuario}/facturas`, requestOptions)
        .then( response => handleResponse(response) )
        .then(
            (data) => {
                console.log(data)
                const tableBody = document.getElementById('all-facturas');
                let list = ``;
                data.forEach(factura => {
                    let fila = 
                    `<tr id="${factura.id}"> 
                        <td>${factura.nroFactura} </td>
                        <td>${factura.id_cliente}</td>
                        <td>${factura.razonSocial}</td>
                        <td>${factura.fecha}</td>
                        <td>${factura.tipoFactura}</td>
                        <td>${factura.condicionIVA}</td>
                        <td>${factura.direccion}</td>
                        <td>${factura.total}</td>
                        <td>
                        <span onclick="getFactura(${factura.id_cliente},${factura.nroFactura})" class="material-symbols-outlined d-flex justify-content-center table-toggle" data-bs-toggle="modal" data-bs-target="#M-verFactura">
                        visibility
                        </span>
                        </td>
                    </tr>`;
                    list += fila;
                });
                tableBody.innerHTML = list;
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

function getFactura(id_cliente,nroFactura ) {
    function handleResponse(response)  {
        console.log(response)
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
            'Content-Type': 'application/json',
            'user-id':id_usuario
        }
    }

    fetch(`http://127.0.0.1:5000//usuario/${id_usuario}/cliente/${id_cliente}/factura/${nroFactura}`, requestOptions)
        .then( response => handleResponse(response))
        .then(
            (factura) => {
                console.log(factura); 
                const tableBody = document.getElementById('M-tablaFactura');
                let list = ``;
                factura.detalle.forEach(detalle => {
                    let fila = 
                    `<tr> 
                        <td>${detalle.cantidad} </td>
                        <td>${detalle.producto}</td>
                        <td>${detalle.precio}</td>
                        <td>${detalle.precioTotal}</td>
                    </tr>`;
                    list += fila;
                });
                tableBody.innerHTML = list;

                M_inputNombre.value = factura.encabezado.razonSocial
                M_inputCuit.value = factura.encabezado.id_cliente
                M_inputNroFactura.value = factura.encabezado.nroFactura
                M_inputFecha.value = factura.encabezado.fecha
                M_inputDireccion.value = factura.encabezado.direccion
                M_inputPTotal.value = factura.encabezado.total
            }
        )
        .catch( (error) => { console.log("Promesa rechazada por" , error)})
        .finally( () => { 
            console.log("Promesa finalizada (resuelta o rechazada)");
        })
}