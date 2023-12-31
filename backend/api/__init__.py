from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

app.config['SECRET_KEY'] = 'app_123'

import api.routes.Login
import api.routes.Cliente
import api.routes.Facturas
import api.routes.Categorias
import api.routes.Dashboard
import api.routes.Productos
