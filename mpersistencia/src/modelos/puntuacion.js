// Modelo de Puntuación
class Puntuacion {
    constructor(id, equipo, puntos) {
      this.id = id;         // Identificador único de la partida
      this.equipo = equipo; // Nombre del equipo (Rojo o Azul)
      this.puntos = puntos; // Puntos acumulados
    }
  }
  
  module.exports = Puntuacion;
  