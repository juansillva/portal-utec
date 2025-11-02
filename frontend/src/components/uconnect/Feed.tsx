"use server";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearch } from "../../contexts/SearchContext";
import { getPosts } from "../../services/buscarPosts";
import styles from "../../styles/uconnect/Feed.module.scss";
import { Post as PostType } from "../../types/typePost";
import HeaderUconnect from "./HeaderUconnect";
import Post from "./Post";
import Sidebar from "./SidebarLeft";
import SidebarRight from "./SidebarRight";

const Feed = () => {
  const { searchTerm, filtros, setTurmas } = useSearch();
  const [allPosts, setAllPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchedRef = useRef(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    if (fetchedRef.current) return;

    async function fetchPosts() {
      try {
        setError(null);
        const data = await getPosts();
        const postsArray = Array.isArray(data) ? data : [];
        setAllPosts(postsArray);

        const turmasUnicas = Array.from(
          new Set(postsArray.map((p) => p.turma_nome).filter(Boolean))
        ).map((nome, index) => ({ id: index + 1, nome: nome || "" }));
        setTurmas(turmasUnicas);

        fetchedRef.current = true;
      } catch (err) {
        console.error("Erro ao buscar posts no Feed:", err);
        setError(
          "Não foi possível carregar os posts. Tente novamente mais tarde."
        );
        setAllPosts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []); // Remove setTurmas das dependências

  const filteredPosts = useMemo(() => {
    let resultados = [...allPosts];

    if (searchTerm.trim()) {
      const termoLower = searchTerm.toLowerCase();
      resultados = resultados.filter(
        (post) =>
          post.titulo.toLowerCase().includes(termoLower) ||
          post.conteudo.toLowerCase().includes(termoLower) ||
          post.professor_nome.toLowerCase().includes(termoLower)
      );
    }

    if (filtros?.dataInicio) {
      const dataInicio = new Date(filtros.dataInicio);
      resultados = resultados.filter(
        (post) => new Date(post.data_criacao) >= dataInicio
      );
    }

    if (filtros?.dataFim) {
      const dataFim = new Date(filtros.dataFim);
      dataFim.setHours(23, 59, 59, 999);
      resultados = resultados.filter(
        (post) => new Date(post.data_criacao) <= dataFim
      );
    }

    if (filtros?.turma) {
      resultados = resultados.filter(
        (post) => post.turma_nome === filtros.turma
      );
    }

    return resultados;
  }, [searchTerm, filtros, allPosts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filtros]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
      return range;
    }

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots.filter(
      (item, index, arr) => arr.indexOf(item) === index
    );
  };

  return (
    <div className={styles.feed}>
      <Sidebar />

      <div className={styles["main-content"]}>
        <div className={styles["header-feed"]}>
          <HeaderUconnect />
        </div>

        <div className={styles["content-feed"]}>
          {loading && (
            <div className={styles["loading-container"]}>
              <div className={styles["loading-spinner"]} />
              <span className={styles["loading-text"]}>
                Carregando posts...
              </span>
            </div>
          )}

          {!loading && error && (
            <div className={styles["no-results"]}>
              <p>{error}</p>
              <button
                onClick={() => {
                  setError(null);
                  setLoading(true);
                  fetchedRef.current = false;
                }}
                className={styles["retry-button"]}
              >
                Tentar novamente
              </button>
            </div>
          )}

          {!loading && !error && filteredPosts.length === 0 && (
            <div className={styles["no-results"]}>
              <p>Nenhum post encontrado.</p>
              {(searchTerm ||
                filtros.dataInicio ||
                filtros.dataFim ||
                filtros.turma) && (
                <p className={styles["no-results-hint"]}>
                  Tente ajustar os filtros ou fazer uma nova busca.
                </p>
              )}
            </div>
          )}

          {/* Info da paginação */}
          {!loading && filteredPosts.length > 0 && (
            <div className={styles["pagination-info"]}>
              Mostrando {startIndex + 1}-
              {Math.min(endIndex, filteredPosts.length)} de{" "}
              {filteredPosts.length} posts
              {filteredPosts.length !== allPosts.length && (
                <span className={styles["filter-badge"]}>
                  {" "}
                  (filtrados de {allPosts.length} total)
                </span>
              )}
            </div>
          )}

          {/* Posts da página atual */}
          {currentPosts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              avatar={post.avatar}
              professor_nome={post.professor_nome}
              professor_id={post.professor_id}
              titulo={post.titulo}
              conteudo={post.conteudo}
              data_criacao={post.data_criacao}
              turma_nome={post.turma_nome}
            />
          ))}

          {/* Componente de Paginação */}
          {!loading && totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`${styles["pagination-btn"]} ${
                  currentPage === 1 ? styles.disabled : ""
                }`}
              >
                ← Anterior
              </button>

              <div className={styles["pagination-numbers"]}>
                {getVisiblePages().map((page, index) => (
                  <span key={index}>
                    {page === "..." ? (
                      <span className={styles.dots}>...</span>
                    ) : (
                      <button
                        onClick={() => goToPage(page as number)}
                        className={`${styles["pagination-number"]} ${
                          currentPage === page ? styles.active : ""
                        }`}
                      >
                        {page}
                      </button>
                    )}
                  </span>
                ))}
              </div>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`${styles["pagination-btn"]} ${
                  currentPage === totalPages ? styles.disabled : ""
                }`}
              >
                Próximo →
              </button>
            </div>
          )}
        </div>
      </div>
        <SidebarRight />
    </div>
  );
};

export default Feed;
