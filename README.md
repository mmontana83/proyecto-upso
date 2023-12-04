## SISTEMA DE FACTURACION 
### BACKEND --- API RESTful implementada con Python + Flask + MYSQL
### FRONTEND --- SINGLE PAGE APPLICATION HECHO EN HTML + BOOTRSTRAP v5.3 + CSS + JAVASCRIPT + SWEETALERT.JS
### LIBRERIAS JS UTILIZADAS --- SWEETALERT2 + FLATPICKR + CHART + DATATABLES + JSPDF


### Grupo Nº 27
Integrantes:
- Lich Cristian
- Montaña Martin
- Sanchez Gerónimo
- Weinzettel Eduardo

### Desarrollo del Proyecto

<details>
<summary>Organización del Proyecto</summary>
	
### Estructura del Repositorio
El desarrollo de nuestro proyecto se ha llevado a cabo de manera estructurada, dividiendo las tareas entre dos ramas principales: Backend y Frontend. GitHub ha sido la herramienta clave para gestionar el versionado de nuestro código, permitiéndonos colaborar de manera efectiva y mantener un flujo de trabajo organizado.

### Backend
En la rama Backend, nos centramos en la construcción de la APIRestful que sirve como columna vertebral de nuestra aplicación. Desde esta rama, se han creado las diversas funcionalidades, rutas y modelos de cada entidad de nuestra base de datos. Cada componente ha sido diseñado para garantizar un modelo generalizado y reutilizable.

### Frontend
En la rama Frontend, nos dedicamos a desarrollar la interfaz de usuario, utilizando HTML y Bootstrap como esqueleto principal. Estos componentes son responsables de recibir y mostrar los datos al usuario de manera intuitiva y atractiva. La integración con el backend se lleva a cabo mediante JavaScript vanilla, aprovechando las promesas para establecer una comunicación entre el cliente y el servidor.

### Validación y Pruebas
Una vez completada la fase inicial del desarrollo, nos centramos en la validación y prueba de nuestras implementaciones. Utilizamos Thunder Client como nuestra herramienta de testeo para comprobar las rutas de la API. Esto nos asegura que todas las operaciones se ejecuten según lo previsto y que la comunicación entre el frontend y el backend sea confiable.


Con esta sólida estructura y metodología de desarrollo, nuestro proyecto avanza hacia la creación de una aplicación robusta. La colaboración entre las ramas Backend y Frontend, respaldada por las capacidades de GitHub, nos permite mantener un código base coherente y escalable a medida que continuamos implementando nuevas funcionalidades y mejoras.

</details>



## BACKEND

<details>
<summary>Instalación</summary>
	
1. Crear directorio de proyecto (PROYECTO)

2. Crear entorno virtual    **py -3 -m venv .venv**

3. Activamos el entorno virtual  **.\.venv\Scripts\activate**

4. Creamos el archivo de requisitos
 - **requirements.txt**
	+ flask == 2.3.3
	+ flask-mysqldb == 1.0.1
	+ PyJWT == 2.8.0
	+ flask-cors

5. Instalar dependencias    **pip install -r requirements.txt** 

</details>

<details>
<summary>Árbol de Directorios</summary>

6. Crear estructura de directorios
	* /PROYECTO
		* /PROYECTO/backend/api
			+ /PROYECTO/backend/api/routes
				* /PROYECTO/backend/api/routes/client.py
			+ /PROYECTO/backend/api/models
				* /PROYECTO/backend/api/models/client.py
			+ /PROYECTO/backend/api/db
				* /PROYECTO/backend/api/db/dp.py
			+ /PROYECTO/backend/api/thunder-collection
			+ /PROYECTO/backend/api/__init__.py
			+ /PROYECTO/backend/api/utils.py
			+ /PROYECTO/backend/api/PWGenerator.py
		* /PROYECTO/backend/main.py
		* /PROYECTO/backend/requirements.txt
		* /PROYECTO/backend/endpointments.txt

  		* /PROYECTO/frontend
			+ /PROYECTO/frontend/img
    			+ /PROYECTO/frontend/js
      				* /PROYECTO/frontend/js/CRUD_clientes.js
      			+ /PROYECTO/frontend/styles
      		* /PROYECTO/frontend/dashboard.html
      		* /PROYECTO/frontend/index.html

