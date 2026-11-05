const service = require('../services/clientesService');

module.exports = {
  async listar(req, res) {
    const dados = await service.listar(req.query.busca);
    res.json(dados);
  },
  async criar(req, res) {
    const dados = await service.criar(req.body);
    res.status(201).json(dados);
  },
  async atualizar(req, res) {
    const dados = await service.atualizar(req.params.id, req.body);
    res.json(dados);
  },
  async deletar(req, res) {
    await service.deletar(req.params.id);
    res.status(204).send();
  }
};