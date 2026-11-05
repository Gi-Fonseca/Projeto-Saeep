const repo = require('../repositories/agendamentosRepository');

module.exports = {
  async listar() {
    return await repo.listarComJoin();
  },
  async criar(dados) {
    const id = await repo.criar(dados);
    return { id_agendamento: id, ...dados };
  },
  async atualizarData(id, data_horario) {
    await repo.atualizarData(id, data_horario);
    return { id_agendamento: id, data_horario };
  },
  async deletar(id) {
    await repo.deletar(id);
  }
};