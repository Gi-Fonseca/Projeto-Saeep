const db = require('../db');

module.exports = {
  async listarComJoin() {
    const sql = `
      SELECT 
        a.id_agendamento, a.data_horario, a.status, a.observacoes,
        v.id_veiculo, v.modelo, v.placa,
        c.id_cliente, c.nome AS cliente_nome
      FROM agendamento a
      INNER JOIN veiculos v ON a.id_veiculo = v.id_veiculo
      INNER JOIN clientes c ON v.id_cliente = c.id_cliente
      ORDER BY a.data_horario ASC
    `;
    const [rows] = await db.query(sql);
    return rows;
  },
  async criar({ id_veiculo, id_usuario, data_horario, status, observacoes }) {
    const [res] = await db.query(
      'INSERT INTO agendamento (id_veiculo, id_usuario, data_horario, status, observacoes) VALUES (?, ?, ?, ?, ?)',
      [id_veiculo, id_usuario || null, data_horario, status || 'PENDENTE', observacoes || '']
    );
    return res.insertId;
  },
  async atualizarData(id, data_horario) {
    await db.query('UPDATE agendamento SET data_horario = ? WHERE id_agendamento = ?', [data_horario, id]);
  },
  async deletar(id) {
    await db.query('DELETE FROM agendamento WHERE id_agendamento = ?', [id]);
  }
};