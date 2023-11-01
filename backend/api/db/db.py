from api import app
from flask_mysqldb import MySQL

app.config['MYSQL_HOST'] = 'casitamontana.ddns.net' #cambiarlo por casitamontana.ddnet.
app.config['MYSQL_USER'] = 'proyecto'
app.config['MYSQL_PASSWORD'] ='proyecto'
app.config['MYSQL_DB'] = 'proyecto'

mysql = MySQL(app)