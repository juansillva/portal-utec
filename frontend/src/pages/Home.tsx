import Clubes from "../components/Home/Clubes"
import Contatos from "../components/Home/Contatos"
import Cronograma from "../components/Home/Cronograma"
import CursosOfertados from "../components/Home/CursosOfertados"
import Hero from "../components/Home/Hero"

const Home = () => {
  return (
  <>
  <Hero />
  <CursosOfertados />
  <Clubes />
  <Cronograma />
  <Contatos />
  </>
  )
}

export default Home