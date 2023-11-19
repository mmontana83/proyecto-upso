document.addEventListener('DOMContentLoaded', cargarTipoCondicionIVA());

function handleResponse(response)  {
    if (!response.ok){
        return Promise.reject({message: "HTTP Code: " + response.status + " - Description: " + response.statusText});
    }
    else{
        return response.json();
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

    fetch(`http://127.0.0.1:5000/usuario/${id_usuario}/cliente`, requestOptions)
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
                        <td>${person.email}</td>
                        <td>${person.telefono}</td>
                        <td>${person.direccion}</td>
                        <td>${person.condicionIVA}</td>
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
        "id_tipoCondicionIVA" : document.getElementById('in-condicionIVA').value
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonInsertCliente) 
    };

    fetch(`http://127.0.0.1:5000/usuario/${id_usuario}/cliente`, requestOptions)
        .then(response => handleResponse(response))
        .then( () => {

            alert('Cliente insertado con éxito');
            cerrarModalInsertarCliente("M-Crear");
        })
        .catch((error) => { 
            console.log("Promesa rechazada por", error);
            alert(error.message);
        })
        .finally(() => {
            console.log("Promesa finalizada (resuelta o rechazada)");
        });
}

function update_Client(){

    var id_cliente = document.getElementById('ed-cuit').value;

    var jsonUpdateCliente = {
        "nombre" : document.getElementById('ed-nombre').value, 
        "apellido" : document.getElementById('ed-apellido').value,
        "empresa" : document.getElementById('ed-empresa').value, 
        "email" : document.getElementById('ed-email').value,  
        "telefono" : document.getElementById('ed-telefono').value, 
        "direccion" : document.getElementById('ed-direccion').value, 
        "id_tipoCondicionIVA" : document.getElementById('ed-condicionIVA').value
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonUpdateCliente) 
    };

    fetch(`http://127.0.0.1:5000/usuario/${id_usuario}/cliente/${id_cliente}`, requestOptions)
        .then(response => handleResponse(response))
        .then(
            data => {
                
                console.log(data);
                alert(data.text);
                cerrarModalCliente("M-Editar");
                getAll_Clients();
            }
        )
        .catch((error) => { console.log("Promesa rechazada por", error); })
        .finally(() => {
            console.log("Promesa finalizada (resuelta o rechazada)");
        });
}

function cargarTipoCondicionIVA(){
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
            'user-id': id_usuario
        }
    };
    
    fetch(`http://127.0.0.1:5000/dashboard/listarTipoCondicionIVA`, requestOptions)
        .then(response => handleResponse(response))
        .then(
            (categorias) => {
                const selectCategoriasIN = document.getElementById('in-condicionIVA');
                const selectCategoriasED = document.getElementById('ed-condicionIVA');
                
                selectCategoriasIN.innerHTML = '';
                selectCategoriasED.innerHTML = '';

                //Creo una opción vacía que se muestra por defecto.
                const option = document.createElement('option');
                option.value = "";
                option.text = "";
                selectCategoriasIN.appendChild(option);

                categorias.forEach(categoria => {
                    const option = document.createElement('option');
                    option.value = categoria.id_tipoCondicionIVA;
                    option.text = categoria.descripcion;
                    selectCategoriasIN.appendChild(option);
                });

                categorias.forEach(categoria => {
                    const option = document.createElement('option');
                    option.value = categoria.id_tipoCondicionIVA;
                    option.text = categoria.descripcion;
                    selectCategoriasED.appendChild(option);
                });
            }
        )
        .catch((error) => { console.log("Promesa rechazada por", error); })
        .finally(() => {
            console.log("Promesa finalizada (resuelta o rechazada)");
        });
    
}

function cerrarModalCliente(modal){
    var modal = document.getElementById(modal);
    modal.style.display = 'none';
}

