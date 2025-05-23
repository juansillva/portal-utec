import { motion, AnimatePresence } from "framer-motion";

import iconIA from "../../assets/iconIA.svg";
import iconRecycle from "../../assets/iconRecycle.svg";
import iconGlobo from "../../assets/iconGlobo.svg";
import { useState } from "react";
import CardCursos from "./CardCursos";
import "../../styles/CursosOfertados.scss";

const cursos = [
  {
    id: 1,
    title: "IA, Fake News e Redes Sociais",
    professor: "Kleber Alberto",
    days: "Terças e Quintas",
    time: "14h às 16h30",
    tag: {
      label: "T1",
      color: "#0365AB",
      icon: iconIA,
      categoria: "EJA",
    },
  },
  {
    id: 2,
    title: "Transformando lixo em vida",
    professor: "Hylka Waleska",
    days: "Terças e Quintas",
    time: "14h às 16h30",
    tag: {
      label: "T2",
      color: "#EE4422",
      icon: iconRecycle,
      categoria: "ANOS_INICIAIS",
    },
  },

  {
    id: 3,
    title: "SustentaTech",
    professor: "Hylka Waleska",
    days: "Quartas e Sextas",
    time: "14h às 16h30",
    tag: {
      label: "T3",
      color: "bg-blue-600",
      icon: iconGlobo,
      categoria: "ANOS_INICIAIS",
    },
  },

  {
    id: 4,
    title: "SustentaTech",
    professor: "Kleber Alberto",
    days: "Terças e Quintas",
    time: "14h às 16h30",
    tag: {
      label: "T1",
      color: "",
      icon: iconGlobo,
      categoria: "ANOS_FINAIS",
    },
  },
];

const CursosOfertados = () => {
  const [filtro, setFiltro] = useState("TODOS");
  const cursosFiltrados = cursos.filter((curso) => {
    return filtro === "TODOS" ? true : curso.tag.categoria === filtro;
  });

  return (
    <section>
      <span className="title-section">
        <h2>Cursos Ofertados</h2>
        <p>Confira os cursos ofertados em nossa UTEC</p>
      </span>

      <div className="filters">
        <button
          className={filtro === "TODOS" ? "active" : ""}
          onClick={() => setFiltro("TODOS")}
        >
          Todos
        </button>
        <button
          className={filtro === "ANOS_INICIAIS" ? "active" : ""}
          onClick={() => setFiltro("ANOS_INICIAIS")}
        >
          Anos Iniciais
        </button>
        <button
          className={filtro === "ANOS_FINAIS" ? "active" : ""}
          onClick={() => setFiltro("ANOS_FINAIS")}
        >
          Anos Finais
        </button>
        <button
          className={filtro === "EJA" ? "active" : ""}
          onClick={() => setFiltro("EJA")}
        >
          EJA
        </button>
      </div>

      <div className="container-cards">
        <AnimatePresence>
          {cursosFiltrados.map((curso) => (
            <motion.div
              key={curso.id}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.8, 0.25, 1], 
              }}
            >
              <CardCursos {...curso} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CursosOfertados;
