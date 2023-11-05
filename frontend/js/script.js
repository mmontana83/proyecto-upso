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
    // var navLinks = document.querySelectorAll(".nav-links a");

    // Oculta todas las secciones antes de mostrar la seleccionada
    var sections = document.querySelectorAll(".toggle");
    console.log(sections)
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

function mostrarPopup(ventana) {
    if (ventana == 'crear'){
        const popup = document.getElementById("popup");
        popup.style.display = "block";
    };
    if ( ventana == 'editar'){
        const popupeditar = document.getElementById("popupEditar");
        popupeditar.style.display = "block";
    }
}

function cerrarPopup(ventana) {
    if (ventana == 'crear'){
        const popup = document.getElementById("popup");
        popup.style.display = "none";
    };
    if ( ventana == 'editar'){
        const popupeditar = document.getElementById("popupEditar");
        popupeditar.style.display = "none";
    }
}






const inputs = document.getElementById('edit-form').querySelectorAll('input')
let count = 0;

window.addEventListener("click", (e) => { //el evento es sobre la ventana entera
    if (e.target.matches(".material-symbols-outlined")) { 
      let data = e.target.parentElement.parentElement.children;
      console.log(data);
      fillData(data)
    }
  
    if (e.target.matches("#cerrar")) {
    cerrarPopup('editar');
    count=0
    }
  });
  const fillData = (data) => {
    for (let index of inputs) {
      index.value = data[count].textContent;
      console.log(index);
      count += 1;
    }
  };


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
    fetch('https://64ea871fbf99bdcc8e6798fc.mockapi.io/v1/personas', requestOptions)
        .then( response => handleResponse(response) )
        .then(
            (data) => {
                console.log(data); 
                const tableBody = document.getElementById('all-persons');
                let list = ``;
                data.forEach(person => {
                    let fila = 
                    `<tr id="${person.id}"> 
                        <td class="data-title">${person.id} </td>
                        <td class="data-title">${person.name}</td>
                        <td class="data-title">${person.apellido}</td>
                        <td class="data-title">${person.empresa}</td>
                        <td class="data-title">${person.telefono}</td>
                        <td class="data-title">${person.condicionIVA}</td>
                        <td class="data-title">${person.email}</td>
                        <td class="data-title table-toggle " ><span onclick="mostrarPopup('editar')" class="material-symbols-outlined">
                        manage_accounts</span></td>
                        <td class="data-title "><span class="material-symbols-outlined table-togle">delete</span></td>
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