import React ,{useState,useEffect}from 'react'
import NavBar from '../component/Nav.jsx'
import InputField from '../component/InputField.jsx'
import PostSection from '../component/PostSection.jsx'
const Home = () => {
  // const user = {
  //   name:"Teja",
  //   email:"tejabudumuru3@gmail.com"
  // }
  const [userData,setUserData] = React.useState({});
  console.log(userData)  
  return (
    <>
        <NavBar userData={userData} setUserData={setUserData}/>
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