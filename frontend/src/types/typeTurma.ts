import type { Post } from "./typePost";
export type Professor = {
  id: number;
  nome: string;
  email: string;
  // senha removida por segurança: não deve ser usada no frontend
  avatar?: string | null;
};

export type ProfessorTurma = {
  professor_id: number;
  turma_id: number;
  professor: Professor;
};

export type Turma = {
  id: number;
  nome: string;
  icon?: string | null;
  posts: Post[];
  professores: ProfessorTurma[];
};
