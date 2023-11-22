//#region Const para la cabecera de la Factura
const formCabecera = document.getElementById('formCabecera')
const inputNroFactura = document.getElementById('inputNroFactura');
const inputNombre = document.getElementById('inputNombre');
const inputDireccion = document.getElementById('inputDireccion');
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
const btnGuardar = document.getElementById('btnGuardar');
//#endregion


//#region Carga Dinámica Option Tipo Condicion IVA
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
                    option.value = categoria.id_tipoCondicionIVA;
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

//Evento que se dispara cuando cargo la página para cargar dinámicamente el option Condicion IVA.
document.addEventListener('DOMContentLoaded', cargarTipoComprobante());
document.addEventListener('DOMContentLoaded', cargarTipoCondicionVenta());
//#endregion


let facturas = [];
let arregloDetalle = []; // Arreglo que se va a usar para enviar la factura a la BD
let arregloProductos = [
    {id:2, nombre: "Mouse", precio: 25},
    {id:3, nombre: "teclado", precio: 33},
    {id:4, nombre: "computador", precio: 32.7}
];

///// obtenemos la fecha actual en formato "YYYY-MM-DD"
  var fechaActual = new Date().toISOString().split('T')[0];

  // Formateo de la fecha actual a "DD/MM/YYYY"
  var partesFecha = fechaActual.split("-");
  var fechaFormateada = `${partesFecha[2]}/${partesFecha[1]}/${partesFecha[0]}`;

  // cambiamos el valor del input con la fecha actual
  inputFecha.value = fechaFormateada;

//////////////////////////////////////////

// INSERTAMOS LOS OPTIONS DENTRO DEL SELECT CON LOS PRODUCTOS TRAIDOS DE LA BD
const optionProductos = () => {
    
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
            'Content-Type': 'application/json'
            // 'x-access-token': token,
            // 'user-id': id_usuario
        }
    };
    
    fetch(`http://127.0.0.1:5000/${id_usuario}/productos`, requestOptions)
        .then(response => handleResponse(response))
        .then( producto =>  {
            console.log(producto);
            let options = `<option value="" disabled selected> --Seleccione un producto--</option>`;
            arregloProductos.forEach((producto) =>{
            let option = `
            <option value= "${producto.id_producto}"> ${producto.producto}</option>
            `

            options += option
            })
            selectDescripcion.innerHTML = options
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
optionProductos()

///
const getPrecioProductoById = (id) => {
    const objProd = arregloProductos.find((prod) => prod.id === +id);
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
            <td>${detalle.cant}</td>
            <td>${detalle.pUnit}</td>
            <td>${detalle.pTotal}</td>
            <td><button class="btn btn-danger" onclick ="eliminarRegistroById(${detalle.descripcion})" >Eiminar</button></td>
        </tr>`;
        filas += fila;
        Totales = (+Totales + +detalle.pTotal).toFixed(2)
    }))
    cuerpoTabla.innerHTML = filas;
    inputPTotales.value = Totales
    // console.log(arregloDetalle);
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
                    cant : +objDetalle.cant + +detalle.cant,
                    descripcion : objDetalle.descripcion,
                    nombreDescripcion : objDetalle.nombreDescripcion,
                    pUnit: (+objDetalle.pUnit).toFixed(2),
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
        cant : inputCantidad.value,
        descripcion : selectDescripcion.value, //este seria el atributo "value" del select
        nombreDescripcion : selectDescripcion.options[selectDescripcion.selectedIndex].innerText, // muestra el nombre de la opcion seleccionada
        pUnit : inputPUnitario.value,
        pTotal : inputPTotal.value,
    };
    
    // console.log(objDetalle); 
    
    controlDetalle(objDetalle);

    redibujarTabla();
    
    // console.log(objDetalle.nombreDescripcion)
};

///
btnGuardar.onclick = () => {
 //crear el objeto de la cabecera de la factura
    let objFactura = {
        nombre : inputNombre.value,
        cuit : inputCuit.value,
        nroFactura : inputNroFactura.value,
        direccion : inputDireccion.value,
        fecha : inputFecha.value,
        total : inputPTotales,
        detalle : arregloDetalle,
    };
    console.log(objFactura)
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