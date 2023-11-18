from api import app
from api.utils import token_required, client_resource, user_resources
from flask import request, jsonify
from api.db.db import mysql
from api.models.Cliente import Cliente

#Obtengo la lista de clientes de un usuario
@app.route('/usuario/<id_usuario>/cliente', methods = ['GET'])
@token_required
@user_resources
def get_clientes_by_usuario(id_usuario):
    try:
        return Cliente.obtenerClientesByUsuario(id_usuario)
    except Exception as ex:
        return jsonify({'mensaje':str(ex)}), 409
    
#Registrar un nuevo Cliente
@app.route('/usuario/<id_usuario>/cliente', methods = ['POST'])
def registrar_cliente(id_usuario):
    try:
        #Obtengo el json del front
        json = request.get_json()

        #Agrego la clave id_usuario al diccionario json
        json['id_usuario'] = id_usuario

        #Inserto el cliente en la Base de Datos
        return Cliente.insertarCliente(json)
    except Exception as ex:
        return jsonify({'mensaje': str(ex)}), 409

#Obtengo los datos de un cliente en particular
@app.route('/usuario/<id_usuario>/cliente/<id_cliente>', methods = ['GET'])
@token_required
@user_resources
@client_resource
def get_cliente_by_id_cliente(id_usuario, id_cliente):
    try:
        return Cliente.obtenerClienteByIdCliente(id_usuario, id_cliente)
    except Exception as ex:
        return jsonify({'mensaje':str(ex)}), 409
    
#Actualizar Cliente
@app.route('/usuario/<id_usuario>/cliente/<id_cliente>', methods = ['POST'])
def actualizar_cliente(id_usuario, id_cliente):
    try:
        #Obtengo el json del front
        json = request.get_json()

        #Agrego la clave id_usuario e id_cliente al diccionario json
        json['id_usuario'] = id_usuario
        json['id_cliente'] = id_cliente

        #Inserto el cliente en la Base de Datos
        return Cliente.actualizarCliente(json)
    except Exception as ex:
        return jsonify({'mensaje': str(ex)}), 409

#Eliminar Cliente (Eliminado Lógico)    
@app.route('/usuario/<id_usuario>/cliente/<id_cliente>', methods = ['DELETE'])
def eliminar_cliente(id_usuario, id_cliente):
    try:
        return Cliente.eliminarCliente(id_cliente, id_usuario)
    except Exception as ex:
        return jsonify({'mensaje': str(ex)}), 409

#Este método es para volver a dar de alta un usuario que fue registrado y eliminado logicamente.    
@app.route('/usuario/<id_usuario>/cliente/<id_cliente>', methods = ['PUT'])
def alta_cliente(id_usuario, id_cliente):
    try:
        return Cliente.altaCliente(id_cliente, id_usuario)
    except Exception as ex:
        return jsonify({'mensaje': str(ex)}), 409