from api import app
from flask import request, jsonify
from api.models.Usuario import Usuario

@app.route('/login', methods = ['POST'])
def login():
    try:
        auth = request.authorization
        return Usuario.login()
    except Exception as ex:
        return jsonify({'mensaje' : str (ex)})