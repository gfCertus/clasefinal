
const express = require("express");
const router = express.Router();
const PuntuacionServicio = require("../servicios/puntuacionServicio");

// Obtener todas las puntuaciones
router.get("/", (req, res) => {
  const puntuaciones = PuntuacionServicio.listarPuntuaciones();
  console.log("GET PUNTUACIONES");
  res.json(puntuaciones);
});

// Crear una nueva puntuación
router.post("/", (req, res) => {
  const { id, equipo, puntos } = req.body;
  try {
    const nuevaPuntuacion = PuntuacionServicio.crearPuntuacion(id, equipo, puntos);
    res.status(201).json(nuevaPuntuacion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar una puntuación
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { equipo, puntos } = req.body;
  try {
    const puntuacionActualizada = PuntuacionServicio.actualizarPuntuacion(id, equipo, puntos);
    res.json(puntuacionActualizada);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
