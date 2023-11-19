from api.db.db import mysql

class TipoCondicionIVA():
    def __init__(self, json):
        self._id_tipoCondicionIVA = json[0]
        self._descripcion = json[1]
    
    def to_json(self):
        return {
            'id_tipoCondicionIVA': self[0],
            'descripcion': self[1]
        }
    
    @staticmethod
    def mostrarTipoCondicionIVA():
        try:
            cur = mysql.connection.cursor()
            cur.callproc('sp_listarTipoCondicionIVA')
            data = cur.fetchall()
            
            listaTipoCondicionIVA = []
            for fila in data:
                listaTipoCondicionIVA.append(TipoCondicionIVA.to_json(fila))
            return listaTipoCondicionIVA
        except Exception as ex:
            return {'mensaje':str(ex)}
        
class TipoCondicionVenta():
    def __init__(self, json):
        self._id_tipoCondicionVenta = json[0]
        self._descripcion = json[1]
    
    def to_json(self):
        return {
            'id_tipoCondicionVenta': self[0],
            'descripcion': self[1]
        }
    
    @staticmethod
    def mostrarTipoCondicionVenta():
        try:
            cur = mysql.connection.cursor()
            cur.callproc('sp_listarTipoCondicionVenta')
            data = cur.fetchall()
            
            listaTipoCondicionVenta = []
            for fila in data:
                listaTipoCondicionVenta.append(TipoCondicionVenta.to_json(fila))
            return listaTipoCondicionVenta
        except Exception as ex:
             return {'mensaje':str(ex)}
    
class TipoFactura():
    def __init__(self, json):
        self._id_tipoFactura = json[0]
        self._tipoFactura = json[1]
    
    def to_json(self):
        return {
            'id_tipoFactura': self[0],
            'tipoFactura': self[1]
        }
    
    @staticmethod
    def mostrarTipoFactura():
        try:
            cur = mysql.connection.cursor()
            cur.callproc('sp_listarTipoFactura')
            data = cur.fetchall()
            
            listaTipoFactura= []
            for fila in data:
                listaTipoFactura.append(TipoFactura.to_json(fila))
            return listaTipoFactura
        except Exception as ex:
            return {'mensaje':str(ex)}

class TipoProducto():
    def __init__(self, json):
        self._id_tipoProducto = json[0]
        self._tipoProducto = json[1]
    
    def to_json(self):
        return {
            'id_tipoProducto': self[0],
            'tipoProducto': self[1]
        }
    
    @staticmethod
    def mostrarTipoProducto():
        try:
            cur = mysql.connection.cursor()
            cur.callproc('sp_listarTipoProducto')
            data = cur.fetchall()
            
            listaTipoProducto= []
            for fila in data:
                listaTipoProducto.append(TipoProducto.to_json(fila))
            return listaTipoProducto
        except Exception as ex:
            return {'mensaje':str(ex)}
