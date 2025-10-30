import api from './api';

export async function excluirPost(id: number) {
  try {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao excluir post:', error);
    throw error;
  }
}