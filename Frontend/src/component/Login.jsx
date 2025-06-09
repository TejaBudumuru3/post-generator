import React from 'react'
import ProfileWrapper from './ProfileWrapper';

const Login = ({onClose, onLoginSuccess}) => {
    const URL = "http://localhost:3000/user/";
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const loginEvent = async(e)=> {
      e.preventDefault();
      try
      {
        const response = await fetch(`${URL}signin`, {
        method:"POST",
        credentials:"include",
        headers:{
          "content-type":"application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      })

      const data = await response.json();

      if(response.ok){
        console.log("logged in");
        console.log("data: ",data.token)

          const profileResponse = await fetch(`${URL}getDetails`, {
            method:"GET",
            credentials:"include"
          });
            const profileData = await profileResponse.json();
            if(profileResponse.ok){
              console.log("profile data: ",profileData.data);
              onLoginSuccess(profileData.data);
            }
            else{
              console.log("Error fetching profile data");
            }
        }
        onClose();
      
    }catch(e){
      console.log(e)
    }
  }
    


  return (
    <div className='auth-section'>
        <div className="form-wrapper">
        <button className='close-btn' onClick={onClose}>X</button>
        <form className='sign-form'>
            <h2>Login</h2>
            <input type="email" placeholder='example@gmail.com' required onChange={(e)=> setEmail(e.target.value)}/>
            <input type="password" placeholder='Enter you password' required onChange={(e)=> setPassword(e.target.value)}/>
            <button type="submit" onClick={loginEvent}> Login </button>
        </form>
        </div>
    </div>
  )
}

export default Login;