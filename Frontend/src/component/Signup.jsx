import { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const [signup,setSignup] = useState(false);
  const [login,setLogin] = useState(false)
  const Navigator = useNavigate();
  return (
      <>
        {/* <button className="sign-up-btn" onClick={()=> Navigator("/register")}><strong>Signup</strong></button> */}
        <button className="login-btn" onClick={()=> Navigator("/login")}><strong>Get started</strong></button>
        {/* {signup && <Register onClose={()=> setSignup(false)}/>}
        {login && <Login onClose={()=> setLogin(false)}/>} */}
      </>
    
  )
}

export default Signup