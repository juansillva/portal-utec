import "../../../styles/institucional/home/_Header.scss";

import { Link, useLocation, useNavigate } from "react-router-dom";

import logoUconnect from "../../../assets/logo-uconnect.svg";

const Header = () => {
  const navigate = useNavigate();

  const handleAlunoClick = () => navigate("/acessoaluno");
  const handleProfessorClick = () => navigate("/acessoprofessor");

  const location = useLocation();

  const links = [
    {
      label: "Início",
      path: "/",
    },

    {
      label: "Sobre",
      path: "/sobre",
    },

    {
      label: "Cursos",
      path: "/cursos",
    },
  ];

  return (
    <header>
      <div className="content-header">
        <div className="logos">
          <img src={logoUconnect} alt="logo da utec" />
        </div>

        <nav className="nav-bar">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={location.pathname === link.path ? "active" : "normal"}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="container-buttons">
          <button id="button-student" onClick={handleAlunoClick}>
            Sou Aluno
          </button>
          <button id="button-teacher" onClick={handleProfessorClick}>
            Sou professor
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
