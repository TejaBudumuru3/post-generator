import { useState } from "react";
import Register from "./register";
import Login from "./Login";

const Signup = ({setUserData}) => {
    console.log("Userdata from signup",setUserData)
  const [signup,setSignup] = useState(false);
  const [login,setLogin] = useState(false)
  return (
      <>
        <button className="sign-up-btn" onClick={()=> setSignup(true)}><strong>Signup</strong></button>
        <button className="login-btn" onClick={()=> setLogin(true)}><strong>Login</strong></button>
        {signup && <Register onClose={()=> setSignup(false)}/>}
        {login && <Login onClose={()=> setLogin(false)}
                          />}
      </>
    
  )
}

export default Signup