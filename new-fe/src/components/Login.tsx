import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false)
  const Navigate = useNavigate();

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

  const loginEvent = async (e: any) => {
    setButtonLoading(true)
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      toast.error("Please fill in all fields.");
      setButtonLoading(false)
      return;
    }
    else {
      if (!(email.match(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/))) {
        toast.error("Enter valid email id");
        setButtonLoading(false)
        return;
      }
      else {
        try {
          console.log(URL)
          const response = await fetch(`${URL}/signin`, {
            method: "POST",
            credentials: "include",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify({
              email,
              password
            })
          })

          const data = await response.json();

          console.log("The value is ", data)
          if (response.status === 200) {
            // const newtoken = data.token;
            // await cookieStore.set("token", newtoken)
            toast.success(data.message);
            setButtonLoading(false)
            setTimeout(() => {
              window.location.href = "/home";
            }, 2000)
          }

          if (response.status === 401) {
            toast.error(data.message);
            setButtonLoading(false)
            return;
          }

          if (response.status === 404) {
            console.log("Login failed:", data.message);
            toast.error(data.message);
            setButtonLoading(false)
            return;
          }

        } catch (e: any) {
          toast.error("Something went wrong, please try again later.");
          setButtonLoading(false)
          console.log("server error", e)
        }
      }
    }
    setButtonLoading(false)
  }

  const linkedinLogin = async (e: any) => {
    setButtonLoading(true)
    e.preventDefault();
    try {
      const URL = `${import.meta.env.VITE_LINKEDIN_URL}auth/linkedin`
      console.log(URL)
      await fetch(URL,{
        method:"GET",
        credentials:"include"
      })
      // window.location.href = URL
    } catch (error) {
      toast.error("Something went wrong, please try again later.");
      console.log("server error", error)
      setButtonLoading(false)
    }
    setButtonLoading(false)
  }



  return (
    <>
      <Toaster position="top-right" />
      <div className='flex bg-[#000610] justify-center'>
        <div className="flex-0 md:flex-6 ">
          <img src="applogo1.png" alt="logo" className="md:w-[60vw] md:h-screen md:bg-[100vw] " />
        </div>
        <div className=' md:h-screen md:flex-4 flex h-screen items-center justify-center w-9/10 md:w-8/10'>
          <div className='w-9/10 md:w-9/10 lg:w-7/10 md:h-8/10 shadow-[0_8px_32px_0_#000002e] 2xl:text-4xl rounded-2xl p-8 2xl:p-24 h-8/10 bg-[#181c2bd9] blackdrop-blur-lg'>
            <p className='text-[#f3f6fd] text-4xl 2xl:text-6xl font-bold'>Login</p>
            <div className='text-[#8b97b3] my-2 2xl:mt-4 2xl:text-3xl'>Join the infinite future</div>

            <input type="email" placeholder='example@gmail.com' onChange={(e) => setEmail(e.target.value)} required
              className='bg-[#24283af2] border-[#374151] outline-none rounded p-1 text-white w-full px-2 2xl:p-4 2xl:my-2' />
            <input type="password" placeholder='Enter you password' onChange={(e) => setPassword(e.target.value)} required
              className='bg-[#24283af2] border-[#374151] outline-none rounded p-1 text-white w-full mt-3 2xl:p-4 px-2 2xl:my-2' />
            <button type="button" onClick={loginEvent} disabled={buttonLoading}
              className={`${buttonLoading ? "bg-[#15e0ff] cursor-not-allowed": "bg-gradient-to-r from-[#15e0ff] from-40% to-[#a259f7] to-100% cursor-pointer"} hover:scale-110 hover:transition ease-in rounded text-white font-bold p-2 2xl:p-4 w-full mt-3 2xl:mt-6 `}> {buttonLoading ? "Logging in..." : "Login"} </button>

            <div className="text-[#8b97b3] text-center p-3 2xl:mt-4">- OR -</div>
            <button onClick={linkedinLogin} disabled={buttonLoading}
              className='w-full rounded bg-[#232949] text-[#15e0ff] p-2 2xl:p-4 hover:scale-110 hover:transition ease-in'>
              <img src='/linkedin.png' className='w-8 inline-block pr-2' />
              Login with linkedin
            </button>
            <p className="text-white text-center p-2 inline-flex w-full justify-center cursor-default">New User? <p onClick={() => Navigate("/register")}><strong className='pl-2 cursor-pointer'>Register</strong></p></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;
