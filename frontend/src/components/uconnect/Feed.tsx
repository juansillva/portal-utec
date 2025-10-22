'use server'
import { useEffect, useState } from 'react';
import HeaderUconnect from './HeaderUconnect';
import Sidebar from './SidebarLeft';
import SidebarRight from './SidebarRight';
import Post from './Post';
import { getPosts } from '../../services/buscarPosts';
import { Post as PostType } from '../../types/typePost';
import styles from '../../styles/uconnect/Feed.module.scss';

const Feed = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Estados da paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10); // Quantos posts por página

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

  // Cálculos da paginação
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);

  // Função para mudar de página
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll para o topo do feed quando mudar de página
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Função para gerar números de páginas visíveis
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    // Se tiver poucas páginas, mostra todas
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
      return range;
    }

    // Páginas ao redor da atual
    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range.push(i);
    }

    // Primeira página
    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    // Páginas do meio
    rangeWithDots.push(...range);

    // Última página
    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots.filter((item, index, arr) => arr.indexOf(item) === index);
  };

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
          
          {/* Info da paginação */}
          {!loading && posts.length > 0 && (
            <div className={styles['pagination-info']}>
              Mostrando {startIndex + 1}-{Math.min(endIndex, posts.length)} de {posts.length} posts
            </div>
          )}

          {/* Posts da página atual */}
          {currentPosts.map(post => (
            <Post 
              key={post.id}
              avatar={post.avatar}
              professor_nome={post.professor_nome}
              titulo={post.titulo}
              conteudo={post.conteudo}
              data_criacao={post.data_criacao.toISOString()}
              turma_nome={post.turma_nome}
            />
          ))}

          {/* Componente de Paginação */}
          {!loading && totalPages > 1 && (
            <div className={styles.pagination}>
              {/* Botão Anterior */}
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`${styles['pagination-btn']} ${currentPage === 1 ? styles.disabled : ''}`}
              >
                ← Anterior
              </button>

              {/* Números das páginas */}
              <div className={styles['pagination-numbers']}>
                {getVisiblePages().map((page, index) => (
                  <span key={index}>
                    {page === '...' ? (
                      <span className={styles.dots}>...</span>
                    ) : (
                      <button
                        onClick={() => goToPage(page as number)}
                        className={`${styles['pagination-number']} ${
                          currentPage === page ? styles.active : ''
                        }`}
                      >
                        {page}
                      </button>
                    )}
                  </span>
                ))}
              </div>

              {/* Botão Próximo */}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`${styles['pagination-btn']} ${currentPage === totalPages ? styles.disabled : ''}`}
              >
                Próximo →
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={styles['sidebar-right']}>
        <SidebarRight />
      </div>
    </div>
  );
};

export default Feed;