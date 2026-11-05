const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const repo = require('../repositories/funcionariosRepository');

module.exports = {
  async login(email, senha) {
    const func = await repo.buscarPorEmail(email);
    if (!func) throw { status: 401, mensagem: 'Credenciais inválidas' };

    const valida = await bcrypt.compare(senha, func.senha).catch(() => senha === func.senha);
    if (!valida) throw { status: 401, mensagem: 'Credenciais inválidas' };

    const token = jwt.sign({ id: func.id_usuario }, 'chave_jwt_saep', { expiresIn: '1h' });
    return { token, nome: func.nome };
  }
};