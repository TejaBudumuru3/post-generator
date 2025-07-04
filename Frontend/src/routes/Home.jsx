import NavBar from '../component/Nav.jsx'
import InputField from '../component/InputField.jsx'
import PostSection from '../component/PostSection.jsx'
import { useSelector } from 'react-redux'
import Signup from "../component/Signup.jsx";
import ProfileWrapper from "../component/ProfileWrapper";
// import { useState, useEffect } from 'react';

const Home = () => {
  const userData = useSelector((state)=> state.user.data);
  // const [loadPost, setLoadPost] = useState(true);
  // const posts = useSelector((state)=>state.posts.item)
  // const linkedinPost = useSelector((state)=>state.linkedinPost)
  
  // useEffect(()=>{
  // if((posts === undefined || posts === null || Object.keys(posts).length === 0) && (linkedinPost === null || linkedinPost === "")) {
  //   setLoadPost(false)
    
  // }},[loadPost])
  
  return ( 
    <>
      <NavBar >
        <div className="user">
                {userData ? (<ProfileWrapper user={userData}/>) : (<Signup />)}
            </div>
      </NavBar>
     
        
          
      <div className="main-section">
          <InputField/>
        
          <div className="post-section">
            <PostSection/>
          </div>
        
      </div>
        
    </>
  )
}

export default Home