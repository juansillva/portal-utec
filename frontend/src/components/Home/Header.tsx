


import logoPcr from '../../assets/logo-pcr.svg'
import logoUtec from '../../assets/logo-utec.svg'
import '../../styles/Header.scss'


const links = [

  {
    label: 'Início',
    path: './'
  },

  
  {
    label: 'Sobre',
    path: '/sobre'
  },

  
  {
    label: 'Cursos',
    path: '/cursos'
  },

  
  {
    label: 'Uconnect',
    path: '/uconnect'
  },

]



const Header = () => {

  return (
    <header>
      <div className="content-header">
        <div className='logos'>
          <img src={logoUtec} alt="logo da utec" />
          <img src={logoPcr} alt="logo da prefeitura" />
        </div>

        <nav className='nav-bar'>
         
        </nav>
        <div className='container-buttons'>
          <button id='button-student'>Sou Aluno</button>
          <button id='button-teacher'>Sou professor</button>
        </div>

      </div>
    </header>
  )
  
}

export default Header