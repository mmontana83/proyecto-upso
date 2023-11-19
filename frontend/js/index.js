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
            
            //response.json().then(data => console.log(data.message));
            return Promise.reject(response);
            
            //return Promise.reject({message: "HTTP Code: " + response.status + " - Description: " + response.statusText});          
        }
        else{
            return response.json();
        }
    }

    // Hacer la solicitud fetch
    fetch(apiUrl, requestOptions)
        .then(response => handleResponse(response))
        .then(userData => {
            const id_usuario = encodeURIComponent(userData.id_usuario);
            const nombre = encodeURIComponent(userData.nombre);
            const apellido = encodeURIComponent(userData.apellido);
            const token = encodeURIComponent(userData.token);
            
            window.location.href = `dashboard.html?id_usuario=${id_usuario}&nombre=${nombre}&apellido=${apellido}&token=${token}`;
        })
        .catch(async error => {
            await error.json().then(er => alert(er.mensaje));
        })
        .finally( () => { 
            console.log("Promesa finalizada (resuelta o rechazada)");
        })
};