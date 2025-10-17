import React from 'react';
import Toast from './Toast';
import { useNavigate } from 'react-router-dom';


const Register = ({onClose}:any) => {

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

  const registerEvent = async(e:any) => {
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
              Navigate("/login");
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

   const linkedinLogin = async(e:any)=>{
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
     
        <div className='flex bg-[#000610] justify-center'>
          <div className="flex-0 md:flex-6">
              <img src="applogo1.png" alt="logo" className="md:w-[60vw] md:h-screen md:bg-[100vw] "/>
            </div>
            {/* Register form */}
            <div className='md:h-screen md:flex-4 flex h-screen items-center justify-center w-9/10 md:w-8/10' >
              <div className='w-9/10 md:w-9/10 lg:w-7/10 md:h-9/10 shadow-[0_8px_32px_0_#000002e] rounded-2xl p-8 h-9/10 bg-[#181c2bd9] blackdrop-blur-lg' >
                <p  className='text-[#f3f6fd] text-4xl font-bold'>Sign Up</p>

                <input type="text" placeholder="Enter your name" value={name} required onChange={(e) => setName(e.target.value)} 
                  className='bg-[#24283af2] border-[#374151] outline-none rounded p-1 text-white w-full px-2'/>
                <input type="email" placeholder="example@gmail.com" value={email} required onChange={(e) => setEmail(e.target.value)}
                  className='bg-[#24283af2] border-[#374151] outline-none rounded p-1 text-white w-full mt-3 px-2'/>
                <input type="password" placeholder="Enter your password" value={password} required onChange={(e) => setPassword(e.target.value)} 
                  className='bg-[#24283af2] border-[#374151] outline-none rounded p-1 text-white w-full mt-3 px-2'/>
                <input type="password" placeholder="Confirm your password" value={confirmPassword} required onChange={(e) => setConfirmPassword(e.target.value)} 
                  className='bg-[#24283af2] border-[#374151] outline-none rounded p-1 text-white w-full mt-3 px-2'/>
                <button type="submit" onClick={registerEvent} 
                  className='bg-gradient-to-r from-[#15e0ff] from-40% to-[#a259f7] to-100% rounded text-white font-bold p-1 w-full mt-3'>Register</button>
              
                <div className="text-[#8b97b3] text-center p-3">- OR -</div>
              <button onClick={linkedinLogin}
                className='w-full rounded bg-[#232949] text-[#15e0ff] p-2 '>  
                  <img src='/linkedin.png' className='w-8 inline-block pr-2'/>
                  Login with linkedin
                  </button>
              <p className="text-white text-center p-2 inline-block w-full justify-center cursor-default" >Already have an account? <p onClick={()=>Navigate("/login")}><strong className='pl-2 cursor-pointer'>Login</strong></p></p>
              </div>
              
              

            </div>
          </div>
      {toast && <Toast state={toastState} message={toastMsg} />}
    </>
  );
};

export default Register;
