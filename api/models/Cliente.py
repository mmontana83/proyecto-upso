from api.db.db import mysql
from flask import request, jsonify

class Cliente():

    def __init__(self, json):
        self._id_cliente = json['id_cliente']
        self._nombre = json['nombre']
        self._apellido = json['apellido']
        self._empresa = json['empresa']
        self._email = json['email']
        self._telefono = json['telefono']
        self._direccion = json['direccion']
        self._id_tipoCondicionIVA = json['id_tipoCondicionIVA']
        self._id_usuario = json['id_usuario']
    
    def to_json(self):
        return {
            'id_cliente': self._id_cliente,
            'nombre': self._nombre,
            'apellido': self._apellido,
            'empresa': self._empresa,
            'email': self._email,
            'telefono': self._telefono,
            'direccion': self._direccion,
            'id_tipoCondicionIVA': self._id_tipoCondicionIVA,
            'id_usuario': self._id_usuario
        }
    
    @staticmethod
    def insertarCliente(json):
        try:
            cliente = Cliente(json)

            cur = mysql.connection.cursor()
            cur.callproc('sp_obtenerClienteById_Cliente', [cliente._id_usuario, cliente._id_cliente])
            fila = cur.fetchone()
  
            if fila == None:
                #Tengo que cerrar la conexión y volver a abrirla para poder llamar nuevamente al procedimiento almacenado
                cur.close()
                cur = mysql.connection.cursor()
                
                cur.callproc('sp_insertarCliente', [cliente._id_cliente, cliente._nombre, cliente._apellido, cliente._empresa,
                                                    cliente._email, cliente._telefono, cliente._direccion, cliente._id_tipoCondicionIVA, 
                                                    cliente._id_usuario])
                mysql.connection.commit() #Esto confirma la acción de inserción
                cur.close()
                return {'mensaje':'Cliente Registrado con Éxito'}
            else:
                return {'mensaje':'Cliente ya se encuentra Registrado'}
        except Exception as ex:
            return {'mensaje': str(ex)}
    
    @staticmethod
    def actualizarCliente(json):
        try:
            cliente = Cliente(json)

            cur = mysql.connection.cursor()
            cur.callproc('sp_actualizarCliente', [cliente._id_cliente, cliente._nombre, cliente._apellido, cliente._empresa,
                                                  cliente._email, cliente._telefono, cliente._direccion, cliente._id_tipoCondicionIVA,
                                                  cliente._id_usuario])
            mysql.connection.commit() #Esto confirma la acción de inserción
            cur.close()
            return {'mensaje':'Cliente Actualizado con Éxito'}
        except Exception as ex:
            return {'mensaje': str(ex)}
    
    @staticmethod
    def eliminarCliente(id_cliente, id_usuario):
        try:
            cur = mysql.connection.cursor()
            cur.callproc('sp_eliminarCliente', [id_cliente, id_usuario])
            mysql.connection.commit() #Esto confirma la acción de inserción
            cur.close()
            return {'mensaje':'Cliente Eliminado con Éxito'}
        except Exception as ex:
            return {'mensaje': str(ex)}
        
    @staticmethod
    def altaCliente(id_cliente, id_usuario):
        try:
            cur = mysql.connection.cursor()
            cur.callproc('sp_altaCliente', [id_cliente, id_usuario])
            mysql.connection.commit() #Esto confirma la acción de inserción
            cur.close()
            return {'mensaje':'Cliente dado de Alta Nuevamente con Éxito'}
        except Exception as ex:
            return {'mensaje': str(ex)}
        None
    
    @staticmethod
    def obtenerClientesByUsuario(id_usuario):
        try:
            cur = mysql.connection.cursor()
            cur.callproc('sp_listarClientesByUsuario',[id_usuario])
            datos = cur.fetchall()

            if len(datos) != 0:
                clientes = []
                for fila in datos:
                    cliente = Cliente.sp_listarClientesByUsuarioToJson(fila)
                    clientes.append(cliente)
                return clientes
            else:
                return {'mensaje':'No tiene clientes registrados'}
        except Exception as ex:
            return {'mensaje': str(ex)}

    @staticmethod
    def obtenerClienteByIdCliente(id_usuario, id_cliente):
        try:
            cur = mysql.connection.cursor()
            cur.callproc('sp_obtenerClienteById_Cliente',[id_usuario, id_cliente])
            fila = cur.fetchone()
            
            if fila != None:
                cliente = Cliente.sp_listarClientesByUsuarioToJson(fila)
                return cliente
        except Exception as ex:
            return {'mensaje': str(ex)}

    @classmethod
    def sp_listarClientesByUsuarioToJson(self, json):
        return{
            'id_cliente': json[0],
            'nombre': json[1],
            'apellido': json[2],
            'empresa': json[3],
            'email': json[4],
            'telefono': json[5],
            'direccion': json[6],
            'condicionIVA': json[7]
        }

    
    