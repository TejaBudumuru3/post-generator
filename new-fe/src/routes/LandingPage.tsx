import About from '../components/About'
import Features from '../components/Features'
import Hero from '../components/Hero-section'
import NavBar from '../components/NavBar'
const LandingPage = () => {
  return (
    <div className='flex flex-col w-full'>
        
        <NavBar/>
        <Hero/>
        <Features/>
        <About/>
    </div>
  )
}

export default LandingPage