import express from 'express';
import { criarPost, listarPosts } from '../controllers/postController.js';

const router = express.Router();

router.post('/criarpost', criarPost);
router.get('/posts', listarPosts);

export default router;
