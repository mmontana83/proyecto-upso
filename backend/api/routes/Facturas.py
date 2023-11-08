from api import app
from api.utils import token_required, client_resource, user_resources
from flask import request, jsonify
from api.db.db import mysql
from api.models.Factura import Factura

#Obtengo la lista de clientes de un usuario
@app.route('/usuario/<id_usuario>/facturas', methods = ['GET'])
def get_facturas_by_usuario(id_usuario):
    try:
        return jsonify(Factura.obtenerFacturasById_Usuario(id_usuario))
    except Exception as ex:
        return jsonify({'mensaje':str(ex)})