async function login(event) {
    
    //Evito que se recargue la página
    event.preventDefault();

    // Obtener valores de usuario y contraseña
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // URL de la API para iniciar sesión
    var apiUrl = 'http://127.0.0.1:5000/login';

    // Datos de la solicitud
    var data = {
        username: username,
        password: password
    };

    // Configuración de la solicitud
    var requestOptions = {
        method: 'POST',
        headers: {
            // Aquí se agrega otro contenido de acuerdo a la necesidad de la API
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' +  btoa(username + ':' + password)
        },
        body: JSON.stringify(data)
    };

    function handleResponse(response)  {
        if (!response.ok){
            return Promise.reject(response);
        }
        else{
            return response.json();
        }
    }

    // Hacer la solicitud fetch y guardo en el sessionStorage
    await fetch(apiUrl, requestOptions)
        .then(response => handleResponse(response))
        .then(userData => {
            sessionStorage.setItem("id_usuario", userData.id_usuario);
            sessionStorage.setItem("nombre", userData.nombre);
            sessionStorage.setItem("apellido", userData.apellido);
            sessionStorage.setItem("token", userData.token);

            window.location.href = "dashboard.html";

        })
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
};

function logout(){
    // Eliminar el token y el id del usuario del almacenamiento
    sessionStorage.removeItem("id_usuario");
    sessionStorage.removeItem("nombre");
    sessionStorage.removeItem("apellido");
    sessionStorage.removeItem("token");

    // Redirigir al usuario a la página de inicio de sesión
    window.location.href = "index.html";
};