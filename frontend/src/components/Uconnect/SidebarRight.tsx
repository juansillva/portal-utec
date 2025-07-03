import {  SplinePointer } from "lucide-react"
import logoScratch from '../../assets/scratch-logo.svg'
import logoArduino from '../../assets/logo-arduino.svg'
import logoKahoot from '../../assets/kahoot-white 1.svg'
import logoPadlet from '../../assets/logo-padlet.svg'
import logoGemini from '../../assets/logo-gemini.svg'
import logoGPT from '../../assets/logo-gpt.svg'
import styles from '../../styles/uconnect/SidebarRight.module.scss'

const SidebarRight = () => {
  const handleToolClick = (toolName: string) => {
    console.log(`Acessando ${toolName}`)
 
  }
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
            onClick={() => handleToolClick('Scratch')}
          >
            <div className={`${styles.toolIcon} ${styles.scratch}`}>
              <img src={logoScratch} alt="Scratch" />
            </div>
            <div className={styles.toolInfo}>
              <h4>Scratch</h4>
              <p>Programação visual</p>
            </div>
          </div>

          <div 
            className={styles.toolItem}
            onClick={() => handleToolClick('Arduino')}
          >
            <div className={`${styles.toolIcon} ${styles.arduino}`}>
              <img src={logoArduino} alt="Arduino" />
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
            onClick={() => handleToolClick('ChatGPT')}
          >
            <div className={`${styles.toolIcon} ${styles.chatgpt}`}>
             <img src={logoGPT} alt="CHATGPT" />
            </div>
            <div className={styles.toolInfo}>
              <h4>ChatGPT</h4>
              <p>Assistente de IA</p>
            </div>
          </div>

          <div 
            className={styles.toolItem}
            onClick={() => handleToolClick('Gemini')}
          >
            <div className={`${styles.toolIcon} ${styles.gemini}`}>
             <img src={logoGemini} alt="Gemini" />
            </div>
            <div className={styles.toolInfo}>
              <h4>Gemini</h4>
              <p>IA do Google</p>
            </div>
          </div>

          <div 
            className={styles.toolItem}
            onClick={() => handleToolClick('Padlet')}
          >
            <div className={`${styles.toolIcon} ${styles.padlet}`}>
             <img src={logoPadlet} alt="Padlet" />
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
            onClick={() => handleToolClick('Kahoot')}
          >
            <div className={`${styles.toolIcon} ${styles.kahoot}`}>
              <img src={logoKahoot} alt="Kahoot" />
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

export default SidebarRight