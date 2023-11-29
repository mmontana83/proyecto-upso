from api.db.db import mysql
from flask import request, jsonify
from datetime import datetime
from decimal import Decimal

class Factura():
    """
    Clase que representa una factura y contiene métodos para interactuar con la base de datos.
    """

    def __init__(self, json):
        """
        Constructor de la clase Factura.

        Parameters:
            json (dict): Datos de la factura en formato JSON.
        """
        self._id_cliente = json['id_cliente'].strip()        
        self._id_usuario = json['id_usuario'].strip()
        self._fecha = datetime.strptime(json['fecha'], "%d/%m/%Y")
        self._total = Decimal(json['total'])
        self._id_tipoFactura = int(json['id_tipoFactura'])
        self._id_condicionVenta = int(json['id_condicionVenta'])
    
    def to_json(self):
        """
        Convierte la factura a un objeto JSON.

        Returns:
            dict: Factura en formato JSON.
        """
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
        """
        Inserta una nueva factura en la base de datos.

        Parameters:
            jsonEncabezadoFactura (dict): Datos del encabezado de la factura en formato JSON.
            jsonDetalleFactura (list): Lista de datos del detalle de la factura en formato JSON.

        Returns:
            tuple: Respuesta JSON y código de estado HTTP.
        """
        try:
            # Creo un objeto que representa el encabezado de la factura a partir del json del request
            encabezadoFactura = Factura(jsonEncabezadoFactura)
            
            # Calculo el monto total de la factura
            totalFactura = DetalleFactura.obtenerTotalFactura(jsonDetalleFactura)
            
            # Inserto el encabezado de la factura en la BD
            cur = mysql.connection.cursor()
            cur.callproc('sp_insertarFactura', [encabezadoFactura._id_cliente, encabezadoFactura._id_usuario, encabezadoFactura._fecha,
                                                totalFactura, encabezadoFactura._id_tipoFactura, encabezadoFactura._id_condicionVenta])
            
            # Confirmo los cambios
            mysql.connection.commit()
            cur.close()
            
            cur = mysql.connection.cursor()
            # Agrego cada fila del detalle de la factura a la BD
            for fila in jsonDetalleFactura:
                detalleFactura = DetalleFactura(fila)
                cur.callproc('sp_insertarFacturaDetalle', [encabezadoFactura._id_cliente, encabezadoFactura._id_usuario, detalleFactura._id_producto,
                                                       detalleFactura._cantidad, detalleFactura._precio])
           
            # Confirmo los cambios
            mysql.connection.commit()
            cur.close()
            return jsonify({'message':'Factura Creada con Éxito'}), 200
        except Exception as ex:
            return jsonify({'message':str(ex)}), 409
        
    def encabezadoFacturaToJson(fila):
        """
        Convierte el encabezado de una factura a un objeto JSON.

        Parameters:
            fila (tuple): Datos del encabezado de la factura.

        Returns:
            dict: Encabezado de la factura en formato JSON.
        """
        return {
            'nroFactura': int(fila[0]),
            'fecha': datetime.strptime(str(fila[1]), "%Y-%m-%d").strftime("%d-%m-%Y"),
            'tipoFactura': fila[2],
            'id_cliente': fila[3],
            'razonSocial': fila[4],
            'direccion': fila[5],
            'telefono': fila[6],
            'condicionVenta': fila[7],
            'condicionIVA': fila[8],
            'total': fila[9]
        }
    
    @staticmethod
    def obtenerFacturasById_Usuario(id_usuario):
        """
        Obtiene las facturas de un usuario por su ID.

        Parameters:
            id_usuario (str): Identificador del usuario.

        Returns:
            tuple: Respuesta JSON y código de estado HTTP.
        """
        cur = mysql.connection.cursor()
        cur.callproc('sp_obtenerFacturasById_Usuario', [id_usuario.strip(),])
        datos = cur.fetchall()
        cur.close()

        if len(datos) != 0:
            facturas = []
            for fila in datos:
                factura = Factura.encabezadoFacturaToJson(fila)
                facturas.append(factura)
            return jsonify(facturas), 200
        else:
            return jsonify({'message':'El usuario no tiene facturas registradas.'}), 409
        
    @staticmethod
    def obtenerFacturasById_Cliente(id_usuario, id_cliente):
        """
        Obtiene las facturas de un cliente por el ID del usuario y el ID del cliente.

        Parameters:
            id_usuario (str): Identificador del usuario.
            id_cliente (str): Identificador del cliente.

        Returns:
            tuple: Respuesta JSON y código de estado HTTP.
        """
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
            return jsonify({'message':'El usuario no tiene facturas registradas.'}), 409
        
    @staticmethod
    def obtenerFacturaById_Cliente(id_usuario, id_cliente, nroFactura):
        """
        Obtiene una factura específica por el ID del usuario, el ID del cliente y el número de factura.

        Parameters:
            id_usuario (str): Identificador del usuario.
            id_cliente (str): Identificador del cliente.
            nroFactura (int): Número de factura.

        Returns:
            tuple: Respuesta JSON y código de estado HTTP.
        """
        # Primero obtengo el encabezado de la factura
        cur = mysql.connection.cursor()
        cur.callproc('sp_obtenerFacturaByCliente', [id_usuario.strip(), id_cliente.strip(),int(nroFactura)])
        datos = cur.fetchone()
        
        if len(datos) != 0:
            encabezadoFactura = Factura.encabezadoFacturaToJson(datos)
        else:
            return {'message':'El usuario no tiene facturas registradas.'}
        cur.close()

        # Luego obtengo el detalle de la factura
        cur = mysql.connection.cursor()
        cur.callproc('sp_obtenerDetalleFactura', [id_usuario.strip(), id_cliente.strip(),int(nroFactura)])
        datos = cur.fetchall()
        
        if len(datos) != 0:
            detalleFactura = []
            for fila in datos:
                detalleFactura.append(DetalleFactura.detalleFacturaTo_json(fila))
            return jsonify({'encabezado':encabezadoFactura, 'detalle':detalleFactura}), 200
        else:
            return jsonify({'message':'El usuario no tiene facturas registradas.'}), 409
        cur.close()

class DetalleFactura():
    """
    Clase que representa un detalle de factura.
    """

    def __init__(self, json):
        """
        Constructor de la clase DetalleFactura.

        Parameters:
            json (dict): Datos del detalle de la factura en formato JSON.
        """
        self._id_producto = int(json['id_producto'].strip())
        self._cantidad = int(json['cantidad'].strip())
        self._precio = Decimal(json['precio'].strip())
    
    def to_json(self):
        """
        Convierte el detalle de factura a un objeto JSON.

        Returns:
            dict: Detalle de factura en formato JSON.
        """
        return {
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
        """
        Obtiene el monto total de una factura a partir de los datos del detalle.

        Parameters:
            json (list): Lista de datos del detalle de la factura en formato JSON.

        Returns:
            float: Monto total de la factura.
        """
        try:
            total = 0        
            for detalle in json:
                total += int(detalle['cantidad'])*float(detalle['precio'])
            return total
        except Exception as ex:
            return {'message':str(ex)}
     
    @staticmethod
    def detalleFacturaTo_json(json):
        """
        Convierte el detalle de una factura a un objeto JSON.

        Parameters:
            json (tuple): Datos del detalle de la factura.

        Returns:
            dict: Detalle de factura en formato JSON.
        """
        return {
            'producto': json[0],
            'cantidad': json[1],
            'precio': json[2],
            'precioTotal': json[3]
        }
