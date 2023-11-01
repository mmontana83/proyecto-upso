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

    // // Asegúrate de que solo una sección tenga una clase activa
    // navLinks.forEach(function (link) {
    //     link.classList.remove("active");
    // });

    // // Agrega una clase activa al enlace seleccionado
    // document.getElementById(sectionId + "Button").classList.add("active");
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

function guardarDatos() {
    cerrarPopup('crear');
}





const campos = ["id_cliente", "nombre", "apellido", "empresa", "email", "telefono", "direccion", "condicion_iva"];

campos.forEach(function(campo) {
    document.getElementById(campo).addEventListener("input", validarCampos);
});

function validarCampos() {
    const enviarButton = document.getElementById("enviar");
    let camposCompletos = true;

    campos.forEach(function(campo) {
        const input = document.getElementById(campo);
        const errorMessage = document.getElementById(`${campo}_error`);

        if (!input.value) {
            camposCompletos = false;
            errorMessage.textContent = "Debe completar el campo";
        } else {
            errorMessage.textContent = "";
        }
    });

    enviarButton.disabled = !camposCompletos;
}
































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
    fetch('https://64ea871fbf99bdcc8e6798fc.mockapi.io/v1/persons', requestOptions)
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
                        <td class="data-title">${person.surname}</td>
                        <td class="data-title">${person.email}</td>
                        <td class="data-title">${person.dni}</td>
                        <td class="data-title table-toggle "><span onclick="mostrarPopup('editar')" class="material-symbols-outlined">
                        manage_accounts</span></td>
                        <td class="data-title "><i class="uil uil-trash table-toggle"></i></td>
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