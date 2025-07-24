import { Request, Response } from 'express';
import db from '../database/db'
import bcrypt from 'bcrypt';

export const acessoProfessor = (req: Request, res: Response) => {
  const { email, senha } = req.body;
  console.log(`[acessoProfessor] Tentativa de login:`, { email });

  if (!email || !senha) {
    console.log("[acessoProfessor] Falha: Email ou senha não informados.");
    return res.status(400).json({ message: "Email e senha são obrigatórios." });
  }

  db.get("SELECT * FROM professores WHERE email = ?", [email], (err, professor) => {
    if (err) {
      console.error("[acessoProfessor] Erro no SELECT professores:", err.message);
      return res.status(500).json({ message: "Erro no servidor", error: err.message });
    }
    if (!professor) {
      console.log("[acessoProfessor] Professor não encontrado:", email);
      return res.status(401).json({ message: "Professor não encontrado" });
    }

    bcrypt.compare(senha, professor.senha, (err, igual) => {
      if (err) {
        console.error("[acessoProfessor] Erro ao verificar senha:", err.message);
        return res.status(500).json({ message: "Erro ao verificar senha" });
      }
      if (!igual) {
        console.log("[acessoProfessor] Senha incorreta para:", email);
        return res.status(401).json({ message: "Senha incorreta" });
      }

      delete professor.senha;
      console.log("[acessoProfessor] Login autorizado para:", email);

      db.all(
        `
        SELECT turmas.id, turmas.nome, turmas.icon 
        FROM turmas 
        JOIN professor_turma ON turmas.id = professor_turma.turma_id 
        WHERE professor_turma.professor_id = ?
      `,
        [professor.id],
        (err, turmas) => {
          if (err) {
            console.error("[acessoProfessor] Erro ao buscar turmas:", err.message);
            return res.status(500).json({ message: "Erro ao buscar turmas" });
          }

          console.log("[acessoProfessor] Turmas retornadas para:", email, turmas);
          res.status(200).json({ message: "Login autorizado", professor: { ...professor, turmas } });
        }
      );
    });
  });
}; 