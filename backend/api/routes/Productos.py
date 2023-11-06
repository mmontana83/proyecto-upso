from api import app
from flask import request, jsonify
from api.db.db import mysql
from api.models.Cliente import Cliente
from api.models.Producto import Producto

@app.route('/usuario/<id_usuario>/producto/<id_producto>', methods=['GET'])
def get_producto_by_id_usuario(id_usuario, id_producto):
    """
    Obtiene los detalles de un producto específico asociado a un usuario.

    Args:
        id_usuario (str): ID del usuario.
        id_producto (str): ID del producto.

    Returns:
        dict: Detalles del producto o un mensaje de error.
    """
    try:
        return jsonify(Producto.obtenerProductoByUsuario(id_usuario, id_producto))
    except Exception as ex:
        return jsonify({'mensaje': str(ex)})
    

@app.route('/usuario/<id_usuario>/productos', methods=['GET'])
def get_productos_by_id_usuario(id_usuario):
    """
    Obtiene una lista de productos asociados a un usuario.

    Args:
        id_usuario (str): ID del usuario.

    Returns:
        dict: Lista de productos o un mensaje de error.
    """
    try:
        return jsonify(Producto.obtenerProductoByUsuario(id_usuario))
    except Exception as ex:
        return jsonify({'mensaje': str(ex)})
    

@app.route('/usuario/<id_usuario>/producto/<id_producto>', methods=['POST'])
def post_alta_producto_by_usuario(id_usuario, id_producto):
    """
    Realiza una acción para dar de alta un producto específico asociado a un usuario.

    Args:
        id_usuario (str): ID del usuario.
        id_producto (str): ID del producto.

    Returns:
        dict: Mensaje de éxito o error.
    """
    try:
        return jsonify(Producto.altaProductoByUsuario(id_usuario, id_producto))
    except Exception as ex:
        return jsonify({'mensaje': str(ex)})
    
    
@app.route('/usuario/<id_usuario>/actualizarproducto/<id_producto>', methods=['POST'])
def actualizar_producto(id_usuario, id_producto):
    try:
        # Obtiene el JSON del front-end
        json = request.get_json()

        # Agrega la clave id_usuario e id_cliente al diccionario JSON
        json['id_usuario'] = id_usuario
        json['id_producto'] = id_producto

        # Actualiza el cliente en la Base de Datos
        mensaje = Producto.actualizarProducto(json)
        return jsonify(mensaje)
    except Exception as ex:
        return jsonify({'mensaje': str(ex)})
    

@app.route('/usuario/<id_usuario>/eliminarProducto/<id_producto>', methods=['POST'])
def eliminar_producto(id_usuario, id_producto):
    """
    Elimina un producto de la base de datos.

    Args:
        id_usuario (int): ID del usuario.
        id_producto (int): ID del producto a eliminar.

    Returns:
        dict: Un objeto JSON que contiene un mensaje de éxito o error.
    """
    try:
        mensaje = Producto.eliminarProducto(id_usuario, id_producto)
        return jsonify(mensaje)
    except Exception as ex:
        return jsonify({'mensaje': str(ex)})