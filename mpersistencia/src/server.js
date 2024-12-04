require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const puntuacionRutas = require("./controladores/puntuacionControlador");

// Configuración del servidor
const app = express();
const port = process.env.PORT || 4003;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use("/puntuaciones", puntuacionRutas);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Ocurrió un error interno.");
});

// Inicio del servidor
app.listen(port, () => {
  console.log(`Microservicio de persistencia corriendo en http://localhost:${port}`);
});
