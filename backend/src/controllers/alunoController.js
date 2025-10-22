const prisma = require("../../prisma/prismaClient");

exports.acessoAluno = async (req, res) => {
  const { nome, turma } = req.body;

  if (!nome || !turma) {
    return res.status(400).json({ message: "Nome e turma são obrigatórios." });
  }

  try {
    const turmaEncontrada = await prisma.turma.findUnique({
      where: { nome: turma }, 
    });

    if (!turmaEncontrada) {
      return res.status(401).json({ message: "Turma não encontrada" });
    }

    return res.status(200).json({
      message: "Acesso autorizado",
      aluno: {
        nome,
        turma: turmaEncontrada.nome,
        turma_id: turmaEncontrada.id,
        avatar: "aluno_padrao.svg",
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro no servidor" });
  }
};
