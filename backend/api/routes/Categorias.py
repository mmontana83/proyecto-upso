from api import app
from flask import jsonify
from api.models.Categorias import TipoCondicionIVA, TipoCondicionVenta, TipoFactura, TipoProducto

#Obtengo la categoría Tipo Condición IVA
@app.route('/dashboard/listarTipoCondicionIVA', methods = ['GET'])
def mostrarTipoCondicionIVA():
    try:
        return jsonify(TipoCondicionIVA.mostrarTipoCondicionIVA())
    except Exception as ex:
        return jsonify({'mensaje':str(ex)})
    
#Obtengo la categoría Tipo Factura
@app.route('/dashboard/listarTipoFactura', methods = ['GET'])
def mostrarTipoFactura():
    try:
        return jsonify(TipoFactura.mostrarTipoFactura())
    except Exception as ex:
        return jsonify({'mensaje':str(ex)})
    
#Obtengo la categoría Tipo Producto
@app.route('/dashboard/listarTipoProducto', methods = ['GET'])
def mostrarTipoProducto():
    try:
        return jsonify(TipoProducto.mostrarTipoProducto())
    except Exception as ex:
        return jsonify({'mensaje':str(ex)})
    
#Obtengo la categoría Tipo Venta
@app.route('/dashboard/listarTipoCondicionVenta', methods = ['GET'])
def mostrarTipoCondicionVenta():
    try:
        return jsonify(TipoCondicionVenta.mostrarTipoCondicionVenta())
    except Exception as ex:
        return jsonify({'mensaje':str(ex)})

    