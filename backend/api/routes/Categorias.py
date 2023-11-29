# Importa la instancia de la aplicación 'app' desde el módulo 'api'
from api import app

# Importa funciones y recursos útiles desde 'api.utils' y otros módulos
from api.utils import token_required

# Importa la función 'jsonify' desde el módulo 'flask'
from flask import jsonify

# Importa los modelos de categorías: TipoCondicionIVA, TipoCondicionVenta, TipoFactura, TipoProducto
from api.models.Categorias import TipoCondicionIVA, TipoCondicionVenta, TipoFactura, TipoProducto

# Define una ruta para obtener la categoría 'Tipo Condición IVA'
@app.route('/dashboard/listarTipoCondicionIVA', methods=['GET'])
@token_required
def mostrarTipoCondicionIVA():
    """
    Obtiene la lista de la categoría 'Tipo Condición IVA'.

    Métodos admitidos:
    - GET: Retorna la lista de 'Tipo Condición IVA' en formato JSON.

    Respuestas:
    - 200 OK: Retorna la lista de 'Tipo Condición IVA' en formato JSON.
    - 409 Conflict: En caso de error, se proporciona un mensaje de error en formato JSON.
    """
    try:
        # Llama al método 'mostrarTipoCondicionIVA' del modelo 'TipoCondicionIVA' y devuelve el resultado como JSON
        return TipoCondicionIVA.mostrarTipoCondicionIVA()
    except Exception as ex:
        # Si hay una excepción, devuelve un mensaje de error como JSON
        return jsonify({'message': str(ex)})

# Define una ruta para obtener la categoría 'Tipo Factura'
@app.route('/dashboard/listarTipoFactura', methods=['GET'])
@token_required
def mostrarTipoFactura():
    """
    Obtiene la lista de la categoría 'Tipo Factura'.

    Métodos admitidos:
    - GET: Retorna la lista de 'Tipo Factura' en formato JSON.

    Respuestas:
    - 200 OK: Retorna la lista de 'Tipo Factura' en formato JSON.
    - 409 Conflict: En caso de error, se proporciona un mensaje de error en formato JSON.
    """
    try:
        # Llama al método 'mostrarTipoFactura' del modelo 'TipoFactura' y devuelve el resultado como JSON
        return TipoFactura.mostrarTipoFactura()
    except Exception as ex:
        # Si hay una excepción, devuelve un mensaje de error como JSON
        return jsonify({'message': str(ex)})

# Define una ruta para obtener la categoría 'Tipo Producto'
@app.route('/dashboard/listarTipoProducto', methods=['GET'])
@token_required
def mostrarTipoProducto():
    """
    Obtiene la lista de la categoría 'Tipo Producto'.

    Métodos admitidos:
    - GET: Retorna la lista de 'Tipo Producto' en formato JSON.

    Respuestas:
    - 200 OK: Retorna la lista de 'Tipo Producto' en formato JSON.
    - 409 Conflict: En caso de error, se proporciona un mensaje de error en formato JSON.
    """
    try:
        # Llama al método 'mostrarTipoProducto' del modelo 'TipoProducto' y devuelve el resultado como JSON
        return TipoProducto.mostrarTipoProducto()
    except Exception as ex:
        # Si hay una excepción, devuelve un mensaje de error como JSON
        return jsonify({'message': str(ex)})

# Define una ruta para obtener la categoría 'Tipo Condición Venta'
@app.route('/dashboard/listarTipoCondicionVenta', methods=['GET'])
@token_required
def mostrarTipoCondicionVenta():
    """
    Obtiene la lista de la categoría 'Tipo Condición Venta'.

    Métodos admitidos:
    - GET: Retorna la lista de 'Tipo Condición Venta' en formato JSON.

    Respuestas:
    - 200 OK: Retorna la lista de 'Tipo Condición Venta' en formato JSON.
    - 409 Conflict: En caso de error, se proporciona un mensaje de error en formato JSON.
    """
    try:
        # Llama al método 'mostrarTipoCondicionVenta' del modelo 'TipoCondicionVenta' y devuelve el resultado como JSON
        return TipoCondicionVenta.mostrarTipoCondicionVenta()
    except Exception as ex:
        # Si hay una excepción, devuelve un mensaje de error como JSON
        return jsonify({'message': str(ex)})


    



    