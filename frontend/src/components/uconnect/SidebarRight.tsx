import {  SplinePointer } from "lucide-react"
import logoScratch from '../../assets/scratch-logo.svg'
import logoArduino from '../../assets/logo-arduino.svg'
import logoKahoot from '../../assets/kahoot-white 1.svg'
import logoPadlet from '../../assets/logo-padlet.svg'
import logoGemini from '../../assets/logo-gemini.svg'
import logoGPT from '../../assets/logo-gpt.svg'
import styles from '../../styles/uconnect/SidebarRight.module.scss'

const SidebarRight = () => {
  return (
    <>
      <div className={styles.sidebarRight}>
      <div className={styles.quickAccessHeader}>
        <SplinePointer className={styles.menuIcon}/>
        <h3>Acesso Rápido</h3>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>PROGRAMAÇÃO</div>
        <div className={styles.toolsList}>
          <div 
            className={styles.toolItem}
          >
            <div className={`${styles.toolIcon} ${styles.scratch}`}>
              <a href="https://scratch.mit.edu/"><img src={logoScratch} alt="Scratch"/></a>
            </div>
            <div className={styles.toolInfo}>
              <h4>Scratch</h4>
              <p>Programação visual</p>
            </div>
          </div>

          <div 
            className={styles.toolItem}
          >
            <div className={`${styles.toolIcon} ${styles.arduino}`}>
              <a href="https://www.arduino.cc/"><img src={logoArduino} alt="Arduino" /></a>
            </div>
            <div className={styles.toolInfo}>
              <h4>Arduino</h4>
              <p>Projetos eletrônicos</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>FERRAMENTAS</div>
        <div className={styles.toolsList}>
          <div 
            className={styles.toolItem}
          >
            <div className={`${styles.toolIcon} ${styles.chatgpt}`}>
             <a href="https://chatgpt.com/"></a><img src={logoGPT} alt="CHATGPT" />
            </div>
            <div className={styles.toolInfo}>
              <h4>ChatGPT</h4>
              <p>Assistente de IA</p>
            </div>
          </div>

          <div 
            className={styles.toolItem}
          >
            <div className={`${styles.toolIcon} ${styles.gemini}`}>
             <a href="https://gemini.google.com/app?hl=pt-BR"><img src={logoGemini} alt="Gemini" /></a>
            </div>
            <div className={styles.toolInfo}>
              <h4>Gemini</h4>
              <p>IA do Google</p>
            </div>
          </div>

          <div 
            className={styles.toolItem}
          >
            <div className={`${styles.toolIcon} ${styles.padlet}`}>
             <a href="https://padlet.com/"><img src={logoPadlet} alt="Padlet" /></a>
            </div>
            <div className={styles.toolInfo}>
              <h4>Padlet</h4>
              <p>Quadro colaborativo</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>INTERATIVOS</div>
        <div className={styles.toolsList}>
          <div 
            className={styles.toolItem}
          >
            <div className={`${styles.toolIcon} ${styles.kahoot}`}>
             <a href="https://kahoot.com/"><img src={logoKahoot} alt="Kahoot" /></a> 
            </div>
            <div className={styles.toolInfo}>
              <h4>Kahoot!</h4>
              <p>Quiz interativo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default SidebarRight;