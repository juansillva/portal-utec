import HeaderUconnect from "../../components/uconnect/HeaderUconnect";
import { useEffect, useState } from "react";
import Sidebar from "../../components/uconnect/SidebarLeft";
import styles from '../../styles/uconnect/CriarPost.module.scss';
import { criarPost } from "../../services/criarPost";
import { useNavigate } from "react-router-dom";

const CriarPost = () => {
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [turma, setTurma] = useState("");
  const [turmas, setTurmas] = useState<{ id: number, nome: string }[]>([]);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("professor");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed.turmas)) {
          setTurmas(parsed.turmas);
        } else {
          setTurmas([]);
          console.log('erro na renderizacao');
        }
      } catch {
        console.log('erro na renderizacao do componente');
        setTurmas([]);
      }
    } else {
      setTurmas([]);
    }
  }, []);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    try {
      await criarPost(titulo, conteudo, turma);
      navigate("/uconnect/feed");
    } catch {
      setErro("Erro ao criar post.");
    }
  };

  return (
    <div className={styles['create-post']}>
      <Sidebar />
      <div className={styles['main-content-create-post']}>
        <div className={styles['create-post-header']}>
        <HeaderUconnect />
        </div>
       <div className={styles['content-create-post']}>
          <h2>Criar Post</h2>
          <p>Compartilhe posts, registre aulas e materiais para suas turmas!</p>
        <hr />
        <form onSubmit={handlePost}>
          <div className={styles['form-group']}>
            <label htmlFor="title">Título do Post</label>
            <input
              type="text"
              id="title"
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
              placeholder="Digite o título do post"
              required
            />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="content">Conteúdo do Post</label>
            <textarea
              value={conteudo}
              onChange={e => setConteudo(e.target.value)}
              id="content"
              placeholder="Escreva o conteúdo do post"
            ></textarea>
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="turma">Turma</label>
            <select
              id="turma"
              value={turma}
              onChange={e => setTurma(e.target.value)}
              required
            >
              <option value="">Selecione a turma</option>
              {turmas.map(t => (
                <option key={t.id} value={t.id}>{t.nome}</option>
              ))}
            </select>
          </div>
          {erro && <div className={styles.erro}>{erro}</div>}
          <button type="submit" className={styles['button-publicar']}>Publicar</button>
        </form>
          </div>
    </div>
      </div>
       
  );
};

export default CriarPost;