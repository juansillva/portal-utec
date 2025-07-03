const db = require("../database/db");

exports.acessoAluno = (req, res) => {
  const { nome, turma } = req.body;

  if (!nome || !turma) {
    return res.status(400).json({ message: "Nome e turma são obrigatórios." });
  }

  db.get("SELECT * FROM turmas WHERE nome = ?", [turma], (err, turma) => {
    if (err) {
      return res.status(500).json({ message: "Erro no servidor" });
    }
    
    if (!turma) {
      return res.status(401).json({ message: "Turma não encontrada" });
    }


  return res.status(200).json({
  message: "Acesso autorizado",
  aluno: {
    nome,
    turma: turma.nome,
    turma_id: turma.id,
     avatar: "aluno_padrao.svg"
  },
});
});
}