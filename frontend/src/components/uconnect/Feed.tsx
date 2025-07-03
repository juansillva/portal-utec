import { useEffect, useState } from 'react';
import HeaderUconnect from './HeaderUconnect';
import Sidebar from './SidebarLeft';
import SidebarRight from './SidebarRight';
import Post from './Post';
import { getPosts } from '../../services/buscarPosts';

import styles from '../../styles/uconnect/Feed.module.scss';

type PostType = {
  id: number;
  avatar?: string;
  professor_nome: string;
  titulo: string;
  conteudo: string;
  data_criacao: string;
  turma_nome?: string;
};

const Feed = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPosts();
        setPosts(Array.isArray(data) ? data : []);
      } catch {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

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
              data_criacao={post.data_criacao}
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