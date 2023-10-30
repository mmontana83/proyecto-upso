class Cliente():

    def __init__(self, fila):
        self._id_cliente = fila[0]
        self._nombre = fila[1]
        self._apellido = fila[2]
        self._empresa = fila[3]
        self._email = fila[4]
        self._telefono = fila[5]
        self._direccion = fila[6]
        self._id_tipoCondicionIVA = fila[7]
        self._id_usuario = fila[8]

    @classmethod
    def sp_listarClientesByUsuarioToJson(self, fila):
        return{
            'id_cliente': fila[0],
            'nombre': fila[1],
            'apellido': fila[2],
            'empresa': fila[3],
            'email': fila[4],
            'telefono': fila[5],
            'direccion': fila[6],
            'condicionIVA': fila[7]
        }

    def to_json(self):
        return {
            'id_cliente': self._id_cliente,
            'nombre': self._nombre,
            'apellido': self._apellido,
            'empresa': self._empresa,
            'email': self._email,
            'telefono': self._telefono,
            'direccion': self._direccion,
            'id_tipoCondicionIVA': self._id_tipoCondicionIVA,
            'id_usuario': self._id_usuario
        }
    