const Usuario = require('../modelos/usuarioModelo');

class UsuariosServicio {
    constructor() {
        this.usuarios = new Map(); // Estructura para almacenar usuarios temporalmente.
    }

    // Crear un nuevo usuario
    crearUsuario(alias, equipo) {
        const id = this.generarId(); // Genera un ID único.
        const usuario = Usuario.crearUsuario(id, alias, equipo); // Uso del Factory Method.
        this.usuarios.set(id, usuario);
        return usuario;
    }

    // Obtener un usuario por ID
    obtenerUsuario(id) {
        return this.usuarios.get(id) || null;
    }

    // Actualizar un usuario
    actualizarUsuario(id, alias, equipo) {
        const usuario = this.usuarios.get(id);
        if (usuario) {
            usuario.alias = alias || usuario.alias;
            usuario.equipo = equipo || usuario.equipo;
            return usuario;
        }
        return null;
    }

    // Eliminar un usuario
    eliminarUsuario(id) {
        return this.usuarios.delete(id);
    }

    // Genera un ID único
    generarId() {
        return Math.random().toString(36).substring(2, 15);
    }
}

module.exports = new UsuariosServicio();
