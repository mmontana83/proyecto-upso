from api.db.db import mysql
from flask import request, jsonify

class Producto:
    """
    Esta clase representa un producto y proporciona métodos para interactuar con sus datos.
    """

    def __init__(self, json):    
        """
        Constructor de la clase Producto. Inicializa las propiedades del producto con los datos proporcionados.

        Args:
            id_producto (int): ID del producto.
            producto (str): Nombre del producto.
            descripcion (str): Descripción del producto.
            precio (float): Precio del producto.
            stock (int): Cantidad en stock del producto.
            id_tipoProducto (int): ID del tipo de producto.
            id_usuario (int): ID del usuario que crea el producto.
        """
        self._id_producto = json['id_producto']
        self._producto = json['producto']
        self._descripcion = json['descripcion']
        self._precio = json['precio']
        self._stock = json['stock']
        self._id_tipoProducto = json['id_tipoProducto']
        self._id_usuario = json['id_usuario']

    def to_json(self):
        """
        Convierte el objeto Producto en un objeto JSON.

        Returns:
            dict: Un objeto JSON con los datos del producto.
        """
        return {
       
            'id_producto':self._id_producto,
            'producto': self._producto,
            'descripcion': self._descripcion,
            'precio': self._precio,
            'stock': self._stock,
            'id_tipoProducto': self._id_tipoProducto,          
            'id_usuario': self._id_usuario
        }
    

 #   @staticmethod
 #   def insertarProductoByUsuario(json):

  #      print(json)
        """
   #     Inserta un nuevo producto en la base de datos.

        Args:
            json (dict): Un objeto JSON con los datos del producto a insertar.

        Returns:
            dict: Un objeto JSON que contiene un mensaje de éxito o error.
        """
  #      try:
  #          producto = Producto(json)

   #         cur = mysql.connection.cursor()
   #         cur.callproc('sp_listarProductosByUsuario', [producto.id_usuario])
    #        fila = cur.fetchone()

     #       if fila is None:
     #           cur.close()
     #           cur.mysqlconnection.cursor()
     #           cur.callproc('sp_actualizarProducto', [producto._producto,
     #                                                  producto._descripcion,
     ###                                                  producto._precio,
     #                                                  producto._stock,
     #                                                  producto._id_tipoProducto,
     #                                                  producto._id_producto,
     #                                                  producto._id_usuario])                
     #           mysql.connection.commit()
     #           cur.close()
     #           return {'mensaje': 'Producto Agregado con Éxito'}
     #       else:
     #           return {'mensaje': 'El Producto ya se encuentra agregado en el sistema'}
        
     #   except Exception as ex:
     #       return {'mensaje': str(ex)}
        




                
    # --------------------------------------- Actualizar producto ------------------------------
    # ------------------------------------------ funciona ok ---------------------------------

    @staticmethod
    def actualizarProducto(json):
     
        """
        Actualiza la información de un producto existente en la base de datos.

        Args:
            json (dict): Un objeto JSON con los datos actualizados del producto.

        Returns:
            dict: Un objeto JSON que contiene un mensaje de éxito o error.
        """
        try:

            producto = Producto(json)
          

            cur = mysql.connection.cursor()
            cur.callproc('sp_actualizarProducto', [producto._id_producto,
                                                   producto._producto, 
                                                   producto._descripcion, 
                                                   producto._precio, 
                                                   producto._stock, 
                                                   producto._id_tipoProducto,
                                                   producto._id_usuario])
            mysql.connection.commit()
            cur.close()
            return {'mensaje': 'Producto Actualizado correctamente'}
        
        except Exception as ex:
            return {'mensaje': str(ex)}
        
    # --------------------------------- fin Actualziar producto -------------------------------

    
    
    # --------------------------------------- eliminar producto ------------------------------
    # ------------------------------------------ funciona ok ---------------------------------
    
    @staticmethod
    def eliminarProducto(id_usuario, id_producto):
        """
        Elimina un producto de la base de datos.

        Args:
            id_usuario (str): ID del usuario que realiza la operación.
            id_producto (int): ID del producto a eliminar.

        Returns:
            dict: Un objeto JSON que contiene un mensaje de éxito o error.
        """
        try:
            cur = mysql.connection.cursor()
            cur.callproc('sp_eliminarProducto', [id_usuario, id_producto])
            mysql.connection.commit()
            cur.close()
            return {'mensaje':'Producto Eliminado con Éxito'}
        
        except Exception as ex: 
            return {'mensaje': str(ex)}
        
# --------------------------------- fin eliminar producto -------------------------------        

    
    
# -------------------------------- alta prodcucto by usuario ----------------------------
# -----------------------------------------anda ok --------------------------------------
    
    @staticmethod
    def altaProductoByUsuario(id_usuario, id_producto):
        """
        Da de alta nuevamente un producto que previamente había sido eliminado.

        Args:
            id_usuario (str): ID del usuario que realiza la operación.
            id_producto (int): ID del producto a dar de alta.

        Returns:
            dict: Un objeto JSON que contiene un mensaje de éxito o error.
        """
        try:
            cur = mysql.connection.cursor()
            cur.callproc('sp_altaProducto', [id_usuario, id_producto])
            mysql.connection.commit()
            cur.close()
            return {'mensaje': 'Producto agregado nuevamente con Éxito'}
        except Exception as ex:
            return {'mensaje': str(ex)}
        
