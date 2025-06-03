const express = require ('express')
const router = express.Router();
const {validarAcesso} = require ('../controllers/alunoController')

router.post('/', validarAcesso)
module.exports = router;