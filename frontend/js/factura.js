//#region Const para la cabecera de la Factura
const formCabecera = document.getElementById('formCabecera')
const inputNroFactura = document.getElementById('inputNroFactura');
const inputNombre = document.getElementById('inputNombre');
const inputDireccion = document.getElementById('inputDireccion');
const inputCondicionIVA = document.getElementById('inputCondicionIVA');
const inputCuit = document.getElementById('inputCuit');
const inputMetodoPago = document.getElementById('inputMetodoPago');
const inputTipoComprobante = document.getElementById('inputTipoComprobante');
const inputFecha = document.getElementById('inputFecha');

//#endregion

//#region Const para el Detalle de la factura
const formDetalle = document.getElementById('formDetalle');
const selectDescripcion = document.getElementById('selectDescripcion');
const inputCantidad = document.getElementById('inputCantidad');
const inputPUnitario = document.getElementById('inputPUnitario');
const inputPTotal = document.getElementById('inputPTotal');
const inputPTotales = document.getElementById('inputPTotales');
const cuerpoTabla = document.getElementById('cuerpoTabla');
const btnGuardarFactura = document.getElementById('btnGuardarFactura');
//#endregion


//#region Carga Dinámica Option Tipo Condicion IVA - Tipo Comprobante - Listado de Productos
function cargarTipoCondicionVenta(){
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
    
    fetch(`http://127.0.0.1:5000/dashboard/listarTipoCondicionVenta`, requestOptions)
        .then(response => handleResponse(response))
        .then(
            (categorias) => {
                
                inputMetodoPago.innerHTML = '';

                //Creo una opción vacía que se muestra por defecto.
                const option = document.createElement('option');
                option.value = "";
                option.text = "--Seleccione una opción--";
                option.setAttribute('disabled', true);
                option.setAttribute('selected', true);
                inputMetodoPago.appendChild(option);

                categorias.forEach(categoria => {
                    const option = document.createElement('option');
                    option.value = categoria.id_tipoCondicionVenta;
                    option.text = categoria.descripcion;
                    inputMetodoPago.appendChild(option);
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

function cargarTipoComprobante(){

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
    
    fetch(`http://127.0.0.1:5000/dashboard/listarTipoFactura`, requestOptions)
        .then(response => handleResponse(response))
        .then(
            (categorias) => {
                
                inputTipoComprobante.innerHTML = '';

                //Creo una opción vacía que se muestra por defecto.
                const option = document.createElement('option');
                option.value = "";
                option.text = "--Seleccione una opción--";
                option.setAttribute('disabled', true);
                option.setAttribute('selected', true);
                inputTipoComprobante.appendChild(option);

                categorias.forEach(categoria => {
                    const option = document.createElement('option');
                    option.value = categoria.id_tipoFactura;
                    option.text = categoria.tipoFactura;
                    inputTipoComprobante.appendChild(option);
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

function cargarListadoProductosFacturaNueva(){

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
    
    fetch(`http://127.0.0.1:5000/usuario/${id_usuario}/productos`, requestOptions)
        .then(response => handleResponse(response))
        .then(
            (productos) => {
                
                selectDescripcion.innerHTML = '';

                //Creo una opción vacía que se muestra por defecto.
                const option = document.createElement('option');
                option.value = "";
                option.text = "--Seleccione una opción--";
                option.setAttribute('disabled', true);
                option.setAttribute('selected', true);
                selectDescripcion.appendChild(option);
                
                arregloProductos = productos;
                
                productos.forEach(categoria => {
                    const option = document.createElement('option');
                    option.value = categoria.id_producto;
                    option.text = `${categoria.producto} (${categoria.descripcion})`;
                    selectDescripcion.appendChild(option);
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

function setFechaActualFacturaNueva(){
  flatpickr("input[type=date]", {
    minDate: new Date().fp_incr(-10),
    maxDate: new Date().fp_incr(6),  // 6 días hacia adelante
    dateFormat: "d-m-Y",
    defaultDate: "today",
    locale: "es",
    showMonths: 1,
    disable: [
      function(date) {
        // Función para deshabilitar días fuera del rango
        return (date < new Date().fp_incr(-10)) || (date > new Date().fp_incr(6));
      }
    ]
  });
}

//Evento que se dispara cuando cargo la página para cargar dinámicamente el option Condicion IVA.
document.addEventListener('DOMContentLoaded', cargarTipoComprobante());
document.addEventListener('DOMContentLoaded', cargarTipoCondicionVenta());
document.addEventListener('DOMContentLoaded', cargarListadoProductosFacturaNueva());
document.addEventListener('DOMContentLoaded', setFechaActualFacturaNueva());
//#endregion

//#region Validación de la cantidad de unidades a vender de acuerdo al stock
function validadCantidadStock(input){
    console.log(selectDescripcion.selectedOptions[0].textContent)
}
//#endregion
let facturas = [];
let arregloDetalle = []; // Arreglo que se va a usar para enviar la factura a la BD
let arregloProductos = [];

///
const getPrecioProductoById = (id) => {
    const objProd = arregloProductos.find((prod) => prod.id_producto === +id);
    return objProd ? objProd.precio : undefined;   // Si se encuentra un objeto con el 'id' proporcionado, devolvemos el valor de la propiedad 'precio'; de lo contrario, devolvemos undefined.
};


///
// SE AGREGAN LAS FILAS A LAS TABLAS CON LA INFO DE LOS PROD
const redibujarTabla = () => {
    cuerpoTabla.innerHTML = ""
    let filas = ``;
    let Totales= 0;
    arregloDetalle.forEach((detalle =>{
        let fila = `
        <tr>
            <td>${detalle.nombreDescripcion}</td>
            <td>${detalle.cantidad}</td>
            <td>${detalle.precio}</td>
            <td>${detalle.pTotal}</td>
            <td><button class="btn btn-danger" onclick ="eliminarRegistroById(${detalle.descripcion})" >Eiminar</button></td>
        </tr>`;
        filas += fila;
        Totales = (+Totales + +detalle.pTotal).toFixed(2)
    }))
    cuerpoTabla.innerHTML = filas;
    inputPTotales.value = Totales
}

const eliminarRegistroById = (id) => {
    arregloDetalle = arregloDetalle.filter((detalle) => { //iteramos sobre el arreglo de detalles de factura y filtramos los que no coincidan con el id
        if (+detalle.descripcion !== +id) {
            return detalle; //devolvemos solo los que NO deseamos eliminar
        };
    });
    redibujarTabla();
};

const controlDetalle = (objDetalle)=> {
    // se busca si el detalle de factura ya existe dentro de la lista de ArregloDetalle
    // si existe, se suman cantidades y precio total, caso contrario se hace el push al arreglo
    //consultamos si existe el detalle dentro de la lista
    const existe = arregloDetalle.find((detalle)=> {
        return +objDetalle.descripcion === +detalle.descripcion;
    });
    
    if (existe) {
        arregloDetalle = arregloDetalle.map((detalle)=> {
            if (+objDetalle.descripcion === +detalle.descripcion) {
                return {
                    cantidad : +objDetalle.cantidad + +detalle.cantidad,
                    descripcion : objDetalle.descripcion,
                    nombreDescripcion : objDetalle.nombreDescripcion,
                    precio: (+objDetalle.precio).toFixed(2),
                    pTotal : (+objDetalle.pTotal + +detalle.pTotal).toFixed(2), 
                };
            }
            return detalle;
    })
    } else {
        arregloDetalle.push(objDetalle)
    }


}

//  SE AGREGAN DETALLES DE FACTURAS AL ARRAY DE DETALLES AL MOMENTO DE CLICKEAR EL BOTON "AGREGAR"
formDetalle.onsubmit = (e) =>{
    e.preventDefault();

    // Objeto Detalle creado a partir de obtener los valores insertado en los inputs
    const objDetalle = {
        cantidad : inputCantidad.value,
        descripcion : selectDescripcion.value, //este seria el atributo "value" del select
        nombreDescripcion : selectDescripcion.options[selectDescripcion.selectedIndex].innerText, // muestra el nombre de la opcion seleccionada
        precio : inputPUnitario.value,
        pTotal : inputPTotal.value,
        id_producto: selectDescripcion.value
    };
    
    controlDetalle(objDetalle);

    redibujarTabla();
};

///
btnGuardarFactura.onclick = () => {
 //crear el objeto de la cabecera de la factura
     
    let encabezadoFactura = {
        fecha: inputFecha.value,
        total: inputPTotales.value,
        id_tipoFactura: inputTipoComprobante.value,
        id_condicionVenta: inputMetodoPago.value
    }

    columnasAQuitar = ["descripcion","nombreDescripcion","pTotal"];
    detalleFactura = arregloDetalle
    for (let fila in detalleFactura) {
        // Verificar si la fila es un objeto antes de quitar propiedades
        if (typeof detalleFactura[fila] === 'object' && detalleFactura[fila] !== null) {
          // Iterar sobre cada propiedad en la fila y quitar las propiedades específicas
          for (let propiedad in detalleFactura[fila]) {
            if (columnasAQuitar.includes(propiedad)) {
              delete detalleFactura[fila][propiedad];
            }
          }
        }
    }

    let objFactura = {
        encabezado: encabezadoFactura,
        detalle : detalleFactura
    };

    if (arregloDetalle.length === 0){
        Swal.fire({
            icon: "error",
            text: "Debe agregar productos a la factura"
          });
          return;
    }

    insertFactura(inputCuit.value.trim(), objFactura);

    facturas.push(objFactura); // enviamos el objeto al arreglo "facturas"

    //limpiar campos luego del submit
    formCabecera.reset();
    formDetalle.reset();

    // guardamos el arreglo "facturas en el local storage"
    localStorage.setItem("facturas", JSON.stringify(facturas));
    // borrar tbody
    arregloDetalle = []
    redibujarTabla();

};
/////
// COLOCAMOS EL PRECIO UNIT EN EL INPUT DE MANERA DINAMICA
selectDescripcion.onchange = () => {
    inputCantidad.value = "";
    if (selectDescripcion.value == "") {
        formDetalle.reset();
        return;
    };

    const precio = getPrecioProductoById(selectDescripcion.value);

    if (precio) { //si existe precio
        inputPUnitario.value = precio
        calcularPrecioTotal()
        
    }
};

const calcularPrecioTotal = ()=> {
    inputPTotal.value = ((+inputCantidad.value) * (+inputPUnitario.value)).toFixed(2)
    
}
///
// COLOCAMOS EL PRECIO TOTAL DE MANERA DINAMICA
inputCantidad.onchange = () => {
    calcularPrecioTotal()
}


//#region Validación para la creación de una factura
var mensajeValidacionFacturaNuevaMetodoPago = document.getElementById('mensajeValidacionFacturaNuevaMetodoPago');
var mensajeValidacionFacturaNuevaTipoComprobante = document.getElementById('mensajeValidacionFacturaNuevaTipoComprobante');

function validarMetodoPago(){
    // Verificar si el Domicilio no es vacío
    var condicionMetodoPago = inputMetodoPago.value !== ''

    if (!condicionMetodoPago) {
        // Mostrar mensaje de validación
        mensajeValidacionFacturaNuevaMetodoPago.style.display = 'block';
        inputMetodoPago.classList.add('is-invalid');
        return false;  // Deshabilitar el botón
    } else {
        mensajeValidacionFacturaNuevaMetodoPago.style.display = 'none';
        inputMetodoPago.classList.remove('is-invalid');
        return true;  // Habilitar el botón
    }
}

function validarTipoComprobante(){
    // Verificar si el Domicilio no es vacío
    var condicionTipoComprobante = inputTipoComprobante.value !== ''

    if (!condicionTipoComprobante) {
        // Mostrar mensaje de validación
        mensajeValidacionFacturaNuevaTipoComprobante.style.display = 'block';
        inputTipoComprobante.classList.add('is-invalid');
        return false;  // Deshabilitar el botón
    } else {
        mensajeValidacionFacturaNuevaTipoComprobante.style.display = 'none';
        inputTipoComprobante.classList.remove('is-invalid');
        return true;  // Habilitar el botón
    }
}

function validarNuevaFactura() {
    btnGuardarFactura.disabled = !(validarTipoComprobante() && 
                                    validarMetodoPago());
}

inputMetodoPago.addEventListener('blur', validarNuevaFactura);
inputMetodoPago.addEventListener('change', function(){
    document.querySelector('select#inputTipoComprobante.form-select').focus();
});

inputTipoComprobante.addEventListener('blur', validarNuevaFactura);
inputTipoComprobante.addEventListener('change', function(){
    document.querySelector('select#selectDescripcion.form-select').focus();
});

selectDescripcion.addEventListener('change', function(){
    inputCantidad.disabled = false;
    document.querySelector('input#inputCantidad.form-control').focus();
});
      
//#endregion