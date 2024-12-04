class Usuario {
    constructor(id, alias, equipo) {
        this.id = id;
        this.alias = alias;
        this.equipo = equipo;
    }

    // Método para crear un nuevo usuario
    static crearUsuario(id, alias, equipo) {
        // Este Factory Method permite flexibilidad para cambiar la implementación futura.
        return new Usuario(id, alias, equipo);
    }
}

module.exports = Usuario;
