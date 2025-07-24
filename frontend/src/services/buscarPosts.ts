import api from './api';

export async function buscarPosts() {
  const response = await api.get('/posts');

  if (Array.isArray(response.data)) {
    return response.data;
  }

  if (response.data.posts && Array.isArray(response.data.posts)) {
    return response.data.posts;
  }
 
  return [];
}