</details>

<details>
<summary>Explicación de Directorios</summary>	

### Directorios 
+ /backend carpeta principal donde se concentra la logica del proyecto
+ /backend/api organiza la estructura interna de la aplicación.
+ /backend/api/routes contiene todos los archivos relacionados con las creaciones de rutas, cada uno agrupando las rutas referidas a un mismo recurso.
+ /backend/api/models contiene todos los archivos relacionados con las definiciones de clases, principalmente para facilitar el formateo de datos desde la BD en formato JSON.
+ /backend/api/db contiene lo relacionado a la configuración y conección a la BD.

+ /frontend carpeta principal donde se organiza los archivos HTML, CSS y Javascript
+ /frontend/js contiene los archivos necesarios para realizar los fetch al back y aplicar el dinamismo al sitio web
+ /frontend/styles contiene las hojas de estilo del sitio
+ /frontend- se encuentran los archivos HTML
</details>

<details>
<summary>Diagrama de Base de Datos</summary>

A continuación un diagrama de la base de datos implementada en mysql.
En el repositorio se encuentra el script para crear la misma.
	
![image](https://github.com/mmontana83/proyecto-upso/assets/101347311/ab5e6b80-e615-417d-bf7d-c5df1cd8457c)

En cuanto al acceso a la base de datos, se decidió por el uso de stored procedures en MySQL en lugar de ejecutar consultas directamente desde el lenguaje de programación. Esto tiene varias ventajas y puede ser conveniente en ciertos escenarios. A continuación algunas razones:

### Reutilización de Código:
Almacenar consultas complejas en un procedimiento almacenado permite reutilizar el código en diferentes partes de tu aplicación sin tener que repetir la lógica de la consulta en cada lugar. Esto facilita el mantenimiento y la consistencia del código.

### Seguridad:
Los procedimientos almacenados pueden proporcionar una capa adicional de seguridad al limitar el acceso directo a las tablas y vistas. Se pueden conceder permisos específicos solo para ejecutar el procedimiento almacenado y no directamente sobre las tablas, reduciendo así el riesgo de inyección de SQL.

### Optimización del Rendimiento:
Los stored procedures se pueden compilar y almacenar en caché, lo que puede mejorar el rendimiento en comparación con la ejecución de consultas directas desde el código. Esto es especialmente útil cuando se trata de consultas complejas que se ejecutan con frecuencia.

### Abstracción de la Lógica de Negocio:
Al mover la lógica de negocio a procedimientos almacenados, se puede separar claramente la capa de acceso a datos de la lógica de la aplicación. Esto mejora la modularidad y facilita futuros cambios en la lógica sin afectar directamente a las consultas en el código.

### Facilidad en Mantenimiento:
Cambios en la lógica de la base de datos, como ajustes en las consultas o la estructura de las tablas, pueden gestionarse de manera centralizada en el stored procedure sin necesidad de modificar el código de la aplicación.

### Transacciones:
Los stored procedures pueden contener transacciones, lo que permite ejecutar varias consultas como una única unidad atómica. Esto garantiza la consistencia de los datos, ya que todas las operaciones se realizan correctamente o ninguna se realiza.
Es importante mencionar que, si bien los stored procedures tienen ventajas, también tienen algunas desventajas, como una mayor complejidad en el manejo del código y una dependencia más fuerte de la base de datos específica. 
	
</details>

<details>
<summary>Rutas API Diagrama</summary>

<img width="2720" alt="DIAGRAMA RUTA" src="https://github.com/mmontana83/proyecto-upso/assets/101347311/2df42fb5-9218-4db1-8f22-d80c21ba6aba">
	
</details>

<details>
<summary>Rutas API Rest en Detalle</summary>
	
<Rule '/login' (POST, OPTIONS) -> login>
- Parámetros de Entrada: Authentication <Username, Password>
- Json Body: None
- Json Salida: {"apellido", "email", "id_usuario", "nombre", "telefono", "token"}, 200, 401, 409

<Rule '/usuario/<id_usuario>/cliente' (GET, HEAD, OPTIONS) -> get_clientes_by_usuario>
- Parámetros de entrada: <id_usuario>
- Json Headers: user-id = <id_usuario>, x-access-token = token
- Json Body: None
- Json Respuesta: [{ "apellido", "condicionIVA", "direccion", "email", "empresa", "id_cliente", "nombre", "telefono"}, …], 200, 401, 409

<Rule '/usuario/<id_usuario>/cliente' (POST, OPTIONS) -> registrar_cliente>
- Parámetros de entrada: <id_usuario>
- Json Headers: user-id = <id_usuario>, x-access-token = token
- Json Body: {"id_cliente", "nombre", "apellido", "empresa",  "email", "telefono",  "direccion", "id_tipoCondicionIVA"}
- Json Respuesta: 200, 401, 409

<Rule '/usuario/<id_usuario>/cliente/<id_cliente>' (GET, HEAD, OPTIONS) -> get_cliente_by_id_cliente>
- Parámetros de entrada: <id_usuario>, <id_cliente>
- Json Headers: user-id = <id_usuario>, x-access-token = token
- Json Body: None
- Json Respuesta: { "apellido", "condicionIVA", "direccion", "email", "empresa", "estado", "id_cliente", "nombre", "telefono"}, 200, 401, 409

<Rule '/usuario/<id_usuario>/cliente/<id_cliente>' (POST, OPTIONS) -> actualizar_cliente>
- Parámetros de entrada: <id_usuario>, <id_cliente>
- Json Headers: user-id = <id_usuario>, x-access-token = token
- Json Body: { "nombre", "apellido", "empresa", "email", "telefono", "direccion", "id_tipoCondicionIVA"}
- Json Salida: Respuesta 200, 401, 409

<Rule '/usuario/<id_usuario>/cliente/<id_cliente>' (DELETE, OPTIONS) -> eliminar_cliente>
- Parámetros de entrada: <id_usuario>, <id_cliente>
- Json Headers: user-id = <id_usuario>, x-access-token = token
- Json Body: None
- Json Salida: Respuesta 200, 401, 409

<Rule '/usuario/<id_usuario>/cliente/<id_cliente>' (PUT, OPTIONS) -> alta_cliente>
- Parámetros de entrada: <id_usuario>, <id_cliente>
- Json Headers: user-id = <id_usuario>, x-access-token = token
- Json Body: None
- Json Salida: Respuesta 200, 401, 409

<Rule '/usuario/<id_usuario>/cliente/<id_cliente>/estado' (GET, HEAD, OPTIONS) -> get_estadocliente_by_id_cliente>
- Parámetros de entrada: <id_usuario>, <id_cliente>
- Json Headers: user-id = <id_usuario>, x-access-token = token
- Json Body: None
- Json Salida: Respuesta 200, 401, 409

<Rule '/usuario/<id_usuario>/facturas' (GET, HEAD, OPTIONS) -> get_facturas_by_usuario>
- Parámetros de entrada: <id_usuario>
- Json Headers: user-id = <id_usuario>, x-access-token = token
- Json Body: None
- Json Salida: [{"condicionIVA", "condicionVenta", "direccion", "fecha", "id_cliente", "nroFactura", "razonSocial", "telefono", "tipoFactura", "total"},…] 200, 401, 409

<Rule '/usuario/<id_usuario>/cliente/<id_cliente>/factura' (GET, HEAD, OPTIONS) -> get_facturas_by_cliente>
- Parámetros de entrada: <id_usuario>, <id_cliente>
- Json Headers: user-id = <id_usuario>, x-access-token = token
- Json Body: None
- Json Salida: [{"condicionIVA", "condicionVenta", "direccion", "fecha", "id_cliente", "nroFactura", "razonSocial", "telefono", "tipoFactura", "total"},…] 200, 401, 409

<Rule '/usuario/<id_usuario>/cliente/<id_cliente>/factura' (POST, OPTIONS) -> insertarFactura>
- Parámetros de entrada: <id_usuario>, <id_cliente>
- Json Headers: user-id = <id_usuario>, x-access-token = token
- Json Body: {"encabezado": {"fecha","total","id_tipoFactura","id_condicionVenta": 2},"detalle": [{"id_producto", "cantidad", "precio"},…]}
- Json Salida: Respuesta 200, 401, 409

<Rule '/usuario/<id_usuario>/cliente/<id_cliente>/factura/<nroFactura>' (GET, HEAD, OPTIONS) -> get_factura_by_cliente>
- Parámetros de entrada: <id_usuario>, <id_cliente>
- Json Headers: user-id = <id_usuario>, x-access-token = token
- Json Body: None
- Json Salida: [“encabezado”: {"condicionIVA", "condicionVenta", "direccion", "fecha", "id_cliente", "nroFactura", "razonSocial", "telefono", "tipoFactura", "total"}, “detalle”:[{"cantidad", "precio", "precioTotal", "producto"},…]] 200, 401, 409

<Rule '/usuario/<id_usuario>/ultimoNroFactura' (GET, HEAD, OPTIONS) -> get_ultimoNroFactura_by_usuario>
- Parámetros de entrada: <id_usuario>, <id_cliente>
- Json Headers: user-id = <id_usuario>, x-access-token = token
- Json Body: None
- Json Salida: {"id_cliente", "ultimoNroFactura"} 200, 401, 409

<Rule '/dashboard/listarTipoCondicionIVA' (GET, HEAD, OPTIONS) -> mostrarTipoCondicionIVA>
- Parámetros de entrada: None
- Json Headers: user-id = <id_usuario>, x-access-token = token
- Json Body: None
- Json Salida: [{"descripcion", "id_tipoCondicionIVA"},…], 200, 401, 409

<Rule '/dashboard/listarTipoFactura' (GET, HEAD, OPTIONS) -> mostrarTipoFactura>
- Parámetros de entrada: None
- Json Headers: user-id = <id_usuario>, x-access-token = token
- Json Body: None
- Json Salida: [{"id_tipoFactura", "tipoFactura"},…], 200, 401, 409

<Rule '/dashboard/listarTipoProducto' (GET, HEAD, OPTIONS) -> mostrarTipoProducto>
- Parámetros de entrada: None
- Json Headers: user-id = <id_usuario>, x-access-token = token
- Json Body: None
- Json Salida: [{"id_tipoProducto", "tipoProducto"},…], 200, 401, 409

<Rule '/dashboard/listarTipoCondicionVenta' (GET, HEAD, OPTIONS) -> mostrarTipoCondicionVenta>
- Parámetros de entrada: None
- Json Headers: user-id = <id_usuario>, x-access-token = token
- Json Body: None
- Json Salida: [{"descripcion ", "id_tipoCondicionVenta"},…], 200, 401, 409

<Rule '/usuario/<id_usuario>/dashboard/controlStock' (GET, HEAD, OPTIONS) -> get_controlStock>
- Parámetros de entrada: <id_usuario>
- Json Headers: user-id = <id_usuario>, x-access-token = token
- Json Body: None
- Json Salida: [{"Producto", "Stock"},…], 200, 401, 409

<Rule '/usuario/<id_usuario>/dashboard/historialVentas' (GET, HEAD, OPTIONS) -> get_historialVentas>
- Parámetros de entrada: <id_usuario>
- Json Headers: user-id = <id_usuario>, x-access-token = token
- Json Body: None
- Json Salida: {…,“2022”: {"Mes", "Venta"},…], “2023” : {"Mes", "Venta"},…],…}, 200, 401, 409

