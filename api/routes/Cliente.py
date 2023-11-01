from api import app
from flask import request, jsonify
from api.db.db import mysql
from api.models.Cliente import Cliente

#Obtengo la lista de clientes de un usuario
@app.route('/usuario/<id_usuario>/clientes', methods = ['GET'])
def get_clientes_by_usuario(id_usuario):
    try:
        return jsonify(Cliente.obtenerClientesByUsuario(id_usuario))
    except Exception as ex:
        return jsonify({'mensaje':str(ex)})
    
#Obtengo los datos de un cliente en particular
@app.route('/usuario/<id_usuario>/cliente/<id_cliente>', methods = ['GET'])
def get_cliente_by_id_cliente(id_usuario, id_cliente):
    try:
        return jsonify(Cliente.obtenerClienteByIdCliente(id_usuario, id_cliente))
    except Exception as ex:
        return jsonify({'mensaje':str(ex)})
    
#Registrar un nuevo Cliente
@app.route('/usuario/<id_usuario>/nuevocliente/', methods = ['POST'])
def registrar_cliente(id_usuario):
    try:
        #Obtengo el json del front
        json = request.get_json()

        #Agrego la clave id_usuario al diccionario json
        json['id_usuario'] = id_usuario

        #Inserto el cliente en la Base de Datos
        mensaje = Cliente.insertarCliente(json)
        return jsonify(mensaje)
    except Exception as ex:
        return jsonify({'mensaje': str(ex)})
    
#Actualizar Cliente
@app.route('/usuario/<id_usuario>/actualizarcliente/<id_cliente>', methods = ['POST'])
def actualizar_cliente(id_usuario, id_cliente):
    try:
        #Obtengo el json del front
        json = request.get_json()

        #Agrego la clave id_usuario e id_cliente al diccionario json
        json['id_usuario'] = id_usuario
        json['id_cliente'] = id_cliente

        #Inserto el cliente en la Base de Datos
        mensaje = Cliente.actualizarCliente(json)
        return jsonify(mensaje)
    except Exception as ex:
        return jsonify({'mensaje': str(ex)})
    
@app.route('/usuario/<id_usuario>/eliminarcliente/<id_cliente>', methods = ['POST'])
def eliminar_cliente(id_usuario, id_cliente):
    try:
        mensaje = Cliente.eliminarCliente(id_cliente, id_usuario)
        return jsonify(mensaje)
    except Exception as ex:
        return jsonify({'mensaje': str(ex)})
    
@app.route('/usuario/<id_usuario>/altacliente/<id_cliente>', methods = ['POST'])
def alta_cliente(id_usuario, id_cliente):
    try:
        mensaje = Cliente.altaCliente(id_cliente, id_usuario)
        return jsonify(mensaje)
    except Exception as ex:
        return jsonify({'mensaje': str(ex)})