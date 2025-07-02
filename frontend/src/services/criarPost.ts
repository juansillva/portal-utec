import api from './api';

export async function criarPost(  titulo: string, conteudo: string, turma: string) {
  const stored = localStorage.getItem("professor");
  let professor_nome = "";
  let avatar = "";

  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      professor_nome = parsed.nome;
      avatar = parsed.avatar;
    } catch {
      throw new Error("Erro ao obter dados do professor.");
    }
  }
  
  const response = await api.post('/posts', {
    titulo,
    conteudo,
    turma, 
    professor_nome,
    avatar,
  });
  return response.data.post;
}