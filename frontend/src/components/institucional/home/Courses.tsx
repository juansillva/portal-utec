import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import zigSmall from "../../../assets/zig-width.svg";
import CardCursos from "./CardCourse";
import { cursos } from "../../../utils/cursos";

const Courses = () => {
  const [filtro, setFiltro] = useState("TODOS");
  const cursosFiltrados = cursos.filter((curso) => {
    return filtro === "TODOS" ? true : curso.tag.categoria === filtro;
  });

  return (
    <section id="courses">
      <span className="title-section">
        <h2>Cursos Ofertados</h2>
        <p>Confira os cursos ofertados em nossa UTEC</p>
        <img src={zigSmall} alt="" />
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

      <div className="container-cards-course">
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

export default Courses;
