const express = require('express');
const router = express.Router();
const GruposController = require('../controllers/GruposController');

router.get('/', GruposController.index);
router.get('/novo', GruposController.novo);
router.post('/', GruposController.criar);
router.get('/:id/editar', GruposController.editar);
router.post('/:id', GruposController.atualizar);
router.post('/:id/excluir', GruposController.excluir);

module.exports = router;
