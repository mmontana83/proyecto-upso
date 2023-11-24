//#region CRUD PRODUCTOS
function getAll_Product() {
    function handleResponse(response) {
        if (!response.ok) {
            return Promise.reject(response);
        }
        else {
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
    }

    fetch(`http://127.0.0.1:5000/usuario/${id_usuario}/productos`, requestOptions)
        .then(response => handleResponse(response))
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
                        <span class="material-symbols-outlined table-toggle" data-bs-target="#EliminarProducto">delete</span>
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
        .finally(() => {
            console.log("Promesa finalizada (resuelta o rechazada)");
        })
}

function insert_Product() {

    function handleResponse(response) {
        if (!response.ok) {
            return Promise.reject(response);
        }
        else {
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
            if (data.id_tipoEstado == 1) {
                Swal.fire({
                    title: "Producto Existente",
                    text: `El producto ${data.producto} ya existe y se encuentra registrado en el sistema`,
                    icon: "warning"
                })
            }
            //El producto existe en la base de datos pero fue borrado "logicamente"
            else {
                if (data.id_tipoEstado == 2) {
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
                                    .then(() => {
                                        Swal.fire({
                                            title: "Alta!",
                                            text: `El producto ${data.producto} fue dado de alta nuevamente`,
                                            icon: "success"
                                        });
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
                                    .finally(() => { });
                            }
                        })
                }
                //El producto no existe y se agregará a la base de datos.
                else {
                    let jsonInsertProducto = {
                        "codigoProducto": +codigoProducto,
                        "producto": nombreProductoInput.value,
                        "descripcion": descripcionProductoInput.value,
                        "precio": +precioProductoInput.value,
                        "stock": +stockProductoInput.value,
                        "id_tipoProducto": +tipoProductoInput.value
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

function update_Product() {

    function handleResponse(response) {
        if (!response.ok) {
            return Promise.reject(response);
        }
        else {
            return response.json();
        }
    }

    let id_producto = idProductoEdit.value;

    let jsonUpdateProducto = {
        "producto": nombreProductoEdit.value,
        "descripcion": descripcionProductoEdit.value,
        "precio": precioProductoEdit.value,
        "stock": stockProductoEdit.value,
        "id_tipoProducto": tipoProductoEdit.value
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

function delete_Product(data) {

    function handleResponse(response)  {
        if (!response.ok){
            return Promise.reject(response);
        }
        else{
            return response.json();
        }
    }

    //Recupero el Id_Producto
    id_producto = data[0].textContent;
    id_producto_identificación = `${data[1].textContent} (${data[2].textContent})`;

    Swal.fire({
        title: "¡Advertencia - Eliminar Producto!",
        text: `¿Está seguro que quieres borrar el producto ${id_producto_identificación}?`,
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
//#endregion

//#region  Carga dinámica Option del tipo de producto (Producto o Servicio)
function cargarTipoCondicionProducto() {

    function handleResponse(response) {
        if (!response.ok) {
            return Promise.reject(response);
        }
        else {
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
                const selectProductoED = document.getElementById('ed-tipoProducto');

                selectProductoIN.innerHTML = '';
                selectProductoED.innerHTML = '';

                //Creo una opción vacía que se muestra por defecto.
                const option = document.createElement('option');
                option.value = "";
                option.text = "--Seleccione una opción--";
                option.setAttribute('disabled', true);
                option.setAttribute('selected', true);
                selectProductoIN.appendChild(option);

                categorias.forEach(categoria => {
                    const option = document.createElement('option');
                    option.value = categoria.id_tipoProducto;
                    option.text = categoria.tipoProducto;
                    selectProductoIN.appendChild(option);
                });

                categorias.forEach(categoria => {
                    const option = document.createElement('option');
                    option.value = categoria.id_tipoProducto;
                    option.text = categoria.tipoProducto;
                    selectProductoED.appendChild(option);
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

document.addEventListener('DOMContentLoaded', cargarTipoCondicionProducto());
//#endregion

//#region Validaciones para la Carga de un Producto
const idProductoInput = document.getElementById('in-idProducto');
const nombreProductoInput = document.getElementById('in-nombreProducto');
const descripcionProductoInput = document.getElementById('in-descripcionProducto');
const precioProductoInput = document.getElementById('in-precioProducto');
const stockProductoInput = document.getElementById('in-stockProducto');
const tipoProductoInput = document.getElementById('in-tipoProducto');

let botonInsertarProducto = document.getElementById('botonInsertarProducto');

//Validaciones para la Carga de un Producto
let mensajeValidacionIDProducto = document.getElementById('mensajeValidacionIDProducto');
let mensajeValidacionNombreDescripcionProducto = document.getElementById('mensajeValidacionNombreDescripcionProducto');
let mensajeValidacionPrecio = document.getElementById('mensajeValidacionPrecio');
let mensajeValidacionStockProducto = document.getElementById('mensajeValidacionStockProducto');
let mensajeValidacionTipoProducto = document.getElementById('mensajeValidacionTipoProducto');

function validarIDProductoInsercion() {

    let idProductoValido = idProductoInput.value.length === 6;

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

function validadTipoProductoInsercion() {

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

function validarFormularioProductoInsercion() {
    botonInsertarProducto.disabled = !(validarIDProductoInsercion() &&
        validarNombreDescripcionInsercion() &&
        validarPrecioInsercion() &&
        validarStockInsercion() &&
        validadTipoProductoInsercion());
}

// Agregar eventos de blur para los campos de entrada de un nuevo producto
idProductoInput.addEventListener('blur', validarFormularioProductoInsercion);
nombreProductoInput.addEventListener('blur', validarFormularioProductoInsercion);
descripcionProductoInput.addEventListener('blur', validarFormularioProductoInsercion);
precioProductoInput.addEventListener('blur', validarFormularioProductoInsercion);
stockProductoInput.addEventListener('blur', validarFormularioProductoInsercion);
tipoProductoInput.addEventListener('blur', validarFormularioProductoInsercion);
tipoProductoInput.addEventListener('change', function(){
    document.querySelector('button.btn.btn-secondary').focus();
});

//#endregion

//#region Validaciones para la Edición de un Producto
const idProductoEdit = document.getElementById('ed-idProducto');
const nombreProductoEdit = document.getElementById('ed-nombreProducto');
const descripcionProductoEdit = document.getElementById('ed-descripcionProducto');
const precioProductoEdit = document.getElementById('ed-precioProducto');
const stockProductoEdit = document.getElementById('ed-stockProducto');
const tipoProductoEdit = document.getElementById('ed-tipoProducto');

let botonEditarProducto = document.getElementById('botonEditarProducto');

//Validaciones para la Carga de un Producto
let mensajeValidacionEdicionIDProducto = document.getElementById('mensajeValidacionEdicionIDProducto');
let mensajeValidacionEdicionNombreDescripcionProducto = document.getElementById('mensajeValidacionNombreDescripcionProducto');
let mensajeValidacionEdicionPrecio = document.getElementById('mensajeValidacionEdicionPrecioProducto');
let mensajeValidacionEdicionStockProducto = document.getElementById('mensajeValidacionEdicionStockProducto');

function validarIDProductoEdicion() {

    let idProductoValido = idProductoEdit.value.length === 6;

    if (!idProductoValido) {
        // Mostrar mensaje de validación
        mensajeValidacionEdicionIDProducto.style.display = 'block';
        idProductoEdit.classList.add('is-invalid');
        return false;
    } else {
        mensajeValidacionEdicionIDProducto.style.display = 'none';
        idProductoEdit.classList.remove('is-invalid');
        return true;
    }
}

function validarNombreDescripcionEdicion() {

    let nombreDescripcionCompletado = (nombreProductoEdit.value.trim() !== '' && descripcionProductoEdit.value.trim() !== '');

    if (!nombreDescripcionCompletado) {
        mensajeValidacionEdicionNombreDescripcionProducto.style.display = 'block';
        nombreProductoEdit.classList.add('is-invalid');
        descripcionProductoEdit.classList.add('is-invalid');
        return false;  // Deshabilitar el botón
    } else {
        mensajeValidacionEdicionNombreDescripcionProducto.style.display = 'none';
        nombreProductoEdit.classList.remove('is-invalid');
        descripcionProductoEdit.classList.remove('is-invalid');
        return true;  // Habilitar el botón
    }
}

function validarPrecioEdicion() {

    let precioProductoCompletado = precioProductoEdit.value.trim() !== '';

    if (!precioProductoCompletado) {
        // Mostrar mensaje de validación
        mensajeValidacionEdicionPrecioProducto.style.display = 'block';
        precioProductoEdit.classList.add('is-invalid');
        return false;  // Deshabilitar el botón
    } else {
        mensajeValidacionEdicionPrecioProducto.style.display = 'none';
        precioProductoEdit.classList.remove('is-invalid');
        return true;  // Habilitar el botón
    }
}

function validarStockEdicion() {

    let stockValido = stockProductoEdit.value.trim() !== '';

    if (!stockValido) {
        // Mostrar mensaje de validación
        mensajeValidacionEdicionStockProducto.style.display = 'block';
        stockProductoEdit.classList.add('is-invalid');
        return false;  // Deshabilitar el botón
    } else {
        mensajeValidacionEdicionStockProducto.style.display = 'none';
        stockProductoEdit.classList.remove('is-invalid');
        return true;  // Habilitar el botón
    }
}

function validarFormularioProductoEdicion() {
    botonEditarProducto.disabled = !(validarIDProductoEdicion() &&
        validarNombreDescripcionEdicion() &&
        validarPrecioEdicion() &&
        validarStockEdicion());
}

// Agregar eventos de blur para los campos de entrada
idProductoEdit.addEventListener('blur', validarFormularioProductoEdicion);
nombreProductoEdit.addEventListener('blur', validarFormularioProductoEdicion);
descripcionProductoEdit.addEventListener('blur', validarFormularioProductoEdicion);
precioProductoEdit.addEventListener('blur', validarFormularioProductoEdicion);
stockProductoEdit.addEventListener('blur', validarFormularioProductoEdicion);
//#endregion