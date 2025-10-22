import { useNavigate } from 'react-router-dom';
import styles from '../../styles/uconnect/HeaderUconnect.module.scss';

import SearchInput from './SearchInput';
import { useState, useEffect } from 'react';


const HeaderUconnect = () => {
  
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [role, setRole] = useState<'professor' | 'aluno' | null>(null);

  useEffect(() => {
    // Primeiro tenta carregar dados de professor
    const storedProfessor = localStorage.getItem("professor");
    if (storedProfessor) {
      try {
        const parsed = JSON.parse(storedProfessor);
        setAvatar(parsed.avatar);
        setRole("professor");
        return;
      } catch {
        console.error("Erro ao ler dados do professor");
      }
    }

    // Se não tiver professor, tenta aluno
    const storedAluno = localStorage.getItem("aluno");
    if (storedAluno) {
      try {
        const parsed = JSON.parse(storedAluno);
        setAvatar(parsed.avatar || "aluno_padrao.svg");
        setRole("aluno");
      } catch {
        console.error("Erro ao ler dados do aluno");
      }
    }
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles['content-header-uconnect']}>
        <SearchInput />

        <div className={styles['user-actions']}>
          {/* Só professor pode criar post */}
          {role === 'professor' && (
            <button
              onClick={() => navigate('/uconnect/criarpost')}
              className={styles['button-criar-post']}
            >
              Criar Post
            </button>
          )}

          <div className={styles['box-profile']}>
            <img
              src={`${import.meta.env.VITE_API_URL}/uploads/${avatar}`} 
              alt={`Avatar do ${role || 'usuário'}`}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderUconnect;
