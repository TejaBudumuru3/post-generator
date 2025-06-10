import React ,{useState}from 'react'
import NavBar from '../component/Nav.jsx'
import InputField from '../component/InputField.jsx'
import PostSection from '../component/PostSection.jsx'
const Home = ({userData,setUserData}) => {

 
  const [posts, setPosts] = useState({});
    console.log("Userdata from Home",userData)
  return ( 
    <>
        <NavBar userData={userData} setUserData={setUserData}/>
        <div className="main-section">
            <InputField setPosts={setPosts} userData={userData}/>

            <div className="post-section">
              <PostSection posts={posts}/>
            </div>
        </div>
        
    </>
  )
}

export default Home