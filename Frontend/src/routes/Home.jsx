import React ,{useState}from 'react'
import NavBar from '../component/Nav.jsx'
import InputField from '../component/InputField.jsx'
import PostSection from '../component/PostSection.jsx'
import LandPage from '../component/LandingHome.jsx'
const Home = ({userData,setUserData}) => {

  const [landingBtn , setLandingBtn] = useState(true);
  const [posts, setPosts] = useState({});
    console.log("Userdata from Home",userData)
  return ( 
    <>
      { landingBtn ? (<LandPage setLandingBtn = {setLandingBtn}/>) : (
        <body>
          <NavBar userData={userData} setUserData={setUserData}/>
          <div className="main-section">
              <InputField setPosts={setPosts} userData={userData}/>

              <div className="post-section">
                <PostSection posts={posts}/>
              </div>
          </div>
        </body>
      )
      }
    </>
  )
}

export default Home