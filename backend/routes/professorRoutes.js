const express = require('express');
const router = express.Router();
const { loginProfessor } = require('../controllers/professorController');
router.post('/', loginProfessor);
module.exports = router;