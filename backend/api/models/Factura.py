from api.db.db import mysql
from flask import request, jsonify

class Factura():
    
    def __init__(self, json):
        self._id_cliente = json['id_cliente']        
        self._id_usuario = json['id_usuario']
        self._fecha = json['fecha']
        self._total = json['total']
        self._id_tipoFactura = json['id_tipoFactura']
        self._id_condicionVenta = json['id_condicionVenta']
        

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
    def insertarFactura(json):
        try:
            factura = Factura(json)

            #Inserto el encabezado de la factura
            cur = mysql.connection.cursor()
            cur.callproc('sp_insertarFactura', [factura._id_cliente, factura._id_usuario, factura._fecha, factura._total, factura._id_tipoFactura,
                                                factura._id_condicionVenta])
            mysql.connection.commit()
            cur.close()
        except Exception as ex:
            return {'mensaje':str(ex)}
        
    @staticmethod
    def insertarDetalleFactura(json):
        try:
            detalleFactura = DetalleFactura(json)

            #Inserto el Detalle de la Factura
            cur = mysql.connection.cursor()
            for fila in json:
                cur.callproc('sp_insertarFacturaDetalle', [fila._id_producto, fila._cantidad, fila._precio])
                mysql.connection.commit()
            cur.close()

        except Exception as ex:
            return {'mensaje':str(ex)}
        
    def obtenerFacturasById_UsuarioToJson(fila):
        return{
            'id_factura': fila[0],
            'fecha': fila[1],
            'tipoFactura': fila[2],
            'nombre': fila[3],
            'apellido': fila[4],
            'empresa': fila[5],
            'direccion': fila[6],
            'telefono': fila[7],
            'condicionVenta': fila[8],
            'condicionIVA': fila[9],
            'total': fila[10]
        }
    
    @staticmethod
    def obtenerFacturasById_Usuario(id_usuario):
        cur = mysql.connection.cursor()
        cur.callproc('sp_obtenerFacturasById_Usuario', [id_usuario,])
        datos = cur.fetchall()

        if len(datos) != 0:
            facturas = []
            for fila in datos:
                factura = Factura.obtenerFacturasById_UsuarioToJson(fila)
                facturas.append(factura)
            return facturas
        else:
            return {'mensaje':'El usuario no tiene facturas registradas.'}
        cur.close()

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