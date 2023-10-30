# API RESTful implementada con Python + Flask + MYSQL

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

6. Crear estructura de directorios
	* /PROYECTO
		* /PROYECTO/api
			+ /PROYECTO/api/routes
				* /PROYECTO/api/routes/client.py
			+ /PROYECTO/api/models
				* /PROYECTO/api/models/client.py
			+ /PROYECTO/api/db
				* /PROYECTO/api/db/dp.py
			+ /PROYECTO/api/__init__.py
			+ /PROYECTO/api/utils.py
		* /PROYECTO/main.py
		* /PROYECTO/requirements.txt
---

## Explicación:

### main.py 
Es el punto de inicio de la aplicación, su función es importar el objeto app y ejecutar su método run.

	from api import app
	import sys

	if len(sys.argv) > 1 and sys.argv[1] == "list":
		print(app.url_map)
	elif __name__ == "__main__":
		app.run( debug=True, port= 5000)

---
	
### Directorios 
+ /api organiza la estructura interna de la aplicación.
+ /api/routes contiene todos los archivos relacionados con las creaciones de rutas, cada uno agrupando las rutas referidas a un mismo recurso.
+ /api/models contiene todos los archivos relacionados con las definiciones de clases, principalmente para facilitar el formateo de datos desde la BD en formato JSON.
+ /api/db contiene lo relacionado a la configuración y conección a la BD.

---

### Archivos
**api/_\_init_\_.py** crea el objeto app como una instancia de Flask, incorpora CORS y configura la clave secreta de la aplicación. También debe importar todas las rutas para cada recurso.

	from flask import Flask
	from flask_cors import CORS
	app = Flask(__name__)
	CORS(app)
	app.config['SECRET_KEY'] = 'app_123'
	import api.routes.client
	import api.routes.user

**api/utils.py** contiene funciones genéricas que se utilizan en diferentes partes de la aplicación, por ejemplo los wrappers empleados para el control de acceso a diferentes rutas.

	from functools import wraps
	from flask import request, jsonify
	import jwt
	from api import app
	from api.db.db import mysql

	def token_required(func):
		@wraps(func)
		def decorated(\*args, \*\*kwargs):
			\# Control de token y retorno en caso de errores 
			\...
			return func(\*args, \*\*kwargs)
		return decorated
	
	\# Otras funciones ..

**api/db/db.py** contiene la configuración de la BD y crea el objeto mysql, que debe ser importado desde todos los módulos que requieran una conección a la BD.

	from api import app
	from flask_mysqldb import MySQL
	app.config['MYSQL_HOST'] = '192.168.0.254' #o reemplazar por casitamontana.ddns.net
	app.config['MYSQL_USER'] = 'proyecto'
	app.config['MYSQL_PASSWORD'] ='proyecto'
	app.config['MYSQL_DB'] = 'proyecto'
	mysql = MySQL(app)

**api/models/Cliente.py** contiene la definición de la clase Cliente, con su constructor y un método para formatear en JSON.

	class Cliente():

    def __init__(self, fila):
        self._id_cliente = fila[0]
        self._nombre = fila[1]
        self._apellido = fila[2]
        self._empresa = fila[3]
        self._email = fila[4]
        self._telefono = fila[5]
        self._direccion = fila[6]
        self._id_tipoCondicionIVA = fila[7]
        self._id_usuario = fila[8]

    @classmethod
    def sp_listarClientesByUsuarioToJson(self, fila):
        return{
            'id_cliente': fila[0],
            'nombre': fila[1],
            'apellido': fila[2],
            'empresa': fila[3],
            'email': fila[4],
            'telefono': fila[5],
            'direccion': fila[6],
            'condicionIVA': fila[7]
        }

    def to_json(self):
        return {
            'id_cliente': self._id_cliente,
            'nombre': self._nombre,
            'apellido': self._apellido,
            'empresa': self._empresa,
            'email': self._email,
            'telefono': self._telefono,
            'direccion': self._direccion,
            'id_tipoCondicionIVA': self._id_tipoCondicionIVA,
            'id_usuario': self._id_usuario
        }
   
**api/routes/Cliente.py** contiene las rutas para las operaciones CRUD del recurso client, y puede incorporar otras funcionalidades específicas sobre ese recurso. Debe importar la clase Cliente, el objeto app, el objeto mysql y las funciones de utilidades necesarias.
	
 	from api import app
    from flask import request, jsonify
    from api.db.db import mysql
    from api.models.Cliente import Cliente

    #Obtengo la lista de clientes de un usuario
    @app.route('/usuario/<id_usuario>/clientes', methods = ['GET'])
    def get_clientes_by_usuario(id_usuario):
    cur = mysql.connection.cursor()
    cur.callproc('sp_listarClientesByUsuario',[id_usuario])
    datos = cur.fetchall()

    if datos != None:
        clientes = []
        for fila in datos:
            cliente = Cliente.sp_listarClientesByUsuarioToJson(fila)
            clientes.append(cliente)
    return jsonify(clientes)

    #Obtengo los datos de un cliente en particular
    @app.route('/usuario/<id_usuario>/clientes/<id_cliente>', methods = ['GET'])
    def get_cliente_by_id_cliente(id_usuario, id_cliente):
    cur = mysql.connection.cursor()
    cur.callproc('sp_obtenerClienteByID',[id_usuario, id_cliente])
    fila = cur.fetchone()

    if fila != None:
        cliente = Cliente.sp_listarClientesByUsuarioToJson(fila)
    return jsonify(cliente)


Con esta estructura, la escalabilidad del proyecto se logra creando archivos de modelo y rutas para cada nuevo recurso que se deba incorporar.
