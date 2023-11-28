# Importar la aplicación Flask y otros módulos necesarios
from api import app
from flask import request, jsonify

# Importar funciones y clases personalizadas
from api.utils import token_required, user_resources
from api.db.db import mysql
from api.models.Producto import Producto



# Ruta para la actualización/modificación de un producto por parte de un usuario
@app.route('/usuario/<id_usuario>/producto/<codigoProducto>', methods=['POST'])

# Decorador que requiere un token de autenticación para acceder a la función
@token_required
@user_resources
def actualizar_producto(id_usuario, codigoProducto):
    """
    Actualiza un producto específico para un usuario.

    Parameters:
        id_usuario (str): Identificador del usuario.
        codigoProducto (str): Código del producto a actualizar.

    Returns:
        jsonify: Respuesta JSON con el resultado de la actualización o un mensaje de error.

    Example:
        actualizar_producto('123', 'ABC123')
    """
    try:
        # Obtener datos JSON de la solicitud
        json = request.get_json()

        # Agregar información de usuario y código de producto a los datos JSON
        json['id_usuario'] = id_usuario
        json['codigoProducto'] = codigoProducto

        # Llamar al método estático actualizarProducto de la clase Producto
        return Producto.actualizarProducto(json)
    except Exception as ex:
        # Devolver un mensaje de error en formato JSON en caso de excepción
        return jsonify({'message': str(ex)})

    
# ----------------------------------- fin  --------------------------------------   
 

# ----------------------------- alta producto by usuario ------------------------


# Alta de un producto, los produtos en esta tabla se les cambia de estado, es decir
# no se hace el borrado logico, se les cambia de estado: 1 es ACTIVO, 2 es BAJA

# Ruta para dar de alta un producto por parte de un usuario
@app.route('/usuario/<id_usuario>/producto/<codigoProducto>', methods=['PUT'])

# Decorador que requiere un token de autenticación para acceder a la función
@token_required
@user_resources
def post_alta_producto_by_usuario(id_usuario, codigoProducto):
    """
    Da de alta un producto específico para un usuario, cambiando su estado.

    Parameters:
        id_usuario (str): Identificador del usuario.
        codigoProducto (str): Código del producto a dar de alta.

    Returns:
        jsonify: Respuesta JSON con el resultado de la operación o un mensaje de error.

    Example:
        post_alta_producto_by_usuario('123', 'ABC123')
    """
    try:
        # Llamar al método estático altaProductoByUsuario de la clase Producto
        return Producto.altaProductoByUsuario(id_usuario, codigoProducto)
    except Exception as ex:
        # Devolver un mensaje de error en formato JSON en caso de excepción
        return jsonify({'message': str(ex)}), 409
    
# -------------------------------- fin alta prodcucto by usuario -----------------




# ------------obtener un determinado producto de un usuario en particular -----------

# --------- este metodo obtiene los productos de un usuario en particular -----------

@app.route('/usuario/<id_usuario>/producto/<codigoProducto>', methods=['GET'])
@token_required
@user_resources
def get_producto_by_id_usuario(id_usuario, codigoProducto):
    """
    Obtiene un producto específico para un usuario.

    Parameters:
        id_usuario (str): Identificador del usuario.
        codigoProducto (str): Código del producto a obtener.

    Returns:
        jsonify: Respuesta JSON con el producto solicitado o un mensaje de error.

    Example:
        get_producto_by_id_usuario('123', 'ABC123')
    """
    try:
        # Llamar al método estático obtenerProductoByUsuario de la clase Producto
        return Producto.obtenerProductoByUsuario(id_usuario, codigoProducto)
    except Exception as ex:
        # Devolver un mensaje de error en formato JSON en caso de excepción
        return jsonify({'message': str(ex)}), 409
    
# ------------------------------- fin obtener producto por usuario ----------------   


# ------------- obtener todos los productos de un determinado usuario ------------

@app.route('/usuario/<id_usuario>/productos', methods=['GET'])
@token_required
@user_resources
def get_productos_by_id_usuario(id_usuario):
    """
    Obtiene todos los productos de un usuario específico.

    Parameters:
        id_usuario (str): Identificador del usuario.

    Returns:
        jsonify: Respuesta JSON con la lista de productos del usuario o un mensaje de error.

    Example:
        get_productos_by_id_usuario('123')
    """
    try:
        # Llamar al método estático obtenerProductosByUsuario de la clase Producto
        return Producto.obtenerProductosByUsuario(id_usuario)
    except Exception as ex:
        # Devolver un mensaje de error en formato JSON en caso de excepción
        return jsonify({'message': str(ex)}), 409
    
# ------------------------------ fin metodo --------------------------------

    

# ----------------------------- Eliminar producto by usuario -------------------

# eliminar un producto, los produtos en esta tabla se les cambia de estado, es decir
# no se hace el borrado logico, se les cambia de estado: 1 es ACTIVO, 2 es BAJA
# Ruta para eliminar un producto por parte de un usuario
@app.route('/usuario/<id_usuario>/producto/<codigoProducto>', methods=['DELETE'])
@token_required
@user_resources

def eliminar_producto(id_usuario, codigoProducto):
    """
    Elimina un producto específico para un usuario.

    Parameters:
        id_usuario (str): Identificador del usuario.
        codigoProducto (str): Código del producto a eliminar.

    Returns:
        jsonify: Respuesta JSON con el resultado de la operación o un mensaje de error.

    Example:
        eliminar_producto('123', 'ABC123')
    """
    try:
        # Llamar al método estático eliminarProducto de la clase Producto
        return Producto.eliminarProducto(id_usuario, codigoProducto)
    except Exception as ex:
        # Devolver un mensaje de error en formato JSON en caso de excepción
        return jsonify({'message': str(ex)}), 409
    
# ----------------------------------- fin Eliminar  -----------------

# Ruta para insertar un nuevo producto por parte de un usuario
@app.route('/usuario/<id_usuario>/producto/', methods=['POST'])
@token_required
@user_resources
def insertar_producto(id_usuario):
    """
    Inserta un nuevo producto para un usuario.

    Parameters:
        id_usuario (str): Identificador del usuario.

    Returns:
        jsonify: Respuesta JSON con el resultado de la operación o un mensaje de error.

    Example:
        insertar_producto('123')
    """
    try:
        # Obtener datos JSON de la solicitud
        json = request.get_json()

        # Agregar información de usuario a los datos JSON
        json['id_usuario'] = id_usuario

        # Llamar al método estático insertarProductoByUsuario de la clase Producto
        return Producto.insertarProductoByUsuario(json)
    except Exception as ex:
        # Devolver un mensaje de error en formato JSON en caso de excepción
        return jsonify({'message': str(ex)})
    
# Ruta para obtener el stock de un producto por parte de un usuario
@app.route('/usuario/<id_usuario>/producto/<codigoProducto>/stock', methods=['GET'])
@token_required
@user_resources
def get_stock_by_codigoProducto(id_usuario, codigoProducto):
    """
    Obtiene el stock de un producto específico para un usuario .

    Parameters:
        id_usuario (str): Identificador del usuario.
        codigoProducto (str): Código del producto.

    Returns:
        jsonify: Respuesta JSON con el stock del producto o un mensaje de error.

    Example:
        get_stock_by_codigoProducto('123', 'ABC123')
    """
    try:
        # Llamar al método estático obtenerStockPorProducto de la clase Producto
        return Producto.obtenerStockPorProducto(id_usuario, codigoProducto)
    except Exception as ex:
        # Devolver un mensaje de error en formato JSON en caso de excepción
        return jsonify({'message': str(ex)}), 409