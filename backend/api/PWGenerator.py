#Con esta rutina genero contraseñas encriptadas para los Usuarios
from werkzeug.security import check_password_hash, generate_password_hash

print("#### Password Generator ####")
print("============================")
password = input("Ingrese una Contraseña: ")
print("La contraseña generada es: ", generate_password_hash(password))