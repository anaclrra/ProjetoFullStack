const connection = require('./connection');

const getAll = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM tasks', (error, results) => {
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
    connection.query('SELECT * FROM tasks WHERE idTask = ?', [id], (error, results) => {
      if (error) {
        console.error('Erro na consulta SQL:', error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const getTaskByUser = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM tasks WHERE userId = ?', [id], (error, results) => {
      if (error) {
        console.error('Erro na consulta SQL:', error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const creatTask = (task) => {
  const { title, descricao, date, user } = task;

  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO tasks (titulo, descricao, data, userId) VALUES(?,?,?,?)',
      [title, descricao, date, user], (error, results) => {
        if (error) {
          console.error('Erro na consulta SQL:', error);
          reject(error);
        } else {
          resolve(results);
        }
      });
  });

};

const deleteTask = async (id) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM tasks WHERE idTask = ?',
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

const updateTask = async (id, task) => {
  const { title, descricao } = task;

  return new Promise((resolve, reject) => {
    connection.query('UPDATE tasks SET titulo = ?, descricao = ? WHERE idTask = ?',
      [title, descricao, id], (error, results) => {
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
  getTaskByUser,
  creatTask,
  deleteTask,
  updateTask
};