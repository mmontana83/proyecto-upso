from api.db.db import mysql

class TipoCondicionIVA:
    def __init__(self, json):
        """
        Constructor de la clase TipoCondicionIVA.

        Parámetros:
        - json: Una lista que representa la fila de datos obtenida de la base de datos.

        Atributos:
        - _id_tipoCondicionIVA: ID de la condición IVA.
        - _descripcion: Descripción de la condición IVA.
        """
        self._id_tipoCondicionIVA = json[0]
        self._descripcion = json[1]

    def to_json(self):
        """
        Convierte la instancia de TipoCondicionIVA a un diccionario JSON.

        Retorna:
        - Diccionario JSON con los atributos de TipoCondicionIVA.
        """
        return {
            'id_tipoCondicionIVA': self._id_tipoCondicionIVA,
            'descripcion': self._descripcion
        }

    @staticmethod
    def mostrarTipoCondicionIVA():
        """
        Obtiene la lista de TipoCondicionIVA desde la base de datos.

        Retorna:
        - Lista de diccionarios JSON, cada uno representando un registro de TipoCondicionIVA.
        - En caso de error, retorna un diccionario con el mensaje de error.
        """
        try:
            cur = mysql.connection.cursor()
            cur.callproc('sp_listarTipoCondicionIVA')
            data = cur.fetchall()

            listaTipoCondicionIVA = []
            for fila in data:
                listaTipoCondicionIVA.append(TipoCondicionIVA.to_json(fila))
            return listaTipoCondicionIVA
        except Exception as ex:
            return {'message': str(ex)}

class TipoCondicionVenta:
    def __init__(self, json):
        """
        Constructor de la clase TipoCondicionVenta.

        Parámetros:
        - json: Una lista que representa la fila de datos obtenida de la base de datos.

        Atributos:
        - _id_tipoCondicionVenta: ID de la condición de venta.
        - _descripcion: Descripción de la condición de venta.
        """
        self._id_tipoCondicionVenta = json[0]
        self._descripcion = json[1]

    def to_json(self):
        """
        Convierte la instancia de TipoCondicionVenta a un diccionario JSON.

        Retorna:
        - Diccionario JSON con los atributos de TipoCondicionVenta.
        """
        return {
            'id_tipoCondicionVenta': self._id_tipoCondicionVenta,
            'descripcion': self._descripcion
        }

    @staticmethod
    def mostrarTipoCondicionVenta():
        """
        Obtiene la lista de TipoCondicionVenta desde la base de datos.

        Retorna:
        - Lista de diccionarios JSON, cada uno representando un registro de TipoCondicionVenta.
        - En caso de error, retorna un diccionario con el mensaje de error.
        """
        try:
            cur = mysql.connection.cursor()
            cur.callproc('sp_listarTipoCondicionVenta')
            data = cur.fetchall()

            listaTipoCondicionVenta = []
            for fila in data:
                listaTipoCondicionVenta.append(TipoCondicionVenta.to_json(fila))
            return listaTipoCondicionVenta
        except Exception as ex:
             return {'message': str(ex)}

class TipoFactura:
    def __init__(self, json):
        """
        Constructor de la clase TipoFactura.

        Parámetros:
        - json: Una lista que representa la fila de datos obtenida de la base de datos.

        Atributos:
        - _id_tipoFactura: ID del tipo de factura.
        - _tipoFactura: Descripción del tipo de factura.
        """
        self._id_tipoFactura = json[0]
        self._tipoFactura = json[1]

    def to_json(self):
        """
        Convierte la instancia de TipoFactura a un diccionario JSON.

        Retorna:
        - Diccionario JSON con los atributos de TipoFactura.
        """
        return {
            'id_tipoFactura': self._id_tipoFactura,
            'tipoFactura': self._tipoFactura
        }

    @staticmethod
    def mostrarTipoFactura():
        """
        Obtiene la lista de TipoFactura desde la base de datos.

        Retorna:
        - Lista de diccionarios JSON, cada uno representando un registro de TipoFactura.
        - En caso de error, retorna un diccionario con el mensaje de error.
        """
        try:
            cur = mysql.connection.cursor()
            cur.callproc('sp_listarTipoFactura')
            data = cur.fetchall()

            listaTipoFactura= []
            for fila in data:
                listaTipoFactura.append(TipoFactura.to_json(fila))
            return listaTipoFactura
        except Exception as ex:
            return {'message': str(ex)}

class TipoProducto:
    def __init__(self, json):
        """
        Constructor de la clase TipoProducto.

        Parámetros:
        - json: Una lista que representa la fila de datos obtenida de la base de datos.

        Atributos:
        - _id_tipoProducto: ID del tipo de producto.
        - _tipoProducto: Descripción del tipo de producto.
        """
        self._id_tipoProducto = json[0]
        self._tipoProducto = json[1]

    def to_json(self):
        """
        Convierte la instancia de TipoProducto a un diccionario JSON.

        Retorna:
        - Diccionario JSON con los atributos de TipoProducto.
        """
        return {
            'id_tipoProducto': self._id_tipoProducto,
            'tipoProducto': self._tipoProducto
        }

    @staticmethod
    def mostrarTipoProducto():
        """
        Obtiene la lista de TipoProducto desde la base de datos.

        Retorna:
        - Lista de diccionarios JSON, cada uno representando un registro de TipoProducto.
        - En caso de error, retorna un diccionario con el mensaje de error.
        """
        try:
            cur = mysql.connection.cursor()
            cur.callproc('sp_listarTipoProducto')
            data = cur.fetchall()

            listaTipoProducto= []
            for fila in data:
                listaTipoProducto.append(TipoProducto.to_json(fila))
            return listaTipoProducto
        except Exception as ex:
            return {'message': str(ex)}
