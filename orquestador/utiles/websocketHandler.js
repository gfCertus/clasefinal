const communicationService = require("../servicios/communicationService");
const gameService = require("../servicios/gameService");

module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log(`Jugador conectado: ${socket.id}`);

        // Evento de jugador listo
        socket.on("playerReady", async (playerId) => {
            console.log(`Jugador listo: ${playerId}`);
            const allReady = await gameService.checkAllPlayersReady();
            if (allReady) {
                io.emit("startGame", "¡Todos los jugadores están listos! Comenzando el juego...");
            }
        });

        // Evento de movimiento de barra
        socket.on("barMove", (data) => {
            console.log(`Movimiento recibido: ${JSON.stringify(data)}`);
            communicationService.sendBarMove(data);
        });

        // Evento de puntuación
        socket.on("scoreUpdate", (score) => {
            console.log(`Actualización de puntuación: ${score}`);
            gameService.updateScore(score);
        });

        // Desconexión
        socket.on("disconnect", () => {
            console.log(`Jugador desconectado: ${socket.id}`);
        });
    });
};
