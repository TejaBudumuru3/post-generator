import React from 'react';
import Toast from './Toast';
import { useNavigate } from 'react-router-dom';


const Register = ({ onClose }) => {

  const URL = import.meta.env.VITE_BACKEND_URL;
  const Navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [fname,setFname] = React.useState("");
  const [lname,setLname] = React.useState("");
  const [toast, setToast] = React.useState(false);
  const [toastMsg, setToastMsg] = React.useState('');
  const [toastState, setToastState] = React.useState('');

  const registerEvent = async(e) => {
    e.preventDefault(); 
    if(!email || !password || !name || !confirmPassword){
      setToastMsg("Fill the details");
          setToastState("primary");
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 3000);
          return
    }
    setFname(name.split(" ")[0])
    setLname(name.split(" ")[1])
    if(password.length<8){
      setToastMsg("Password must contains 8 characters");
          setToastState("danger");
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 3000);
    }
    else if(!(email.match(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/))){
      setToastMsg("Enter valid email id");
          setToastState("danger");
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 3000);
    }
    else{
      if((password === confirmPassword)){
        try {
          const response  =await fetch(`${URL}/signup`, {
            method:"POST",
            body:JSON.stringify({
              email : email,
              password: password,
              name: name,
              fname: fname,
              lname:lname
            }),
            headers:{
              "content-type":"application/json"
            }
          })

          const data = await response.json();
          if(response.ok){
            setToastMsg(data.message || "Registration successful! Please log in.");
            setToastState("success");
            setToast(true);
            setTimeout(() => {
              onClose(); 
              setToast(false);
            }, 3000);
            Navigate("/login");
            
          }
          else {
            setToastMsg(data.message);
            setToastState("danger");
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
            return;
          }
        } catch (error) {
          console.log("Error during registration:", error);
          setToastMsg("An error occurred during registration. Please try again.");
          setToastState("danger");
          setToast(true);
          setTimeout(() => {
            onClose();
            setToast(false);
          }, 2000);
        }

      }
      else{
        setToastMsg("Passwords do not match");
        setToastState("danger");
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      }
    }
  };

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
            {/* <button className='close-btn' onClick={onClose}>X</button> */}
            </div>
            <div className='right-panel' >
              <div className='form-card' >
                <h2 style={{color: "#f3f6fd"}}>Sign Up</h2>

                <input type="text" placeholder="Enter your name" value={name} required onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="example@gmail.com" value={email} required onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Enter your password" value={password} required onChange={(e) => setPassword(e.target.value)} />
                <input type="password" placeholder="Confirm your password" value={confirmPassword} required onChange={(e) => setConfirmPassword(e.target.value)} />
                <button type="submit" onClick={registerEvent}>Register</button>
              
                <div className="or-divider">- OR -</div>
              <button onClick={linkedinLogin} style={{background: "#232949", color: "#15e0ff"}}> 
                  <img src='/linkedin.png' width={"30px"} style={{display: "inline-block",paddingRight:"10px"}}/>
                  Login with linkedin
                  </button>
              <p className="or-divider" style={{display:"inline-flex",width: "100%",justifyContent: "center", cursor:"default"}}>Already have an account? <p onClick={()=>Navigate("/login")}><strong style={{paddingLeft:"5px", cursor:"pointer"}}>Login</strong></p></p>
              </div>
              
              

            </div>
          </div>
      {toast && <Toast state={toastState} message={toastMsg} />}
    </>
  );
};

export default Register;
