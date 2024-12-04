const express = require('express');
const rutasUsuarios = require('./rutas/usuariosRutas');

const app = express();

// Middlewares
app.use(express.json());

// Rutas
app.use('/usuarios', rutasUsuarios);

// Inicialización del servidor
const PUERTO = process.env.PUERTO || 3001;
app.listen(PUERTO, () => {
    console.log(`Servicio de Usuarios ejecutándose en el puerto ${PUERTO}`);
});
