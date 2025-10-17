import About from '../components/About'
import { Background } from '../components/Background'
import Features from '../components/Features'
import Hero from '../components/Hero-section'
const LandingPage = () => {
  return (
    <div className='flex flex-col'>
        <Background/>
        <Hero/>
        <Features/>
        <About/>
    </div>
  )
}

export default LandingPage