import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Register = () => {

  const URL = import.meta.env.VITE_BACKEND_URL;
  const Navigate = useNavigate();

  const [buttonLoading, setButtonLoading] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fname,setFname] = useState("");
  const [lname,setLname] = useState("");

    useEffect(()=>{
    async function getCookie() {
      
     const cookie = await cookieStore.get("token")
     console.log("cookie from login: ",cookie);
     
     if(cookie){
      toast.error("Already your are logged in")
      setTimeout(() => {
        Navigate('/home')
      }, 1000);
     }
    }
    getCookie()
  },[])

  const registerEvent = async(e:any) => {
    e.preventDefault(); 
    setButtonLoading(true)
    if(!email || !password || !name || !confirmPassword){
      toast.error("Fill the details");
      setButtonLoading(false)
      return
    }
    setFname(name.split(" ")[0])
    setLname(name.split(" ")[1])
    if(password.length<8){
      toast.error("Password must contains 8 characters");
      setButtonLoading(false)
      return
    }
    else if(!(email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/))){
      toast.error("Enter valid email id");
      setButtonLoading(false)
      return
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
            toast.success(data.message || "Registration successful! Please log in.");
            setButtonLoading(true)
            setTimeout(() => { 
              Navigate("/login");
            }, 3000);
            
          }
          else {
            console.log(data.message);
            setButtonLoading(false)
            toast.error(data.message);
            return;
          }
        } catch (error) {
          console.log("Error during registration:", error);
          setButtonLoading(false)
          toast.error("An error occurred during registration. Please try again.");
          setTimeout(() => {
          }, 2000);
        }

      }
      else{
        toast.error("Passwords do not match");
        setButtonLoading(false)
      }
    }
  };

   const linkedinLogin = async(e:any)=>{
      e.preventDefault();
      setButtonLoading(true)
      try {
        const URL = `${import.meta.env.VITE_LINKEDIN_URL}auth/linkedin`
        console.log(URL)

        window.location.href = URL
      } catch (error) {
        toast.error("Something went wrong, please try again later.");
        console.log("server error",e)
      }
      setButtonLoading(false)
    }

  return (
    <>
      <Toaster position="top-right" />
        <div className='flex bg-[#000610] justify-center'>
          <div className="flex-0 md:flex-6">
              <img src="applogo1.png" alt="logo" className="md:w-[60vw] md:h-screen md:bg-[100vw] "/>
            </div>
            {/* Register form */}
            <div className='md:h-screen md:flex-4 flex h-screen items-center justify-center w-9/10 md:w-8/10' >
              <div className='w-9/10 md:w-9/10 lg:w-7/10 md:h-9/10 shadow-[0_8px_32px_0_#000002e] 2xl:text-4xl rounded-2xl 2xl:p-14 p-8 h-9/10 bg-[#181c2bd9] blackdrop-blur-lg' >
                <p  className='text-[#f3f6fd] text-4xl font-bold pb-2 2xl:text-6xl'>Sign Up</p>

                <input type="text" placeholder="Enter your name" value={name} required onChange={(e) => setName(e.target.value)} 
                  className='bg-[#24283af2] border-[#374151] outline-none rounded p-1 2xl:p-4 text-white w-full px-2 xl:mt-2 2xl:mt-10'/>
                <input type="email" placeholder="example@gmail.com" value={email} required onChange={(e) => setEmail(e.target.value)}
                  className='bg-[#24283af2] border-[#374151] outline-none rounded p-1 2xl:p-4 text-white w-full mt-3 2xl:mt-6 px-2'/>
                <input type="password" placeholder="Enter your password" value={password} required onChange={(e) => setPassword(e.target.value)} 
                  className='bg-[#24283af2] border-[#374151] outline-none rounded p-1 2xl:p-4 text-white w-full mt-3 2xl:mt-6 px-2'/>
                <input type="password" placeholder="Confirm your password" value={confirmPassword} required onChange={(e) => setConfirmPassword(e.target.value)} 
                  className='bg-[#24283af2] border-[#374151] outline-none rounded p-1 2xl:p-4 text-white w-full mt-3 2xl:mt-6 px-2'/>
                <button type="submit" onClick={registerEvent} 
                  className={`${buttonLoading ? "bg-[#15e0ff] cursor-not-allowed": "bg-gradient-to-r from-[#15e0ff] from-40% to-[#a259f7] to-100% cursor-pointer"} rounded hover:scale-110 hover:transition ease-in text-white font-bold p-1 2xl:p-4 w-full 2xl:mt-6 mt-3`}>{buttonLoading ? "Registering..." : "Register"}</button>
              
                <div className="text-[#8b97b3] text-center p-3">- OR -</div>
              <button onClick={linkedinLogin}
                className='w-full rounded bg-[#232949] text-[#15e0ff] p-2 2xl:p-4 hover:scale-110 hover:transition ease-in'>  
                  <img src='/linkedin.png' className='w-8 inline-block pr-2'/>
                  Login with linkedin
                  </button>
              <p className="text-white text-center p-2 inline-block w-full justify-center cursor-default" >Already have an account? <p onClick={()=>Navigate("/login")}><strong className='pl-2 cursor-pointer'>Login</strong></p></p>
              </div>
              
              

            </div>
          </div>
      {/* {toast && <Toast state={toastState} message={toastMsg} />} */}
    </>
  );
};

export default Register;
