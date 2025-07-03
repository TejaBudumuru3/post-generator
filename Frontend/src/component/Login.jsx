import React from 'react'
import Toast from './Toast';
import { useNavigate } from 'react-router-dom';
const Login = ({onClose}) => {
    const URL = import.meta.env.VITE_BACKEND_URL;
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [toast, setToast] = React.useState(false);
    const [toastMsg, setToastMsg] = React.useState('');
    const [toastState, setToastState] = React.useState('');
    const Navigate = useNavigate();

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
                  // onClose();
                  // window.location.reload();
                  Navigate("/");
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
          <div className="form-logo">
            {/* <img src="../public/AppLogo.png" srcset="logo-ainfinity@2x.png 2x, logo-ainfinity@3x.png 3x"/> */}
          </div>
          <div className='right-panel'>
            <div className='form-card'>
              <h2 style={{color: "#f3f6fd"}}>Login</h2>
              <div style={{color: "#8b97b3", marginBottom: "1em"}}>Join the infinite future</div>

              <input type="email" placeholder='example@gmail.com' onChange={(e)=> setEmail(e.target.value)} required/>
              <input type="password" placeholder='Enter you password'  onChange={(e)=> setPassword(e.target.value)} required/>
              <button type="submit" onClick={loginEvent}> Login </button>

              <div className="or-divider">- OR -</div>
              <button onClick={linkedinLogin} style={{background: "#232949", color: "#15e0ff"}}> 
                  <img src='/linkedin.png' width={"30px"} style={{display: "inline-block",paddingRight:"10px"}}/>
                  Login with linkedin
                  </button>
              <p className="or-divider" style={{display:"inline-flex",width: "100%",justifyContent: "center", cursor:"default"}}>New User? <p onClick={()=>Navigate("/register")}><strong style={{paddingLeft:"5px", cursor:"pointer"}}>Register</strong></p></p>
            </div>

          </div>
          
      </div>
      {toast && <Toast message={toastMsg} state={toastState} style={{marginTop: "10px", position: "fixed", top: "10px",textAlign:"center"}}/>}
    </>
  )
}

export default Login;