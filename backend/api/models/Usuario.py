from api import app
from flask import request, jsonify
from api.db.db import mysql
import jwt
import datetime


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

            auth = request.authorization

            """ Control: existen valores para la autenticacion? """
            if not auth or not auth.username or not auth.password:
                return jsonify({"message": "No autorizado"}), 401       
                    
            """ Control: existe y coincide el usuario en la BD? """
            cur = mysql.connection.cursor()
            cur.callproc('sp_loginUsuario',(auth.username, auth.password))
            data = cur.fetchone()

            if data is None:
                return jsonify({"mensaje": "No se haya registrado en el sistema"}), 401
            
            usuario = Usuario(data)
            if usuario._id_tipoEstado == 2:
                return jsonify({"mensaje": "El usuario se halla desactivado. Consulte al administrador"}), 402
            
            """ El usuario existe en la BD y coincide su contraseña """
            token = jwt.encode({'id-usuario': usuario._id_usuario,
                                'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=100)}, app.config['SECRET_KEY'])

            usuarioJson = usuario.to_json()
            usuarioJson['token'] =  token

            return jsonify(usuarioJson)
        
        except Exception as ex:
            return {'mensaje': str(ex)}