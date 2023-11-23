from api.db.db import mysql
from flask import request, jsonify
import re

class Cliente():

    def __init__(self, json):
        self._id_cliente = json['id_cliente'].strip()
        self._nombre = json['nombre'].strip()
        self._apellido = json['apellido'].strip()
        self._empresa = json['empresa'].strip()
        self._email = json['email'].strip()
        self._telefono = json['telefono'].strip()
        self._direccion = json['direccion'].strip()
        self._id_tipoCondicionIVA = int(json['id_tipoCondicionIVA'].strip())
        self._id_usuario = json['id_usuario'].strip()
    
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

            #Validaciones
            #Validación CUIL/CUIT cliente
            if len(cliente._id_cliente) != 11:
                return jsonify({'message':'El CUIT/CUIL ingresado debe tener 11 números'}), 409

            if '-' in str(cliente._id_cliente) or '/' in str(cliente._id_cliente):
                return jsonify({'message':'El CUIT/CUIL ingresado sólo debe contener números'}), 409
            
            #Validación CUIL/CUIT usuario
            if len(cliente._id_usuario) != 11:
                return jsonify({'message':'El CUIT/CUIL ingresado debe tener 11 números'}), 409

            if '-' in str(cliente._id_usuario) or '/' in str(cliente._id_usuario):
                return jsonify({'message':'El CUIT/CUIL ingresado sólo debe contener números'}), 409
            
            #Validación del Id Producto
            if not str(cliente._id_tipoCondicionIVA).isdigit():
                return jsonify({'message':'El Id del Producto debe ser un número'}), 409
            
            #Validación del Email
            expresion_regular = r"(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])"
            if re.match(expresion_regular, cliente._email) is None:
                return jsonify({'message':'El email no tiene formato correcto'}), 409

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
                return jsonify({'message':'Cliente Registrado con Éxito'}), 200
            else:
                return jsonify({'message':'Ya existe un cliente registrado con el CUIT CUIL Ingresado'}), 409
        except Exception as ex:
            return jsonify({'message': str(ex)}), 409
    
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
            return jsonify({'message':'Cliente Actualizado con Éxito'}), 200
        except Exception as ex:
            return jsonify({'message': str(ex)}), 409
    
    @staticmethod
    def eliminarCliente(id_cliente, id_usuario):
        try:
            cur = mysql.connection.cursor()
            cur.callproc('sp_eliminarCliente', [id_cliente, id_usuario])
            mysql.connection.commit() #Esto confirma la acción de inserción
            cur.close()
            return jsonify({'message':'Cliente Eliminado con Éxito'}), 200
        except Exception as ex:
            return jsonify({'message': str(ex)}), 409
        
    @staticmethod
    def altaCliente(id_cliente, id_usuario):
        try:
            cur = mysql.connection.cursor()
            cur.callproc('sp_altaCliente', [id_cliente, id_usuario])
            mysql.connection.commit() #Esto confirma la acción de inserción
            cur.close()
            return jsonify({'message':'Cliente dado de Alta Nuevamente con Éxito'}), 200
        except Exception as ex:
            return jsonify({'message': str(ex)}), 409
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
                return jsonify(clientes), 200
            else:
                return jsonify({'message':'No tiene clientes registrados'}), 409
        except Exception as ex:
            return jsonify({'message': str(ex)}), 409

    @staticmethod
    def obtenerClienteByIdCliente(id_usuario, id_cliente):
        try:
            cur = mysql.connection.cursor()
            cur.callproc('sp_obtenerClienteById_Cliente',[id_usuario, id_cliente])
            fila = cur.fetchone()
            
            if fila != None:
                return jsonify(Cliente.sp_obtenerClienteByIdClienteToJson(fila)), 200
            else: 
                return jsonify({'Cliente':'', 'id_tipoEstado':''})
        except Exception as ex:
            return jsonify({'message': str(ex)}), 409

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
    
    @classmethod
    def sp_obtenerClienteByIdClienteToJson(self, json):
        return{
            'cliente': json[0],
            'id_tipoEstado': json[1]
        }

    
    