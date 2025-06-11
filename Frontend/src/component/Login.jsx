import React from 'react'
import ProfileWrapper from './ProfileWrapper';
import Message from './Message';

const Login = ({onClose}) => {
    const URL = "http://localhost:3000/user/";
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false); 

    const loginEvent = async(e)=> {
      e.preventDefault();
      setLoading(true);
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
        
        setTimeout(()=>{
        setLoading(false);
        onClose();
        window.location.reload();
        },3000)
        }
        
      
    }catch(e){
      console.log(e)
    }
  }
    


  return (
    <>
      {loading ? (<Message/>) :(
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
      )}
    </>
  )
}

export default Login;