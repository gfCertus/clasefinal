const usuariosServicio = require('../servicios/usuarioServicio');

class UsuariosControlador {
    crearUsuario(req, res) {
        const { alias, equipo } = req.body;
        if (!alias || !equipo) {
            return res.status(400).json({ mensaje: 'Alias y equipo son obligatorios.' });
        }
        const usuario = usuariosServicio.crearUsuario(alias, equipo);
        return res.status(201).json(usuario);
    }

    obtenerUsuario(req, res) {
        const { id } = req.params;
        const usuario = usuariosServicio.obtenerUsuario(id);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        }
        return res.status(200).json(usuario);
    }

    actualizarUsuario(req, res) {
        const { id } = req.params;
        const { alias, equipo } = req.body;
        const usuario = usuariosServicio.actualizarUsuario(id, alias, equipo);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        }
        return res.status(200).json(usuario);
    }

    eliminarUsuario(req, res) {
        const { id } = req.params;
        const eliminado = usuariosServicio.eliminarUsuario(id);
        if (!eliminado) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        }
        return res.status(200).json({ mensaje: 'Usuario eliminado con éxito.' });
    }
}

module.exports = new UsuariosControlador();
