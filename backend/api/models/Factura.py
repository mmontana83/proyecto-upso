from api.db.db import mysql
from flask import request, jsonify
import re

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
    def insertarFactura(jsonEncabezadoFactura, jsonDetalleFactura):
        try:            
            #Creo un objeto que representa el encabezado de la factura a partir del json del request
            encabezadoFactura = Factura(jsonEncabezadoFactura)

            #Calculo el monto total de la factura
            totalFactura = DetalleFactura.obtenerTotalFactura(jsonDetalleFactura)

            # Inserto el encabezado de la factura en le BD
            cur = mysql.connection.cursor()
            cur.callproc('sp_insertarFactura', [encabezadoFactura._id_cliente, encabezadoFactura._id_usuario, encabezadoFactura._fecha,
                                                totalFactura, encabezadoFactura._id_tipoFactura, encabezadoFactura._id_condicionVenta])
            
            #Confirmo los cambios
            mysql.connection.commit()
            cur.close()
            
            cur = mysql.connection.cursor()
            #Agrego cada fila del detalle de la factura a la BD
            for fila in jsonDetalleFactura:
                detalleFactura = DetalleFactura(fila)
                cur.callproc('sp_insertarFacturaDetalle', [encabezadoFactura._id_cliente, encabezadoFactura._id_usuario, detalleFactura._id_producto,
                                                       detalleFactura._cantidad, detalleFactura._precio])
            
            #Confirmo los cambios
            mysql.connection.commit()
            cur.close()
            return jsonify({'Mensaje':'Factura Creada con Éxito'}), 200
        except Exception as ex:
            return jsonify({'mensaje':str(ex)}), 409
        
    def encabezadoFacturaToJson(fila):
        return{
            'nroFactura': fila[0],
            'fecha': fila[1],
            'tipoFactura': fila[2],
            'id_cliente': fila[3],
            'nombre': fila[4],
            'apellido': fila[5],
            'empresa': fila[6],
            'direccion': fila[7],
            'telefono': fila[8],
            'condicionVenta': fila[9],
            'condicionIVA': fila[10],
            'total': fila[11]
        }
    
    @staticmethod
    def obtenerFacturasById_Usuario(id_usuario):
        cur = mysql.connection.cursor()
        cur.callproc('sp_obtenerFacturasById_Usuario', [id_usuario,])
        datos = cur.fetchall()
        cur.close()

        if len(datos) != 0:
            facturas = []
            for fila in datos:
                factura = Factura.encabezadoFacturaToJson(fila)
                facturas.append(factura)
            return jsonify(facturas), 200
        else:
            return jsonify({'mensaje':'El usuario no tiene facturas registradas.'}), 409
        

    @staticmethod
    def obtenerFacturasById_Cliente(id_usuario, id_cliente):
        cur = mysql.connection.cursor()
        cur.callproc('sp_obtenerFacturasByCliente', [id_usuario,id_cliente])
        datos = cur.fetchall()
        cur.close()

        if len(datos) != 0:
            facturas = []
            for fila in datos:
                factura = Factura.encabezadoFacturaToJson(fila)
                facturas.append(factura)
            return jsonify(facturas), 200
        else:
            return jsonify({'mensaje':'El usuario no tiene facturas registradas.'}), 409
        

    @staticmethod
    def obtenerFacturaById_Cliente(id_usuario, id_cliente, nroFactura):
        
        #Primero obtengo el encabezado de la factura
        cur = mysql.connection.cursor()
        cur.callproc('sp_obtenerFacturaByCliente', [id_usuario, id_cliente,nroFactura])
        datos = cur.fetchone()
        
        if len(datos) != 0:
            encabezadoFactura = Factura.encabezadoFacturaToJson(datos)
        else:
            return {'mensaje':'El usuario no tiene facturas registradas.'}
        cur.close()

        #Luego obtengo el detalle de la factura
        cur = mysql.connection.cursor()
        cur.callproc('sp_obtenerDetalleFactura', [id_usuario,id_cliente,nroFactura])
        datos = cur.fetchall()

        if len(datos) != 0:
            detalleFactura = []
            for fila in datos:
                detalleFactura.append(DetalleFactura.detalleFacturaTo_json(fila))
            return jsonify({'encabezado':encabezadoFactura, 'detalle':detalleFactura}), 200
        else:
            return jsonify({'mensaje':'El usuario no tiene facturas registradas.'}), 409
        cur.close()

class DetalleFactura():
    
    def __init__(self, json):
        self._id_producto = json['id_producto']
        self._cantidad = json['cantidad']
        self._precio = json['precio']        
    
    def to_json(self):
        return{
            'nroFactura': self._nroFactura,
            'id_cliente': self._id_cliente,
            'id_usuario': self._id_usuario,
            'id_producto': self._id_producto,            
            'cantidad': self._cantidad,
            'precio': self._precio,
            'precioTotal': self._precio * self._cantidad
        }
    
    @staticmethod
    def obtenerTotalFactura(json):
        try:
            total = 0        
            for detalle in json:
                total += int(detalle['cantidad'])*float(detalle['precio'])
            return total
        except Exception as ex:
            return {'mensaje':str(ex)}
     
    @staticmethod
    def detalleFacturaTo_json(json):
        return{
            'producto': json[0],
            'cantidad': json[1],
            'precio': json[2],
            'precioTotal': json[3]
        }