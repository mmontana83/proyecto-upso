from api.db.db import mysql
from flask import jsonify
from decimal import Decimal
class Producto:
    """
    Clase que representa un producto.

    Attributes:
        _codigoProducto (int): El código del producto .
        _producto (str): El nombre del producto.
        _descripcion (str): La descripción del producto.
        _precio (Decimal): El precio del producto.
        _stock (int): La cantidad de stock del producto.
        _id_tipoProducto (int): El ID del tipo de producto.
        _id_usuario (str): El ID del usuario asociado al producto.

    Methods:
        __init__: Inicializa un objeto Producto a partir de un objeto JSON.
        to_json: Convierte el objeto Producto a un diccionario JSON.
        insertarProductoByUsuario: Inserta un nuevo producto asociado a un usuario.
        actualizarProducto: Actualiza la información de un producto existente.
        eliminarProducto: Elimina un producto asociado a un usuario.
        altaProductoByUsuario: Vuelve a agregar un producto eliminado previamente.
        obtenerProductosByUsuario: Obtiene todos los productos asociados a un usuario.
        obtenerProductoByUsuario: Obtiene un producto específico de un usuario.
        obtenerStockPorProducto: Obtiene el stock de un producto específico de un usuario.
        obtenerProductosByUsuarioToJson: Convierte datos de productos a formato JSON.
        obtenerStockPorProductoToJson: Convierte datos de stock a formato JSON.
    """

    def __init__(self, json):
        """
        Inicializa un objeto Producto a partir de un objeto JSON.

        Args:
            json (dict): Un objeto JSON con la información del producto.
        """
        self._codigoProducto = int(json['codigoProducto'])
        self._producto = json['producto'].strip()
        self._descripcion = json['descripcion'].strip()
        self._precio = Decimal(json['precio'])
        self._stock = int(json['stock'])
        self._id_tipoProducto = int(json['id_tipoProducto'])
        self._id_usuario = json['id_usuario'].strip()

    def to_json(self):
        """
        Convierte el objeto Producto a un diccionario JSON.

        Returns:
            dict: Un diccionario que representa el objeto Producto en formato JSON.
        """
        return {
            'codigoProducto': self._codigoProducto,
            'producto': self._producto,
            'descripcion': self._descripcion,
            'precio': self._precio,
            'stock': self._stock,
            'id_tipoProducto': self._id_tipoProducto,
            'id_usuario': self._id_usuario
        }

    @staticmethod
    def insertarProductoByUsuario(json):
        """
        Inserta un nuevo producto asociado a un usuario.

        Args:
            json (dict): Un objeto JSON con la información del producto a insertar.

        Returns:
            tuple: Un mensaje de éxito o error y un código HTTP correspondiente.
        """
        # Intentar realizar las siguientes operaciones dentro de un bloque try-except
        try:
            # Crear un objeto Producto a partir de un objeto JSON
            producto = Producto(json)

            # Crear un cursor para realizar operaciones en la base de datos
            cur = mysql.connection.cursor()

            # Llamar al procedimiento almacenado 'sp_obtenerProductoByUsuario' con los parámetros del producto
            cur.callproc('sp_obtenerProductoByUsuario', [producto._id_usuario, producto._codigoProducto])

            # Obtener la primera fila del resultado
            fila = cur.fetchone()

            # Cerrar el cursor después de la consulta
            cur.close()

            # Verificar si el producto ya existe en el sistema
            if fila is None:
                # Abrir un nuevo cursor
                cur = mysql.connection.cursor()

                # Llamar al procedimiento almacenado 'sp_insertarProducto' con los atributos del producto
                cur.callproc('sp_insertarProducto', [producto._codigoProducto,
                                                    producto._producto,
                                                    producto._descripcion,
                                                    producto._precio,
                                                    producto._stock,
                                                    producto._id_tipoProducto,
                                                    producto._id_usuario])

                # Confirmar la transacción en la base de datos
                mysql.connection.commit()

                # Cerrar el cursor después de la inserción
                cur.close()

                # Devolver una respuesta JSON con un mensaje de éxito y código 200
                return jsonify({'message': 'Producto Insertado con Éxito'}), 200
            else:
                # Devolver una respuesta JSON indicando que el producto ya está en el sistema y código 200
                return jsonify({'message': 'El Producto ya se encuentra agregado en el sistema'}), 200

        # Capturar cualquier excepción que ocurra durante las operaciones anteriores
        except Exception as ex:
            # Devolver una respuesta JSON con un mensaje de error que contiene la descripción de la excepción
            return jsonify({'message': str(ex)})

                
    # --------------------------------------- Actualizar producto ------------------------------
  
    @staticmethod
    def actualizarProducto(json):
        """
        Actualiza la información de un producto existente.

        Args:
            json (dict): Un objeto JSON con la información actualizada del producto.

        Returns:
            tuple: Un mensaje de éxito o error y un código HTTP correspondiente.
        """
        # Intentar realizar las siguientes operaciones dentro de un bloque try-except
        try:
            # Crear un objeto Producto a partir de un objeto JSON
            producto = Producto(json)

            # Crear un cursor para realizar operaciones en la base de datos
            cur = mysql.connection.cursor()

            # Llamar al procedimiento almacenado 'sp_actualizarProducto' con los atributos actualizados del producto
            cur.callproc('sp_actualizarProducto', [producto._codigoProducto,
                                                producto._producto,
                                                producto._descripcion,
                                                producto._precio,
                                                producto._stock,
                                                producto._id_tipoProducto,
                                                producto._id_usuario])

            # Confirmar la transacción en la base de datos
            mysql.connection.commit()

            # Cerrar el cursor después de la actualización
            cur.close()

            # Devolver una respuesta JSON con un mensaje de éxito y código 200
            return jsonify({'message': 'Producto Actualizado correctamente'}), 200

        # Capturar cualquier excepción que ocurra durante las operaciones anteriores
        except Exception as ex:
            # Devolver una respuesta JSON con un mensaje de error que contiene la descripción de la excepción y código 409 (conflicto)
            return jsonify({'message': str(ex)}), 409


    @staticmethod
    def eliminarProducto(id_usuario, codigoProducto):
        """
        Elimina un producto asociado a un usuario.

        Args:
            id_usuario (str): El ID del usuario.
            codigoProducto (int): El código del producto.

        Returns:
            tuple: Un mensaje de éxito o error y un código HTTP correspondiente.
        """
        # Intentar realizar las siguientes operaciones dentro de un bloque try-except
        try:
            # Crear un cursor para realizar operaciones en la base de datos
            cur = mysql.connection.cursor()

            # Llamar al procedimiento almacenado 'sp_obtenerProductoByUsuario' con los parámetros del usuario y código del producto
            cur.callproc('sp_obtenerProductoByUsuario', [id_usuario, codigoProducto])

            # Obtener la primera fila del resultado
            fila = cur.fetchone()

            # Cerrar el cursor después de la consulta
            cur.close()

            # Verificar si el producto existe en el sistema
            if fila is None:
                # Devolver una respuesta JSON indicando que el producto no se encuentra en el sistema y código 409 (conflicto)
                return jsonify({'message': 'Producto No se encuentra en el sistema'}), 409
            else:
                # Abrir un nuevo cursor
                cur = mysql.connection.cursor()

                # Llamar al procedimiento almacenado 'sp_eliminarProducto' con los parámetros del usuario y código del producto
                cur.callproc('sp_eliminarProducto', [id_usuario, codigoProducto])

                # Confirmar la transacción en la base de datos
                mysql.connection.commit()

                # Cerrar el cursor después de la eliminación
                cur.close()

                # Devolver una respuesta JSON con un mensaje de éxito y código 200
                return jsonify({'message': 'Producto Eliminado con Éxito'}), 200

        # Capturar cualquier excepción que ocurra durante las operaciones anteriores
        except Exception as ex:
            # Devolver una respuesta JSON con un mensaje de error que contiene la descripción de la excepción y código 409 (conflicto)
            return jsonify({'message': str(ex)}), 409


    @staticmethod
    def altaProductoByUsuario(id_usuario, codigoProducto):
        """
        Vuelve a agregar un producto eliminado previamente.

        Args:
            id_usuario (str): El ID del usuario.
            codigoProducto (int): El código del producto.

        Returns:
            tuple: Un mensaje de éxito o error y un código HTTP correspondiente.
        """
        # Intentar realizar las siguientes operaciones dentro de un bloque try-except
        try:
            # Crear un cursor para realizar operaciones en la base de datos
            cur = mysql.connection.cursor()

            # Llamar al procedimiento almacenado 'sp_altaProducto' con los parámetros del usuario y código del producto
            cur.callproc('sp_altaProducto', [id_usuario, codigoProducto])

            # Confirmar la transacción en la base de datos
            mysql.connection.commit()

            # Cerrar el cursor después de la operación
            cur.close()

            # Devolver una respuesta JSON con un mensaje de éxito y código 200
            return jsonify({'message': 'Producto agregado nuevamente con Éxito'}), 200

        # Capturar cualquier excepción que ocurra durante las operaciones anteriores
        except Exception as ex:
            # Devolver una respuesta JSON con un mensaje de error que contiene la descripción de la excepción y código 409 (conflicto)
            return jsonify({'message': str(ex)}), 409


    @staticmethod
    def obtenerProductosByUsuario(id_usuario):
        """
        Obtiene todos los productos asociados a un usuario.

        Args:
            id_usuario (str): El ID del usuario.

        Returns:
            tuple: Una lista de productos en formato JSON y un código HTTP correspondiente.
        """
        # Intentar realizar las siguientes operaciones dentro de un bloque try-except
        try:
            # Crear un cursor para realizar operaciones en la base de datos
            cur = mysql.connection.cursor()

            # Llamar al procedimiento almacenado 'sp_obtenerProductosByUsuario' con el parámetro del usuario
            cur.callproc('sp_obtenerProductosByUsuario', [id_usuario])

            # Obtener todos los resultados de la consulta
            datos = cur.fetchall()

            # Cerrar el cursor después de la consulta
            cur.close()

            # Verificar si se obtuvieron datos
            if len(datos) != 0:
                # Inicializar una lista para almacenar los productos
                productos = []

                # Iterar sobre cada fila de datos
                for fila in datos:
                    # Convertir la fila de datos a un formato JSON de producto y agregarlo a la lista
                    producto = Producto.obtenerProductosByUsuarioToJson(fila)
                    productos.append(producto)

                # Devolver una respuesta JSON con la lista de productos y código 200
                return jsonify(productos), 200
            else:
                # Devolver una respuesta JSON indicando que no se encontraron productos y código 409 (conflicto)
                return jsonify({'message': 'Productos no encontrado'}), 409

        # Capturar cualquier excepción que ocurra durante las operaciones anteriores
        except Exception as ex:
            # Devolver una respuesta JSON con un mensaje de error que contiene la descripción de la excepción y código 409 (conflicto)
            return jsonify({'message': str(ex)}), 409


    @staticmethod
    def obtenerProductoByUsuario(id_usuario, codigoProducto):
        """
        Obtiene un producto específico de un usuario.

        Args:
            id_usuario (str): El ID del usuario.
            codigoProducto (int): El código del producto.

        Returns:
            tuple: Un producto en formato JSON y un código HTTP correspondiente.
        """
        # Intentar realizar las siguientes operaciones dentro de un bloque try-except
        try:
            # Crear un cursor para realizar operaciones en la base de datos
            cur = mysql.connection.cursor()

            # Llamar al procedimiento almacenado 'sp_obtenerProductosByUsuario' con los parámetros del usuario y código del producto
            cur.callproc('sp_obtenerProductosByUsuario', [id_usuario, codigoProducto])

            # Obtener la primera fila del resultado
            fila = cur.fetchone()

            # Cerrar el cursor después de la consulta
            cur.close()

            # Verificar si se obtuvo una fila de datos
            if fila is not None:
                # Convertir la fila de datos a un formato JSON de producto
                producto = Producto.obtenerProductosByUsuarioToJson(fila)

                # Devolver una respuesta JSON con el producto y código 200
                return jsonify(producto), 200
            else:
                # Devolver una respuesta JSON con valores predeterminados y código 200
                return jsonify({'Cliente': '', 'id_tipoEstado': ''}), 200

        # Capturar cualquier excepción que ocurra durante las operaciones anteriores
        except Exception as ex:
            # Devolver una respuesta JSON con un mensaje de error que contiene la descripción de la excepción y código 409 (conflicto)
            return jsonify({'message': str(ex)}), 409


    @staticmethod
    def obtenerStockPorProducto(id_usuario, codigoProducto):
        """
        Obtiene el stock de un producto específico de un usuario.

        Args:
            id_usuario (str): El ID del usuario.
            codigoProducto (int): El código del producto.

        Returns:
            tuple: El stock del producto en formato JSON y un código HTTP correspondiente.
        """
        # Intentar realizar las siguientes operaciones dentro de un bloque try-except
        try:
            # Crear un cursor para realizar operaciones en la base de datos
            cur = mysql.connection.cursor()

            # Llamar al procedimiento almacenado 'sp_obtenerStockPorProducto' con los parámetros del usuario y código del producto
            cur.callproc('sp_obtenerStockPorProducto', [id_usuario, codigoProducto])

            # Obtener la primera fila del resultado
            fila = cur.fetchone()

            # Cerrar el cursor después de la consulta
            cur.close()

            # Verificar si se obtuvo una fila de datos
            if fila is not None:
                # Convertir la fila de datos a un formato JSON de stock
                stock = Producto.obtenerStockPorProductoToJson(fila)

                # Devolver una respuesta JSON con el stock y código 200
                return jsonify(stock), 200
            else:
                # Devolver una respuesta JSON con un stock predeterminado de '0' y código 200
                return jsonify({'stock': '0'}), 200

        # Capturar cualquier excepción que ocurra durante las operaciones anteriores
        except Exception as ex:
            # Devolver una respuesta JSON con un mensaje de error que contiene la descripción de la excepción y código 409 (conflicto)
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
        """
        Convierte una lista de datos en formato JSON a un diccionario de stock de producto.

        Args:
            cls (type): La clase que contiene este método.
            json (list): Una lista con datos de stock en formato JSON.

        Returns:
            dict: Un diccionario que representa el stock de un producto con las siguientes claves:
                - 'stock': La cantidad de stock del producto.
                - 'id_tipoProducto': El ID del tipo de producto.
        """
        return {
            'stock': int(json[0]),
            'id_tipoProducto': int(json[1])
        }