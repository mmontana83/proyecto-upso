from api.db.db import mysql
from flask import jsonify
from datetime import datetime
import json

class Dashboard():
    
    def __init__(self):
        None

    def controlStockToJson(data):
        """
        Convierte los datos de control de stock a un formato JSON.

        Parameters:
            data (tuple): Tupla con datos de control de stock.

        Returns:
            dict: Datos de control de stock en formato JSON.
        
        Example:
            controlStockToJson(('Producto1', 100))
        """
        return {
            'Producto': data[0],
            'Stock': data[1]
        }
    
    def historialVentasToJson(data):
        """
        Convierte los datos del historial de ventas a un formato JSON.

        Parameters:
            data (tuple): Tupla con datos del historial de ventas.

        Returns:
            dict: Datos del historial de ventas en formato JSON.
        
        Example:
            historialVentasToJson(('2023', 'Enero', 50, 10, 20.0))
        """
        return {
            data[0]: {
                'Mes': data[1],
                'Ventas': data[2],
                'Crecimiento': data[3],
                'PorcentajeCrecimiento': data[4]
            }
        }
    
    def movimientoStockToJson(data):
        """
        Convierte los datos de movimiento de stock a un formato JSON.

        Parameters:
            data (tuple): Tupla con datos de movimiento de stock.

        Returns:
            dict: Datos de movimiento de stock en formato JSON.
        
        Example:
            movimientoStockToJson(('Producto1', 'Entrada', '2023-01-01', 10.0, 'Cliente1', 'Factura1'))
        """
        return{
            'Producto': data[0],
            'Movimiento': data[1],
            'Fecha': data[2],
            'Precio': data[3],
            'Cliente': data[4],
            'Factura': data[5]
        }
    
    def rankingVentasByClienteToJson(data):
        """
        Convierte los datos de ranking de ventas por cliente a un formato JSON.

        Parameters:
            data (tuple): Tupla con datos de ranking de ventas por cliente.

        Returns:
            dict: Datos de ranking de ventas por cliente en formato JSON.
        
        Example:
            rankingVentasByClienteToJson(('Cliente1', 30))
        """
        return{
            'Cliente': data[0],
            'Venta': data[1]
        }
    
    def rankingVentasByProductoToJson(data):
        """
        Convierte los datos de ranking de ventas por producto a un formato JSON.

        Parameters:
            data (tuple): Tupla con datos de ranking de ventas por producto.

        Returns:
            dict: Datos de ranking de ventas por producto en formato JSON.
        
        Example:
            rankingVentasByProductoToJson(('Producto1', 20))
        """
        return{
            'Producto': data[0],
            'Venta': data[1]
        }
    
    def rankingVentasByServicioToJson(data):
        """
        Convierte los datos de ranking de ventas por servicio a un formato JSON.

        Parameters:
            data (tuple): Tupla con datos de ranking de ventas por servicio.

        Returns:
            dict: Datos de ranking de ventas por servicio en formato JSON.
        
        Example:
            rankingVentasByServicioToJson(('Servicio1', 15))
        """
        return{
            'Servicio': data[0],
            'Venta': data[1]
        }

    def ventasTotalesToJson(data):
        """
        Convierte los datos de ventas totales a un formato JSON.

        Parameters:
            data (tuple): Tupla con datos de ventas totales.

        Returns:
            dict: Datos de ventas totales en formato JSON.
        
        Example:
            ventasTotalesToJson((1000,))
        """
        return{
            'VentasTotales': data[0]
        }
    
    def ventasTotalesMesActualToJson(data):
        """
        Convierte los datos de ventas totales del mes actual a un formato JSON.

        Parameters:
            data (tuple): Tupla con datos de ventas totales del mes actual.

        Returns:
            dict: Datos de ventas totales del mes actual en formato JSON.
        
        Example:
            ventasTotalesMesActualToJson((500,))
        """
        return{
            'VentasTotalesMesActual': data[0]
        }
    
    def clientesActivosToJson(data):
        """
        Convierte los datos de clientes activos a un formato JSON.

        Parameters:
            data (tuple): Tupla con datos de clientes activos.

        Returns:
            dict: Datos de clientes activos en formato JSON.
        
        Example:
            clientesActivosToJson((50,))
        """
        return{
            'ClientesActivos': data[0]
        }
    
    @staticmethod
    def controlStock(id_usuario):
        """
        Obtiene los datos de control de stock para un usuario.

        Parameters:
            id_usuario (str): Identificador del usuario.

        Returns:
            list: Lista de datos de control de stock en formato JSON.
        
        Example:
            controlStock('123')
        """
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
            
            #Esta línea se usa para probar
            #cur.callproc('sp_dashboard_historialVentasTest')
            data = cur.fetchall()

            if len(data) != 0:
                organized_data = {}
                for item in data:
                    año, mes, venta = item
                    if año not in organized_data:
                        organized_data[año] = []
                    organized_data[año].append({
                        "Mes": mes,
                        "Venta": venta
                    })
                #json_data = json.dumps(organized_data, indent=2)
                return organized_data
                return json_data

            # if len(data) != 0:
            #     historialVentas = []
            #     for fila in data:
            #         historialVentas.append(Dashboard.historialVentasToJson(fila))
                
            #     return historialVentas
            else:
                return {'message':'Historial de Ventas Vacío'}                        
        except Exception as ex:
            return {'message': str(ex)}
        
    @staticmethod
    def movimientoStock(id_usuario):
        """
        Obtiene el movimiento de stock para un usuario.

        Parameters:
            id_usuario (str): Identificador del usuario.

        Returns:
            list: Lista de datos del movimiento de stock en formato JSON.
        """
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
        """
        Obtiene el ranking de ventas por cliente para un usuario.

        Parameters:
            id_usuario (str): Identificador del usuario.

        Returns:
            list: Lista de datos del ranking de ventas por cliente en formato JSON.
        """
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
        """
        Obtiene el ranking de ventas por producto para un usuario.

        Parameters:
            id_usuario (str): Identificador del usuario.

        Returns:
            list: Lista de datos del ranking de ventas por producto en formato JSON.
        """
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
        """
        Obtiene el ranking de ventas por servicio para un usuario.

        Parameters:
            id_usuario (str): Identificador del usuario.

        Returns:
            list: Lista de datos del ranking de ventas por servicio en formato JSON.
        """
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
        """
        Obtiene los datos de ventas totales para un usuario.

        Parameters:
            id_usuario (str): Identificador del usuario.

        Returns:
            dict: Datos de ventas totales en formato JSON.
        """
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
    def ventasTotalesMesActual(id_usuario):
        """
        Obtiene los datos de ventas totales del mes actual para un usuario.

        Parameters:
            id_usuario (str): Identificador del usuario.

        Returns:
            dict: Datos de ventas totales del mes actual en formato JSON.
        """
        try:
            cur = mysql.connection.cursor()
            cur.callproc('sp_dashboard_ventasTotalesMesActual', [id_usuario,])
            data = cur.fetchone()
            
            if len(data) != 0:
                return Dashboard.ventasTotalesMesActualToJson(data)
            else:
                return {'message':'No tiene Ventas'}   
        except Exception as ex:
            return {'message': str(ex)}

    @staticmethod
    def clientesActivos(id_usuario):
        """
        Obtiene los datos de clientes activos para un usuario.

        Parameters:
            id_usuario (str): Identificador del usuario.

        Returns:
            dict: Datos de clientes activos en formato JSON.
        """
        try:
            cur = mysql.connection.cursor()
            cur.callproc('sp_dashboard_clientesActivos', [id_usuario,])
            data = cur.fetchone()
            
            if len(data) != 0:
                return Dashboard.clientesActivosToJson(data)
            else:
                return {'message':'No Tiene Clientes'}   
        except Exception as ex:
            return {'message': str(ex)}