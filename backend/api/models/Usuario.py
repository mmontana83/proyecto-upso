class Usuario():

    def __init__(self, id_usuario, nombre, apellido, usuario, contraseña, email, telefono):
        self._id_usuario = id_usuario
        self._nombre = nombre
        self._apellido = apellido
        self._usuario = usuario
        self._contraseña = contraseña
        self._email = email
        self._telefono = telefono

    def to_json(self):
        return {
            'id_usuario': self._id_usuario,
            'nombre': self._nombre,
            'apellido': self._apellido,
            'usuario': self._usuario,
            'contraseña': self._contraseña,
            'email': self._email,
            'telefono': self._telefono
        }