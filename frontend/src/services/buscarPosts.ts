// services/buscarPosts.ts
import api from './api';
import { Post } from '../types/typePost';

interface PostBackend {
  id: number;
  titulo: string;
  conteudo: string;
  data_criacao: string;
  professor: {
    id: number;
    nome: string;
    email: string;
    avatar: string | null;
    avatarUrl: string | null;
  } | null;
  turma: {
    id: number;
    nome: string;
    icon: string;
  } | null;
}

export async function getPosts(): Promise<Post[]> {
  try {
    const response = await api.get(`/posts?_t=${Date.now()}`);
    
    const postsFormatados: Post[] = response.data.map((post: PostBackend): Post => {
      return {
        id: post.id,
        avatar: post.professor?.avatarUrl || null,
        professor_nome: post.professor?.nome || 'Professor não identificado',
        professor_id: post.professor?.id || 0,
        titulo: post.titulo,
        conteudo: post.conteudo,
        data_criacao: new Date(post.data_criacao),
        turma_nome: post.turma?.nome || 'Turma não identificada'
      };
    });
    
    return postsFormatados;
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    throw error;
  }
}

// Nova função para buscar posts com filtros
export async function searchPosts(termo: string, filtros?: {
  dataInicio?: string;
  dataFim?: string;
  turma?: string;
}): Promise<Post[]> {
  try {
    const params = new URLSearchParams();
    
    if (termo) params.append('q', termo);
    if (filtros?.dataInicio) params.append('dataInicio', filtros.dataInicio);
    if (filtros?.dataFim) params.append('dataFim', filtros.dataFim);
    if (filtros?.turma) params.append('turma', filtros.turma);
    
    const response = await api.get(`/posts/search?${params.toString()}`);
    
    const postsFormatados: Post[] = response.data.map((post: PostBackend): Post => {
      return {
        id: post.id,
        avatar: post.professor?.avatarUrl || null,
        professor_nome: post.professor?.nome || 'Professor não identificado',
        professor_id: post.professor?.id || 0,
        titulo: post.titulo,
        conteudo: post.conteudo,
        data_criacao: new Date(post.data_criacao),
        turma_nome: post.turma?.nome || 'Turma não identificada'
      };
    });
    
    return postsFormatados;
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    throw error;
  }
}