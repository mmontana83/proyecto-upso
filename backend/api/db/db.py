from api import app
from flask_mysqldb import MySQL

#cambiarlo por localhost si es instancia local o casitamontana.ddns.net si se conecta al servidor mysql
<<<<<<< HEAD
app.config['MYSQL_HOST'] = 'localhost' 
=======
app.config['MYSQL_HOST'] = 'casitamontana.ddns.net' 
>>>>>>> a9f581740d0f4e44d5c2e481d33a8c57430c4511
app.config['MYSQL_USER'] = 'proyecto'
app.config['MYSQL_PASSWORD'] ='proyecto'
app.config['MYSQL_DB'] = 'proyecto'

mysql = MySQL(app)