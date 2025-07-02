import api from './api';

export async function acessoAluno(nome: string, turma: string) {
  const response = await api.post('/acessoaluno', { nome, turma });
  return response.data.aluno;
}
