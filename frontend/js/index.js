function login() {
    // Obtener valores de usuario y contraseña
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    document.getElementById('mensaje-exito').style.display = 'Hola Mundo'
    setTimeout(() => {
        console.log("Retrasado por 5 segundo.");
      }, "5000");

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
            'Authorization': 'Basic ' + btoa(username + ':' + password)
        },
        body: JSON.stringify(data)
    };

    function handleResponse(response)  {
        if (!response.ok){
            return Promise.reject({message: "HTTP Code:" + response.status + " - Description:" + response.statusText})
        }
        else{
            return response.json()
        }
    }

    // Hacer la solicitud fetch
    fetch(apiUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
            // Manejar la respuesta de la API
            console.log(data);

    
            // if (data.success) {
            //     // Mostrar el mensaje de éxito
            //     document.getElementById('mensaje-exito').style.display = data.json();

            //     setTimeout(function() {
            //         window.location.href = 'dashboard.html';
            //     }, 5000);
            // } else {
            //     // Aquí puedes manejar casos de inicio de sesión no exitosos si es necesario
            // }

            // Aquí puedes realizar acciones adicionales después de iniciar sesión,
            // como redireccionar a otra página o mostrar un mensaje de éxito.
        })
        .catch(error => {
            // Manejar errores de la solicitud
            console.error('Error en la solicitud:', error);
            setTimeout(() => {
                console.log("Retrasado por 1 segundo.");
              }, "5000");
        })
        .finally( () => { 
            console.log("Promesa finalizada (resuelta o rechazada)");
            setTimeout(() => {
                console.log("Promesa Finalizasa.");
              }, "5000");
        })
}