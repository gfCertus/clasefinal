const express = require('express');
const bodyParser = require('body-parser');
const autControlador = require('./controladores/autControlador');
const cors= require('cors');
const app = express();
const PORT = 3004;

app.use(bodyParser.json());
// Configurar CORS
app.use(cors({
    origin: 'http://192.168.10.100:3000', // Dirección del frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true // Si necesitas enviar cookies o credenciales
}));

// Rutas del microservicio
app.post('/login', autControlador.login);
app.post('/verificar', autControlador.verificarToken);

app.listen(PORT, () => {
    console.log(`Microservicio de autenticación corriendo en el puerto ${PORT}`);
});