<Rule '/usuario/<id_usuario>/dashboard/movimientoStock' (GET, HEAD, OPTIONS) -> get_movimientoStock>
- Parámetros de entrada: <id_usuario>
- Json Headers: user-id = <id_usuario>, x-access-token = token
- Json Body: None
- Json Salida: [{"Cliente","Factura","Fecha", "Movimiento", "Precio", "Producto"},…], 200, 401, 409

<Rule '/usuario/<id_usuario>/dashboard/rankingVentasByCliente' (GET, HEAD, OPTIONS) -> get_rankingVentasByCliente>
- Parámetros de entrada: <id_usuario>
- Json Headers: user-id = <id_usuario>, x-access-token = token
- Json Body: None
- Json Salida: [{"Cliente","Venta"},…], 200, 401, 409

<Rule '/usuario/<id_usuario>/dashboard/rankingVentasByProducto' (GET, HEAD, OPTIONS) -> get_rankingVentasByProducto>
- Parámetros de entrada: <id_usuario>
- Json Headers: user-id = <id_usuario>, x-access-token = token
- Json Body: None
- Json Salida: [{"Producto","Venta"},…], 200, 401, 409

<Rule '/usuario/<id_usuario>/dashboard/rankingVentasByServicio' (GET, HEAD, OPTIONS) -> get_rankingVentasByServicio>
- Parámetros de entrada: <id_usuario>
- Json Headers: user-id = <id_usuario>, x-access-token = token
- Json Body: None
- Json Salida: [{"Servicio","Venta"},…], 200, 401, 409

