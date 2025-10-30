import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderUconnect from "../../components/uconnect/HeaderUconnect";
import Sidebar from "../../components/uconnect/SidebarLeft";
import SidebarRight from "../../components/uconnect/SidebarRight";
import { buscarPostPorId } from "../../services/buscarPostPorID";
import { atualizarPost } from "../../services/atualizarPost";
import styles from "../../styles/uconnect/CriarPost.module.scss";

const EditPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [turma, setTurma] = useState("");
  const [turmas, setTurmas] = useState<{ id: number; nome: string }[]>([]);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const numericId = Number(id);

  useEffect(() => {
    const stored = localStorage.getItem("professor");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setTurmas(Array.isArray(parsed.turmas) ? parsed.turmas : []);
      } catch {
        setTurmas([]);
      }
    }
  }, []);

  useEffect(() => {
    if (!numericId) return;

    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await buscarPostPorId(numericId);
        const data = response.data;

        if (!data) {
          setErro("Post não encontrado");
          return;
        }

        setTitulo(data.titulo);
        setConteudo(data.conteudo);
        setTurma(String(data.turma_id));
      } catch (error) {
        console.error("Erro ao buscar post:", error);
        setErro("Erro ao carregar post para edição");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [numericId]);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setErro("");

  console.log("📤 Enviando atualização:", {
    id: numericId,
    titulo: titulo.trim(),
    conteudo: conteudo.trim(),
    turma_id: Number(turma)
  });


  if (!titulo.trim()) return setErro("Por favor, preencha o título do post!");
  if (!conteudo.trim()) return setErro("Por favor, preencha o conteúdo!");
  if (!turma) return setErro("Por favor, selecione uma turma!");

  setLoading(true);
  try {
    await atualizarPost(numericId, titulo.trim(), conteudo.trim(), Number(turma));
    navigate("/uconnect/feed");
  } catch (error: any) {
    console.error("Erro ao atualizar post:", error);
    const mensagem = error.response?.data?.message || "Erro ao atualizar post. Tente novamente.";
    setErro(mensagem);
  } finally {
    setLoading(false);
  }
};

  if (!id) return <p>ID do post não informado.</p>;

  return (
    <div className={styles["create-post"]}>
      <Sidebar />

      <div className={styles["main-content-create-post"]}>
        <div className={styles["header-create-post"]}>
          <HeaderUconnect />
        </div>

        <div className={styles["content-create-post"]}>
          <h2>Editar Post</h2>
          <p>Atualize as informações do seu post</p>
          <hr />

          <form onSubmit={handleSubmit}>
            <div className={styles["form-group"]}>
              <label htmlFor="title">Título do Post</label>
              <input
                type="text"
                id="title"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Digite o título do post"
                required
              />
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="content">Conteúdo do Post</label>
              <textarea
                id="content"
                value={conteudo}
                onChange={(e) => setConteudo(e.target.value)}
                placeholder="Escreva o conteúdo do post"
                required
              />
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="turma">Turma</label>
              <select
                id="turma"
                value={turma}
                onChange={(e) => setTurma(e.target.value)}
                required
              >
                <option value="">Selecione a turma</option>
                {turmas.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.nome}
                  </option>
                ))}
              </select>
            </div>

            {erro && <div className={styles.erro}>{erro}</div>}

            <div className={styles["button-group"]}>
              <button
                type="button"
                onClick={() => navigate("/uconnect/feed")}
                className={styles["button-cancelar"]}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className={styles["button-publicar"]}
                disabled={loading}
              >
                {loading ? "Atualizando..." : "Atualizar Post"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className={styles["sidebar-right"]}>
        <SidebarRight />
      </div>
    </div>
  );
};

export default EditPost;
