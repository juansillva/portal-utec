import express from 'express';
import { acessoProfessor } from '../controllers/professorController.js';

const router = express.Router();

router.post('/acessoprofessor', acessoProfessor);

export default router;
