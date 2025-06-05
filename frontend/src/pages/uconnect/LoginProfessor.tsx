import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoUconnectWhite from "../../assets/logo-uconnect-white.svg";
import "../../styles/uconnect/_AcessoProfessor.scss";
import { acessoProfessor } from "../../services/acessoProfessor";

const LoginProfessor = () => {
  useEffect(() => {
    document.body.classList.add("login-professor");

    return () => {
      document.body.classList.remove("login-professor");
    };
  }, []);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const professor = await acessoProfessor(email, senha);
      localStorage.setItem("professor", JSON.stringify(professor));
      navigate(`/uconnect/feed/${professor.turmas[0]}`);
    } catch {
      setErro("Erro ao fazer login");
    }
  };

  return (
    <div className="container-acesso">
      <img src={logoUconnectWhite} alt="Logo Uconnect" />
      <h2>Seja bem-vindo Professor</h2>
      <p>Para continuar, informe seu e-mail e senha</p>

      <form onSubmit={handleLogin} className="form-login">
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
      {erro && <p style={{ color: "red" }}>{erro}</p>}
    </div>
  );
};

export default LoginProfessor;
