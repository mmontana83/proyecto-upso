from api import app
from flask_mysqldb import MySQL

#cambiarlo por localhost si es instancia local o casitamontana.ddns.net si se conecta al servidor mysql
<<<<<<< HEAD
app.config['MYSQL_HOST'] = 'localhost' 
=======
app.config['MYSQL_HOST'] = 'casitamontana.ddns.net' 
>>>>>>> 0669de48f597d3a8160167d210187e19c5045a61
app.config['MYSQL_USER'] = 'proyecto'
app.config['MYSQL_PASSWORD'] ='proyecto'
app.config['MYSQL_DB'] = 'proyecto'

mysql = MySQL(app)