<Rule '/usuario/<id_usuario>/dashboard/ventasTotales' (GET, HEAD, OPTIONS) -> get_ventasTotales>
- Parámetros de entrada: <id_usuario>
- Json Headers: user-id = <id_usuario>, x-access-token = token
- Json Body: None
- Json Salida: {“VentasTotales”}, 200, 401, 409

<Rule '/usuario/<id_usuario>/dashboard/ventasTotalesMesActual' (GET, HEAD, OPTIONS) -> get_ventasTotalesMesActual>
- Parámetros de entrada: <id_usuario>
- Json Headers: user-id = <id_usuario>, x-access-token = token
- Json Body: None
- Json Salida: {“VentasTotalesMesActual”}, 200, 401, 409

<Rule '/usuario/<id_usuario>/dashboard/clientesActivos' (GET, HEAD, OPTIONS) -> get_clientesActivos>
- Parámetros de entrada: <id_usuario>
- Json Headers: user-id = <id_usuario>, x-access-token = token
- Json Body: None
- Json Salida: {“ClientesActivos”}, 200, 401, 409

<Rule '/usuario/<id_usuario>/producto/<codigoProducto>' (POST, OPTIONS) -> actualizar_producto>
- Parámetros de entrada: <id_usuario>, <codigoProducto>
- Json Headers: user-id = <id_usuario>, x-access-token = token
- Json Body: { "producto", "descripcion", "precio", "stock", "id_tipoProducto"}
- Json Salida: Respuesta 200, 401, 409

