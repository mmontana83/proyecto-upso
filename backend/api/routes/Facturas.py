from api import app
from api.utils import token_required, client_resource, user_resources
from flask import request, jsonify
from api.db.db import mysql
from api.models.Factura import Factura

#Obtengo todas las facturas de un usuario
@app.route('/usuario/<id_usuario>/facturas', methods = ['GET'])
@token_required
@user_resources
def get_facturas_by_usuario(id_usuario):
    try:
        return Factura.obtenerFacturasById_Usuario(id_usuario)
    except Exception as ex:
        return jsonify({'message':str(ex)}), 409
    
#Obtengo todas las facturas de un cliente
@app.route('/usuario/<id_usuario>/cliente/<id_cliente>/factura', methods = ['GET'])
@token_required
@user_resources
def get_facturas_by_cliente(id_usuario, id_cliente):
    try:
        return Factura.obtenerFacturasById_Cliente(id_usuario, id_cliente)
    except Exception as ex:
        return jsonify({'message':str(ex)}), 409
    
#Inserto una factura nueva. Debo recibir en json el encabezado y detalle
@app.route('/usuario/<id_usuario>/cliente/<id_cliente>/factura', methods = ['POST'])
@token_required
@user_resources
def insertarFactura(id_usuario, id_cliente):
    try:
        #Obtengo el json del request
        json = request.get_json()

        #Lo separo en dos json. Uno para el encabezado y otro para el detalle
        jsonEncabezadoFactura = json['encabezado']
        jsonEncabezadoFactura['id_usuario'] = id_usuario
        jsonEncabezadoFactura['id_cliente'] = id_cliente

        jsonDetalleFactura = json['detalle']

        return Factura.insertarFactura(jsonEncabezadoFactura, jsonDetalleFactura)
    except Exception as ex:
        return jsonify({'message':str(ex)}), 409

#Obtengo una única factura de un cliente en particular
@app.route('/usuario/<id_usuario>/cliente/<id_cliente>/factura/<nroFactura>', methods = ['GET'])
@token_required
@user_resources
def get_factura_by_cliente(id_usuario, id_cliente, nroFactura):
    try:
        return Factura.obtenerFacturaById_Cliente(id_usuario, id_cliente, nroFactura)
    except Exception as ex:
        return jsonify({'message':str(ex)}), 409