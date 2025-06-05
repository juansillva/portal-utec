
import api from './api';

export async function acessoProfessor(email: string, senha: string) {
  const response = await api.post('/login', { email, senha });
  return response.data.professor;
}
