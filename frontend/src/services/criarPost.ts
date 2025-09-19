import api from './api';

export async function criarPost(titulo: string, conteudo: string, turma_id: number) {
  const stored = localStorage.getItem("professor");
  
  if (!stored) {
    throw new Error("Dados do professor não encontrados no localStorage.");
  }

  let professor_email = "";

  try {
    const parsed = JSON.parse(stored);
    professor_email = parsed.email;
  } catch {
    throw new Error("Erro ao obter dados do professor.");
  }

  if (!professor_email) {
    throw new Error("Email do professor não encontrado.");
  }

  const response = await api.post('/posts', {
    titulo,
    conteudo,
    turma_id,
    professor_email
    // Removido o avatar daqui, o backend vai pegar do banco
  });

  return response.data.post;
}