import React from "react";
import "../../../styles/institucional/home/_Footer.scss";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__main">
          <div className="footer__brand">
            <div className="footer__logos">
              <div className="footer__logo">
                <div className="utec-logo">
                  <div className="utec-logo__icon">
                    <div className="cube cube--orange"></div>
                    <div className="cube cube--blue"></div>
                    <div className="cube cube--green"></div>
                  </div>
                  <div className="utec-logo__text">
                    <span className="utec-logo__main">UTEC</span>
                    <span className="utec-logo__sub">NOVA DESCOBERTA</span>
                  </div>
                </div>
              </div>

              <div className="footer__partner-logos">
                <div className="partner-logo">
                  <span className="partner-logo__text">
                    Secretaria de
                    <br />
                    Educação
                  </span>
                </div>
                <div className="partner-logo partner-logo--recife">
                  <div className="recife-logo">
                    <span className="recife-logo__text">RECIFE</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="footer__contact">
              <p>Av. Ver. Otacílio Azevedo, 1030 - Vasco da Gama,</p>
              <p>Recife - PE, 52081-550</p>
              <p>Email: utec.novadescoberta@educ.rec.br</p>
            </div>
          </div>

          <div className="footer__nav">
            <div className="footer__nav-section">
              <h3>Início</h3>
              <ul>
                <li>
                  <a href="#cursos-ofertados">Cursos ofertados</a>
                </li>
                <li>
                  <a href="#clubes">Clubes de Programação e Robótica</a>
                </li>
                <li>
                  <a href="#cronograma">Cronograma</a>
                </li>
                <li>
                  <a href="#nosso-time">Nosso time</a>
                </li>
                <li>
                  <a href="#contato">Contato</a>
                </li>
              </ul>
            </div>

            <div className="footer__nav-section">
              <h3>Sobre</h3>
              <ul>
                <li>
                  <a href="#sobre-utec">Sobre a UTEC</a>
                </li>
                <li>
                  <a href="#como-surgiu">Como surgiu</a>
                </li>
                <li>
                  <a href="#nosso-time">Nosso time</a>
                </li>
              </ul>
            </div>

            <div className="footer__nav-section">
              <h3>Cursos</h3>
              <ul>
                <li>
                  <a href="#cursos">Cursos</a>
                </li>
                <li>
                  <a href="#clubes-programacao">
                    Clubes de Programação e Robótica
                  </a>
                </li>
                <li>
                  <a href="#professores">Professores</a>
                </li>
              </ul>
            </div>

            <div className="footer__nav-section">
              <h3>Uconnect</h3>
              <ul>
                <li>
                  <a href="#feed">Feed</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; 2025 UTEC NOVA DESCOBERTA</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
