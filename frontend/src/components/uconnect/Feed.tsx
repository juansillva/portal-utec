import { useEffect, useState } from 'react';
import HeaderUconnect from './HeaderUconnect';
import Sidebar from './SidebarLeft';
import SidebarRight from './SidebarRight';
import Post from './Post';
import { getPosts } from '../../services/buscarPosts';
import { Post as PostType } from '../../types/typePost'; // Ajuste o caminho conforme sua estrutura

import styles from '../../styles/uconnect/Feed.module.scss';

const Feed = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        console.log('Iniciando busca de posts...');
        const data = await getPosts();
        console.log('Posts recebidos no Feed:', data);
        setPosts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Erro ao buscar posts no Feed:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  // Debug: mostrar os posts no console sempre que mudarem
  useEffect(() => {
    console.log('Estado dos posts atualizou:', posts);
    if (posts.length > 0) {
      console.log('Primeiro post no estado:', posts[0]);
      console.log('turma_nome do primeiro post:', posts[0].turma_nome);
    }
  }, [posts]);

  return (
    <div className={styles.feed}>
      <Sidebar />
      
      <div className={styles['main-content']}>
        <div className={styles['header-feed']}>
          <HeaderUconnect />
        </div>
        <div className={styles['content-feed']}>
          {loading && <p>Carregando posts...</p>}
          {!loading && posts.length === 0 && <p>Nenhum post encontrado.</p>}
          {posts.map(post => (
            <Post 
              key={post.id}
              avatar={post.avatar}
              professor_nome={post.professor_nome}
              titulo={post.titulo}
              conteudo={post.conteudo}
              data_criacao={post.data_criacao.toISOString()} // Converter Date para string
              turma_nome={post.turma_nome}
            />
          ))}
        </div>
      </div>

      {/* Nova SidebarRight */}
      <div className={styles['sidebar-right']}>
        <SidebarRight />
      </div>
    </div>
  );
};

export default Feed;