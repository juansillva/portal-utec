import "../../../styles/institucional/home/_Hero.scss";

import { Link } from "react-router-dom";
import iconRight from "../../../assets/Right.svg";
import imageRight from "../../../assets/hero-section-image.svg";
import details from "../../../assets/spark-2.svg";
import details2 from "../../../assets/zig-round-2 1.svg";

const Hero = () => {
  return (
    <main>
      <div className="content-hero-left">
        <img id="details" src={details} alt="" />
        <h1>Transformando vidas com educação e tecnologia</h1>
        <p>
          Somos um polo de conhecimento colaborativo, com foco em educação,
          cultura digital e transformação social.
        </p>
        <Link to="/sobre">
          Conheça a UTEC <img src={iconRight} alt="Botão Conheça a UTEC" />
        </Link>
      </div>

      <div className="content-hero-right">
        <img src={imageRight} alt="" />
        <img id="details2" src={details2} alt="" />
      </div>
    </main>
  );
};

export default Hero;
