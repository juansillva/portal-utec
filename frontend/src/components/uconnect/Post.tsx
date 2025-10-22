import { MessageCircle, ThumbsUp } from "lucide-react";
import styles from "../../styles/uconnect/Post.module.scss";
import { PostProps } from "../../types/typePost";

const Post = ({ id,avatar,professor_nome,titulo,conteudo,data_criacao,turma_nome}: PostProps 
) => ( 
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
      {turma_nome && <span className={styles["post-clube"]}>{turma_nome}</span>}
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

export default Post;