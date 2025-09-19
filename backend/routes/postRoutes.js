const express = require('express');
const router = express.Router();

// Importando funções do controller
const postController = require('../controllers/postController');

// Rotas
router.post('/', postController.criarPost);
router.get('/', postController.listarPosts);

module.exports = router;
