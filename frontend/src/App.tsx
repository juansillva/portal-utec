
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Home/Header'

import Home from './pages/Home'
import About from './pages/About'
import Curses from './pages/Curses'
import Uconnect from './pages/Uconnect'

import './styles/Header.scss'
import './styles/global.scss'

function App() {

  return (
    <>
    <Header />
    <Router>
      <Routes>
        <Route  path='/' element={<Home />} />
        <Route path='/sobre' element={<About />}  />
        <Route path='/cursos' element={<Curses />} />
        <Route path='/uconnect' element={<Uconnect />}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
