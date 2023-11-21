const connection = require('./connection');

const getAll = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users', (error, results) => {
            if (error) {
                console.error('Erro na consulta SQL:', error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

const getId = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users WHERE id = ?', [id], (error, results) => {
            if (error) {
                console.error('Erro na consulta SQL:', error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

const creatUser = (user) => {
    const { name, email, password } = user;

    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO users (username, email, passwrd) VALUES(?,?,?)',
            [name, email, password], (error, results) => {
                if (error) {
                    console.error('Erro na consulta SQL:', error);
                    reject(error);
                } else {
                    resolve(results);
                }
            });
    });

};

const deleteUser = async (id) => {
    return new Promise((resolve, reject) => {
        connection.query('DELETE FROM users WHERE id = ?',
            [id], (error, results) => {
                if (error) {
                    console.error('Erro na consulta SQL:', error);
                    reject(error);
                } else {
                    resolve(results);
                }
            });
    });
};

const updateUser = async (id, user) => {
    const { email, password } = user;

    return new Promise((resolve, reject) => {
        connection.query('UPDATE users SET email = ?, passwrd = ? WHERE id = ?',
            [email, password, id], (error, results) => {
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
    getAll,
    getId,
    creatUser,
    deleteUser,
    updateUser
};