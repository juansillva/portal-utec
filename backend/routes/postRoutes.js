const express = require('express');
const router = express.Router();

const { criarPost, listarPostsPorTurma } = require('../controllers/postController');

router.post('/', criarPost);
router.get('/:turma', listarPostsPorTurma);

module.exports = router;