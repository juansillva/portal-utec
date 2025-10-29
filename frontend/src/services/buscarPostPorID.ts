import api from './api';

export async function buscarPostPorId(id: number) {
  try {
    const response = await api.get(`/posts/${id}`);
    console.log('Post encontrado:', response.data);
    return response;
  } catch (error) {
    console.error('Erro ao buscar post:', error);
    throw error;
  }
}
