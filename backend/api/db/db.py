from api import app
from flask_mysqldb import MySQL

#cambiarlo por localhost si es instancia local o casitamontana.ddns.net si se conecta al servidor mysql
<<<<<<< HEAD
#app.config['MYSQL_HOST'] = 'localhost' 
=======
>>>>>>> 0ac24b6d377507abf3e4502904366d02310aac49
app.config['MYSQL_HOST'] = 'casitamontana.ddns.net' 
app.config['MYSQL_USER'] = 'proyecto'
app.config['MYSQL_PASSWORD'] ='proyecto'
app.config['MYSQL_DB'] = 'proyecto'

mysql = MySQL(app)