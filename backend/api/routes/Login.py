from api import app
from flask import request, jsonify
from api.db.db import mysql
import jwt
import datetime

@app.route('/login', methods = ['POST'])
def login():
    auth = request.authorization

    """ Control: existen valores para la autenticacion? """
    if not auth or not auth.username or not auth.password:
        return jsonify({"message": "No autorizado"}), 401       
            
    """ Control: existe y coincide el usuario en la BD? """
    cur = mysql.connection.cursor()
    cur.callproc('sp_loginUsuario',(auth.username, auth.password))
    row = cur.fetchone()

    if row is None:
       return jsonify({"message": "No se haya registrado en el sistema"}), 401
    
    if row[5] == 2:
        return jsonify({"message": "El usuario se halla desactivado. Consulte al administrador"}), 402
    
    """ El usuario existe en la BD y coincide su contraseña """
    token = jwt.encode({'id': row[0],
                        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=100)}, app.config['SECRET_KEY'])

    return jsonify({"token": token, "username": auth.username , "id": row[0]})