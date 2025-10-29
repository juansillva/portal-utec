const express = require('express');
const router = express.Router();


const postController = require('../controllers/postController');

// Rotas
router.post('/', postController.criarPost);
router.get('/', postController.listarPosts);
router.get('/:id', postController.listarPostsPorID);
router.put('/:id', postController.atualizarPost);
router.delete('/:id', postController.excluirPost)

module.exports = router;
