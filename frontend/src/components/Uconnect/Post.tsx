import { MessageCircle, ThumbsUp } from 'lucide-react';
import styles from '../../styles/uconnect/Post.module.scss';

type PostProps = {
  avatar?: string;
  professor_nome: string;
  titulo: string;
  conteudo: string;
  data_criacao: string;
  turma_nome?: string;
};


const Post = ({
  avatar,
  professor_nome,
  titulo,
  conteudo,
  data_criacao,
  turma_nome,
}: PostProps) => (

  
  <div className={styles['post-card']}>
    <div className={styles['post-header']}>
      {avatar && (
        <img
           src={`${import.meta.env.VITE_API_URL}/uploads/${avatar}`} 
          alt="Avatar do professor"
          className={styles['post-avatar']}
        />
      )}
        <span className={styles['post-nome']}>{professor_nome}</span>
        {turma_nome && <span className={styles['post-clube']}>{turma_nome}</span>}
        <div className={styles['post-meta']}>
            <span>{new Date(data_criacao).toLocaleString("pt-BR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
})}</span>
        </div>
    </div>
    <div className={styles['post-body']}>
      <strong>{titulo}</strong>
      <p>{conteudo}</p>
    </div>
    <div className={styles['post-actions']}>
      <button><ThumbsUp /> Curtir</button>
      <button><MessageCircle /> Comentar</button>
    </div>
  </div>
);

export default Post;