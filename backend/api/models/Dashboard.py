from api.db.db import mysql
from flask import jsonify

class Dashboard():
    
    def __init__(self):
        None

    def controlStockToJson(data):
        return {
            'Producto': data[0],
            'Stock': data[1]
        }
    
    def historialVentasToJson(data):
        return {
            'Año': data[0],
            'Mes': data[1],
            'Ventas': data[2]
        }
    
    def movimientoStockToJson(data):
        return{
            'Producto': data[0],
            'Movimiento': data[1],
            'Fecha': data[2],
            'Precio': data[3],
            'Cliente': data[4],
            'Factura': data[5]
        }
    
    def rankingVentasByClienteToJson(data):
        return{
            'Cliente': data[0],
            'Venta': data[1]
        }
    
    def rankingVentasByProductoToJson(data):
        return{
            'Producto': data[0],
            'Venta': data[1]
        }
    
    def rankingVentasByServicioToJson(data):
        return{
            'Servicio': data[0],
            'Venta': data[1]
        }

    def ventasTotalesToJson(data):
        return{
            'VentasTotales': data[0]
        }
    
    def clientesTotalesToJson(data):
        return{
            'ClientesTotales': data[0]
        }
    
    @staticmethod
    def controlStock(id_usuario):
        try:
            
            cur = mysql.connection.cursor()
            cur.callproc('sp_dashboard_controlStock', [id_usuario,])
            data = cur.fetchall()
            
            if len(data) != 0:
                controlStock = []
                for fila in data:
                    controlStock.append(Dashboard.controlStockToJson(fila))
                
                return controlStock
            else:
                return {'message':'Control de Stock Vacío'}                        
        except Exception as ex:
            return {'message': str(ex)}
    
    @staticmethod
    def historialVentas(id_usuario):
        try:
            
            cur = mysql.connection.cursor()
            cur.callproc('sp_dashboard_historialVentas', [id_usuario,])
            data = cur.fetchall()
            
            if len(data) != 0:
                historialVentas = []
                for fila in data:
                    historialVentas.append(Dashboard.historialVentasToJson(fila))
                
                return historialVentas
            else:
                return {'message':'Historial de Ventas Vacío'}                        
        except Exception as ex:
            return {'message': str(ex)}
        
    @staticmethod
    def movimientoStock(id_usuario):
        try:
            
            cur = mysql.connection.cursor()
            cur.callproc('sp_dashboard_movimientoStock', [id_usuario,])
            data = cur.fetchall()
            
            if len(data) != 0:
                movimientoStock = []
                for fila in data:
                    movimientoStock.append(Dashboard.movimientoStockToJson(fila))
                
                return movimientoStock
            else:
                return {'message':'Movimiento de Stock Vacío'}                        
        except Exception as ex:
            return {'message': str(ex)}
        
    @staticmethod
    def rankingVentasByCliente(id_usuario):
        try:
            
            cur = mysql.connection.cursor()
            cur.callproc('sp_dashboard_rankingVentasByCliente', [id_usuario,])
            data = cur.fetchall()
            
            if len(data) != 0:
                ventasByCliente = []
                for fila in data:
                    ventasByCliente.append(Dashboard.rankingVentasByClienteToJson(fila))
                
                return ventasByCliente
            else:
                return {'message':'Ranking de Ventas por Cliente Vacío'}                        
        except Exception as ex:
            return {'message': str(ex)}
        
    @staticmethod
    def rankingVentasByProducto(id_usuario):
        try:
            
            cur = mysql.connection.cursor()
            cur.callproc('sp_dashboard_rankingVentasByProducto', [id_usuario,])
            data = cur.fetchall()
            
            if len(data) != 0:
                ventasByProducto = []
                for fila in data:
                    ventasByProducto.append(Dashboard.rankingVentasByProductoToJson(fila))
                
                return ventasByProducto
            else:
                return {'message':'Ranking de Ventas por Producto Vacío'}                        
        except Exception as ex:
            return {'message': str(ex)}
        
    @staticmethod
    def rankingVentasByServicio(id_usuario):
        try:
            
            cur = mysql.connection.cursor()
            cur.callproc('sp_dashboard_rankingVentasByServicio', [id_usuario,])
            data = cur.fetchall()
            
            if len(data) != 0:
                ventasByServicio = []
                for fila in data:
                    ventasByServicio.append(Dashboard.rankingVentasByServicioToJson(fila))
                
                return ventasByServicio
            else:
                return {'message':'Ranking de Ventas por Servicio Vacío'}                        
        except Exception as ex:
            return {'message': str(ex)}
        
    @staticmethod
    def ventasTotales(id_usuario):
        try:
            cur = mysql.connection.cursor()
            cur.callproc('sp_dashboard_ventasTotales', [id_usuario,])
            data = cur.fetchone()
            
            if len(data) != 0:
                return Dashboard.ventasTotalesToJson(data)
            else:
                return {'message':'No tiene Ventas'}   
        except Exception as ex:
            return {'message': str(ex)}

    @staticmethod
    def clientesTotales(id_usuario):
        try:
            cur = mysql.connection.cursor()
            cur.callproc('sp_dashboard_clientesTotales', [id_usuario,])
            data = cur.fetchone()
            
            if len(data) != 0:
                return Dashboard.clientesTotalesToJson(data)
            else:
                return {'message':'No Tiene Clientes'}   
        except Exception as ex:
            return {'message': str(ex)}