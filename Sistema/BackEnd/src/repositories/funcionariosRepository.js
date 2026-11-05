const db = require('../db');

module.exports = {
  async buscarPorEmail(email) {
    const [rows] = await db.query('SELECT * FROM funcionarios WHERE email = ?', [email]);
    return rows[0];
  }
};