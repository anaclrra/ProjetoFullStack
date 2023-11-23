const jwt = require('jsonwebtoken');
const connection = require('./connection');
const secret = process.env.JWT_SECRET;

function gerarToken(payload) {
    return jwt.sign(payload, secret, { expiresIn: 20 });
}

const login = (user) => {
    const { email, password } = user;
    return new Promise((resolve, reject) => {
        connection.query('SELECT id FROM users WHERE email = ? AND passwrd = ?', [email, password], (error, results) => {
            if (error) {
                console.error('Erro na consulta SQL:', error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};


module.exports = {
    gerarToken,
    login
};