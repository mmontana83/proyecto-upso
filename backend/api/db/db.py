from api import app
from flask_mysqldb import MySQL

#cambiarlo por localhost si es instancia local o casitamontana.ddns.net si se conecta al servidor mysql
<<<<<<< HEAD
app.config['MYSQL_HOST'] = 'localhost' 
=======
app.config['MYSQL_HOST'] = 'casitamontana.ddns.net' 
>>>>>>> cc49cf0b0ccae5900bb7d4d47bc02bfb9c59ee0c
app.config['MYSQL_USER'] = 'proyecto'
app.config['MYSQL_PASSWORD'] ='proyecto'
app.config['MYSQL_DB'] = 'proyecto'

mysql = MySQL(app)