const formCabecera = document.getElementById('formCabecera')
const inputNombre = document.getElementById('inputNombre');
const inputCuit = document.getElementById('inputCuit');
const inputNroFactura = document.getElementById('inputNroFactura');
const inputDireccion = document.getElementById('inputDireccion');
const inputFecha = document.getElementById('inputFecha');
const formDetalle = document.getElementById('formDetalle');
const inputCantidad = document.getElementById('inputCantidad');
const selectDescripcion = document.getElementById('selectDescripcion');
const inputPUnitario = document.getElementById('inputPUnitario');
const inputPTotal = document.getElementById('inputPTotal');
const cuerpoTabla = document.getElementById('cuerpoTabla');
const btnGuardar = document.getElementById('btnGuardar');

let facturas = [];
let arregloDetalle = []; // Arreglo que se va a usar para enviar la factura a la BD
let arregloProductos = [
    {id:2, nombre: "Mouse", precio: 25},
    {id:3, nombre: "teclado", precio: 33},
    {id:4, nombre: "computador", precio: 32.7}
];

///
// INSERTAMOS LOS OPTIONS DENTRO DEL SELECT CON LOS PRODUCTOS TRAIDOS DE LA BD
const optionProductos = () => {
    let options = `<option value="" selected> --Seleccione un producto--</option>`;
    arregloProductos.forEach((producto) =>{
        let option = `
            <option value= "${producto.id}"> ${producto.nombre}</option>
        `

        options += option
        
    })
    selectDescripcion.innerHTML = options
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
    }))
    cuerpoTabla.innerHTML = filas;
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