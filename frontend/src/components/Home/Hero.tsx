import iconRight from '../../assets/Right.svg'
import imageRight from '../../assets/hero-section-image.svg'

import '../../styles/Hero.scss'
import '../../styles/global.scss'


const Hero = () => {
  return (

<main>
<div className="content-hero-left">
  <h1>  
    Transformando vidas com educação e tecnologia
  </h1>
  <p>
    Somos um polo de conhecimento colaborativo, com foco em educação, cultura digital e transformação social.
  </p>
  <a href="">Conheça a UTEC <img src={iconRight} alt="" /></a>
</div>

<div className='content-hero-right'>
    <img src={imageRight} alt="" />
</div>
</main>





    
  )
}

export default Hero