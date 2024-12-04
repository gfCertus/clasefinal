const autServicio = require('../servicios/autServicio');

// Controlador para iniciar sesión
exports.login = async (req, res) => {
    try {
        const { alias, password } = req.body;
        const token = await autServicio.login(alias, password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

// Controlador para verificar un token
exports.verificarToken = async (req, res) => {
    try {
        const { token } = req.body;
        const resultado = await autServicio.verificarToken(token);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};
