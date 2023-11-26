from api import app
from flask import request, jsonify
from api.utils import token_required, user_resources
from api.db.db import mysql
from api.models.Producto import Producto

# ---------- Atualizacion/Modificacion de un producto by usuario -------------------
# ------------------------------------anda ok --------------------------------------

@app.route('/usuario/<id_usuario>/producto/<codigoProducto>', methods=['POST'])
@token_required
@user_resources
def actualizar_producto(id_usuario, codigoProducto):
    try:       
        json = request.get_json()
        
        json['id_usuario'] = id_usuario
        json['codigoProducto'] = codigoProducto 

        return Producto.actualizarProducto(json)
    except Exception as ex:
        return jsonify({'message': str(ex)})
    
# ----------------------------------- fin  --------------------------------------   
 

# ----------------------------- alta producto by usuario ------------------------
# ------------------------------------anda ok -----------------------------------

# Alta de un producto, los produtos en esta tabla se les cambia de estado, es decir
# no se hace el borrado logico, se les cambia de estado: 1 es ACTIVO, 2 es BAJA

@app.route('/usuario/<id_usuario>/producto/<codigoProducto>', methods=['PUT'])
@token_required
@user_resources
def post_alta_producto_by_usuario(id_usuario, codigoProducto):
    try:
        return Producto.altaProductoByUsuario(id_usuario, codigoProducto)
    except Exception as ex:
        return jsonify({'message': str(ex)}), 409
    
# -------------------------------- fin alta prodcucto by usuario -----------------




# ------------obtener un determinado producto de un usuario en particular -----------
# ----------------------------------- anda ok ---------------------------------------

# --------- este metodo obtiene los productos de un usuario en particular -----------

@app.route('/usuario/<id_usuario>/producto/<codigoProducto>', methods=['GET'])
@token_required
@user_resources
def get_producto_by_id_usuario(id_usuario, codigoProducto):
    try:        
        return Producto.obtenerProductoByUsuario(id_usuario, codigoProducto)
    except Exception as ex:
        return jsonify({'message': str(ex)}), 409
    
# ------------------------------- fin obtener producto por usuario ----------------
    



# ------------- obtener todos los productos de un determinado usuario ------------
# ----------------------------- NO ANDA ------------------------------------------

@app.route('/usuario/<id_usuario>/productos', methods=['GET'])
@token_required
@user_resources
def get_productos_by_id_usuario(id_usuario):

    try:
        return Producto.obtenerProductosByUsuario(id_usuario)
    except Exception as ex:
        return jsonify({'message': str(ex)}), 409
    
# ------------------------------ fin metodo --------------------------------

    

# ----------------------------- Eliminar producto by usuario -------------------
# ------------------------------------anda ok ----------------------------------

# eliminar un producto, los produtos en esta tabla se les cambia de estado, es decir
# no se hace el borrado logico, se les cambia de estado: 1 es ACTIVO, 2 es BAJA


@app.route('/usuario/<id_usuario>/producto/<codigoProducto>', methods=['DELETE'])
@token_required
@user_resources
def eliminar_producto(id_usuario, codigoProducto):    
    try:
        return Producto.eliminarProducto(id_usuario, codigoProducto)
    except Exception as ex:
        return jsonify({'message': str(ex)}), 409
    
# ----------------------------------- fin Eliminar  -----------------


@app.route('/usuario/<id_usuario>/producto/', methods = ['POST'])
@token_required
@user_resources
def insertar_producto(id_usuario):
    try:
        json = request.get_json()      
        json['id_usuario'] = id_usuario

        return Producto.insertarProductoByUsuario(json)
    except Exception as ex:
        return jsonify({'message': str(ex)})
    

@app.route('/usuario/<id_usuario>/producto/<codigoProducto>/stock', methods=['GET'])
@token_required
@user_resources
def get_stock_by_codigoProducto(id_usuario, codigoProducto):
    try:
        return Producto.obtenerStockPorProducto(id_usuario, codigoProducto)
    except Exception as ex:
        return jsonify({'message': str(ex)}), 409