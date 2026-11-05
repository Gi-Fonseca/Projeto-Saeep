const express = require('express');
const router = express.Router();

const funcionariosCtrl = require('./controllers/funcionariosController');
const clientesCtrl = require('./controllers/clientesController');
const veiculosCtrl = require('./controllers/veiculosController');
const agendamentosCtrl = require('./controllers/agendamentosController');
const authMiddleware = require('./authMiddleware');

// Login (Público)
router.post('/login', funcionariosCtrl.login);

// Rotas Protegidas
router.use(authMiddleware);

// Clientes
router.get('/clientes', clientesCtrl.listar);
router.post('/clientes', clientesCtrl.criar);
router.put('/clientes/:id', clientesCtrl.atualizar);
router.delete('/clientes/:id', clientesCtrl.deletar);

// Veículos
router.get('/veiculos', veiculosCtrl.listar);
router.post('/veiculos', veiculosCtrl.criar);
router.put('/veiculos/:id', veiculosCtrl.atualizar);
router.delete('/veiculos/:id', veiculosCtrl.deletar);

// Agendamentos
router.get('/agendamentos', agendamentosCtrl.listar);
router.post('/agendamentos', agendamentosCtrl.criar);
router.put('/agendamentos/:id', agendamentosCtrl.atualizar);
router.delete('/agendamentos/:id', agendamentosCtrl.deletar);

module.exports = router;