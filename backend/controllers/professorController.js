const db = require("../database/db");
const bcrypt = require("bcrypt");

exports.acessoProfessor = (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: "Email e senha são obrigatórios." });
  }

  db.get("SELECT * FROM professores WHERE email = ?", [email], (err, professor) => {
    if (err) return res.status(500).json({ message: "Erro no servidor", error: err.message });
    if (!professor) return res.status(401).json({ message: "Professor não encontrado" });

    bcrypt.compare(senha, professor.senha, (err, igual) => {
      if (err) return res.status(500).json({ message: "Erro ao verificar senha" });
      if (!igual) return res.status(401).json({ message: "Senha incorreta" });

      delete professor.senha;

      db.all(`
        SELECT turmas.id, turmas.nome, turmas.icon 
        FROM turmas 
        JOIN professor_turma ON turmas.id = professor_turma.turma_id 
        WHERE professor_turma.professor_id = ?
      `, [professor.id], (err, turmas) => {
        if (err) return res.status(500).json({ message: "Erro ao buscar turmas" });

        res.status(200).json({ message: "Login autorizado", professor: { ...professor, turmas } });
      });
    });
  });
};