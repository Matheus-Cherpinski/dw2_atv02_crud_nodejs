const express = require('express');
const router = express.Router();
const IntegrantesController = require('../controllers/IntegrantesController');

router.get('/', IntegrantesController.index);
router.get('/novo', IntegrantesController.novo);
router.post('/', IntegrantesController.criar);
router.get('/:id/editar', IntegrantesController.editar);
router.post('/:id', IntegrantesController.atualizar);
router.post('/:id/excluir', IntegrantesController.excluir);

module.exports = router;
