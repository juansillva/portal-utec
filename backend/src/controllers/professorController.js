const prisma = require("../../prisma/prismaClient");
const bcrypt = require("bcrypt");

exports.acessoProfessor = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: "Email e senha são obrigatórios." });
  }

  try {
    const professor = await prisma.professor.findUnique({ where: { email } });

    if (!professor)
      return res.status(401).json({ message: "Professor não encontrado" });

    const igual = await bcrypt.compare(senha, professor.senha);
    if (!igual) return res.status(401).json({ message: "Senha incorreta" });

    // Buscar turmas do professor
    const turmas = await prisma.professorTurma.findMany({
      where: { professor_id: professor.id },
      include: { turma: true },
    });

    const turmasFormatadas = turmas.map((pt) => pt.turma);

    const { senha: _, ...professorSemSenha } = professor;

    res.status(200).json({
      message: "Login autorizado",
      professor: { ...professorSemSenha, turmas: turmasFormatadas },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro no servidor", error: err.message });
  }
};
