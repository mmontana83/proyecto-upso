from api import app
from flask import request, jsonify
from api.db.db import mysql
from api.models.Producto import Producto

# ---------- Atualizacion/Modificacion de un producto by usuario -------------------
# ------------------------------------anda ok --------------------------------------

@app.route('/usuario/<id_usuario>/producto/<codigoProducto>', methods=['POST'])
def actualizar_producto(id_usuario, codigoProducto):
    try:       
        json = request.get_json()
        
        json['id_usuario'] = id_usuario
        json['codigoProducto'] = codigoProducto 

        mensaje = Producto.actualizarProducto(json)
        return jsonify(mensaje)
    except Exception as ex:
        return jsonify({'mensaje': str(ex)})
    
# ----------------------------------- fin  --------------------------------------   
 

# ----------------------------- alta producto by usuario ------------------------
# ------------------------------------anda ok -----------------------------------

# Alta de un producto, los produtos en esta tabla se les cambia de estado, es decir
# no se hace el borrado logico, se les cambia de estado: 1 es ACTIVO, 2 es BAJA

@app.route('/usuario/<id_usuario>/AltaProducto/<codigoProducto>', methods=['POST'])
def post_alta_producto_by_usuario(id_usuario, codigoProducto):
    try:
        return jsonify(Producto.altaProductoByUsuario(id_usuario, codigoProducto))
    except Exception as ex:
        return jsonify({'mensaje': str(ex)})
    
# -------------------------------- fin alta prodcucto by usuario -----------------




# ------------obtener un determinado producto de un usuario en particular -----------
# ----------------------------------- anda ok ---------------------------------------

# --------- este metodo obtiene los productos de un usuario en particular -----------

@app.route('/usuario/<id_usuario>/producto/<codigoProducto>', methods=['GET'])
def get_producto_by_id_usuario(id_usuario, codigoProducto):
    try:        
        return jsonify(Producto.obtenerProductoByUsuario(id_usuario, codigoProducto))        
    except Exception as ex:
        return jsonify({'mensaje': str(ex)})
    
# ------------------------------- fin obtener producto por usuario ----------------
    



# ------------- obtener todos los productos de un determinado usuario ------------
# ----------------------------- NO ANDA ------------------------------------------

@app.route('/usuario/<id_usuario>/productos', methods=['GET'])
def get_productos_by_id_usuario(id_usuario):

    try:
        return jsonify(Producto.obtenerProductosByUsuario(id_usuario))
    except Exception as ex:
        return jsonify({'mensaje': str(ex)})
    
# ------------------------------ fin metodo --------------------------------

    

# ----------------------------- Eliminar producto by usuario -------------------
# ------------------------------------anda ok ----------------------------------

# eliminar un producto, los produtos en esta tabla se les cambia de estado, es decir
# no se hace el borrado logico, se les cambia de estado: 1 es ACTIVO, 2 es BAJA


@app.route('/usuario/<id_usuario>/Producto/<codigoProducto>', methods=['DELETE'])
def eliminar_producto(id_usuario, codigoProducto):    
    try:
        mensaje = Producto.eliminarProducto(id_usuario, codigoProducto)
        return jsonify(mensaje)
    except Exception as ex:
        return jsonify({'mensaje': str(ex)})
    
# ----------------------------------- fin Eliminar  -----------------


@app.route('/usuario/<id_usuario>/insertarProducto/<cod_producto>', methods = ['PUT'])
def insertar_producto(id_usuario, cod_producto):
    try:
        json = request.get_json()      
        json['id_usuario'] = id_usuario
        json['codigoProducto'] = cod_producto

        print('route', id_usuario, cod_producto)
        print(json)
           
        mensaje = Producto.insertarProductoByUsuario(json)
        return jsonify(mensaje)
    except Exception as ex:
        return jsonify({'mensaje': str(ex)})

