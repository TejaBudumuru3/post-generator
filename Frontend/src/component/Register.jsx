import React from 'react';
import Toast from './Toast';


const Register = ({ onClose }) => {

  const URL = import.meta.env.VITE_BACKEND_URL;

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

  return (
    <>
     
        <div className='auth-section'>
          <div className="form-wrapper">
            <button className='close-btn' onClick={onClose}>X</button>
            <form className='sign-form' onSubmit={registerEvent}>
              <h2>Sign Up</h2>
              <input type="text" placeholder="Enter your name" value={name} required onChange={(e) => setName(e.target.value)} />
              <input type="email" placeholder="example@gmail.com" value={email} required onChange={(e) => setEmail(e.target.value)} />
              <input type="text" placeholder="Enter your First name" value={fname} required onChange={(e) => setFname(e.target.value)} />
              <input type="text" placeholder="Enter your Last name" value={lname} required onChange={(e) => setLname(e.target.value)} />
              <input type="password" placeholder="Enter your password" value={password} required onChange={(e) => setPassword(e.target.value)} />
              <input type="password" placeholder="Confirm your password" value={confirmPassword} required onChange={(e) => setConfirmPassword(e.target.value)} />
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      {toast && <Toast state={toastState} message={toastMsg} />}
    </>
  );
};

export default Register;
