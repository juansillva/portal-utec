import styles from "../../styles/uconnect/SidebarLeft.module.scss";

import backgroundProfile from "../../assets/background-profile.svg";
import logoUconnect from "../../assets/logo-uconnect.svg";

import {
  Camera,
  ChartNoAxesGanttIcon,
  FileText,
  Menu,
  Shapes,
} from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const SidebarLeft = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [nome, setNome] = useState("");
  const [role, setRole] = useState<"professor" | "aluno" | null>(null);
  const [turmas, setTurmas] = useState<
    { id: number; nome: string; icon: string }[]
  >([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Primeiro, tenta carregar dados de professor
    const storedProfessor = localStorage.getItem("professor");
    if (storedProfessor) {
      try {
        const professor = JSON.parse(storedProfessor);
        setNome(professor.nome || "");
        setAvatar(professor.avatar);
        setRole("professor");
        setTurmas(professor.turmas || []);
        return;
      } catch {
        console.error("Erro ao ler dados do professor");
      }
    }

    // Se não tiver professor, tenta carregar aluno
    const storedAluno = localStorage.getItem("aluno");
    if (storedAluno) {
      try {
        const aluno = JSON.parse(storedAluno);
        setNome(aluno.nome || "");
        setAvatar(aluno.avatar || "aluno_padrao.svg");
        setRole("aluno");
        setTurmas(aluno.turmas || []);
      } catch {
        console.error("Erro ao ler dados do aluno");
      }
    }
  }, []);

  return (
    <>
      <button
        className={styles.menuButton}
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <Menu />
      </button>

      <aside
        className={`${styles.sidebarLeft} ${
          isMobileOpen ? styles.show : styles.hide
        }`}
      >
        <img
          className={styles.logoUconnect}
          src={logoUconnect}
          alt="logo Uconnect"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }} // opcional, só pra indicar que é clicável
        />

        <div className={styles["container-profile"]}>
          <img
            className={styles.backgroundProfile}
            src={backgroundProfile}
            alt="Background"
          />
          {avatar && (
            <img
              className={styles.avatarProfile}
              src={`${import.meta.env.VITE_API_URL}/uploads/${avatar}`}
              alt={`Avatar do ${role}`}
            />
          )}
          <div className={styles["profile-info"]}>
            <p>{nome}</p>
            <span>{role === "professor" ? "Professor" : "Aluno"}</span>
          </div>
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

            {role === "professor" && (
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
    </>
  );
};

export default SidebarLeft;
