import api from './api'; 

export const atualizarPost = async (
  id: number,
  titulo: string,
  conteudo: string,
  turma_id: string | number
) => {
  const response = await api.put(`/posts/${id}`, {
    titulo,
    conteudo,
    turma_id: Number(turma_id)
  });
  return response.data;
};
