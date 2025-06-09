import { useState } from "react";
import Register from "./register";
import Login from "./Login";

const Signup = ({setUserData}) => {
  console.log("signup component -- setUserData: ", setUserData);
  const [signup,setSignup] = useState(false);
  const [login,setLogin] = useState(false)
  return (
      <>
        <button className="sign-up-btn" onClick={()=> setSignup(true)}>signup</button>
        <button className="login-btn" onClick={()=> setLogin(true)}>login</button>
        {signup && <Register onClose={()=> setSignup(false)}/>}
        {login && <Login onClose={()=> setLogin(false)}
                          onLoginSuccess={(user)=>setUserData(user)}/>}
      </>
    
  )
}

export default Signup