// Ejemplo de cómo inicializar un gráfico con Chart.js
var ctx1 = document.getElementById('chart1').getContext('2d');
var chart1 = new Chart(ctx1, {
  type: 'bar',
  data: {
    labels: ['Label 1', 'Label 2', 'Label 3'],
    datasets: [{
      label: 'Dataset 1',
      data: [10, 20, 30],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

function controlStock() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
            'user-id': id_usuario
        }
    };
    
    fetch(`127.0.0.1:5000/usuario/${id_usuario}/dashboard/controlStock`, requestOptions)
        .then(response => handleResponse(response))
        .then(
            (data) => {
                // console.log(data); 
                const tableBody = document.getElementById('all-persons');
                let list = ``;
                data.forEach(person => {
                    let fila = `<tr id="${person.id}"> 
                        <td>${person.id_cliente} </td>
                        <td>${person.nombre}</td>
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
        .catch((error) => { console.log("Promesa rechazada por", error); })
        .finally(() => {
            console.log("Promesa finalizada (resuelta o rechazada)");
        });
}