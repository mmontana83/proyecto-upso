document.addEventListener('DOMContentLoaded', cargarTipoCondicionProducto());

const idProductoInput = document.getElementById('in-idProducto');
const nombreProductoInput = document.getElementById('in-nombreProducto');
const descripcionProductoInput = document.getElementById('in-descripcionProducto');
const precioProductoInput = document.getElementById('in-precioProducto');
const stockProductoInput = document.getElementById('in-stockProducto');
const tipoProductoInput = document.getElementById('in-tipoProducto');

let botonInsertarProducto = document.getElementById('botonInsertarProducto');

const editarIdProducto = document.getElementById('editarIdProducto');
const editarNombreProducto = document.getElementById('editarNombreProducto');
const editarDescripcionProducto = document.getElementById('editarDescripcionProducto');
const editarPrecioProducto = document.getElementById('editarPrecioProducto');
const editarStockProducto = document.getElementById('editarStockProducto');
const editarTipoProducto    = document.getElementById('editarTipoProducto');

let botonEditarCliente = document.getElementById('botonEditarProducto');

////////////////////    CRUD        ///////////////////////////////////////////////////

function getAll_Product(){
    function handleResponse(response)  {
        if (!response.ok){
            return Promise.reject(response);
        }
        else{
            return response.json();
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
                        <td>${producto.tipoProducto}</td>
                        <td class= "table-toggle" >
                        <span data-bs-toggle="modal" data-bs-target="#M-EditarProducto" class="material-symbols-outlined">
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

function insert_Product(){
    
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
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'x-access-token': token,
            'user-id': id_usuario
        }
    };

    codigoProducto = document.getElementById('in-idProducto').value;
    
    //Primer consulto si existe el producto
    fetch(`http://127.0.0.1:5000/usuario/${id_usuario}/producto/${codigoProducto}`, requestOptions)
        .then(response => handleResponse(response))
        .then(data => {
            //El producto existe y esta dado de alta. Por lo tanto no se puede agregar
            if (data.id_tipoEstado == 1){
                Swal.fire({
                    title: "Producto Existente",
                    text: `El producto ${data.producto} ya existe y se encuentra registrado en el sistema`,
                    icon: "warning"
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
    
                            fetch(`http://127.0.0.1:5000/usuario/${id_usuario}/producto/${codigoProducto}`, requestOptions)
                                .then(response => handleResponse(response))
                                .then( () => {
                                    Swal.fire({
                                        title: "Alta!",
                                        text: `El producto ${data.producto} fue dado de alta nuevamente`,
                                        icon: "success"});
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
                                .finally(() => {});
                        }
                    })
                }
                //El producto no existe y se agregará a la base de datos.
                else{
                    let jsonInsertProducto = {
                        "codigoProducto": codigoProducto,
                        "producto" : nombreProductoInput.value, 
                        "descripcion" : descripcionProductoInput.value,
                        "precio" : precioProductoInput.value, 
                        "stock" : stockProductoInput.value,  
                        "id_tipoProducto" : tipoProductoInput.value   
                    };
                    
                    const requestOptions = {
                        method: 'POST',
                        headers: {
                            'Accept': '*/*',
                            'Content-Type': 'application/json',
                            'x-access-token': token,
                            'user-id': id_usuario
                        },
                        body: JSON.stringify(jsonInsertProducto) 
                    };
        
                    fetch(`http://127.0.0.1:5000/usuario/${id_usuario}/producto/`, requestOptions)
                        .then(response => handleResponse(response))
                        .then(data => {
                            Swal.fire({
                                icon: "success",
                                title: data.message
                                });
        
                            let modal = document.getElementById('M-InsertarProducto');
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

function update_Product(){
 

    
    // function handleResponse(response)  {
        //     if (!response.ok){
            //         return Promise.reject(response);
    //     }
    //     else{
    //         return response.json();
    //     }
    // }
    let id_producto = +editarIdProducto.value;

    let jsonUpdateProducto = {
        "codigoProducto": id_producto,
        "producto" : editarNombreProducto.value, 
        "descripcion" : editarDescripcionProducto.value,
        "precio" : editarPrecioProducto.value, 
        "stock" : editarStockProducto.value,  
        "id_tipoProducto" : editarTipoProducto.value   
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'x-access-token': token,
            'user-id': id_usuario
        },
        body: JSON.stringify(jsonUpdateProducto) 
    };

    fetch(`http://127.0.0.1:5000/usuario/${id_usuario}/producto/${id_producto}`, requestOptions)
        .then(response => handleResponse(response))
        .then(
            data => {
                
                Swal.fire({
                    icon: "success",
                    title: data.message
                  });
    
                let modal = document.getElementById('M-EditarProducto');
                modal.style.display = 'none';
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
let mensajeValidacionNombreDescripcionProducto = document.getElementById('mensajeValidacionNombreDescripcionProducto');
let mensajeValidacionPrecio = document.getElementById('mensajeValidacionPrecio');
let mensajeValidacionStockProducto = document.getElementById('mensajeValidacionStockProducto');
let mensajeValidacionTipoProducto = document.getElementById('mensajeValidacionTipoProducto');

function validarIDProductoInsercion() {
    
    let idProductoValido = idProductoInput.value.length === 6 ;

    if (!idProductoValido) {
        // Mostrar mensaje de validación
        mensajeValidacionIDProducto.style.display = 'block';
        idProductoInput.classList.add('is-invalid');
        return false;
    } else {
        mensajeValidacionIDProducto.style.display = 'none';
        idProductoInput.classList.remove('is-invalid');
        return true;
    }
}

function validarNombreDescripcionInsercion() {
    
    let nombreDescripcionCompletado = (nombreProductoInput.value.trim() !== '' && descripcionProductoInput.value.trim() !== '');

    if (!nombreDescripcionCompletado) {
        mensajeValidacionNombreDescripcionProducto.style.display = 'block';
        nombreProductoInput.classList.add('is-invalid');
        descripcionProductoInput.classList.add('is-invalid');
        return false;  // Deshabilitar el botón
    } else {
        mensajeValidacionNombreDescripcionProducto.style.display = 'none';
        nombreProductoInput.classList.remove('is-invalid');
        descripcionProductoInput.classList.remove('is-invalid');
        return true;  // Habilitar el botón
    }
}

function validarPrecioInsercion() {

    let precioProductoCompletado = precioProductoInput.value.trim() !== '';

    if (!precioProductoCompletado) {
        // Mostrar mensaje de validación
        mensajeValidacionPrecioProducto.style.display = 'block';
        precioProductoInput.classList.add('is-invalid');
        return false;  // Deshabilitar el botón
    } else {
        mensajeValidacionPrecioProducto.style.display = 'none';
        precioProductoInput.classList.remove('is-invalid');
        return true;  // Habilitar el botón
    }
}

function validarStockInsercion() {
    
    let stockValido = stockProductoInput.value.trim() !== '';

    if (!stockValido) {
        // Mostrar mensaje de validación
        mensajeValidacionStockProducto.style.display = 'block';
        stockProductoInput.classList.add('is-invalid');
        return false;  // Deshabilitar el botón
    } else {
        mensajeValidacionStockProducto.style.display = 'none';
        stockProductoInput.classList.remove('is-invalid');
        return true;  // Habilitar el botón
    }
}

function validadTipoProductoInsercion(){
    
    var tipoProductoValido = tipoProductoInput.value !== ''

    if (!tipoProductoValido) {
        // Mostrar mensaje de validación
        mensajeValidacionTipoProducto.style.display = 'block';
        tipoProductoInput.classList.add('is-invalid');
        return false;  // Deshabilitar el botón
    } else {
        mensajeValidacionTipoProducto.style.display = 'none';
        tipoProductoInput.classList.remove('is-invalid');
        return true;  // Habilitar el botón
    }// Verificar si el Domicilio no es vacío
}

function validarFormularioInsercion() {
    botonInsertarProducto.disabled = !(validarIDProductoInsercion() && 
                                       validarNombreDescripcionInsercion() && 
                                       validarPrecioInsercion() && 
                                       validarStockInsercion() &&
                                       validadTipoProductoInsercion());
}

// Agregar eventos de blur para los campos de entrada
idProductoInput.addEventListener('blur', validarFormularioInsercion);
nombreProductoInput.addEventListener('blur', validarFormularioInsercion);
descripcionProductoInput.addEventListener('blur', validarFormularioInsercion);
precioProductoInput.addEventListener('blur', validarFormularioInsercion);
stockProductoInput.addEventListener('blur', validarFormularioInsercion);




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


function cargarTipoCondicionProducto(){

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
    
    fetch(`http://127.0.0.1:5000/dashboard/listarTipoProducto`, requestOptions)
        .then(response => handleResponse(response))
        .then(
            (categorias) => {
                const selectProductoIN = document.getElementById('in-tipoProducto');
                //const selectCategoriasED = document.getElementById('ed-condicionIVA');
                
                selectProductoIN.innerHTML = '';
                //selectCategoriasED.innerHTML = '';

                //Creo una opción vacía que se muestra por defecto.
                const option = document.createElement('option');
                option.value = "";
                option.text = "";
                selectProductoIN.appendChild(option);

                categorias.forEach(categoria => {
                    const option = document.createElement('option');
                    option.value = categoria.id_tipoProducto;
                    option.text = categoria.tipoProducto;
                    selectProductoIN.appendChild(option);
                });

                // categorias.forEach(categoria => {
                //     const option = document.createElement('option');
                //     option.value = categoria.id_tipoCondicionIVA;
                //     option.text = categoria.descripcion;
                //     selectCategoriasED.appendChild(option);
                // });
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