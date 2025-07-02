
import api from './api';

export async function acessoProfessor(email: string, senha: string) {
  const response = await api.post('/acessoprofessor', { email, senha });
  return response.data.professor;
}
