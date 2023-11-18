from api import app
from flask import request, jsonify
from api.db.db import mysql
import jwt
import datetime
from werkzeug.security import check_password_hash


class Usuario():

    def __init__(self, data):
        self._id_usuario = data[0]
        self._nombre = data[1]
        self._apellido = data[2]
        self._email = data[3]
        self._telefono = data[4]
        self._id_tipoEstado = data[5]

    def to_json(self):
        return {
            'id_usuario': self._id_usuario,
            'nombre': self._nombre,
            'apellido': self._apellido,
            'email': self._email,
            'telefono': self._telefono
        }
    
    @staticmethod
    def login():
    
        try:
            #recibo el request del front
            auth = request.authorization
            
            if not auth.username and not auth.password:
                return jsonify({"message": "El campo Usuario y Contraseña no pueden estar vacios"}), 401
            else:
                if not auth.username:
                    return jsonify({"message": "El campo Usuario no puede esta vacío"}), 401
                else:
                    if not auth.password:
                        return jsonify({"message": "El campo Contraseña no puede esta vacío"}), 401
            
            """ Control: existen valores para la autenticacion? """
            if not auth or not auth.username or not auth.password:
                return jsonify({"message": "No autorizado"}), 401       
                    
            """ Control: existe el usuario en la BD? """
            cur = mysql.connection.cursor()
            cur.callproc('sp_obtenerPWDByUsuario', (auth.username,))
            data = cur.fetchone()
            cur.close()
            
            if data is None:
                return jsonify({"mensaje": "El usuario es incorrecto o no se haya registrado en el sistema"})

            """ Obtengo la contraseña encriptada de la BD y la comparo con la contraseña ingresada por el usuario"""
            pwdEncriptada = data[0]
            if check_password_hash(pwdEncriptada, auth.password):
                cur = mysql.connection.cursor()
                cur.callproc('sp_loginUsuario',(auth.username, pwdEncriptada))
                data = cur.fetchone()
                cur.close()
            else:
                return jsonify({"mensaje":"La contraseña ingresada es incorrecta"}), 401
            
            """ En este paso verifico que el usuario este vigente, es decir, no haya sido eliminado"""
            usuario = Usuario(data)
            if usuario._id_tipoEstado == 2:
                return jsonify({"mensaje": "El usuario se halla desactivado. Consulte al administrador"}), 402
            
            """ El usuario existe en la BD y coincide su contraseña """
            token = jwt.encode({'id_usuario': usuario._id_usuario,
                                'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=100)}, app.config['SECRET_KEY'])

            usuarioJson = usuario.to_json()
            usuarioJson['token'] =  token

            return jsonify(usuarioJson)
        
        except Exception as ex:
            return {'mensaje': str(ex)},401    
    