from api.db.db import mysql
from flask import request, jsonify

class Factura():
    
    def __init__(self, json):
        self._fecha = json['fecha']
        self._total = json['total']
        self._id_tipoFactura = json['id_tipoFactura']
        self._id_cliente = json['id_cliente']        
        self._id_condicionVenta = json['id_condicionVenta']
        self._id_usuario = json['id_usuario']

    def to_json(self):
        return {
            'fecha': self._fecha,
            'total': self._total,
            'id_tipoFactura': self._id_tipoFactura,
            'id_cliente': self._id_cliente,
            'id_condicionVenta': self._id_condicionVenta,
            'id_usuario': self._id_usuario
        }
    @staticmethod
    def insertarFactura(jsonFactura, jsonDetalleFactura):
        try:
            factura = Factura(jsonFactura)
            detalleFactura = DetalleFactura(jsonDetalleFactura)

            #Inserto el encabezado de la factura
            cur = mysql.connection.cursor()
            cur.callproc('sp_insertarFactura', [factura._fecha, factura._total, factura._id_tipoFactura, factura._id_cliente,
                                                factura._id_condicionVenta, factura._id_usuario])
            mysql.connection.commit()
            cur.close()

            #Inserto el Detalle de la Factura
            cur = mysql.connection.cursor()
            for fila in jsonDetalleFactura:
                cur.callproc('sp_insertarFacturaDetalle', [fila._id_producto, fila._cantidad, fila._precio])
                mysql.connection.commit()
            cur.close()

        except Exception as ex:
            return {'mensaje':str(ex)}
        
    @staticmethod
    def obtenerFacturasById_Cliente(id_cliente):
        None

class DetalleFactura():
    
    def __init__(self, json):
        self._id_factura = json['id_factura']
        self._id_producto = json['id_producto']
        self._cantidad = json['cantidad']
        self._precio = json['precio']        
    
    def to_json(self):
        return{
            'id_factura': self._id_factura,
            'id_producto': self._id_producto,
            'cantidad': self._cantidad,
            'precio': self._precio
        }