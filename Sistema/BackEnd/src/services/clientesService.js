const repo = require('../repositories/clientesRepository');
const crypto = require('crypto');

const KEY = crypto.scryptSync('chave-cpf', 'salt', 32);

function encCPF(cpf) {
  if (!cpf) return cpf;
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', KEY, iv);
  return iv.toString('hex') + ':' + cipher.update(cpf, 'utf8', 'hex') + cipher.final('hex');
}

function decCPF(enc) {
  if (!enc || !enc.includes(':')) return enc;
  const [ivHex, text] = enc.split(':');
  const decipher = crypto.createDecipheriv('aes-256-cbc', KEY, Buffer.from(ivHex, 'hex'));
  return decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');
}

module.exports = {
  async listar(busca) {
    const lista = await repo.listar(busca);
    return lista.map(c => ({ ...c, cpf: decCPF(c.cpf) }));
  },
  async criar(dados) {
    const id = await repo.criar({ ...dados, cpf: encCPF(dados.cpf) });
    return { id_cliente: id, ...dados };
  },
  async atualizar(id, dados) {
    await repo.atualizar(id, { ...dados, cpf: encCPF(dados.cpf) });
    return { id_cliente: id, ...dados };
  },
  async deletar(id) {
    await repo.deletar(id);
  }
};