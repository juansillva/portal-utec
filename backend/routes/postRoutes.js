const express = require('express');
const router = express.Router();

const { criarPost, listarPosts } = require('../controllers/postController');

router.post('/', criarPost);
router.get('/', listarPosts);

module.exports = router;