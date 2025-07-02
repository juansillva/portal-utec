
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/institucional/Home'
import About from './pages/institucional/About'
import Curses from './pages/institucional/Courses'
import AcessoAluno from './pages/uconnect/AcessoAluno';
import AcessoProfessor from './pages/uconnect/AcessoProfessor';
import Feed from './components/uconnect/Feed';
import CriarPost from './pages/uconnect/CriarPost';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route  path='/' element={<Home />} />
        <Route path='/sobre' element={<About />}  />
        <Route path='/cursos' element={<Curses />} />
        <Route path='/acessoaluno' element={<AcessoAluno />} />
        <Route path='/acessoprofessor' element={<AcessoProfessor />} />
      
 {/* Uconnect - Feed */}
  <Route path="/uconnect/feed/" element={<Feed />} />

  {/* Uconnect - Criar Post */}
      <Route path="/uconnect/criarpost/" element={<CriarPost />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
