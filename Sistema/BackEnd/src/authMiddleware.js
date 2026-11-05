const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ mensagem: 'Token ausente' });

  jwt.verify(token, 'chave_jwt_saep', (err, decoded) => {
    if (err) return res.status(401).json({ mensagem: 'Token inválido ou expirado' });
    req.user = decoded;
    next();
  });
};