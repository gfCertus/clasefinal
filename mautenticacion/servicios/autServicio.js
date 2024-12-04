const tokenFactory = require('../factorias/tokenFactory');

// Simulación de una base de datos para almacenar credenciales de usuarios.
const usuarios = [
    { alias: 'Jugador1', password: '123456' },
    { alias: 'Jugador2', password: 'password456' },
    { alias: 'Jugador3', password: 'password123' },
    { alias: 'Jugador4', password: 'password456' },
    { alias: 'gfrancia', password: 'qaz123++' },
];

// Lógica para iniciar sesión
exports.login = async (alias, password) => {
    const usuario = usuarios.find(u => u.alias === alias && u.password === password);
    if (!usuario) {
        throw new Error('Credenciales inválidas');
        console.log('Credenciales invalidas');
        const token='';
        return token;
    }
    else
    {
        console.log("login");
        // Genera un token usando la fábrica
        const token = tokenFactory.crearToken(alias);
        return token;
    }

};

// Lógica para verificar un token
exports.verificarToken = async (token) => {
    const alias = tokenFactory.verificarToken(token);
    console.log("VerificarToken");
    if (!alias) throw new Error('Token inválido');

    return { valido: true, alias };
};
