import React from 'react'
import Toast from './Toast';
import { useDispatch } from 'react-redux';

const Login = ({onClose}) => {
    const URL = import.meta.env.VITE_BACKEND_URL;
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [toast, setToast] = React.useState(false);
    const [toastMsg, setToastMsg] = React.useState('');
    const [toastState, setToastState] = React.useState('');
    const dispatch = useDispatch();

    const loginEvent = async(e)=> {
      e.preventDefault();
      if(email.trim() === "" || password.trim() === ""){
        setToastMsg("Please fill in all fields.");
        setToastState("primary");
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
        return;
      }
      else{
        if(!(email.match(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/))){
          setToastMsg("Enter valid email id");
          setToastState("danger");
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 3000);
        }
        else{
              try
              {
                const response = await fetch(`${URL}/signin`, {
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

              if(response.status === 200){
                setToastMsg("Login successful!");
                setToastState("success");
                setToast(true);
                setTimeout(() => {
                  setToast(false);
                }, 3000);

                setTimeout(()=>{
                  onClose();
                  window.location.reload();
                },2000)

              }  
              // invalid password
              if(response.status === 401){
                  setToast(true);
                  setToastMsg(data.message);
                  setToastState("danger");
                  setTimeout(() => {
                  setToast(false);
                  }, 3000);
                  return;
                }
              // invalid email  
              if(response.status === 404){
                console.log("Login failed:", data.message);
                setToast(true);
                setToastMsg(data.message);
                setToastState("danger");
                setTimeout(() => {
                  setToast(false);
                }, 3000);
                return;
              }
       
              }catch(e){
                setToast(true);
                setToastMsg("Something went wrong, please try again later.");
                setToastState("danger");
                console.log("server error",e.TypeError)
                setTimeout(() => {
                  setToast(false);
                }, 2000);

              }
            }
          }
    
  }

    const linkedinLogin = async(e)=>{
      e.preventDefault();
      try {
        const URL = `${import.meta.env.VITE_LINKEDIN_URL}auth/linkedin`
        console.log(URL)
        // window.location.href = 'http://localhost:3000/user/v2/auth/linkedin';

        window.location.href = URL
      } catch (error) {
        setToast(true);
        setToastMsg("Something went wrong, please try again later.");
        setToastState("danger");
        console.log("server error",e)
        setTimeout(() => {
          setToast(false);
        }, 2000);
      }
    }
    


  return (
    <>
      <div className='auth-section'>
          <div className="form-wrapper">
          <button className='close-btn' onClick={onClose}>X</button>
          <form className='sign-form'>
              <h2>Login</h2>
              <input type="email" placeholder='example@gmail.com' onChange={(e)=> setEmail(e.target.value)} required/>
              <input type="password" placeholder='Enter you password'  onChange={(e)=> setPassword(e.target.value)} required/>
              <button type="submit" onClick={loginEvent}> Login </button>
          </form>
          <button onClick={linkedinLogin}> Login with linkedin</button>
          </div>
      </div>
      {toast && <Toast message={toastMsg} state={toastState} style={{marginTop: "10px", position: "fixed", top: "10px",textAlign:"center"}}/>}
    </>
  )
}

export default Login;