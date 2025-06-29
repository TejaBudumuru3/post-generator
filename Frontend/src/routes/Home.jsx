import NavBar from '../component/Nav.jsx'
import InputField from '../component/InputField.jsx'
import PostSection from '../component/PostSection.jsx'
import { useSelector } from 'react-redux'
import Signup from "../component/Signup.jsx";
import ProfileWrapper from "../component/ProfileWrapper";

const Home = () => {
  const userData = useSelector((state)=> state.user.data);
  
  return ( 
    <>
      <NavBar >
        <div className="user">
                {userData ? (<ProfileWrapper user={userData}/>) : (<Signup />)}
            </div>
      </NavBar>
     
        <>
          
          <div className="main-section">
              <InputField/>

              <div className="post-section">
                <PostSection/>
              </div>
          </div>
        </>
    </>
  )
}

export default Home