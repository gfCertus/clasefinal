const express = require('express');
const router = express.Router();
const usuariosControlador = require('../controladores/usuariosControlador');

// Rutas de Usuarios
router.post('/', usuariosControlador.crearUsuario); // Crear usuario
router.get('/:id', usuariosControlador.obtenerUsuario); // Obtener usuario por ID
router.put('/:id', usuariosControlador.actualizarUsuario); // Actualizar usuario
router.delete('/:id', usuariosControlador.eliminarUsuario); // Eliminar usuario

module.exports = router;
