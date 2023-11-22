from api import app
from flask_mysqldb import MySQL

#cambiarlo por localhost si es instancia local o casitamontana.ddns.net si se conecta al servidor mysql
app.config['MYSQL_HOST'] = '127.0.0.1' 
app.config['MYSQL_USER'] = 'proyecto'
app.config['MYSQL_PASSWORD'] ='proyecto'
app.config['MYSQL_DB'] = 'proyecto'

mysql = MySQL(app)