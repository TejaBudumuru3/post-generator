import NavBar from '../component/Nav'
import LandPage from '../component/LandingHome'
import { useSelector } from 'react-redux'
import Signup from "../component/Signup.jsx";
import ProfileWrapper from "../component/ProfileWrapper";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './Home.jsx';
import Hero from '../component/Hero-section.jsx';
import Features from '../component/Features.jsx';
import About from '../component/About.jsx';


const LandingPage = () => {
    const userData = useSelector((state)=> state.user.data);
    const Navi = useNavigate();
    useEffect(()=>{

        if(!userData) return;
        Navi("home");
        
    },[userData, Navi])

  return (
    <>
    <div className='flex flex-col'>
    {/* <NavBar >
        <div className="user">
                {userData ? (<ProfileWrapper user={userData}/>) : (<Signup />)}
            </div>
      </NavBar> */}
      <Hero/>
      <Features/>
      <About/>
    {/* <LandPage/> */}
    </div>
    </>
  )
}

export default LandingPage