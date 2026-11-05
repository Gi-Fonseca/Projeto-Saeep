const db = require('../db');

module.exports = {
  async listar() {
    const [rows] = await db.query('SELECT * FROM veiculos');
    return rows;
  },
  async criar({ id_cliente, placa, modelo, marca, ano, cor }) {
    const [res] = await db.query(
      'INSERT INTO veiculos (id_cliente, placa, modelo, marca, ano, cor) VALUES (?, ?, ?, ?, ?, ?)',
      [id_cliente, placa, modelo, marca, ano, cor]
    );
    return res.insertId;
  },
  async atualizar(id, { id_cliente, placa, modelo, marca, ano, cor }) {
    await db.query(
      'UPDATE veiculos SET id_cliente = ?, placa = ?, modelo = ?, marca = ?, ano = ?, cor = ? WHERE id_veiculo = ?',
      [id_cliente, placa, modelo, marca, ano, cor, id]
    );
  },
  async deletar(id) {
    await db.query('DELETE FROM veiculos WHERE id_veiculo = ?', [id]);
  }
};