import { EllipsisVertical, MessageCircle, ThumbsUp, Edit2, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/uconnect/Post.module.scss";
import type { Post as PostType } from "../../types/typePost";

interface PostProps extends PostType {
  onDelete?: (id: number) => void;
}

const Post = ({ 
  id,
  avatar,
  professor_nome,
  professor_id,
  titulo,
  conteudo,
  data_criacao,
  turma_nome
}: PostProps) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Pegar ID do professor logado
  const professorLogado = JSON.parse(localStorage.getItem("professor") || "{}");
  const isProfessorDono = professorLogado.id === professor_id;
  console.log(isProfessorDono);

  // Fechar modal ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const handleEdit = (id) => {
    navigate(`/uconnect/editpost/${id}`);
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (window.confirm("Tem certeza que deseja excluir este post?")) {
      console.log("Deletando post:", id);
      setIsModalOpen(false);
    }
  };

  return (
    <div className={styles["post-card"]}>
      <div className={styles["post-header"]}>
        <div className={styles["post-user-info"]}>
          {avatar && (
            <img
              src={avatar}
              alt="Avatar do professor"
              className={styles["post-avatar"]}
            />
          )}
          <div className={styles["post-user-details"]}>
            <span className={styles["post-nome"]}>{professor_nome}</span>
            <div className={styles["post-meta"]}>
              <span>
                {new Date(data_criacao).toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        </div>
        
        <div className={styles["post-header-right"]}>
          {turma_nome && <span className={styles["post-clube"]}>{turma_nome}</span>}
          
          {/* Só mostra o menu se for o dono do post */}
          {isProfessorDono && (
            console.log("Professor dono do post"),
            <div className={styles["post-menu"]} ref={modalRef}>
              <button
                className={styles["menu-trigger"]}
                onClick={() => setIsModalOpen(!isModalOpen)}
                aria-label="Abrir menu"
              >
                <EllipsisVertical size={20} />
              </button>
  
              {/* Dropdown Modal */}
              {isModalOpen && (
                <div className={styles["dropdown-modal"]}>
                  <button onClick={handleEdit} className={styles["dropdown-item"]}>
                    <Edit2 size={16} />
                    <span>Editar</span>
                  </button>
                  <button 
                    onClick={handleDelete} 
                    className={`${styles["dropdown-item"]} ${styles["delete"]}`}
                  >
                    <Trash2 size={16} />
                    <span>Excluir</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={styles["post-body"]}>
        <h3 className={styles["post-title"]}>{titulo}</h3>
        <div 
          className={styles["post-content"]}
          dangerouslySetInnerHTML={{ __html: conteudo }}
        />
      </div>

      <div className={styles["post-actions"]}>
        <button className={styles["action-button"]}>
          <ThumbsUp />
          <span>Curtir</span>
        </button>
        <button className={styles["action-button"]}>
          <MessageCircle />
          <span>Comentar</span>
        </button>
      </div>
    </div>
  );
};

export default Post;