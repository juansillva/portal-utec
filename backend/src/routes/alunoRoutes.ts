import express from 'express';
import { acessoAluno } from '../controllers/alunoController.js';

const router = express.Router();

router.post('/acessoaluno', acessoAluno);

export default router;
