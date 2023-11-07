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


class DetalleFactura():
    
    def __init__(self, json):
        self._id_factura = json['id_factura']
        self._id_producto = json['id_producto']
        self._cantidad = json['cantidad']
        self._precio = json['precio']        
        self._precioTotal = json['precioTotal']
    
    def to_json(self):
        return{
            'id_factura': self._id_factura,
            'id_producto': self._id_producto,
            'cantidad': self._cantidad,
            'precio': self._precio,
            'precioTotal': self._precioTotal
        }