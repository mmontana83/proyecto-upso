const { PDFDocument, rgb, StandardFonts} = require('pdf-lib');
const path = require('path');
const fs = require('fs').promises;

function login(event) {
    
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
    fetch(apiUrl, requestOptions)
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

async function guardarFacturaPDF(){

    // Especifica la ruta al archivo PDF dentro de la carpeta "res"
    const pdfPath = path.join(__dirname, '..', 'res', 'modelo-factura.pdf');

    // Lee el PDF existente
    const existingPdfBytes = await fs.readFileSync(pdfPath);
    
    // Crea un nuevo documento PDF basado en el PDF existente
    const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
    

    // Obtiene la primera página del PDF (puedes ajustar esto según tus necesidades)
    const firstPage = pdfDoc.getPages()[0];

    // // Obtiene o crea un formulario en la página
    // const form = firstPage.getForm();

    // // Define los valores para los campos del formulario
    // const campo1Valor = 'ValorCampo1';
    // const campo2Valor = 'ValorCampo2';

    // // Rellena los campos de formulario
    // form.getTextField('cliente').setText(campo1Valor);
    // form.getTextField('direccion').setText(campo2Valor);
    
    // const pdfBytes = await pdfDoc.save();
    
    // const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    // const url = URL.createObjectURL(blob);
    //  window.open(url, '_blank');

    Swal.fire({
        icon: "success",
        text: "Factura Impresa"
      })
    }

module.exports = {login, logout, guardarFacturaPDF};