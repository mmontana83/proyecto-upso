// Esto lo obtuvimos de la plantilla de BS
const body = document.querySelector("body"),
      modeToggle = body.querySelector(".mode-toggle");
      sidebar = body.querySelector("nav");
      sidebarToggle = body.querySelector(".sidebar-toggle");

let getMode = localStorage.getItem("mode");
if(getMode && getMode ==="dark"){
    body.classList.toggle("dark");
}

let getStatus = localStorage.getItem("status");
if(getStatus && getStatus ==="close"){
    sidebar.classList.toggle("close");
}

modeToggle.addEventListener("click", () =>{
    body.classList.toggle("dark");
    if(body.classList.contains("dark")){
        localStorage.setItem("mode", "dark");
    }else{
        localStorage.setItem("mode", "light");
    }
});

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    if(sidebar.classList.contains("close")){
        localStorage.setItem("status", "close");
    }else{
        localStorage.setItem("status", "open");
    }
})

function toggleSection(sectionId) {
    var section = document.getElementById(sectionId);
    // Oculta todas las secciones antes de mostrar la seleccionada
    var sections = document.querySelectorAll(".toggle");
    sections.forEach(function (section) {
        section.classList.add("hidden");
    });
    
    // Muestra o oculta la sección actual
    if (section.classList.contains("hidden")) {
        section.classList.remove("hidden");
    } else {
        section.classList.add("hidden");
    }
}

//#region Función para resetear el formulario en cualquier modal
function resetFormulario(modalId) {
    const formulario = document.querySelector(`${modalId} form`);
    formulario.reset();
}
//#endregion

//#region Agregar un evento que se dispara cuando un modal se muestra. Es para limpiar las advertencias
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('hidden.bs.modal', function () {
          // Resetear el formulario específico para cada modal
        mensajeValidacionCUIT.style.display = 'none';
        cuitInput.classList.remove('is-invalid');
        idProductoInput.classList.remove('is-invalid');
        mensajeValidacionIDProducto.style.display = 'none';
        idProductoEdit.classList.remove('is-invalid');
        mensajeValidacionEdicionIDProducto.style.display = 'none';
        resetFormulario(`#${modal.id}`);
    });
});
//#endregion

//#region En esta sección trabajo con los parámetros de entrada del index (Usuario, Token)
// Obtén los valores de los parámetros
const id_usuario = sessionStorage.getItem("id_usuario");
const nombre = sessionStorage.getItem("nombre");
const apellido = sessionStorage.getItem("apellido");
const token = sessionStorage.getItem("token");

const usuario = document.getElementById("usuario")

function insertarUsuarioEnHTML(nombre, apellido){
    usuario.innerText = `Bienvenido ${nombre} ${apellido}`
}

//Esto es para que al momento de cargar la página se llame a la función insertar UsuarioEnHTML
document.addEventListener('DOMContentLoaded', insertarUsuarioEnHTML(nombre, apellido));
//#endregion

//#region FUNCION PARA DEVOLVER LOS VALORES DE LA FILA A LOS INPUTS PARA EDITAR----------------
const inputs = document.getElementById('edit-form').querySelectorAll('input, select')
let count = 0;

window.addEventListener("click", (e) => { //el evento es sobre la ventana entera
    if   (e.target.getAttribute("data-bs-target") === "#M-Editar" 
        | e.target.getAttribute("data-bs-target") === "#Factura"
        | e.target.getAttribute("data-bs-target") === "#EliminarCliente") { 
            
            let data = e.target.parentElement.parentElement.children;
            fillDataCliente(data);

            // En esta sección cargo los datos de la nueva factura
            
            const razonSocial = (data) => {
                if (data[1].textContent === '' && data[2].textContent === ''){
                    return data[3].textContent
                }
                else
                {
                    if (data[3].textContent === ""){
                        return `${data[2].textContent} ${data[1].textContent}`
                    }
                    else{
                        return `${data[2].textContent} ${data[1].textContent} (${data[3].textContent})`
                    }
                }
            };

            inputNombre.value = razonSocial(data);
            inputDireccion.value = data[6].textContent;
            inputCondicionIVA.value = data[7].textContent;
            inputCuit.value = data[0].textContent;

            if (e.target.getAttribute("data-bs-target") === "#EliminarCliente") {
                delete_Client(data); 
            }
    }
    if (e.target.getAttribute("data-bs-target") === "#M-EditarProducto" |
    e.target.getAttribute("data-bs-target") === "#EliminarProducto" ) {
        let data = e.target.parentElement.parentElement.children;

        idProductoEdit.value = data[0].textContent.trim();
        nombreProductoEdit.value = data[1].textContent;
        descripcionProductoEdit.value = data[2].textContent;
        precioProductoEdit.value = data[3].textContent;
        stockProductoEdit.value = data[4].textContent;
        switch(data[5].textContent){
            case "PRODUCTO":
                tipoProductoEdit.value = 1;
                break;
            case "SERVICIO":
                tipoProductoEdit.value = 2;
                break;
        }

        if (e.target.getAttribute("data-bs-target") === "#EliminarProducto") {
            delete_Product(data); 
        }
    }

    if (e.target.matches(".btn-secondary" ) | (e.target.matches(".btn-close" )) | (e.target.matches(".modal.fade"))) {
        count=0
    }

  });

const fillDataCliente = (data) => {
    for (let index of inputs) {
        if (count == 7){
            switch(data[count].textContent){
                case "IVA RESPONSABLE INSCRIPTO":
                    index.value = 1;
                    break;
                case "IVA RESPONSABLE NO INSCRIPTO":
                    index.value = 2;
                    break;
                case "IVA NO RESPOSABLE":
                    index.value = 3;
                    break;
                case "IVA SUJETO EXTERNO":
                    index.value = 4;
                    break;
                case "CONSUMIDOR FINAL":
                    index.value = 5;
                    break;
                case "RESPONSABLE MONOTRIBUTO":
                    index.value = 6;
                    break;
                case "SUJETO NO CATEGORIZADO":
                    index.value = 7;
                    break;
                case "PROVEEDOR DEL EXTERIOR":
                    index.value = 8;
                    break;
                case "CLIENTE DEL EXTERIOR":
                    index.value = 9;
                    break;
                case "IVA LIBERADO - LEY Nº 19.640":
                    index.value = 10;
                    break;
                case "IVA RESPONSABLE INSCRIPTO - AGENTE DE PERCEPCIÓN":
                    index.value = 11;
                    break;
                case "PEQUEÑO CONTRIBUYENTE EVENTUAL":
                    index.value = 12;
                    break;
                case "MONOTRIBUTISTA SOCIAL":
                    index.value = 13;
                    break;
                case "PEQUEÑO CONTRIBUYENTE EVENTUAL SOCIAL":
                    index.value = 14;
                    break;
            }
        }
        else{
            index.value = data[count].textContent;
            count += 1;
        }
    }
  };
//#endregion

//#region Función para Filtrar la Búsqueda de Clientes y Productos
document.addEventListener("keyup", e => {
    if (e.target.matches('#f-busqueda')) {
        const searchTerm = e.target.value.toLowerCase();
        const tableRows = document.querySelectorAll('table tr'); // Selector para las filas de la tabla

        tableRows.forEach((fila) => {
            const rowData = fila.textContent.toLowerCase();
            if (rowData.includes(searchTerm)) {
                fila.classList.remove('filter');
            } else {
                fila.classList.add('filter');
            }
        });
    }
});
//#endregion