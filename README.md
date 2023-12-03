## SISTEMA DE FACTURACION 
### BACKEND --- API RESTful implementada con Python + Flask + MYSQL
### FRONTEND --- SINGLE PAGE APPLICATION HECHO EN HTML + BOOTRSTRAP v5.3 + CSS + JAVASCRIPT + SWEETALERT.JS


### Grupo Nº 27
Integrantes:
- Lich Cristian
- Montaña Martin
- Sanchez Gerónimo
- Weinzettel Eduardo

### Desarrollo del Proyecto

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

![image](https://github.com/mmontana83/proyecto-upso/assets/101347311/935e448e-3f91-41fd-8877-d6fcb06e09e9)
	
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

## FRONTEND

<details>
<summary>Diagrama Sitio Web</summary>

![image](https://github.com/mmontana83/proyecto-upso/assets/101347311/9fcc4099-5d76-488e-a0fa-81b20cd7a10a)

</details>


