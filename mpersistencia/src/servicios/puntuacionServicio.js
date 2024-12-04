const PuntuacionRepositorio = require("../repositorios/puntuacionRepositorio");
const Puntuacion = require("../modelos/puntuacion");

class PuntuacionServicio {
  // Obtiene todas las puntuaciones
  listarPuntuaciones() {
    return PuntuacionRepositorio.obtenerTodas();
  }

  // Crea una nueva puntuación
  crearPuntuacion(id, equipo, puntos) {
    const nuevaPuntuacion = new Puntuacion(id, equipo, puntos);
    return PuntuacionRepositorio.guardar(nuevaPuntuacion);
  }

  // Actualiza una puntuación existente
  actualizarPuntuacion(id, equipo, puntos) {
    const puntuacionExistente = PuntuacionRepositorio.buscarPorId(id);
    if (!puntuacionExistente) {
      throw new Error("Puntuación no encontrada");
    }
    const puntuacionActualizada = new Puntuacion(id, equipo, puntos);
    return PuntuacionRepositorio.actualizar(id, puntuacionActualizada);
  }
}

module.exports = new PuntuacionServicio();