# ------------------------------- fin alta prodcucto by usuario ---------------------



# ----------------------------- alta obtener Productos por Usuario -------------------
# ------------------------------------------NO anda ----------------------------------    
    
    @staticmethod
    def obtenerProductosByUsuario(id_usuario):
        """
        Obtiene un producto específico por su ID y el ID del usuario.

        Args:
            id_usuario (str): ID del usuario.
            id_producto (int): ID del producto a obtener.

        Returns:
            dict: Un objeto JSON que contiene los datos del producto o un mensaje de error.
        """
        print(id_usuario)
        
        try:
            cur = mysql.connection.cursor()
            cur.callproc('sp_listarProductosByUsuario', [id_usuario])
            datos = cur.fetchall()
            
            if len(datos) != 0:
                productos = []
                for fila in datos:
                    producto = Producto.listarProductosToJson(fila)
                    productos.append(producto)
                return productos  
            else:
                return {'mensaje': 'Productos no encontrado'}
        except Exception as ex:
            return {'mensaje': str(ex)}
        
# ------------------------------ fin obtener Productos Usuario ---------------------------
        
        
    
# --------------- obtiene un determinado producto de un determinado usuario --------------
# -------------------------------------- funciona ok -------------------------------------    
    
    @staticmethod
    def obtenerProductoByUsuario(id_usuario, id_producto):
        """
        Obtiene un producto específico por su ID y el ID del usuario.

        Args:
            id_usuario (str): ID del usuario.
            id_producto (int): ID del producto a obtener.

        Returns:
            dict: Un objeto JSON que contiene los datos del producto o un mensaje de error.
        """
        
        try:
            cur = mysql.connection.cursor()
            cur.callproc('sp_listarProductoByUsuario', [id_usuario, id_producto])
            fila = cur.fetchone()

            if fila is not None:   
                producto = Producto.listarProductosToJson(fila)
                return producto     
            else:
                return {'mensaje': 'Productos no encontrado'}
        except Exception as ex:
            return {'mensaje': str(ex)}
        
# --------------- fin obtener un determinado productode un determinado usuario -------------



        
    @classmethod
    def listarProductosToJson(cls, json):

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
            'producto': json[1],
            'descripcion': json[2],
            'precio': json[3],
            'stock': json[4],
            'tipoproducto': json[5]
        }

""" Constructor __init__:

Este es el constructor de la clase Producto. Se utiliza para inicializar las propiedades de un objeto Producto cuando se crea una nueva 
instancia de la clase.
Los parámetros que recibe el constructor son: id_producto, producto, descripcion, precio, stock, id_tipoProducto e id_usuario.
Cada uno de estos parámetros se asigna a las propiedades correspondientes de la instancia del objeto Producto precedidas por un guion 
bajo (por ejemplo, self._id_producto = id_producto).
Estos atributos representan información sobre un producto, como su identificación, nombre, descripción, precio, stock, tipo de producto 
y el usuario asociado.

Método to_json:

Este método se utiliza para convertir un objeto Producto en un formato JSON, lo que facilita su representación y transmisión de datos.
Retorna un diccionario JSON que contiene todas las propiedades del objeto `Producto, utilizando las claves como nombres de propiedad y 
los valores correspondientes.
Este método es útil cuando se necesita enviar información de productos a través de una API web o almacenarla en una base de datos en 
formato JSON.
En resumen, esta clase Producto se utiliza para representar productos con sus atributos asociados, y proporciona un método para 
convertir estos objetos en formato JSON, lo que es comúnmente útil en aplicaciones web y sistemas que manejan información de productos. 


__init__ como constructor:

El método __init__ es especial en Python y se llama automáticamente cuando se crea una nueva instancia de una clase.
Su propósito principal es inicializar los atributos de la instancia con valores iniciales, como los argumentos pasados al crear un objeto.
Al llamar a __init__, se configuran las propiedades del objeto con los valores iniciales que se proporcionan al crear la instancia. 
Esto es lo que se llama "construir" o "inicializar" el objeto.
to_json como método:

to_json es un método que convierte un objeto en un formato específico, en este caso, un objeto JSON.
Este método no se llama automáticamente cuando se crea una instancia; en su lugar, se llama explícitamente cuando se necesita 
convertir el objeto en JSON.
El nombre to_json es descriptivo y sugiere que este método tiene la función de convertir el objeto en una representación JSON.


El parámetro self en los métodos de una clase en Python es una convención que se utiliza para referirse al objeto en sí mismo, es decir, 
a la instancia de la clase sobre la cual se está ejecutando el método. No es una palabra clave especial, y podrías usar cualquier 
otro nombre en lugar de self, pero es una práctica estándar y altamente recomendada utilizar self para este propósito.

Cuando defines un método en una clase y declaras self como su primer parámetro, estás permitiendo que el método acceda y manipule los 
atributos y métodos de la instancia de la clase en la que se llama. Esto es lo que permite que los métodos trabajen con datos 
específicos de la instancia y realicen operaciones en función de esos datos.


class MiClase:
    def __init__(self, atributo):
        self.atributo = atributo

    def mi_metodo(self):
        print(f"Valor del atributo: {self.atributo}")

# Crear una instancia de la clase
objeto = MiClase("Ejemplo")

# Llamar al método
objeto.mi_metodo()

"""