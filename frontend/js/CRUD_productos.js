const idProducto = document.getElementById('in-idProducto');
const nombreProducto = document.getElementById('in-nombreProducto');
const descripcionProducto = document.getElementById('in-descripcionProducto');
const precioProducto = document.getElementById('in-precioProducto');
const stockProducto = document.getElementById('in-stockProducto');


let botonInsertarProducto = document.getElementById('botonInsertarProducto');
////////////////////    CRUD        ///////////////////////////////////////////////////


function handleResponse(response)  {
    if (!response.ok){
        return Promise.reject({message: "HTTP Code:" + response.status + " - Description:" + response.statusText})
    }
    else{
        return response.json()
    }
}
// function handleResponse(response)  {
//     if (!response.ok){
//         return Promise.reject(response);
//     }
//     else{
//         return response.json();
//     }
// }


function getAll_Product(){
    function handleResponse(response)  {
        if (!response.ok){
            return Promise.reject({message: "HTTP Code:" + response.status + " - Description:" + response.statusText})
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

    fetch(`http://127.0.0.1:5000/usuario/${id_usuario}/productos`, requestOptions)
        .then( response => handleResponse(response) )
        .then(
            (data) => {
                // console.log(data); 
                const tableBody = document.getElementById('all-products');
                let list = ``;
                data.forEach(producto => {
                    let fila = 
                    `<tr id="${producto.id}"> 
                        <td>${producto.codigoProducto} </td>
                        <td>${producto.producto}</td>
                        <td>${producto.descripcion}</td>
                        <td>${producto.precio}</td>
                        <td>${producto.stock}</td>
                        <td class= "table-toggle" >
                        <span data-bs-toggle="modal" data-bs-target="#M-Editar-Prod" class="material-symbols-outlined">
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
        .catch( (error) => { console.log("Promesa rechazada por" , error)})
        .finally( () => { 
            console.log("Promesa finalizada (resuelta o rechazada)");
        })
}



function insert_Product(){
    
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

    id_producto = document.getElementById('in-idProducto').value;
    
    //Primer consulto si existe el producto
    fetch(`http://127.0.0.1:5000/usuario/${id_usuario}/producto/${id_producto}`, requestOptions)
        .then(response => handleResponse(response))
        .then(data => {
            console.log(data)
            //El producto existe y esta dado de alta. Por lo tanto no se puede agregar
            if (data.id_tipoEstado == 1){
                Swal.fire({
                    title: "Producto Existente",
                    text: `El producto ${data.producto} ya existe se encuentra registrado en el sistema`,
                    icon: "warning",
                  })
            }
            //El producto existe en la base de datos pero fue borrado "logicamente"
            else{
                if (data.id_tipoEstado == 2){
                    Swal.fire({
                        title: "Producto dado de Baja",
                        text: `El producto ${data.producto} ha sido dado de baja.\n¿Quiere darlo de alta nuevamente?`,
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
    
                            fetch(`http://127.0.0.1:5000/usuario/${id_usuario}/producto/${id_producto}`, requestOptions)
                                .then(response => handleResponse(response))
                                .then( () => {
                                    Swal.fire({
                                        title: "Alta!",
                                        text: `El producto ${data.producto} fue dado de alta nuevamente`,
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
                //El producto no existe y se agregará a la base de datos.
                else{
                    let jsonInsertProducto = {
                        "producto" : nombreProducto.value, 
                        "descripcion" : descripcionProducto.value,
                        "precio" : precioProducto.value, 
                        "stock" : stockProducto.value,  
                        "tipoProducto" : 1,  
    
                    };
        
                    const requestOptions = {
                        method: 'POST',
                        headers: {
                            'Accept': '*/*',
                            'Content-Type': 'application/json',
                            'user-id': id_usuario
                        },
                        body: JSON.stringify(jsonInsertProducto) 
                    };
        
                    fetch(`http://127.0.0.1:5000/usuario/${id_usuario}/producto/${id_producto}`, requestOptions)
                        .then(response => handleResponse(response))
                        .then(data => {
                            Swal.fire({
                                icon: "success",
                                title: data.message
                                });
        
                            let modal = document.getElementById('M-productos');
                            modal.style.display = 'none';
                            getAll_Product();
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

// function update_Product(){
    
//     // function handleResponse(response)  {
//     //     if (!response.ok){
//     //         return Promise.reject(response);
//     //     }
//     //     else{
//     //         return response.json();
//     //     }
//     // }
//     let id_producto = document.getElementById('ed-cuit').value;

//     let jsonUpdateProducto = {
//         "nombre" : document.getElementById('ed-nombre').value, 
//         "apellido" : document.getElementById('ed-apellido').value,
//         "empresa" : document.getElementById('ed-empresa').value, 
//         "email" : document.getElementById('ed-email').value,  
//         "telefono" : document.getElementById('ed-telefono').value, 
//         "direccion" : document.getElementById('ed-direccion').value, 
//         "id_tipoCondicionIVA" : document.getElementById('ed-condicionIVA').value
//     };

//     const requestOptions = {
//         method: 'POST',
//         headers: {
//             'Accept': '*/*',
//             'Content-Type': 'application/json',
//             'x-access-token': token,
//             'user-id': id_usuario
//         },
//         body: JSON.stringify(jsonUpdateProducto) 
//     };

//     fetch(`http://127.0.0.1:5000/usuario/${id_usuario}/producto/${id_producto}`, requestOptions)
//         .then(response => handleResponse(response))
//         .then(
//             data => {
                
//                 Swal.fire({
//                     icon: "success",
//                     title: data.message
//                   });
    
//                 let modal = document.getElementById('M-Editar');
//                 modal.style.display = 'none';
//                 getAll_Clients();
//             }
//         )
//         .catch(error => {
//             error.json().then(data => 
//                 Swal.fire({
//                     icon: "error",
//                     text: data.message
//                   })
//             );
//         })
//         .finally(() => {
//             console.log("Promesa finalizada (resuelta o rechazada)");
//         });
// }

function delete_Product(data){
    
    // function handleResponse(response)  {
    //     if (!response.ok){
    //         return Promise.reject(response);
    //     }
    //     else{
    //         return response.json();
    //     }
    // }
    
    //Recupero el Id_Producto
    id_producto = data[0].textContent;
    id_producto_identificación = `${data[1].textContent} ${data[2].textContent} (${data[3].textContent})`;

    Swal.fire({
        title: "¡Advertencia - Eliminar Producto!",
        text: `¿Está seguro que quieres borrar al producto ${id_producto_identificación}?`,
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

            fetch(`http://127.0.0.1:5000/usuario/${id_usuario}/producto/${id_producto}`, requestOptions)
            .then(response => handleResponse(response))
            .then(
                () => {
                    Swal.fire({
                        title: "Borrado con Éxito!",
                        text: `El producto ${id_producto_identificación} ha sido borrado`,
                        icon: "success"
                    });        
                    getAll_Product();
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



//Validaciones para la Carga de un Producto

let mensajeValidacionIDProducto = document.getElementById('mensajeValidacionIDProducto');
let mensajeValidacionNombreDescripcionStock = document.getElementById('mensajeValidacionNombreDescripcionStock');
let mensajeValidacionPrecio = document.getElementById('mensajeValidacionPrecio');
let mensajeValidacionStock = document.getElementById('mensajeValidacionStock');


function validarIDProductoInsercion() {
    // Verificar si el CUIT tiene 11 dígitos y al menos uno de los campos está completado
    let cuitValido = idProducto.value.length === 6 ;

    // Verificar si el CUIT tiene 11 dígitos y al menos uno de los campos está completado
    if (!cuitValido) {
        // Mostrar mensaje de validación
        mensajeValidacionIDProducto.style.display = 'block';
        idProducto.classList.add('is-invalid');
        return false;
    } else {
        mensajeValidacionIDProducto.style.display = 'none';
        idProducto.classList.remove('is-invalid');
        return true;
    }
}




function validarNombreDescripcionPrecioInsercion() {
    // Verificar si al menos uno de los campos (nombre, apellido, empresa) está completado
    let identificacionCompletado = (nombreProducto.value.trim() !== '' && descripcionProducto.value.trim() !== '') || precioProducto.value.trim() !== '';

    if (!identificacionCompletado) {
        mensajeValidacionNombreDescripcionStock.style.display = 'block';
        nombreProducto.classList.add('is-invalid');
        descripcionProducto.classList.add('is-invalid');
        precioProducto.classList.add('is-invalid');
        return false;  // Deshabilitar el botón
    } else {
        mensajeValidacionNombreDescripcionStock.style.display = 'none';
        nombreProducto.classList.remove('is-invalid');
        descripcionProducto.classList.remove('is-invalid');
        precioProducto.classList.remove('is-invalid');
        return true;  // Habilitar el botón
    }
}

function validarPrecioInsercion() {
    // Verificar si el correo electrónico tiene un formato válido
    // Verificar si el CUIT tiene 11 dígitos y al menos uno de los campos está completado
    if (!precioProducto.value) {
        // Mostrar mensaje de validación
        mensajeValidacionPrecio.style.display = 'block';
        precioProducto.classList.add('is-invalid');
        return false;  // Deshabilitar el botón
    } else {
        mensajeValidacionPrecio.style.display = 'none';
        precioProducto.classList.remove('is-invalid');
        return true;  // Habilitar el botón
    }
}

function validarStockInsercion() {
    let stockValido = stockProducto.value !== ''
    return true
    // if (!stockValido) {
    //     // Mostrar mensaje de validación
    //     mensajeValidacionStock.style.display = 'block';
    //     stockProducto.classList.add('is-invalid');
    //     return false;  // Deshabilitar el botón
    // } else {
    //     mensajeValidacionStock.style.display = 'none';
    //     stockProducto.classList.remove('is-invalid');
    //     return true;  // Habilitar el botón
    // }
}



function validarFormularioInsercion() {
    botonInsertarProducto.disabled = !(validarIDProductoInsercion() && 
                                       validarNombreDescripcionPrecioInsercion() && 
                                       validarPrecioInsercion() && 
                                       validarStockInsercion());

    if (botonInsertarProducto.disabled){
        document.getElementById('M-productos').focus();
    }
}

// Agregar eventos de blur para los campos de entrada
idProducto.addEventListener('blur', validarFormularioInsercion);
nombreProducto.addEventListener('blur', validarFormularioInsercion);
descripcionProducto.addEventListener('blur', validarFormularioInsercion);
precioProducto.addEventListener('blur', validarFormularioInsercion);
stockProducto.addEventListener('blur', validarFormularioInsercion);




/*-------------------------------------------------------------------------------*/
//Validaciones para la Edición de un Producto
// let nombreEdicion = document.getElementById('ed-nombre');
// let apellidoEdicion = document.getElementById('ed-apellido');
// let empresaEdicion = document.getElementById('ed-empresa');
// let emailEdicion = document.getElementById('ed-email');
// let direccionEdicion = document.getElementById('ed-direccion');

// let mensajeValidacionEdicionNombreApellidoEmpresa = document.getElementById('mensajeValidacionEdicionNombreApellidoEmpresa');
// let mensajeValidacionEdicionEmail = document.getElementById('mensajeValidacionEdicionEmail');
// let mensajeValidacionEdicionDireccion = document.getElementById('mensajeValidacionEdicionDireccion');

// let botonEdicionProducto = document.getElementById('botonEdicionProducto');

// function validarNombreApellidoEmpresaEdicion() {
//     // Verificar si al menos uno de los campos (nombre, apellido, empresa) está completado
//     let identificacionCompletado = (nombreEdicion.value.trim() !== '' && apellidoEdicion.value.trim() !== '') || empresaEdicion.value.trim() !== '';

//     if (!identificacionCompletado) {
//         mensajeValidacionEdicionNombreApellidoEmpresa.style.display = 'block';
//         nombreEdicion.classList.add('is-invalid');
//         apellidoEdicion.classList.add('is-invalid');
//         empresaEdicion.classList.add('is-invalid');
//         return false;  // Deshabilitar el botón
//     } else {
//         mensajeValidacionNombreApellidoEmpresa.style.display = 'none';
//         nombreEdicion.classList.remove('is-invalid');
//         apellidoEdicion.classList.remove('is-invalid');
//         empresaEdicion.classList.remove('is-invalid');
//         return true;  // Habilitar el botón
//     }
// }

// function validarEmailEdicion() {
//     // Verificar si el correo electrónico tiene un formato válido
//     let emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEdicion.value);

//     // Verificar si el CUIT tiene 11 dígitos y al menos uno de los campos está completado
//     if (!emailValido) {
//         // Mostrar mensaje de validación
//         mensajeValidacionEdicionEmail.style.display = 'block';
//         emailEdicion.classList.add('is-invalid');
//         return false;  // Deshabilitar el botón
//     } else {
//         mensajeValidacionEdicionEmail.style.display = 'none';
//         emailEdicion.classList.remove('is-invalid');
//         return true;  // Habilitar el botón
//     }
// }

// function validarDireccionEdicion() {
//     let direccionValida = direccionEdicion.value.trim() !== ''

//     if (!direccionValida) {
//         // Mostrar mensaje de validación
//         mensajeValidacionEdicionDireccion.style.display = 'block';
//         direccionEdicion.classList.add('is-invalid');
//         return false;  // Deshabilitar el botón
//     } else {
//         mensajeValidacionEdicionDireccion.style.display = 'none';
//         direccionEdicion.classList.remove('is-invalid');
//         return true;  // Habilitar el botón
//     }
// }

// function validarFormularioEdicion() {
//     botonEdicionProducto.disabled = !(validarNombreApellidoEmpresaEdicion() && validarEmailEdicion() && validarDireccionEdicion());

//     if (botonEdicionProducto.disabled){
//         document.getElementById('M-Editar').focus();
//     }
// }

// nombreEdicion.addEventListener('blur', validarFormularioEdicion);
// apellidoEdicion.addEventListener('blur', validarFormularioEdicion);
// empresaEdicion.addEventListener('blur', validarFormularioEdicion);
// emailEdicion.addEventListener('blur', validarFormularioEdicion);
// direccionEdicion.addEventListener('blur', validarFormularioEdicion);