from api.db.db import mysql
from flask import jsonify
from decimal import Decimal

class Producto:   

    def __init__(self, json):       
        self._codigoProducto = int(json['codigoProducto'])
        self._producto = json['producto'].strip()
        self._descripcion = json['descripcion'].strip()
        self._precio = Decimal(json['precio'])
        self._stock = int(json['stock'])
        self._id_tipoProducto = int(json['id_tipoProducto'])
        self._id_usuario = json['id_usuario'].strip()

    def to_json(self):
        
        return {               
            'codigoProducto':self._codigoProducto,
            'producto': self._producto,
            'descripcion': self._descripcion,
            'precio': self._precio,
            'stock': self._stock,
            'id_tipoProducto': self._id_tipoProducto,          
            'id_usuario': self._id_usuario
        }
    

    @staticmethod
    def insertarProductoByUsuario(json): 
    
        try:
            producto = Producto(json)
            
            cur = mysql.connection.cursor()            
            cur.callproc('sp_obtenerProductoByUsuario', [producto._id_usuario, producto._codigoProducto])
            fila = cur.fetchone()
            cur.close()  # Cierra el cursor después de cada consulta

            if fila is None:
                cur = mysql.connection.cursor()  # Vuelve a abrir el cursor para la siguiente consulta
                cur.callproc('sp_insertarProducto', [producto._codigoProducto,
                                                     producto._producto,
                                                     producto._descripcion,
                                                     producto._precio,
                                                     producto._stock,
                                                     producto._id_tipoProducto,
                                                     producto._id_usuario])
                mysql.connection.commit()
                cur.close()
                return jsonify({'message': 'Producto Insertado con Éxito'}), 200
            else:
                return jsonify({'message': 'El Producto ya se encuentra agregado en el sistema'}), 200

        except Exception as ex:
            return {'message': str(ex)}  
                
    # --------------------------------------- Actualizar producto ------------------------------
    # ------------------------------------------ funciona ok ---------------------------------

    @staticmethod
    def actualizarProducto(json):       
        try:            
            producto = Producto(json)
            cur = mysql.connection.cursor()
            cur.callproc('sp_actualizarProducto', [producto._codigoProducto,
                                                producto._producto, 
                                                producto._descripcion, 
                                                producto._precio, 
                                                producto._stock, 
                                                producto._id_tipoProducto,
                                                producto._id_usuario])
            mysql.connection.commit()
            cur.close()
            return jsonify({'message': 'Producto Actualizado correctamente'}), 200
        except Exception as ex:
            return jsonify({'message': str(ex)}), 409
        
    # --------------------------------- fin Actualziar producto -------------------------------

    
    
    # --------------------------------------- eliminar producto ------------------------------
    # ------------------------------------------ funciona ok ---------------------------------
    
    @staticmethod
    def eliminarProducto(id_usuario, codigoProducto):       

        try:
            cur = mysql.connection.cursor()            
            cur.callproc('sp_obtenerProductoByUsuario', [id_usuario, codigoProducto])
            fila = cur.fetchone()
            cur.close()  # Cierra el cursor después de cada consulta

            if fila is None:                
                return jsonify({'message': 'Producto No se encuentra en el sistema'}), 409
            else:
                cur = mysql.connection.cursor()
                cur.callproc('sp_eliminarProducto', [id_usuario, codigoProducto])
                mysql.connection.commit()
                cur.close()
                return jsonify({'message':'Producto Eliminado con Éxito'}), 200
        except Exception as ex:
            return jsonify({'message': str(ex)}), 409

# --------------------------------- fin eliminar producto -------------------------------        

    
    
# -------------------------------- alta producto by usuario ----------------------------
# -----------------------------------------anda ok --------------------------------------
    
    @staticmethod
    def altaProductoByUsuario(id_usuario, codigoProducto):
        try:
            cur = mysql.connection.cursor()
            cur.callproc('sp_altaProducto', [id_usuario, codigoProducto])
            mysql.connection.commit()
            cur.close()
            return jsonify({'message': 'Producto agregado nuevamente con Éxito'}), 200
        except Exception as ex:
                return jsonify({'message': str(ex)}), 409

