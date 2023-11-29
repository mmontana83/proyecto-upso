# Importa la instancia de la aplicación 'app' desde el módulo 'api'
from api import app

# Importa funciones y recursos útiles desde 'api.utils' y otros módulos
from api.utils import token_required, client_resource, user_resources

# Importa clases y módulos necesarios desde 'flask', 'api.db.db', y 'api.models.Cliente'
from flask import request, jsonify
from api.db.db import mysql
from api.models.Cliente import Cliente

# Ruta para obtener la lista de clientes de un usuario
@app.route('/usuario/<id_usuario>/cliente', methods=['GET'])
@token_required
@user_resources
def get_clientes_by_usuario(id_usuario):
    """
    Obtiene la lista de clientes asociados a un usuario específico.

    Parámetros de Ruta:
    - id_usuario: Identificador único del usuario.

    Respuestas:
    - 200 OK: Retorna la lista de clientes en formato JSON.
    - 409 Conflict: En caso de error, se proporciona un mensaje de error en formato JSON.
    """

    try:
        return Cliente.obtenerClientesByUsuario(id_usuario)
    except Exception as ex:
        return jsonify({'message': str(ex)}), 409

# Ruta para registrar un nuevo cliente
@app.route('/usuario/<id_usuario>/cliente', methods=['POST'])
@token_required
@user_resources
def registrar_cliente(id_usuario):
    """
    Registra un nuevo cliente para un usuario específico.

    Parámetros de Ruta:
    - id_usuario: Identificador único del usuario.

    Parámetros de Solicitud (JSON):
    - Se espera un JSON con la información del cliente.

    Respuestas:
    - 200 OK: Retorna el resultado del registro en formato JSON.
    - 409 Conflict: En caso de error, se proporciona un mensaje de error en formato JSON.
    """
    try:
        # Obtiene el JSON del cuerpo de la solicitud
        json = request.get_json()

        # Agrega la clave 'id_usuario' al diccionario 'json'
        json['id_usuario'] = id_usuario

        # Inserta el cliente en la Base de Datos llamando al método 'insertarCliente' del modelo 'Cliente'
        return Cliente.insertarCliente(json)
    except Exception as ex:
        return jsonify({'message': str(ex)}), 409

# Ruta para obtener los datos de un cliente en particular
@app.route('/usuario/<id_usuario>/cliente/<id_cliente>', methods=['GET'])
@token_required
@user_resources
@client_resource
def get_cliente_by_id_cliente(id_usuario, id_cliente):
    """
    Obtiene los datos de un cliente específico para un usuario determinado.

    Parámetros de Ruta:
    - id_usuario: Identificador único del usuario.
    - id_cliente: Identificador único del cliente.

    Respuestas:
    - 200 OK: Retorna los datos del cliente en formato JSON.
    - 409 Conflict: En caso de error, se proporciona un mensaje de error en formato JSON.
    """
    try:
        return Cliente.obtenerClienteByIdCliente(id_usuario, id_cliente)
    except Exception as ex:
        return jsonify({'message': str(ex)}), 409

# Ruta para actualizar un cliente
@app.route('/usuario/<id_usuario>/cliente/<id_cliente>', methods=['POST'])
@token_required
@user_resources
@client_resource
def actualizar_cliente(id_usuario, id_cliente):
    """
    Actualiza los datos de un cliente específico para un usuario determinado.

    Parámetros de Ruta:
    - id_usuario: Identificador único del usuario.
    - id_cliente: Identificador único del cliente.

    Parámetros de Solicitud (JSON):
    - Se espera un JSON con la información actualizada del cliente.

    Respuestas:
    - 200 OK: Retorna el resultado de la actualización en formato JSON.
    - 409 Conflict: En caso de error, se proporciona un mensaje de error en formato JSON.
    """
    try:
        # Obtiene el JSON del cuerpo de la solicitud
        json = request.get_json()

        # Agrega las claves 'id_usuario' e 'id_cliente' al diccionario 'json'
        json['id_usuario'] = id_usuario
        json['id_cliente'] = id_cliente

        # Actualiza el cliente en la Base de Datos llamando al método 'actualizarCliente' del modelo 'Cliente'
        return Cliente.actualizarCliente(json)
    except Exception as ex:
        return jsonify({'message': str(ex)}), 409

# Ruta para eliminar un cliente (eliminación lógica)
@app.route('/usuario/<id_usuario>/cliente/<id_cliente>', methods=['DELETE'])
@token_required
@user_resources
@client_resource
def eliminar_cliente(id_usuario, id_cliente):
    """
    Elimina lógicamente un cliente específico asociado a un usuario.

    Parámetros de Ruta:
    - id_usuario: Identificador único del usuario.
    - id_cliente: Identificador único del cliente.

    Respuestas:
    - 200 OK: Retorna el resultado de la eliminación en formato JSON.
    - 409 Conflict: En caso de error, se proporciona un mensaje de error en formato JSON.
    """
    try:
        # Llama al método 'eliminarCliente' del modelo 'Cliente' y devuelve el resultado como JSON
        return Cliente.eliminarCliente(id_cliente, id_usuario)
    except Exception as ex:
        return jsonify({'message': str(ex)}), 409

# Ruta para dar de alta nuevamente a un cliente que fue eliminado lógicamente
@app.route('/usuario/<id_usuario>/cliente/<id_cliente>', methods=['PUT'])
@token_required
@user_resources
@client_resource
def alta_cliente(id_usuario, id_cliente):
    """
    Da de alta nuevamente a un cliente que fue eliminado lógicamente.

    Parámetros de Ruta:
    - id_usuario: Identificador único del usuario.
    - id_cliente: Identificador único del cliente.

    Respuestas:
    - 200 OK: Retorna el resultado del alta en formato JSON.
    - 409 Conflict: En caso de error, se proporciona un mensaje de error en formato JSON.
    """
    try:
        # Llama al método 'altaCliente' del modelo 'Cliente' y devuelve el resultado como JSON
        return Cliente.altaCliente(id_cliente, id_usuario)
    except Exception as ex:
        return jsonify({'message': str(ex)}), 409


