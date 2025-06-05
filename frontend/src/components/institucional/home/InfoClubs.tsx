import '../../../styles/institucional/home/_InfoClub.scss'

import logoArduino from '../../../assets/logo-arduino.svg'
import logoLego from '../../../assets/logo-lego.svg'
import logoScratch from '../../../assets/logo-scratch.svg'
import logoNAO from '../../../assets/logo-NAO.svg'
import hashtag from '../../../assets/hashtag.svg'
import zigLarge from "../../../assets/zig-width-large.svg"
import { Fade } from "react-awesome-reveal";

const InfoClubs = () => {
  return (
    <section>
      <span className="title-section">
        <img id='hashtag' src={hashtag} alt="" />
        <h2>Clubes de Programação e Robótica</h2>
        <p>Em colaboração com escolas da Prefeitura, promovemos clubes de programação e robótica.</p>
        <img src={zigLarge} alt="" />
      </span>

    <Fade triggerOnce direction="right">
      <div className="container-info-club">
        <div className='card-schools'>
          <h1>
            ESCOLAS <br />
            PARCEIRAS
          </h1>
          <div className='schools'>
            <li>E.M. T.I São Cristóvão</li>
            <li>E.M. Bola na Rede</li>
            <li>E.M. Olindina Monteiro de França</li>
            <li>E.M T.I Paulo VI</li>
            <li>E.M. Sociólogo Gilberto Freyre</li>
          </div>

        </div>
        <div className='card-tech'>
          <div className='content-card-tech'>
            <h1>TECNOLOGIAS</h1>
            <div className='techs'>
              <img src={logoArduino} alt="" />
              <img src={logoLego} alt="" />
              <img src={logoScratch} alt="" />
              <img src={logoNAO} alt="" />
            </div>
          </div>
        </div>
      </div>
    </Fade>

    </section>
  )
}

export default InfoClubs