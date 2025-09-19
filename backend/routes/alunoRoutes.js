const express = require ('express')
const router = express.Router();
const {acessoAluno} = require ('../controllers/alunoController')

router.post('/', acessoAluno)

module.exports = router; 