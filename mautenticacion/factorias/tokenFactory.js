const crypto = require('crypto');

// Almacén simple de tokens (simulando una base de datos)
const tokens = new Map();

// Genera un token único para un alias
exports.crearToken = (alias) => {
    const token = crypto.randomBytes(16).toString('hex');
    tokens.set(token, alias); // Guarda el token y el alias asociado
    return token;
};

// Verifica si un token es válido
exports.verificarToken = (token) => {
    return tokens.get(token) || null; // Devuelve el alias si el token es válido
};
