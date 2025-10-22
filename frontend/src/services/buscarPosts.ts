import api from './api';
import { Post } from '../types/typePost';

// Interface para os dados que vêm do backend
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


export type PostProps = {
  id?: string;
  avatar?: string | null; 
  professor_nome: string;
  titulo: string;
  conteudo: string;
  data_criacao: string;
  turma_nome?: string;
};

export async function getPosts(): Promise<Post[]> {
  try {
    const response = await api.get(`/posts?_t=${Date.now()}`);
    
    // DEBUG: Vamos ver o que está chegando do backend
    console.log('Dados do backend:', response.data);
    console.log('Primeiro post completo:', response.data[0]);
    
    // Mapear os dados do backend para o formato esperado pelo frontend
    const postsFormatados: Post[] = response.data.map((post: PostBackend): Post => {
      console.log('Post sendo processado:', post);
      console.log('Professor do post:', post.professor);
      console.log('Turma do post:', post.turma);
      
      return {
        id: post.id,
        avatar: post.professor?.avatarUrl || null,
        professor_nome: post.professor?.nome || 'Professor não identificado',
        titulo: post.titulo,
        conteudo: post.conteudo,
        data_criacao: new Date(post.data_criacao),
        turma_nome: post.turma?.nome || 'Turma não identificada'
      };
    });
    
    console.log('Posts formatados:', postsFormatados);
    return postsFormatados;
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    throw error;
  }
}