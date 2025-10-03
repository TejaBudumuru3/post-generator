import NavBar from '../component/Nav.jsx'
import InputField from '../component/InputField.jsx'
import PostSection from '../component/PostSection.jsx'
import { useSelector } from 'react-redux'
import Signup from "../component/Signup.jsx";
import ProfileWrapper from "../component/ProfileWrapper";
import { useState, useEffect } from 'react';

const Home = () => {
  const userData = useSelector((state)=> state.user.data);
  // const [loadPost, setLoadPost] = useState(true);
  // const posts = useSelector((state)=>state.posts.item)
  // const linkedinPost = useSelector((state)=>state.linkedinPost)
  
  // useEffect(()=>{
  //   console.log("posts", posts)
  //     console.log("linkedin", linkedinPost)
  //   if((posts === undefined || posts === null || Object.keys(posts).length === 0) && (linkedinPost === null || linkedinPost === "")) {
  //     setLoadPost(false)
  //     console.log(loadPost)
  //   }
  // },[posts, linkedinPost,loadPost])
  // // setLoadPost(true)
  //   console.log(loadPost)
  return ( 
    <>
      
        <NavBar >
          <div className="user">
                  {userData ? (<ProfileWrapper user={userData}/>) : (<Signup />)}

                  
              </div>
        </NavBar>

        

        <div className="main-section">
            <InputField/>
          {/* {loadPost && */}
            <div className="post-section">
              <PostSection/>
            </div>       
        </div>
       
    </>
  )
}

export default Home