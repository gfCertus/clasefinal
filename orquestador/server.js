const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const authRoutes = require("./rutas/autRutas");
const gameRoutes = require("./rutas/gameRutas");
const websocketHandler = require("./utiles/websocketHandler");
const config = require("./utiles/config");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Ajusta esto según tu dominio o IP.
        methods: ["GET", "POST"],
    },
});

// Middleware
app.use(express.json());

// Rutas
app.use("/auth", authRoutes);
app.use("/game", gameRoutes);

// WebSocket Handler
websocketHandler(io);

// Servidor
const PORT = config.port || 4000; // Cambia el puerto según tu configuración.
server.listen(PORT, () => {
    console.log(`Backend Orquestador corriendo en el puerto ${PORT}`);
});
