const service = require('../services/veiculosService');

module.exports = {
  async listar(req, res) {
    const dados = await service.listar();
    res.json(dados);
  },
  async criar(req, res) {
    try {
      const dados = await service.criar(req.body);
      res.status(201).json(dados);
    } catch (err) {
      res.status(err.status || 500).json({ mensagem: err.mensagem });
    }
  },
  async atualizar(req, res) {
    try {
      const dados = await service.atualizar(req.params.id, req.body);
      res.json(dados);
    } catch (err) {
      res.status(err.status || 500).json({ mensagem: err.mensagem });
    }
  },
  async deletar(req, res) {
    await service.deletar(req.params.id);
    res.status(204).send();
  }
};