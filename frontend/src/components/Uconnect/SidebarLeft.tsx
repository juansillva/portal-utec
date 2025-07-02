import styles from '../../styles/uconnect/SidebarLeft.module.scss'

import logoUconnect from '../../assets/logo-uconnect.svg'
import backgroundProfile from '../../assets/background-profile.svg'

import { Camera, ChartNoAxesGanttIcon, FileText, Shapes } from 'lucide-react';
import { NavLink } from "react-router-dom";
import { useEffect, useState } from 'react';

const SidebarLeft = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [nome, setNome] = useState('');
  const [role, setRole] = useState<'professor' | 'aluno' | null>(null);
  const [turmas, setTurmas] = useState<{ id: number, nome: string, icon: string }[]>([]);

  useEffect(() => {
    // Primeiro, tenta carregar dados de professor
    const storedProfessor = localStorage.getItem("professor");
    if (storedProfessor) {
      try {
        const parsed = JSON.parse(storedProfessor);
        setNome(parsed.nome || '');
        setAvatar(parsed.avatar);
        setRole('professor');
        setTurmas(parsed.turmas || []);
        return;
      } catch {
        console.error("Erro ao ler dados do professor");
      }
    }

    // Se não tiver professor, tenta carregar aluno
    const storedAluno = localStorage.getItem("aluno");
    if (storedAluno) {
      try {
        const parsed = JSON.parse(storedAluno);
        setNome(parsed.nome || '');
        setAvatar(parsed.avatar || 'aluno_padrao.svg');
        setRole('aluno');
        setTurmas(parsed.turmas || []);
      } catch {
        console.error("Erro ao ler dados do aluno");
      }
    }
  }, []);

  return (
    <aside className={styles.sidebar}>
      <img className={styles.logoUconnect} src={logoUconnect} alt='logo Uconnect' />
      
      <div className={styles['container-profile']}>
        <img className={styles.backgroundProfile} src={backgroundProfile} alt="Background" />
        {avatar && (
          <img
            className={styles.avatarProfile}
            src={`${import.meta.env.VITE_API_URL}/uploads/${avatar}`} 
            alt={`Avatar do ${role}`}
          />
        )}
        <p>{nome}</p>
        <span>{role === 'professor' ? 'Professor' : 'Aluno'}</span>
      </div>

      <nav>
        <ul>
          <li>
            <NavLink
              to="/uconnect/feed"
              className={({ isActive }) =>
                isActive ? styles.linkAtivo : styles.link
              }
            >
              <ChartNoAxesGanttIcon className={styles.icone} />
              <span>Feed</span>
            </NavLink>
          </li>

          {role === 'professor' && (
            <>
              <li>
                <NavLink
                  to="/uconnect/turmas"
                  className={({ isActive }) =>
                    isActive ? styles.linkAtivo : styles.link
                  }
                >
                  <Shapes className={styles.icone} />
                  <span>Turmas</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/uconnect/arquivos"
                  className={({ isActive }) =>
                    isActive ? styles.linkAtivo : styles.link
                  }
                >
                  <FileText className={styles.icone} />
                  <span>Arquivos</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/uconnect/fotos"
                  className={({ isActive }) =>
                    isActive ? styles.linkAtivo : styles.link
                  }
                >
                  <Camera className={styles.icone} />
                  <span>Fotos</span>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>

      {turmas.length > 0 && (
        <div className={styles['box-minhas-turmas']}>
          <p className={styles['minhas-turmas']}>MINHAS TURMAS</p>

          {turmas.map((turma) => (
            <div key={turma.id} className={styles.turmaItem}>
              {turma.icon && (
                <img
                 src={`${import.meta.env.VITE_API_URL}/uploads/${turma.icon}`} 
                  className={styles.avatarTurma}
                  alt="Ícone da turma"
                />
              )}
              {turma.nome}
            </div>
          ))}
        </div>
      )}
    </aside>
  )
}

export default SidebarLeft;
