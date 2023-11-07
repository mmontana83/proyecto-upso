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


class DetalleFactura():
    
    def __init__(self, json):
        self._id_factura = json['id_factura']
        self._id_producto = json['id_producto']
        self._cantidad = json['cantidad']
        self._precio = json['precio']        
        self._precioTotal = json['precioTotal']
    None