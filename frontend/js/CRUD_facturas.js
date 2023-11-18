////////////////////    CRUD        ///////////////////////////////////////////////////







function handleResponse(response)  {
    if (!response.ok){
        return Promise.reject({message: "HTTP Code:" + response.status + " - Description:" + response.statusText})
    }
    else{
        return response.json()
    }
}


function getAll_Facturas(){
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
                // console.log(data); 
                const tableBody = document.getElementById('all-facturas');
                let list = ``;
                data.forEach(factura => {
                    let fila = 
                    `<tr id="${factura.id}"> 
                        <td>${factura.nroFactura} </td>
                        <td>${factura.id_cliente}</td>
                        <td>${factura.apellido}</td>
                        <td>${factura.fecha}</td>
                        <td>${factura.empresa}</td>
                        <td>${factura.tipoFactura}</td>
                        <td>${factura.condicionIVA}</td>
                        <td>${factura.direccion}</td>
                        <td>${factura.total}</td>
                        <td>
                        <span class="material-symbols-outlined table-togle">delete</span>
                        </td>
                    </tr>`;
                    list += fila;
                });
                tableBody.innerHTML = list;
            }
        )
        .catch( (error) => { console.log("Promesa rechazada por" , error)})
        .finally( () => { 
            console.log("Promesa finalizada (resuelta o rechazada)");
        })
}
