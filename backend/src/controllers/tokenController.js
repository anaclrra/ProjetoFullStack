const tokenModel = require('../models/tokenModel');

const login = async (req, res) => {
    try {
        const logged = await tokenModel.login(req.body);
        if (logged.length === 0) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }
        const user = logged[0];
        const payload = {
            userId: user.id,
        };
        const token = tokenModel.gerarToken(payload);
        return res.status(200).json({ acessToken: token });

    } catch (error) {
        console.error('Erro no login:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    login
};