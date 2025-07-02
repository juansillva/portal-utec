import "../../../styles/institucional/home/_InfoClub.scss";

import { useState } from "react";
import CardClub from "./CardClub";

import { clubes } from "../../../utils/clubes";

const Clubs = () => {
  const [filtro, setFiltro] = useState("TODOS");

  const clubeFiltrado = clubes.filter((clube) => {
    return filtro === "TODOS" || clube.categoria === filtro;
  });

  return (
    <section id="clubs">
      <div className="title-section">
        <h1 id="title-club">CRONOGRAMA</h1>
        <p>Clubes de Programação e Robótica</p>
      </div>
      <div className="filters">
        <button
          className={filtro === "TODOS" ? "active" : ""}
          onClick={() => setFiltro("TODOS")}
        >
          Todos
        </button>
        <button
          className={filtro === "TERÇA" ? "active" : ""}
          onClick={() => setFiltro("TERÇA")}
        >
          Terça
        </button>
        <button
          className={filtro === "QUARTA" ? "active" : ""}
          onClick={() => setFiltro("QUARTA")}
        >
          Quarta
        </button>
      </div>

      <div className="container-cards-club">
        {clubeFiltrado.map((clube) => (
          <CardClub
            school={clube.school}
            image={clube.image}
            title={clube.title}
            day={clube.day}
            time={clube.time}
          />
        ))}
      </div>
    </section>
  );
};

export default Clubs;
