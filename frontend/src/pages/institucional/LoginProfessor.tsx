import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoUconnectWhite from '../../assets/logo-uconnect-white.svg'
import '../../styles/uconnect/_LoginProfessor.scss'



const LoginProfessor = () => {

  useEffect(() => {
    // Aplica a classe apenas nesta página
    document.body.classList.add('login-professor')

    // Remove a classe quando sair da página
    return () => {
      document.body.classList.remove('login-professor')
    }
  }, [])


  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data.message || 'Erro ao fazer login');
        return;
      }

      // Salvar dados no localStorage
      localStorage.setItem('professor', JSON.stringify(data.professor));

      // Redirecionar para o feed
     navigate(`/uconnect/feed/${data.professor.turmas[0]}`);
    } catch  {
      setErro('Erro de conexão com o servidor.');
    }
  };

  return (
    <div className='container-acesso'>
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
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
    </div>
    
  );
};

export default LoginProfessor;
