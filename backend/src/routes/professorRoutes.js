const express = require('express');
const router = express.Router();

const { acessoProfessor } = require('../controllers/professorController');

router.post('/', acessoProfessor);
module.exports = router;