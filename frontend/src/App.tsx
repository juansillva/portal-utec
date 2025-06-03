
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/institucional/Home'
import About from './pages/institucional/About'
import Curses from './pages/institucional/Courses'
import AcessoAluno from './pages/institucional/AcessoAluno';
import LoginProfessor from './pages/institucional/LoginProfessor';
import FeedAluno from './components/uconnect/FeedAluno';
import FeedProfessor from './components/uconnect/FeedProfessor';
import CriarPost from './components/uconnect/CriarPost'


import './styles/style.scss'


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route  path='/' element={<Home />} />
        <Route path='/sobre' element={<About />}  />
        <Route path='/cursos' element={<Curses />} />
        <Route path='/acessoaluno' element={<AcessoAluno />} />
        <Route path='/loginprofessor' element={<LoginProfessor />} />
      
 {/* Uconnect - Aluno */}
  <Route path="/uconnect/feed/:turma" element={<FeedAluno />} />

  {/* Uconnect - Professor */}
  <Route path="/uconnect/professor/feed/:turma" element={<FeedProfessor />} />
  <Route path="/uconnect/professor/criarpost" element={<CriarPost />} />

      </Routes>
    </Router>
    </>
  )
}

export default App
