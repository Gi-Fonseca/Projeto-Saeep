const repo = require('../repositories/veiculosRepository');

module.exports = {
  async listar() {
    return await repo.listar();
  },
  async criar(dados) {
    const id_cliente = dados.id_cliente || dados.cliente_id;
    if (!id_cliente) throw { status: 400, mensagem: 'cliente_id é obrigatório' };
    const id = await repo.criar({ ...dados, id_cliente });
    return { id_veiculo: id, ...dados, id_cliente };
  },
  async atualizar(id, dados) {
    const id_cliente = dados.id_cliente || dados.cliente_id;
    if (!id_cliente) throw { status: 400, mensagem: 'cliente_id é obrigatório' };
    await repo.atualizar(id, { ...dados, id_cliente });
    return { id_veiculo: id, ...dados, id_cliente };
  },
  async deletar(id) {
    await repo.deletar(id);
  }
};