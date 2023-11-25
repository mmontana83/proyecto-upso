let listaClientes;

//#region CRUD CLIENTES
function getAll_Clients() {
    function handleResponse(response)  {
        if (!response.ok){
            return Promise.reject(response);
        }
        else{
            return response.json();
        }
    }
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'x-access-token': token,
            'user-id': id_usuario
        }
    };

    fetch(`http://127.0.0.1:5000/usuario/${id_usuario}/cliente`, requestOptions)
        .then(response => handleResponse(response))
        .then(
            (dataClientes) => {
                listaClientes = dataClientes;
                const tableBody = document.getElementById('all-persons');
                let list = ``;
                dataClientes.forEach(person => {
                    const nombre = (person) => {
                        if (person.nombre === null || person.nombre === "null")
                        {
                            return ""
                        }
                        else{
                            return person.nombre
                        }
                    };

                    const apellido = (person) => {
                        if (person.apellido === null || person.apellido === "null")
                        {
                            return ""
                        }
                        else{
                            return person.apellido
                        }
                    };

                    const empresa = (person) => {
                        if (person.empresa === null || person.empresa === "null")
                        {
                            return ""
                        }
                        else{
                            return person.empresa
                        }
                    };
                    let fila = `<tr id="${person.id}"> 
                        <td>${person.id_cliente} </td>
                        <td>${nombre(person)}</td>
                        <td>${apellido(person)}</td>
                        <td>${empresa(person)}</td>
                        <td>${person.email}</td>
                        <td>${person.telefono}</td>
                        <td>${person.direccion}</td>
                        <td>${person.condicionIVA}</td>
                        <td class= "">
                        <span class="material-symbols-outlined table-toggle" data-bs-target="#CrearFacturaDesdeCliente" onclick="toggleSection('section4')">receipt_long</span>
                        </td>
                        <td class= "" >
                        <span data-bs-toggle="modal" data-bs-target="#M-Editar" class="material-symbols-outlined table-toggle">
                        manage_accounts</span>
                        </td>
                        <td>
                        <span class="material-symbols-outlined table-toggle" data-bs-target="#EliminarCliente">delete</span>
                        </td>
                    </tr>`;
                    list += fila;
                });
                tableBody.innerHTML = list;
            }
        )
        .catch(error => {
            // error.json().then(data => 
            //     Swal.fire({
            //         icon: "error",
            //         text: data.message
            //       })
            //);
            console.error(error);
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
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'x-access-token': token,
            'user-id': id_usuario
        }
    };

    id_cliente = document.getElementById('in-cuit').value;
    
    //Primer consulto si existe el cliente
    fetch(`http://127.0.0.1:5000/usuario/${id_usuario}/cliente/${id_cliente}`, requestOptions)
        .then(response => handleResponse(response))
        .then(data => {
            
            //El cliente existe y esta dado de alta. Por lo tanto no se puede agregar
            if (data.id_tipoEstado == 1){
                Swal.fire({
                    title: "Cliente Existente",
                    text: `El cliente ${data.cliente} ya existe se encuentra registrado en el sistema`,
                    icon: "warning",
                  })
            }
            //El cliente existe en la base de datos pero fue borrado "logicamente"
            else{
                if (data.id_tipoEstado == 2){
                    Swal.fire({
                        title: "Cliente dado de Baja",
                        text: `El cliente ${data.cliente} ha sido dado de baja.\n¿Quiere darlo de alta nuevamente?`,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Sí, darlo de alta nuevamente!",
                        cancelButtonText: "No"
                      })
                      .then((result) => {
                        if (result.isConfirmed) {
                            const requestOptions = {
                                method: 'PUT',
                                headers: {
                                    'Accept': '*/*',
                                    'Content-Type': 'application/json',
                                    'x-access-token': token,
                                    'user-id': id_usuario
                                }
                            };
    
                            fetch(`http://127.0.0.1:5000/usuario/${id_usuario}/cliente/${id_cliente}`, requestOptions)
                                .then(response => handleResponse(response))
                                .then( () => {
                                    Swal.fire({
                                        title: "Alta!",
                                        text: `El cliente ${data.cliente} fue dado de alta nuevamente`,
                                        icon: "success"});
                                    getAll_Clients();
                                })
                                .catch(error => {
                                    error.json().then(data => 
                                        Swal.fire({
                                            icon: "error",
                                            text: data.message
                                          })
                                    );
                                })
                                .finally(() => {});
                        }
                    })
                }
                //El cliente no existe y se agregará a la base de datos.
                else{
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
                            'Content-Type': 'application/json',
                            'x-access-token': token,
                            'user-id': id_usuario
                        },
                        body: JSON.stringify(jsonInsertCliente) 
                    };
        
                    fetch(`http://127.0.0.1:5000/usuario/${id_usuario}/cliente`, requestOptions)
                        .then(response => handleResponse(response))
                        .then(data => {
                            Swal.fire({
                                icon: "success",
                                title: data.message
                                });
        
                            var modal = document.getElementById('M-crear');
                            modal.style.display = 'none';
                            getAll_Clients();
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
            
            }
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
    
    function handleResponse(response)  {
        if (!response.ok){
            return Promise.reject(response);
        }
        else{
            return response.json();
        }
    }
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
            'Content-Type': 'application/json',
            'x-access-token': token,
            'user-id': id_usuario
        },
        body: JSON.stringify(jsonUpdateCliente) 
    };

    fetch(`http://127.0.0.1:5000/usuario/${id_usuario}/cliente/${id_cliente}`, requestOptions)
        .then(response => handleResponse(response))
        .then(
            data => {
                
                Swal.fire({
                    icon: "success",
                    title: data.message
                  });
    
                var modal = document.getElementById('M-Editar');
                modal.style.display = 'none';
                getAll_Clients();
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

function delete_Client(data){
    
    function handleResponse(response)  {
        if (!response.ok){
            return Promise.reject(response);
        }
        else{
            return response.json();
        }
    }
    
    //Recupero el Id_Cliente
    id_cliente = data[0].textContent;
    id_cliente_identificación = `${data[1].textContent} ${data[2].textContent} (${data[3].textContent})`;

    Swal.fire({
        title: "¡Advertencia - Eliminar Cliente!",
        text: `¿Está seguro que quieres borrar al cliente ${id_cliente_identificación}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, borrarlo!",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          
            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'x-access-token': token,
                    'user-id': id_usuario
                }
            };

            fetch(`http://127.0.0.1:5000/usuario/${id_usuario}/cliente/${id_cliente}`, requestOptions)
            .then(response => handleResponse(response))
            .then(
                () => {
                    Swal.fire({
                        title: "Borrado con Éxito!",
                        text: `El cliente ${id_cliente_identificación} ha sido borrado`,
                        icon: "success"
                    });        
                    getAll_Clients();
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
    });
}
//#endregion

//#region Carga Dinámica Option Tipo Condicion IVA
function cargarTipoCondicionIVA(){

    function handleResponse(response)  {
        if (!response.ok){
            return Promise.reject(response);
        }
        else{
            return response.json();
        }
    }

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

//Evento que se dispara cuando cargo la página para cargar dinámicamente el option Condicion IVA.
document.addEventListener('DOMContentLoaded', cargarTipoCondicionIVA());
//#endregion

//#region Validaciones para la Carga de Cliente
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

var botonInsertarCliente = document.getElementById('botonInsertarCliente');

function validarCUILInsercion() {
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

function validarNombreApellidoEmpresaInsercion() {
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

function validarEmailInsercion() {
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

function validarDireccionInsercion() {
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

function validarCondicionIVAInsercion(){
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

function validarFormularioInsercion() {
    botonInsertarCliente.disabled = !(validarCUILInsercion() && 
                                    validarNombreApellidoEmpresaInsercion() && 
                                    validarEmailInsercion() && 
                                    validarDireccionInsercion() && 
                                    validarCondicionIVAInsercion());

    if (botonInsertarCliente.disabled){
        document.getElementById('M-crear').focus();
    }
}

// Agregar eventos de blur para los campos de entrada
cuitInput.addEventListener('blur', validarFormularioInsercion);
nombreInput.addEventListener('blur', validarFormularioInsercion);
apellidoInput.addEventListener('blur', validarFormularioInsercion);
empresaInput.addEventListener('blur', validarFormularioInsercion);
emailInput.addEventListener('blur', validarFormularioInsercion);
direccionInput.addEventListener('blur', validarFormularioInsercion);
condicionIVAInput.addEventListener('blur', validarFormularioInsercion);
condicionIVAInput.addEventListener('change', function(){
    document.getElementById('M-crear').focus();
});
//#endregion

//#region Validaciones para la Edición de un Cliente
var nombreEdicion = document.getElementById('ed-nombre');
var apellidoEdicion = document.getElementById('ed-apellido');
var empresaEdicion = document.getElementById('ed-empresa');
var emailEdicion = document.getElementById('ed-email');
var direccionEdicion = document.getElementById('ed-direccion');

var mensajeValidacionEdicionNombreApellidoEmpresa = document.getElementById('mensajeValidacionEdicionNombreApellidoEmpresa');
var mensajeValidacionEdicionEmail = document.getElementById('mensajeValidacionEdicionEmail');
var mensajeValidacionEdicionDireccion = document.getElementById('mensajeValidacionEdicionDireccion');

var botonEdicionCliente = document.getElementById('botonEdicionCliente');

function validarNombreApellidoEmpresaEdicion() {
    // Verificar si al menos uno de los campos (nombre, apellido, empresa) está completado
    var identificacionCompletado = (nombreEdicion.value.trim() !== '' && apellidoEdicion.value.trim() !== '') || empresaEdicion.value.trim() !== '';

    if (!identificacionCompletado) {
        mensajeValidacionEdicionNombreApellidoEmpresa.style.display = 'block';
        nombreEdicion.classList.add('is-invalid');
        apellidoEdicion.classList.add('is-invalid');
        empresaEdicion.classList.add('is-invalid');
        return false;  // Deshabilitar el botón
    } else {
        mensajeValidacionNombreApellidoEmpresa.style.display = 'none';
        nombreEdicion.classList.remove('is-invalid');
        apellidoEdicion.classList.remove('is-invalid');
        empresaEdicion.classList.remove('is-invalid');
        return true;  // Habilitar el botón
    }
}

function validarEmailEdicion() {
    // Verificar si el correo electrónico tiene un formato válido
    var emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEdicion.value);

    // Verificar si el CUIT tiene 11 dígitos y al menos uno de los campos está completado
    if (!emailValido) {
        // Mostrar mensaje de validación
        mensajeValidacionEdicionEmail.style.display = 'block';
        emailEdicion.classList.add('is-invalid');
        return false;  // Deshabilitar el botón
    } else {
        mensajeValidacionEdicionEmail.style.display = 'none';
        emailEdicion.classList.remove('is-invalid');
        return true;  // Habilitar el botón
    }
}

function validarDireccionEdicion() {
    var direccionValida = direccionEdicion.value.trim() !== ''

    if (!direccionValida) {
        // Mostrar mensaje de validación
        mensajeValidacionEdicionDireccion.style.display = 'block';
        direccionEdicion.classList.add('is-invalid');
        return false;  // Deshabilitar el botón
    } else {
        mensajeValidacionEdicionDireccion.style.display = 'none';
        direccionEdicion.classList.remove('is-invalid');
        return true;  // Habilitar el botón
    }
}

function validarFormularioEdicion() {
    botonEdicionCliente.disabled = !(validarNombreApellidoEmpresaEdicion() && validarEmailEdicion() && validarDireccionEdicion());

    if (botonEdicionCliente.disabled){
        document.getElementById('M-Editar').focus();
    }
}

nombreEdicion.addEventListener('blur', validarFormularioEdicion);
apellidoEdicion.addEventListener('blur', validarFormularioEdicion);
empresaEdicion.addEventListener('blur', validarFormularioEdicion);
emailEdicion.addEventListener('blur', validarFormularioEdicion);
direccionEdicion.addEventListener('blur', validarFormularioEdicion);
//#endregion
