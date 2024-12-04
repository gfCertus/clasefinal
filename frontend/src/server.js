// src/server.js
const express = require('express');
const http = require('http');
const cors = require('cors');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);

// Habilitar CORS para permitir solicitudes desde cualquier origen
// Configurar CORS
app.use(cors({
    origin: 'http://192.168.10.100:3000', // Dirección del frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true // Si necesitas enviar cookies o credenciales
}));

// Servir archivos estáticos (el frontend del juego Phaser)
app.use(express.static('public'));

// Configurar WebSockets para comunicación en tiempo real
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Jugador conectado');

  ws.on('message', (message) => {
    console.log('Mensaje recibido:', message);
    // Aquí puedes agregar la lógica de comunicación, por ejemplo, movimientos de los jugadores
  });

  ws.on('close', () => {
    console.log('Jugador desconectado');
  });
});

// Iniciar el servidor Express
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