<Rule '/usuario/<id_usuario>/producto/<codigoProducto>' (PUT, OPTIONS) -> post_alta_producto_by_usuario>
- Parámetros de entrada: <id_usuario>, <codigoProducto >
- Json Headers: user-id = <id_usuario>, x-access-token = token
- Json Body: None
- Json Salida: Respuesta 200, 401, 409

<Rule '/usuario/<id_usuario>/producto/<codigoProducto>' (GET, HEAD, OPTIONS) -> get_producto_by_id_usuario>
- Parámetros de entrada: <id_usuario>, <codigoProducto >
- Json Headers: user-id = <id_usuario>, x-access-token = token
- Json Body: None
- Json Salida: {"codigoProducto", "descripcion", "id_producto", "id_tipoProducto", "precio", "producto", "stock"} Respuesta 200, 401, 409

<Rule '/usuario/<id_usuario>/productos' (GET, HEAD, OPTIONS) -> get_productos_by_id_usuario>
- Parámetros de entrada: <id_usuario>, <codigoProducto >
- Json Headers: user-id = <id_usuario>, x-access-token = token
- Json Body: None
- Json Salida: [{"codigoProducto", "descripcion", "id_producto", "id_tipoProducto", "precio", "producto", "stock"},…] Respuesta 200, 401, 409

<Rule '/usuario/<id_usuario>/producto/<codigoProducto>' (DELETE, OPTIONS) -> eliminar_producto>
- Parámetros de entrada: <id_usuario>, <codigoProducto>
- Json Headers: user-id = <id_usuario>, x-access-token = token
- Json Body: None
- Json Salida: Respuesta 200, 401, 409