# ------------------------------- fin alta prodcucto by usuario ---------------------



# ----------------------------- alta obtener Productos por Usuario -------------------
# ------------------------------------------ anda ok ---------------------------------    
    
    @staticmethod
    def obtenerProductosByUsuario(id_usuario):
        
        try:
            cur = mysql.connection.cursor()
            cur.callproc('sp_obtenerProductosByUsuario', [id_usuario])
            datos = cur.fetchall()
            
            if len(datos) != 0:
                productos = []
                for fila in datos:
                    producto = Producto.obtenerProductosByUsuarioToJson(fila)
                    productos.append(producto)
                
                return jsonify(productos), 200
            else:
                return jsonify({'message': 'Productos no encontrado'}), 409
        except Exception as ex:
            return jsonify({'message': str(ex)}), 409
        
# ------------------------------ fin obtener Productos Usuario ---------------------------
        
        
    
# --------------- obtiene un determinado producto de un determinado usuario --------------
# -------------------------------------- funciona ok -------------------------------------    
    
    @staticmethod
    def obtenerProductoByUsuario(id_usuario, codigoProducto):
        
        try:
            print(id_usuario)
            print(codigoProducto)
            cur = mysql.connection.cursor()
            cur.callproc('sp_obtenerProductoByUsuario', [id_usuario, codigoProducto])
            fila = cur.fetchone()
            
            if fila is not None:   
                producto = Producto.obtenerProductoByUsuarioToJson(fila)
                return jsonify(producto), 200
            else:
                return jsonify({'Cliente':'', 'id_tipoEstado':''})
        except Exception as ex:
            return jsonify({'message': str(ex)}), 409
        
# --------------- fin obtener un determinado productode un determinado usuario -------------

    @staticmethod
    def obtenerStockPorProducto(id_usuario, codigoProducto):
        try:
            cur = mysql.connection.cursor()
            cur.callproc('sp_obtenerStockPorProducto', [id_usuario, codigoProducto])
            fila = cur.fetchone()
            
            if fila is not None:   
                stock = Producto.obtenerStockPorProductoToJson(fila)
                return jsonify(stock), 200
            else:
                return jsonify({'stock':'0'})
        except Exception as ex:
            return jsonify({'message': str(ex)}), 409

    @classmethod
    def obtenerProductosByUsuarioToJson(self, json):
        return {
            'id_producto': json[0],
            'codigoProducto':json[1],
            'producto': json[2],
            'descripcion': json[3],
            'precio': json[4],
            'stock': json[5],
            'id_tipoProducto': json[6]
        }

    @classmethod
    def obtenerProductoByUsuarioToJson(self, json):

        """
            convencion de documentacion PEP 257

            Convierte una lista de datos en formato JSON a un diccionario de producto.

            Args:
                cls (type): La clase que contiene este método.
                json (list): Una lista con datos de un producto en formato JSON.

            Returns:
                dict: Un diccionario que representa un producto con las siguientes claves:
                    - 'id_producto': El ID del producto.
                    - 'producto': El nombre del producto.
                    - 'descripcion': La descripción del producto.
                    - 'precio': El precio del producto.
                    - 'stock': La cantidad de stock del producto.
                    - 'tipoproducto': El tipo de producto.

            Example:
                Si json es [1, "Producto A", "Descripción del Producto A", 10.99, 100, "Tipo A"],
                el método devolverá:
                {
                    'id_producto': 1,
                    'producto': 'Producto A',
                    'descripcion': 'Descripción del Producto A',
                    'precio': 10.99,
                    'stock': 100,
                    'tipoproducto': 'Tipo A'
                }
        """

        return {
            'id_producto': json[0],
            'codigoProducto':json[1],
            'producto': json[2],
            'descripcion': json[3],
            'precio': json[4],
            'stock': json[5],
            'tipoProducto': json[6]
        }
    
    @classmethod
    def obtenerStockPorProductoToJson(self, json):
        return {
            'stock': int(json[0]),
            'id_tipoProducto': int(json[1])
        }