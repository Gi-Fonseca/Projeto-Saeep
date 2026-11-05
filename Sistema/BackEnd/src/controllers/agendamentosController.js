const service = require('../services/agendamentosService');

module.exports = {
  async listar(req, res) {
    const dados = await service.listar();
    res.json(dados);
  },
  async criar(req, res) {
    const dados = await service.criar(req.body);
    res.status(201).json(dados);
  },
  async atualizar(req, res) {
    const dados = await service.atualizarData(req.params.id, req.body.data_horario);
    res.json(dados);
  },
  async deletar(req, res) {
    await service.deletar(req.params.id);
    res.status(204).send();
  }
};