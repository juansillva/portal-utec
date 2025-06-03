import { Link } from 'react-router-dom'


import logoPCR from '../../assets/logo-pref.svg'
import logoUconnectWhite from '../../assets/logo-uconnect-white.svg'
import '../../styles/uconnect/_HeaderUconnect.scss'

const HeaderUconnect = () => {


    return (
      <header>
          <div className="content-header-uconnect">
              <img src={logoPCR} alt="" />
           <div className='nav-bar'>
               <Link
                to='/'
              >Início</Link>
             <Link
                to='/sobre'
              >Sobre</Link>
               <Link
                to='/cursos'
              >Cursos</Link>
           </div>
            <img src={logoUconnectWhite} alt="" />
    

          </div>
      </header>
    )
}

export default HeaderUconnect

