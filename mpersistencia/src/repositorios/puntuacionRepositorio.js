
const fs = require("fs");
const path = require("path");

// Ruta al archivo JSON
const databasePath = path.join(__dirname, "../data/puntuaciones.json");

// Leer los datos del archivo JSON
function leerBaseDatos() {
  if (!fs.existsSync(databasePath)) {
    fs.writeFileSync(databasePath, JSON.stringify([])); // Crea el archivo si no existe
  }
  const data = fs.readFileSync(databasePath, "utf8");
  return JSON.parse(data);
}

// Escribir datos al archivo JSON
function escribirBaseDatos(data) {
  fs.writeFileSync(databasePath, JSON.stringify(data, null, 2));
}

class PuntuacionRepositorio {
  // Obtiene todas las puntuaciones
  obtenerTodas() {
    console.log("Leyendo...");
    return leerBaseDatos();
  }

  // Guarda una nueva puntuación
  guardar(puntuacion) {
    const puntuaciones = leerBaseDatos();
    puntuaciones.push(puntuacion);
    escribirBaseDatos(puntuaciones);
    return puntuacion;
  }

  // Busca una puntuación por ID
  buscarPorId(id) {
    const puntuaciones = leerBaseDatos();
    return puntuaciones.find((p) => p.id === id);
  }

  // Actualiza una puntuación existente
  actualizar(id, nuevaPuntuacion) {
    const puntuaciones = leerBaseDatos();
    const indice = puntuaciones.findIndex((p) => p.id === id);
    if (indice !== -1) {
      puntuaciones[indice] = nuevaPuntuacion;
      escribirBaseDatos(puntuaciones);
      return nuevaPuntuacion;
    }
    return null;
  }
}

module.exports = new PuntuacionRepositorio();
