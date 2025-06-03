import InfoClubs from "../../components/institucional/home/InfoClubs"
import Contacts from "../../components/institucional/home/Contacts"
import Courses from "../../components/institucional/home/Courses"
import Hero from "../../components/institucional/home/Hero"
import Clubs from "../../components/institucional/home/Clubs"
import Header from "../../components/institucional/home/Header"
import Footer from "../../components/institucional/home/Footer"


const Home = () => {
  return (
 <>
 <Header />
  <Hero />
  <Courses />
  <InfoClubs />
  <Clubs />
  <Contacts />
  <Footer />
  </>
  )
}

export default Home