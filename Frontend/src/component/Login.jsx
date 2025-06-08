import React from 'react'

const Login = ({onClose}) => {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const loginEvent = ()=> console.log("email: "+email+"\npassword: "+password);


  return (
    <div className='auth-section'>
        <div className="form-wrapper">
        <button className='close-btn' onClick={onClose}>X</button>
        <div className='sign-form'>
            <h2>Login</h2>
            <input type="email" placeholder='example@gmail.com' required onChange={(e)=> setEmail(e.target.value)}/>
            <input type="password" placeholder='Enter you password' required onChange={(e)=> setPassword(e.target.value)}/>
            <button type="submit" onClick={loginEvent}> Login </button>
        </div>
        </div>
    </div>
  )
}

export default Login