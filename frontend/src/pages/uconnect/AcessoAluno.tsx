import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoUconnectWhite from "../../assets/logo-uconnect-white.svg";
import { acessoAluno } from "../../services/acessoAluno";
import { buscarTurmas } from "../../services/buscarTurmas";
import styles from "../../styles/uconnect/AcessoAluno.module.scss";
import { Turma } from "../../types/typeTurma";

const AcessoAluno = () => {
  const [nome, setNome] = useState("");
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState<number | string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const carregar = async () => {
      try {
        const dados = await buscarTurmas();
        setTurmas(dados);
      } catch (err) {
        console.error("Erro ao carregar turmas", err);
      }
      setLoading(false);
    };
    carregar();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    try {
      const aluno = await acessoAluno(nome, String(turmaSelecionada));
      localStorage.setItem("aluno", JSON.stringify(aluno));
      //compartilhar context de filtro de turma, para navegar para uma URL com o nome ou id da turma
      navigate(`/uconnect/feed/`);
    } catch (err) {
      console.error(err);
      setErro("Turma não encontrada. Tente novamente.");
    }
  };

  return (
    <div className={styles["container-acesso"]}>
      <div className={styles["acesso-header"]}>
        <img src={logoUconnectWhite} alt="Logo Uconnect" />
        <h2>Seja bem-vindo Aluno</h2>
        <p>Para continuar, informe seu nome e turma</p>
      </div>

      <form onSubmit={handleSubmit} className={styles["form-acesso"]}>
        <h2>Acesso do Aluno</h2>

        <label>Nome</label>
        <input
          type="text"
          placeholder="Digite seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <label>Selecione sua turma</label>
        {loading ? (
          <p>Carregando turmas...</p>
        ) : turmas.length === 0 ? (
          <p>Nenhuma turma disponível</p>
        ) : (
          <select
            value={turmaSelecionada}
            onChange={(e) => setTurmaSelecionada(Number(e.target.value))}
            required
          >
            <option value="">Escolha uma turma</option>
            {turmas.map((turma) => {
              const primeiroProf =
                turma.professores && turma.professores[0]?.professor;
              const profNome = primeiroProf ? primeiroProf.nome : "";
              return (
                <option key={turma.id} value={turma.id}>
                  {turma.nome}
                  {profNome ? ` — ${profNome}` : ""}
                </option>
              );
            })}
          </select>
        )}

        {erro && <p className={styles.erro}>{erro}</p>}

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default AcessoAluno;
