from api import app
from api.models.Dashboard import Dashboard
from flask import jsonify

@app.route('/usuario/<id_usuario>/dashboard/controlStock', methods = ['GET'])
def get_controlStock(id_usuario):
    try:
        return jsonify(Dashboard.controlStock(id_usuario))
    except Exception as ex:
        return jsonify({'message':str(ex)})
    
@app.route('/usuario/<id_usuario>/dashboard/historialVentas', methods = ['GET'])
def get_historialVentas(id_usuario):
    try:
        return jsonify(Dashboard.historialVentas(id_usuario))
    except Exception as ex:
        return jsonify({'message':str(ex)})
    
@app.route('/usuario/<id_usuario>/dashboard/movimientoStock', methods = ['GET'])
def get_movimientoStock(id_usuario):
    try:
        return jsonify(Dashboard.movimientoStock(id_usuario))
    except Exception as ex:
        return jsonify({'message':str(ex)})

@app.route('/usuario/<id_usuario>/dashboard/rankingVentasByCliente', methods = ['GET'])
def get_rankingVentasByCliente(id_usuario):
    try:
        return jsonify(Dashboard.rankingVentasByCliente(id_usuario))
    except Exception as ex:
        return jsonify({'message':str(ex)})
    
@app.route('/usuario/<id_usuario>/dashboard/rankingVentasByProducto', methods = ['GET'])
def get_rankingVentasByProducto(id_usuario):
    try:
        return jsonify(Dashboard.rankingVentasByProducto(id_usuario))
    except Exception as ex:
        return jsonify({'message':str(ex)})
    
@app.route('/usuario/<id_usuario>/dashboard/rankingVentasByServicio', methods = ['GET'])
def get_rankingVentasByServicio(id_usuario):
    try:
        return jsonify(Dashboard.rankingVentasByServicio(id_usuario))
    except Exception as ex:
        return jsonify({'message':str(ex)})
    
@app.route('/usuario/<id_usuario>/dashboard/ventasTotales', methods = ['GET'])
def get_ventasTotales(id_usuario):
    try:
        return jsonify(Dashboard.ventasTotales(id_usuario))
    except Exception as ex:
        return jsonify({'message':str(ex)})
    
@app.route('/usuario/<id_usuario>/dashboard/clientesTotales', methods = ['GET'])
def get_clientesTotales(id_usuario):
    try:
        return jsonify(Dashboard.clientesTotales(id_usuario))
    except Exception as ex:
        return jsonify({'message':str(ex)})