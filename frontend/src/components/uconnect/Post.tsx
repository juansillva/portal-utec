import { EllipsisVertical, MessageCircle, ThumbsUp, Edit2, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/uconnect/Post.module.scss";
import type { Post } from "../../types/typePost";
import { excluirPost } from "../../services/excluirPost";
import ConfirmModal from "./ConfirmModal";

interface PostProps extends Post {
  onDelete?: (id: number) => void;
}

const PostComponent = ({ 
  id,
  avatar,
  professor_nome,
  professor_id,
  titulo,
  conteudo,
  data_criacao,
  turma_nome,
  onDelete
}: PostProps) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const professorLogado = JSON.parse(localStorage.getItem("professor") || "{}");
  const isProfessorDono = professorLogado.id === professor_id;

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

  useEffect(() => {
    if (showConfirmModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showConfirmModal]);

  const handleEdit = () => {
    if (!id) {
      console.error("❌ Erro: ID do post não existe!");
      alert("Erro ao editar: ID do post não encontrado");
      return;
    }
    
    console.log("✏️ Editando post ID:", id);
    navigate(`/uconnect/editpost/${id}`);
    setIsModalOpen(false);
  };

  const handleDeleteClick = () => {
    setIsModalOpen(false);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!id) {
      console.error("❌ Erro: ID do post não existe!");
      return;
    }

    setIsDeleting(true);

    try {
      console.log("🗑️ Deletando post:", id);
      await excluirPost(id);
      
      setShowConfirmModal(false);
      
      if (onDelete) {
        onDelete(id);
      }

      window.location.reload();
      
    } catch (error) {
      console.error("Erro ao excluir post:", error);
      alert("Erro ao excluir post. Tente novamente.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
  };

  return (
    <>
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
            
            {isProfessorDono && (
              <div className={styles["post-menu"]} ref={modalRef}>
                <button
                  className={styles["menu-trigger"]}
                  onClick={() => setIsModalOpen(!isModalOpen)}
                  aria-label="Abrir menu"
                >
                  <EllipsisVertical size={20} />
                </button>
    
                {isModalOpen && (
                  <div className={styles["dropdown-modal"]}>
                    <button onClick={handleEdit} className={styles["dropdown-item"]}>
                      <Edit2 size={16} />
                      <span>Editar</span>
                    </button>
                    <button 
                      onClick={handleDeleteClick} 
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

      <ConfirmModal
        isOpen={showConfirmModal}
        title="Excluir Post?"
        message="Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isLoading={isDeleting}
      />
    </>
  );
};

export default PostComponent;