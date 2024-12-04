const http = require("http");
const WebSocket = require("ws");

// Crear un servidor HTTP básico
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Microservicio de comunicaciones funcionando");
});

// Crear un servidor WebSocket basado en el servidor HTTP
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Cliente conectado");

  // Manejar mensajes entrantes
  ws.on("message", (message) => {
    console.log(`Mensaje recibido: ${message} - `,typeof(message));
     
   tipoEvento=JSON.parse(message)
   console.log(tipoEvento.type);
    ws.send();

   /* console.log(`Enviando respuesta al cliente: ${JSON.stringify(message)}`);
    ws.send(JSON.stringify(message));*/
  });

  // Manejar desconexión
  ws.on("close", () => {
    console.log("Cliente desconectado");
  });

  // Manejar errores
  ws.on("error", (error) => {
    console.error("Error en WebSocket:", error);
  });
});

// El servidor escucha en el puerto 3002
server.listen(3002, () => {
  console.log("Servidor WebSocket ejecutándose en ws://localhost:3002");
});
