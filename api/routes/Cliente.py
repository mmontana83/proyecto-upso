from api import app
from flask import request, jsonify
from api.db.db import mysql
from api.models.Cliente import Cliente

#Obtengo la lista de clientes de un usuario
@app.route('/usuario/<id_usuario>/clientes', methods = ['GET'])
def get_clientes_by_usuario(id_usuario):
    try:
        cur = mysql.connection.cursor()
        cur.callproc('sp_listarClientesByUsuario',[id_usuario])
        datos = cur.fetchall()
        
        if datos != None:
            clientes = []
            for fila in datos:
                cliente = Cliente.sp_listarClientesByUsuarioToJson(fila)
                clientes.append(cliente)
        return jsonify(clientes)
    except Exception as ex:
        return jsonify({'mensaje': 'Error'})
    
#Obtengo los datos de un cliente en particular
@app.route('/usuario/<id_usuario>/clientes/<id_cliente>', methods = ['GET'])
def get_cliente_by_id_cliente(id_usuario, id_cliente):
    try:
        cur = mysql.connection.cursor()
        cur.callproc('sp_obtenerClienteByID',[id_usuario, id_cliente])
        fila = cur.fetchone()
        
        if fila != None:
            cliente = Cliente.sp_listarClientesByUsuarioToJson(fila)
        return jsonify(cliente)
    except Exception as ex:
        return jsonify({'mensaje': 'Error'})
    
#Registrar un nuevo Cliente
@app.route('/usuario/<id_usuario>/nuevocliente/', methods = ['POST'])
def registrar_cliente(id_usuario):
    try:
        print(request.json)
        cur = mysql.connection.cursor()
        cur.callproc('sp_insertarCliente',[request.json['id_cliente'], request.json['nombre'], request.json['apellido'], 
                                           request.json['empresa'], request.json['email'], request.json['telefono'],
                                           request.json['direccion'], request.json['id_tipoCondicionIVA'], id_usuario])
        mysql.connection.commit() #Esto confirma la acción de inserción
        return jsonify({'mensaje':'Cliente Registrado'})
    except Exception as ex:
        return jsonify({'mensaje': 'Error'})