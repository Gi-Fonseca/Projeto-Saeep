const db = require('../db');

module.exports = {
  async listar(busca) {
    if (busca) {
      const termo = `%${busca}%`;
      const [rows] = await db.query('SELECT * FROM clientes WHERE nome LIKE ? OR cpf LIKE ?', [termo, termo]);
      return rows;
    }
    const [rows] = await db.query('SELECT * FROM clientes');
    return rows;
  },
  async criar({ id_usuario, nome, cpf, telefone, termo_aceite }) {
    const [res] = await db.query(
      'INSERT INTO clientes (id_usuario, nome, cpf, telefone, termo_aceite) VALUES (?, ?, ?, ?, ?)',
      [id_usuario || null, nome, cpf, telefone, termo_aceite ?? true]
    );
    return res.insertId;
  },
  async atualizar(id, { nome, cpf, telefone, termo_aceite }) {
    await db.query(
      'UPDATE clientes SET nome = ?, cpf = ?, telefone = ?, termo_aceite = ? WHERE id_cliente = ?',
      [nome, cpf, telefone, termo_aceite, id]
    );
  },
  async deletar(id) {
    await db.query('DELETE FROM clientes WHERE id_cliente = ?', [id]);
  }
};