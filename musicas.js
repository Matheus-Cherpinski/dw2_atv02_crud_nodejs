const express = require('express');
const router = express.Router();
const MusicasController = require('../controllers/MusicasController');

router.get('/', MusicasController.index);
router.get('/novo', MusicasController.novo);
router.post('/', MusicasController.criar);
router.get('/:id/editar', MusicasController.editar);
router.post('/:id', MusicasController.atualizar);
router.post('/:id/excluir', MusicasController.excluir);

module.exports = router;
