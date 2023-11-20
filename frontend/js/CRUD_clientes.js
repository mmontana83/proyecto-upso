//Cargo el listado Condicion IVA cuando se carga la pagina.
document.addEventListener('DOMContentLoaded', cargarTipoCondicionIVA());


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
                const tableBody = document.getElementById('all-persons');
                let list = ``;
                data.forEach(person => {
                    let fila = `<tr id="${person.id}"> 
                        <td>${person.id_cliente} </td>
                        <td>${person.nombre}</td>
                        <td>${person.apellido}</td>
                        <td>${person.telefono}</td>
                        <td>${person.email}</td>
                        <td>${person.empresa}</td>
                        <td>${person.direccion}</td>
                        <td>${person.condicionIVA}</td>
                        <td class= "">
                        <span class="material-symbols-outlined table-toggle" data-bs-target="#Factura" onclick="toggleSection('section4')" >receipt_long</span>
                        </td>
                        <td class= "" >
                        <span data-bs-toggle="modal" data-bs-target="#M-Editar" class="material-symbols-outlined table-toggle">
                        manage_accounts</span>
                        </td>
                        <td>
                        <span class="material-symbols-outlined table-toggle">delete</span>
                        </td>
                    </tr>`;
                    list += fila;
                });
                tableBody.innerHTML = list;
            }
        )
        .catch(error => {
            console.log(error.message)
            // Swal.fire({
            //     icon: "error",
            //     text: error.message
            //   })
        })
        .finally(() => {
            console.log("Promesa finalizada (resuelta o rechazada)");
        });
}

function insert_Client(){
    
    function handleResponse(response)  {
        if (!response.ok){
            return Promise.reject(response);
        }
        else{
            return response.json();
        }
    }
    
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
        .then(data => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: data.message
              });

            var modal = document.getElementById('M-crear');
            modal.style.display = 'none';
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
                alert(JSON.stringify(data.mensaje));
                // cerrarModalCliente("M-Editar");
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

//Validaciones para la Carga de un Cliente

var cuitInput = document.getElementById('in-cuit');
var nombreInput = document.getElementById('in-nombre');
var apellidoInput = document.getElementById('in-apellido');
var empresaInput = document.getElementById('in-empresa');
var emailInput = document.getElementById('in-email');
var direccionInput = document.getElementById('in-direccion');
var condicionIVAInput = document.getElementById('in-condicionIVA');

var mensajeValidacionCUIT = document.getElementById('mensajeValidacionCUIT');
var mensajeValidacionNombreApellidoEmpresa = document.getElementById('mensajeValidacionNombreApellidoEmpresa');
var mensajeValidacionEmail = document.getElementById('mensajeValidacionEmail');
var mensajeValidacionDireccion = document.getElementById('mensajeValidacionDireccion');
var mensajeValidacionCondicionIVA = document.getElementById('mensajeValidacionCondicionIVA');

var botonConfirmar = document.getElementById('botonConfirmar');

function validarFormulario() {
    botonConfirmar.disabled = !(validarCUIL() && validarNombreApellidoEmpresa() && validarEmail() && validarDireccion() && validadCondicionIVA());

    if (botonConfirmar.disabled){
        document.getElementById('M-crear').focus();
    }
}

function validarCUIL() {
    // Verificar si el CUIT tiene 11 dígitos y al menos uno de los campos está completado
    var cuitValido = cuitInput.value.length === 11 && /^\d+$/.test(cuitInput.value);

    // Verificar si el CUIT tiene 11 dígitos y al menos uno de los campos está completado
    if (!cuitValido) {
        // Mostrar mensaje de validación
        mensajeValidacionCUIT.style.display = 'block';
        cuitInput.classList.add('is-invalid');
        return false;
    } else {
        mensajeValidacionCUIT.style.display = 'none';
        cuitInput.classList.remove('is-invalid');
        return true;
    }
}

function validarNombreApellidoEmpresa() {
    // Verificar si al menos uno de los campos (nombre, apellido, empresa) está completado
    var identificacionCompletado = (nombreInput.value.trim() !== '' && apellidoInput.value.trim() !== '') || empresaInput.value.trim() !== '';

    if (!identificacionCompletado) {
        mensajeValidacionNombreApellidoEmpresa.style.display = 'block';
        nombreInput.classList.add('is-invalid');
        apellidoInput.classList.add('is-invalid');
        empresaInput.classList.add('is-invalid');
        return false;  // Deshabilitar el botón
    } else {
        mensajeValidacionNombreApellidoEmpresa.style.display = 'none';
        nombreInput.classList.remove('is-invalid');
        apellidoInput.classList.remove('is-invalid');
        empresaInput.classList.remove('is-invalid');
        return true;  // Habilitar el botón
    }
}

function validarEmail() {
    // Verificar si el correo electrónico tiene un formato válido
    var emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);

    // Verificar si el CUIT tiene 11 dígitos y al menos uno de los campos está completado
    if (!emailValido) {
        // Mostrar mensaje de validación
        mensajeValidacionEmail.style.display = 'block';
        emailInput.classList.add('is-invalid');
        return false;  // Deshabilitar el botón
    } else {
        mensajeValidacionEmail.style.display = 'none';
        emailInput.classList.remove('is-invalid');
        return true;  // Habilitar el botón
    }
}

function validarDireccion() {
    var direccionValida = direccionInput.value.trim() !== ''

    if (!direccionValida) {
        // Mostrar mensaje de validación
        mensajeValidacionDireccion.style.display = 'block';
        direccionInput.classList.add('is-invalid');
        return false;  // Deshabilitar el botón
    } else {
        mensajeValidacionDireccion.style.display = 'none';
        direccionInput.classList.remove('is-invalid');
        return true;  // Habilitar el botón
    }
}

function validadCondicionIVA(){
    // Verificar si el Domicilio no es vacío
    var condicionIVAValida = condicionIVAInput.value !== ''

    if (!condicionIVAValida) {
        // Mostrar mensaje de validación
        mensajeValidacionCondicionIVA.style.display = 'block';
        condicionIVAInput.classList.add('is-invalid');
        return false;  // Deshabilitar el botón
    } else {
        mensajeValidacionCondicionIVA.style.display = 'none';
        condicionIVAInput.classList.remove('is-invalid');
        return true;  // Habilitar el botón
    }// Verificar si el Domicilio no es vacío
}

// Agregar eventos de blur para los campos de entrada
cuitInput.addEventListener('blur', validarFormulario);
nombreInput.addEventListener('blur', validarFormulario);
apellidoInput.addEventListener('blur', validarFormulario);
empresaInput.addEventListener('blur', validarFormulario);
emailInput.addEventListener('blur', validarFormulario);
direccionInput.addEventListener('blur', validarFormulario);
condicionIVAInput.addEventListener('blur', validarFormulario);
