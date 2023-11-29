# Importa la instancia de la aplicación 'app' desde el módulo 'api'
from api import app

# Importa funciones y recursos útiles desde 'api.utils' y otros módulos
from api.utils import token_required, client_resource, user_resources

# Importa clases y módulos necesarios desde 'flask', 'api.db.db', y 'api.models.Factura'
from flask import request, jsonify
from api.db.db import mysql
from api.models.Factura import Factura

# Ruta para obtener todas las facturas de un usuario
@app.route('/usuario/<id_usuario>/facturas', methods=['GET'])
@token_required
@user_resources
def get_facturas_by_usuario(id_usuario):
    """
    Obtiene todas las facturas asociadas a un usuario específico.

    Parámetros de Ruta:
    - id_usuario: Identificador único del usuario.

    Respuestas:
    - 200 OK: Retorna la lista de facturas en formato JSON.
    - 409 Conflict: En caso de error, se proporciona un mensaje de error en formato JSON.
    """
    try:
        return Factura.obtenerFacturasById_Usuario(id_usuario)
    except Exception as ex:
        return jsonify({'message': str(ex)}), 409

# Ruta para obtener todas las facturas de un cliente
@app.route('/usuario/<id_usuario>/cliente/<id_cliente>/factura', methods=['GET'])
@token_required
@user_resources
def get_facturas_by_cliente(id_usuario, id_cliente):
    """
    Obtiene todas las facturas asociadas a un cliente específico de un usuario.

    Parámetros de Ruta:
    - id_usuario: Identificador único del usuario.
    - id_cliente: Identificador único del cliente.

    Respuestas:
    - 200 OK: Retorna la lista de facturas en formato JSON.
    - 409 Conflict: En caso de error, se proporciona un mensaje de error en formato JSON.
    """
    try:
        return Factura.obtenerFacturasById_Cliente(id_usuario, id_cliente)
    except Exception as ex:
        return jsonify({'message': str(ex)}), 409

# Ruta para insertar una nueva factura, recibe el encabezado y el detalle en formato JSON
@app.route('/usuario/<id_usuario>/cliente/<id_cliente>/factura', methods=['POST'])
@token_required
@user_resources
def insertarFactura(id_usuario, id_cliente):
    """
    Inserta una nueva factura para un cliente específico de un usuario.

    Parámetros de Ruta:
    - id_usuario: Identificador único del usuario.
    - id_cliente: Identificador único del cliente.

    Parámetros de Solicitud (JSON):
    - Se espera un JSON con el encabezado y el detalle de la factura.

    Respuestas:
    - 200 OK: Retorna el resultado del registro en formato JSON.
    - 409 Conflict: En caso de error, se proporciona un mensaje de error en formato JSON.
    """
    try:
        # Obtiene el JSON del cuerpo de la solicitud
        json = request.get_json()

        # Separa el JSON en dos partes, una para el encabezado y otra para el detalle
        jsonEncabezadoFactura = json['encabezado']
        jsonEncabezadoFactura['id_usuario'] = id_usuario
        jsonEncabezadoFactura['id_cliente'] = id_cliente

        jsonDetalleFactura = json['detalle']

        # Llama al método 'insertarFactura' del modelo 'Factura' y devuelve el resultado como JSON
        return Factura.insertarFactura(jsonEncabezadoFactura, jsonDetalleFactura)
    except Exception as ex:
        return jsonify({'message': str(ex)}), 409

# Ruta para obtener una única factura de un cliente en particular
@app.route('/usuario/<id_usuario>/cliente/<id_cliente>/factura/<nroFactura>', methods=['GET'])
@token_required
@user_resources
def get_factura_by_cliente(id_usuario, id_cliente, nroFactura):
    """
    Obtiene los datos de una factura específica para un cliente determinado de un usuario.

    Parámetros de Ruta:
    - id_usuario: Identificador único del usuario.
    - id_cliente: Identificador único del cliente.
    - nroFactura: Número de factura único.

    Respuestas:
    - 200 OK: Retorna los datos de la factura en formato JSON.
    - 409 Conflict: En caso de error, se proporciona un mensaje de error en formato JSON.
    """
    try:
        return Factura.obtenerFacturaById_Cliente(id_usuario, id_cliente, nroFactura)
    except Exception as ex:
        # Si hay una excepción, devuelve un mensaje de error como JSON y un código de estado 409 (Conflict)
        return jsonify({'message': str(ex)}), 409
