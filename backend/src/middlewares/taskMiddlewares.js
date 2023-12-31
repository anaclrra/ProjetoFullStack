const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const validateBody = (req, res, next) => {
  const { body } = req;

  if (body.title === undefined || body.descricao === undefined || body.date === undefined || body.user === undefined) {
    return res.status(400).json({ message: 'The fields is required' });
  }
  if (body.title === '' || body.descricao === '' || body.date === '' || body.user === '') {
    return res.status(400).json({ message: 'The fields cannot be empty' });
  }
  next();
};

const validateBodyForUpdate = (req, res, next) => {
  const { body } = req;

  if (body.title === undefined || body.descricao === undefined || body.date === undefined) {
    return res.status(400).json({ message: 'The fields is required' });
  }
  if (body.title === '' || body.descricao === '' || body.date === '') {
    return res.status(400).json({ message: 'The fields cannot be empty' });
  }
  next();
};

const validateBodyUser = (req, res, next) => {
  const { body } = req;

  if (body.name === undefined || body.email === undefined || body.password === undefined) {
    return res.status(400).json({ message: 'The fields is required' });
  }
  if (body.name === '' || body.email === '' || body.password === '') {
    return res.status(400).json({ message: 'The fields cannot be empty' });
  }
  next();
};

 function verificarToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({ mensagemErro: 'Usuário não autenticado! Faça login antes de chamar este recurso.' });
  }
  else {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        return res.status(403).json({ mensagemErro: 'Token inválido. Faça login novamente.' , error, secret});
      }
      else {
        req.userId = decoded.userId;
        console.log(`Usuário ${req.userId} autenticado com sucesso!`);
        next();
      }
    });
  }

}

module.exports = {
  validateBody,
  validateBodyUser,
  validateBodyForUpdate,
  verificarToken
};