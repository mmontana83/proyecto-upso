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


////////////////////////////////////////////////////////////////////////////////////////////
function toggleSection(sectionId) {
    var section = document.getElementById(sectionId);
    // Oculta todas las secciones antes de mostrar la seleccionada
    var sections = document.querySelectorAll(".toggle");
    sections.forEach(function (sec) {
        sec.classList.add("hidden");
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

const inputs = document.getElementById('edit-form').querySelectorAll('input')
let count = 0;

window.addEventListener("click", (e) => { //el evento es sobre la ventana entera
    if (e.target.getAttribute("data-bs-target") === "#M-Editar") { 
      let data = e.target.parentElement.parentElement.children;
      console.log(data)
      fillData(data);
    }
  
    if (e.target.matches(".btn-secondary" ) | (e.target.matches(".btn-close" )) | (e.target.matches(".modal.fade"))) {
    count=0
    }
  });
  const fillData = (data) => {
    for (let index of inputs) {
      index.value = data[count].textContent;
    //   console.log(data[count].textContent);
      count += 1;
      
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

/////// --------------------------------------------------


























////////////////////    CRUD        ///////////////////////////////////////////////////


function handleResponse(response)  {
    if (!response.ok){
        return Promise.reject({message: "HTTP Code:" + response.status + " - Description:" + response.statusText})
    }
    else{
        return response.json()
    }
}


function getAll_Client(){
    const requestOptions = {
        method : 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // https://64ea871fbf99bdcc8e6798fc.mockapi.io/v1/personas
    fetch('https://64ea871fbf99bdcc8e6798fc.mockapi.io/v1/personas', requestOptions)
        .then( response => handleResponse(response) )
        .then(
            (data) => {
                // console.log(data); 
                const tableBody = document.getElementById('all-persons');
                let list = ``;
                data.forEach(person => {
                    let fila = 
                    `<tr id="${person.id}"> 
                        <td>${person.cuit} </td>
                        <td>${person.name}</td>
                        <td>${person.apellido}</td>
                        <td>${person.empresa}</td>
                        <td>${person.telefono}</td>
                        <td>${person.condicionIVA}</td>
                        <td>${person.email}</td>
                        <td>${person.direccion}</td>
                        <td class= "table-toggle">
                        <span class="material-symbols-outlined" onclick="toggleSection('section4')" >receipt_long</span>
                        </td>
                        <td class= "table-toggle" >
                        <span data-bs-toggle="modal" data-bs-target="#M-Editar" class="material-symbols-outlined">
                        manage_accounts</span>
                        </td>
                        <td>
                        <span class="material-symbols-outlined table-togle">delete</span>
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