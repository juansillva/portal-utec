import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoUconnectWhite from "../../assets/logo-uconnect-white.svg";
import styles from '../../styles/uconnect/AcessoProfessor.module.scss'
import { acessoProfessor } from "../../services/acessoProfessor";

const AcessoProfessor = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const professor = await acessoProfessor(email, senha);
      localStorage.setItem("professor", JSON.stringify(professor));
      navigate(`/uconnect/feed/`);
    } catch {
      setErro("Erro ao fazer login");
    }
  };

  return (
    <div className={styles['container-acesso']}>
      <div className={styles['acesso-header']}>
      <img src={logoUconnectWhite} alt="Logo Uconnect" />
      <h2>Seja bem-vindo Professor</h2>
      <p>Para continuar, informe seu e-mail e senha</p>
      </div>
      <form onSubmit={handleLogin} className={styles['form-acesso']}>
        <h2>Acesso Professor</h2>
        <label>Email</label>
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Senha</label>
        <input
          type="password"
          placeholder="Sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
      {erro && <p className={styles.erro}>{erro}</p>}
    </div>
  );
};

export default AcessoProfessor;