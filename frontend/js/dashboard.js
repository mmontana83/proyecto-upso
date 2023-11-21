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
//o/////////////////////////////////////////////////////////////////////////////////////////7
    // Función para resetear el formulario en cualquier modal
    function resetFormulario(modalId) {
        const formulario = document.querySelector(`${modalId} form`);
        formulario.reset();
      }
    
      // Agregar un evento que se dispara cuando un modal se muestra
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('shown.bs.modal', function () {
          // Resetear el formulario específico para cada modal
        mensajeValidacionCUIT.style.display = 'none';
        cuitInput.classList.remove('is-invalid');
        resetFormulario(`#${modal.id}`);

    });
    });



// Obtén los valores de los parámetros
const nombre = obtenerParametroDeConsulta('nombre');
const apellido = obtenerParametroDeConsulta('apellido');
const id_usuario = obtenerParametroDeConsulta('id_usuario');
const token = obtenerParametroDeConsulta('token');

// Obtención de los datos del login
function obtenerParametroDeConsulta(parametro) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parametro);
}

const usuario = document.getElementById("usuario")

function insertarUsuarioEnHTML(nombre, apellido){
    usuario.innerText = `Bienvenido ${nombre} ${apellido}`
}

//Esto es para que al momento de cargar la página se llame a la función insertar UsuarioEnHTML
document.addEventListener('DOMContentLoaded', insertarUsuarioEnHTML(nombre, apellido));

////////////////////////////////////////////////////////////////////////////////////////////
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

///// FUNCION PARA FILTRAR BUSQUEDAS DE CLIENTES
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


/////_----------------------------


// FUNCION PARA DEVOLVER LOS VALORES DE LA FILA A LOS INPUTS PARA EDITAR----------------
const inputs = document.getElementById('edit-form').querySelectorAll('input, select')
let count = 0;

window.addEventListener("click", (e) => { //el evento es sobre la ventana entera
    if (e.target.getAttribute("data-bs-target") === "#M-Editar" | e.target.getAttribute("data-bs-target") === "#Factura"
        | e.target.getAttribute("data-bs-target") === "#EliminarCliente") { 
            
            let data = e.target.parentElement.parentElement.children;
            fillDataCliente(data);
            inputNombre.value = `${data[1].textContent} ${data[2].textContent} (${data[3].textContent})`;
            inputCuit.value = data[0].textContent;
            inputDireccion.value = data[6].textContent;

            if (e.target.getAttribute("data-bs-target") === "#EliminarCliente") {
                delete_Client(data); 
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
  ///-------------------------------------------------------------------------
 


  /////// CONTROL DE BOOTSTRAP SOBRE CAMPOS VACIOS---------------------

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()





