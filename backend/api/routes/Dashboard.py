from api import app
from flask import jsonify
from api.models.Dashboard import Dashboard
from api.utils import token_required

@app.route('/usuario/<id_usuario>/dashboard/controlStock', methods = ['GET'])
@token_required
def get_controlStock(id_usuario):
    try:
        return jsonify(Dashboard.controlStock(id_usuario))
    except Exception as ex:
        return jsonify({'message':str(ex)})
    
@app.route('/usuario/<id_usuario>/dashboard/historialVentas', methods = ['GET'])
@token_required
def get_historialVentas(id_usuario):
    try:
        return jsonify(Dashboard.historialVentas(id_usuario))
    except Exception as ex:
        return jsonify({'message':str(ex)})

# Obtener Movimiento de Stock
@app.route('/usuario/<id_usuario>/dashboard/movimientoStock', methods=['GET'])
@token_required
def get_movimientoStock(id_usuario):
    """
    Obtiene información sobre el movimiento de stock para un usuario específico.

    Parámetros de Ruta:
    - id_usuario: Identificador único del usuario.

    Respuestas:
    - 200 OK: Retorna información de movimiento de stock en formato JSON.
    - 409 Conflict: En caso de error, se proporciona un mensaje de error en formato JSON.
    """
    try:
        return jsonify(Dashboard.movimientoStock(id_usuario))
    except Exception as ex:
        return jsonify({'message': str(ex)})

# Obtener Ranking de Ventas por Cliente
@app.route('/usuario/<id_usuario>/dashboard/rankingVentasByCliente', methods=['GET'])
@token_required
def get_rankingVentasByCliente(id_usuario):
    """
    Obtiene el ranking de ventas por cliente para un usuario específico.

    Parámetros de Ruta:
    - id_usuario: Identificador único del usuario.

    Respuestas:
    - 200 OK: Retorna el ranking de ventas por cliente en formato JSON.
    - 409 Conflict: En caso de error, se proporciona un mensaje de error en formato JSON.
    """
    try:
        return jsonify(Dashboard.rankingVentasByCliente(id_usuario))
    except Exception as ex:
        return jsonify({'message': str(ex)})

# Obtener Ranking de Ventas por Producto
@app.route('/usuario/<id_usuario>/dashboard/rankingVentasByProducto', methods=['GET'])
@token_required
def get_rankingVentasByProducto(id_usuario):
    """
    Obtiene el ranking de ventas por producto para un usuario específico.

    Parámetros de Ruta:
    - id_usuario: Identificador único del usuario.

    Respuestas:
    - 200 OK: Retorna el ranking de ventas por producto en formato JSON.
    - 409 Conflict: En caso de error, se proporciona un mensaje de error en formato JSON.
    """
    try:
        return jsonify(Dashboard.rankingVentasByProducto(id_usuario))
    except Exception as ex:
        return jsonify({'message': str(ex)})

@app.route('/usuario/<id_usuario>/dashboard/rankingVentasByServicio', methods = ['GET'])
@token_required
def get_rankingVentasByServicio(id_usuario):
    try:
        return jsonify(Dashboard.rankingVentasByServicio(id_usuario))
    except Exception as ex:
        return jsonify({'message':str(ex)})
    
# Obtener Ventas Totales
@app.route('/usuario/<id_usuario>/dashboard/ventasTotales', methods=['GET'])
@token_required
def get_ventasTotales(id_usuario):
    """
    Obtiene información sobre las ventas totales para un usuario específico.

    Parámetros de Ruta:
    - id_usuario: Identificador único del usuario.

    Respuestas:
    - 200 OK: Retorna información de ventas totales en formato JSON.
    - 409 Conflict: En caso de error, se proporciona un mensaje de error en formato JSON.
    """
    try:
        return jsonify(Dashboard.ventasTotales(id_usuario))
    except Exception as ex:
        return jsonify({'message': str(ex)})

# Obtener Ventas Totales del Mes Actual
@app.route('/usuario/<id_usuario>/dashboard/ventasTotalesMesActual', methods=['GET'])
def get_ventasTotalesMesActual(id_usuario):
    """
    Obtiene información sobre las ventas totales del mes actual para un usuario específico.

    Parámetros de Ruta:
    - id_usuario: Identificador único del usuario.

    Respuestas:
    - 200 OK: Retorna información de ventas totales del mes actual en formato JSON.
    - 409 Conflict: En caso de error, se proporciona un mensaje de error en formato JSON.
    """
    try:
        return jsonify(Dashboard.ventasTotalesMesActual(id_usuario))
    except Exception as ex:
        return jsonify({'message': str(ex)})

# Obtener Clientes Activos
@app.route('/usuario/<id_usuario>/dashboard/clientesActivos', methods=['GET'])
def get_clientesActivos(id_usuario):
    """
    Obtiene información sobre los clientes activos para un usuario específico.

    Parámetros de Ruta:
    - id_usuario: Identificador único del usuario.

    Respuestas:
    - 200 OK: Retorna información de clientes activos en formato JSON.
    - 409 Conflict: En caso de error, se proporciona un mensaje de error en formato JSON.
    """
    try:
        return jsonify(Dashboard.clientesActivos(id_usuario))
    except Exception as ex:
        return jsonify({'message': str(ex)})