<Rule '/usuario/<id_usuario>/producto/' (POST, OPTIONS) -> insertar_producto>
- Parámetros de entrada: <id_usuario>
- Json Headers: user-id = <id_usuario>, x-access-token = token
- Json Body: {"codigoProducto”, “producto”, “descripción”, “precio”, “stock”, “id_tipoProducto”}
- Json Respuesta: 200, 401, 409

<Rule '/usuario/<id_usuario>/producto/<id_producto>/stock' (GET, HEAD, OPTIONS) -> get_stock_by_codigoProducto>])
- Parámetros de entrada: <id_usuario>, <id_producto>
- Json Headers: user-id = <id_usuario>, x-access-token = token
- Json Body: {"id_tipoProducto”, “stock”}
- Json Respuesta: 200, 401, 409

</details>

<details>
<summary>Diagrama de Clases y Dependencias </summary>

![DF Proyecto (1)](https://github.com/mmontana83/proyecto-upso/assets/101347311/6ed26419-9be5-4c39-97e9-7b10d5e7b470)

 
</details>

## FRONTEND

<details>
<summary>Diagrama Sitio Web</summary>

![image](https://github.com/mmontana83/proyecto-upso/assets/101347311/9fcc4099-5d76-488e-a0fa-81b20cd7a10a)

</details>

<details>
<summary>Vistas Principales</summary>
Lo primero que vemos al abrir la URL es la página de ingreso donde aparece la opción de Logueo. 
Es necesario tener una cuenta para acceder a las funcionalidades del sistema.

![image](https://github.com/mmontana83/proyecto-upso/assets/64754435/90d12db2-eb0c-4327-97d9-5020e6513438)

Luego de loguearse podemos comenzar a utilizar todas las funcionalidades que la página nos ofrece

![image](https://github.com/mmontana83/proyecto-upso/assets/64754435/73601054-e3c9-4407-b553-d91443ff5048)

####VISTA RESPONSIVE
La siguiente imagen ilustra cómo nuestra aplicación se ajusta a pantallas más pequeñas
manteniendo la usabilidad y proporcionando una experiencia fluida para los usuarios móviles.

![image](https://github.com/mmontana83/proyecto-upso/assets/64754435/068a4b50-f774-4a54-ab14-43565152556e)


</details>

<details>
<summary>Review</summary>

En la fase inicial de modelación de la base de datos, nos encontramos con ciertas dificultades, especialmente al abordar la pregunta crucial: ¿qué datos deben persistir en la tabla de facturas? La presencia de datos como el "Precio" tanto en la tabla de facturas como en la de productos generó un dilema inicial. A pesar de estos desafíos, pudimos superarlos a medida que avanzaba el proyecto.

Mientras el Backend trabajaba en la creación de las rutas, simultáneamente, el Frontend tomaba forma. Durante este proceso, surgieron diversas problemáticas que se resolvieron a medida que avanzábamos. El desarrollo del esqueleto HTML y CSS marcó el inicio del Frontend, pero en un punto crucial, tomamos la decisión de migrar hacia Bootstrap 5.3. Esta elección resultó ser un cambio acertado, ya que la flexibilidad de Bootstrap simplificó significativamente el diseño, sumando a la experiencia del usuario.

Enfrentamos un gran desafío al lidiar con la escasa experiencia en Javascript. Las horas de estudio y los tutoriales se convirtieron en una parte integral del proceso para lograr la conexión efectiva entre el Frontend y el Backend, así como la implementación de las diversas funcionalidades en cada sección de la aplicación.

Finalmente, nos sumergimos en la etapa de pruebas manuales, registrando y corrigiendo errores para depurar la aplicación. Aunque algunos problemas surgieron, solo un selecto grupo de ellos se incorporaron a nuestras correcciones finales. Esta experiencia, con sus altibajos, ha sido invaluable para el crecimiento del equipo y la mejora continua de nuestro proyecto. En conjunto, cada desafío superado ha contribuido a una aplicación más robusta y funcional.
</details>

<details>
<summary>Bugs</summary>
En este segmento se puede observar el trabajo que realizó el equipo para testear la App y se reportaron los siguientes bugs

![image](https://github.com/mmontana83/proyecto-upso/assets/64754435/0ba95737-c4c3-4e2e-9100-61a6dd4f8c5d)
![image](https://github.com/mmontana83/proyecto-upso/assets/64754435/e3381a27-de37-48a6-9eb3-f5bf977791ad)
![image](https://github.com/mmontana83/proyecto-upso/assets/64754435/f640da90-4cda-4752-a600-dd4e6e87d943)
![image](https://github.com/mmontana83/proyecto-upso/assets/64754435/ab83b436-50b3-4d31-be6f-6f76e8e36f90)

</details>

<details>
<summary>Analisis de Leyex UX</summary>

En esta sección, exploraremos las Leyes UX para evaluar el diseño de nuestra aplicación.

1. Ley de Hick: La aplicación sigue el principio de diseño sencillo e intuitivo, presentando funcionalidades básicas que no generan confusión en la realización de tareas específicas.

2. Ley de Fitts: En cuanto a la accesibilidad de las funciones, la aplicación ofrece diversas rutas para utilizarlas, brindando flexibilidad en la interacción del usuario.

3. Ley de Miller: Similar a la Ley de Hick, la aplicación presenta secciones claras y concisas, facilitando al usuario la exploración y utilización de todas las funcionalidades disponibles.

4. Ley de Jakob: La interfaz de la aplicación se asemeja a otras aplicaciones similares, proporcionando una experiencia de usabilidad consistente y familiar para el usuario.

5. Ley de Proximidad: La aplicación organiza su contenido en tres secciones principales: "Clientes", "Productos" y "Facturas", además de agrupar datos relevantes en una sección aparte llamada "Dashboard". Esta estructura mejora la navegabilidad y la comprensión de la información.

6. Ley de Pregnancia: A primera vista, el contenido principal se presenta de manera clara, con elementos cuidadosamente posicionados para una fácil distinción. La disposición visual contribuye a una experiencia de usuario efectiva y atractiva.

7.  Ley de Similitud o Semejanza: La aplicación utiliza una paleta de colores selecta, centrada principalmente en botones de tonalidad azul y botones grises para las diversas acciones. Esta consistencia visual contribuye a la claridad y coherencia del diseño. Además, las advertencias de errores o mensajes de éxito se presentan utilizando colores apropiados y predecibles, mejorando la comprensión y respuesta del usuario ante diferentes situaciones.


</details>



## MEJORAS PROPUESTAS
<details>>
<summary>Futuras versiones</summary>
	
* Se propone restringir el tipo de factura en base a la condición con respecto al IVA del cliente.
* Modificar los gráficos o forma en la cual se muestra el stock de los productos teniendo en cuenta las generalidades de las reglas de negocio.
* Utilizar API’s de terceros para mejorar el ingreso de datos o guardado de los mismos.
* Crear Nota de Crédito para anulación de Facturas.
* Que los productos con Stock 0 no se muestren o no se puedan seleccionar, para la compra.
* En el dashboard en la parte de Movimiento de Stock, al cambiar a la página siguiente te desplaza la misma y te corre de la vista de Mov. de Stock, cuando debería quedar en esa posición.
* En Agregar Cliente, el campo domicilio, debería abrirse en Provincia, Ciudad, Calle, Altura, Piso, Dep. así el sistema puede ser utilizado por usuarios con clientes en
varias provincias. Siendo más abarcativos podríamos agregar País, para aquellos que puedan vender al exterior.
* La Provincia, Ciudad y Calle (si agregamos País, también aplicaría) debería obtenerse de una Base de Datos, así evitamos errores de tipeo que distorsionen los datos de nuestra BD y ofrezca resultados de estadísticas poco confiables.
* Se podría implementar el envío de factura electrónica
* En la parte Factura,  Método de Pago se podría implementar el pago por medios electrónicos o con Aplicaciones.
* El stock podría ser un campo de Productos
* Se podría agregar un campo adicional por cada producto “stock mínimo”, que cuando el stock de ese producto llegue a esa cantidad, nos avise que hay que  realizar un pedido del producto. Este stock mínimo variará de acuerdo al producto y cuánto demore su proceso de reposición.

</details>
