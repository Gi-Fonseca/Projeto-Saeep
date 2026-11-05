const service = require('../services/funcionariosService');

module.exports = {
  async login(req, res) {
    try {
      const result = await service.login(req.body.email, req.body.senha);
      res.status(200).json(result);
    } catch (err) {
      res.status(err.status || 500).json({ mensagem: err.mensagem || 'Erro no servidor' });
    }
  }
};