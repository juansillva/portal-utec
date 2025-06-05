import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoUconnectWhite from "../../assets/logo-uconnect-white.svg";
import { acessoAluno } from "../../services/acessoAluno";
import "../../styles/uconnect/_AcessoAluno.scss";

import { cursos } from "../../utils/cursos";

const AcessoAluno = () => {
  useEffect(() => {
    document.body.classList.add("acesso-aluno");

    return () => {
      document.body.classList.remove("acesso-aluno");
    };
  }, []);

  const [nome, setNome] = useState("");
  const [turmaSelecionada, setTurmaSelecionada] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    try {
      const aluno = await acessoAluno(nome, turmaSelecionada);
      navigate(`/uconnect/feed/${aluno.turma}`);
    } catch (err) {
      console.error(err);
      setErro("Turma não encontrada. Tente novamente.");
    }
  };

  return (
    <div className="container-acesso">
      <img src={logoUconnectWhite} alt="Logo Uconnect" />
      <h2>Seja bem-vindo Aluno</h2>
      <p>Para continuar, informe seu nome e turma</p>

      <form onSubmit={handleSubmit} className="form-acesso">
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
        <select
          value={turmaSelecionada}
          onChange={(e) => setTurmaSelecionada(e.target.value)}
          required
        >
          <option value="">Escolha uma turma</option>
          {cursos.map((curso) => (
            <option key={curso.id} value={curso.title}>
              {curso.tag.label} - {curso.title}
            </option>
          ))}
        </select>

        {erro && <p style={{ color: "red" }}>{erro}</p>}

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default AcessoAluno;
