import { Request, Response } from 'express';
import db from '../database/db';

export const acessoAluno = (req: Request, res: Response): void => {
  const { nome, turma } = req.body;

  if (!nome || !turma) {
    res.status(400).json({ message: "Nome e turma são obrigatórios." });
    return;
  }

  db.get("SELECT * FROM turmas WHERE nome = ?", [turma], (err, turmaEncontrada) => {
    if (err) {
      res.status(500).json({ message: "Erro no servidor" });
      return;
    }

    if (!turmaEncontrada) {
      res.status(401).json({ message: "Turma não encontrada" });
      return;
    }

    res.status(200).json({
      message: "Acesso autorizado",
      aluno: {
        nome,
        turma: turmaEncontrada.nome,
        turma_id: turmaEncontrada.id,
        avatar: "aluno_padrao.svg"
      }
    });
  });
};
