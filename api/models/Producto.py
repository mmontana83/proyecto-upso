class Producto():
    
    def __init__(self, id_producto, producto, descripcion, precio, stock, id_tipoProducto, id_usuario):
        self._id_producto = id_producto
        self._producto = producto
        self._descripcion = descripcion
        self._precio = precio
        self._stock = stock
        self._id_tipoProducto = id_tipoProducto
        self._id_usuario = id_usuario

    def to_json(self):
        return {
            'id_producto': self._id_producto,
            'producto': self._producto,
            'descripcion': self._descripcion,
            'precio': self._precio,
            'stock': self._stock,
            'id_tipoProducto': self._id_tipoProducto,
            'id_usuario': self._id_usuario
        }
    