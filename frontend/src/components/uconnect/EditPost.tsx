import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderUconnect from "../../components/uconnect/HeaderUconnect";
import Sidebar from "../../components/uconnect/SidebarLeft";
import SidebarRight from "../../components/uconnect/SidebarRight";
import { buscarPostPorId } from "../../services/buscarPostPorID";
import styles from "../../styles/uconnect/CriarPost.module.scss";

const EditPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // States principais
  const [titulo, setTitulo] = useState("");
  const [turma, setTurma] = useState("");
  const [turmas, setTurmas] = useState<{ id: number; nome: string }[]>([]);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  
  const numericId = Number(id);

  // 🧠 Buscar turmas do professor no localStorage
  useEffect(() => {
    const stored = localStorage.getItem("professor");
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);
      setTurmas(Array.isArray(parsed.turmas) ? parsed.turmas : []);
    } catch {
      console.error("Erro ao carregar turmas do localStorage");
      setTurmas([]);
    }
  }, []);

  // 📡 Buscar post pelo ID
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await buscarPostPorId(numericId);
        const data = response.data;

        if (!data) {
          setErro("Post não encontrado");
          return;
        }

        setTitulo(data.titulo);
        setTurma(String(data.turma_id));
      } catch (error) {
        console.error("Erro ao buscar post:", error);
        setErro("Erro ao carregar post para edição");
      } finally {
        setLoadingPost(false);
      }
    };

    if (numericId) fetchPost();
  }, [numericId]);

  // 💾 Atualizar post
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    if (!titulo.trim()) {
      return setErro("Por favor, preencha o título do post!");
    }
    if (!turma) {
      return setErro("Por favor, selecione uma turma!");
    }

    setLoading(true);

    try {
      const response = await fetch(`http://192.168.1.113:3001/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: titulo.trim(),
          turma_id: Number(turma),
        }),
      });

      if (!response.ok) throw new Error("Erro ao atualizar post");

      navigate("/uconnect/feed");
    } catch (error) {
      console.error("Erro ao atualizar post:", error);
      setErro("Erro ao atualizar post. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // 🌀 Loading State
  

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
            {/* 🧾 Campo título */}
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

            {/* ✍️ Editor */}
            <div className={styles["form-group"]}>
              <label>Conteúdo do Post</label>
              <div className={styles["editor-container"]}>
                {/* Aqui entrará o editor (Tiptap, Quill, etc) futuramente */}
                <p className={styles["placeholder-editor"]}>
                  Editor em desenvolvimento...
                </p>
              </div>
            </div>

            {/* 🏫 Seleção de turma */}
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

            {/* ⚠️ Erro */}
            {erro && <div className={styles.erro}>{erro}</div>}

            {/* 🔘 Botões */}
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
