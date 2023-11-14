function handleResponse(response)  {
    if (!response.ok){
        return Promise.reject({message: "HTTP Code:" + response.status + " - Description:" + response.statusText})
    }
    else{
        return response.json()
    }
}

function getAll_Clients() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
            'user-id': id_usuario
        }
    };

    fetch(`http://127.0.0.1:5000/usuario/${id_usuario}/clientes`, requestOptions)
        .then(response => handleResponse(response))
        .then(
            (data) => {
                // console.log(data); 
                const tableBody = document.getElementById('all-persons');
                let list = ``;
                data.forEach(person => {
                    let fila = `<tr id="${person.id}"> 
                        <td>${person.id_cliente} </td>
                        <td>${person.nombre}</td>
                        <td>${person.apellido}</td>
                        <td>${person.empresa}</td>
                        <td>${person.telefono}</td>
                        <td>${person.condicionIVA}</td>
                        <td>${person.email}</td>
                        <td>${person.direccion}</td>
                        <td class= "table-toggle">
                        <span class="material-symbols-outlined" onclick="toggleSection('section4')" >receipt_long</span>
                        </td>
                        <td class= "table-toggle" >
                        <span data-bs-toggle="modal" data-bs-target="#M-Editar" class="material-symbols-outlined">
                        manage_accounts</span>
                        </td>
                        <td>
                        <span class="material-symbols-outlined table-togle">delete</span>
                        </td>
                    </tr>`;
                    list += fila;
                });
                tableBody.innerHTML = list;
            }
        )
        .catch((error) => { console.log("Promesa rechazada por", error); })
        .finally(() => {
            console.log("Promesa finalizada (resuelta o rechazada)");
        });
}

function insert_Client(){
    var jsonInsertCliente = {
        "id_cliente": document.getElementById('in-cuit').value,
        "nombre" : document.getElementById('in-nombre').value, 
        "apellido" : document.getElementById('in-apellido').value,
        "empresa" : document.getElementById('in-empresa').value, 
        "email" : document.getElementById('in-email').value,  
        "telefono" : document.getElementById('in-telefono').value, 
        "direccion" : document.getElementById('in-direccion').value, 
        "id_tipoCondicionIVA" : document.getElementById('floatingSelect').value
    };

    console.log(jsonInsertCliente);

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonInsertCliente) 
    };

    fetch(`http://127.0.0.1:5000/usuario/${id_usuario}/nuevocliente`, requestOptions)
        .then(response => handleResponse(response))
        .then(
            console.log('Insertar')
        )
        .catch((error) => { console.log("Promesa rechazada por", error); })
        .finally(() => {
            console.log("Promesa finalizada (resuelta o rechazada)");
        });
}