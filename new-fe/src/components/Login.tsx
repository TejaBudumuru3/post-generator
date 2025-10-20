import React from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const Navigate = useNavigate();

  const loginEvent = async (e: any) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      toast.error("Please fill in all fields.");
      return;
    }
    else {
      if (!(email.match(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/))) {
        toast.error("Enter valid email id");
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
            const newtoken = data.token;
            await cookieStore.set("token", newtoken)
            toast.success("Login successful!");
            setTimeout(() => {
              window.location.href = "/home";
            }, 2000)
          }

          if (response.status === 401) {
            toast.error(data.message);
            return;
          }

          if (response.status === 404) {
            console.log("Login failed:", data.message);
            toast.error(data.message);
            return;
          }

        } catch (e: any) {
          toast.error("Something went wrong, please try again later.");
          console.log("server error", e)
        }
      }
    }

  }

  const linkedinLogin = async (e: any) => {
    e.preventDefault();
    try {
      const URL = `${import.meta.env.VITE_LINKEDIN_URL}auth/linkedin`
      console.log(URL)
      window.location.href = URL
    } catch (error) {
      toast.error("Something went wrong, please try again later.");
      console.log("server error", error)
    }
  }



  return (
    <>
      <Toaster position="top-right" />
      <div className='flex bg-[#000610] justify-center'>
        <div className="flex-0 md:flex-6 ">
          <img src="applogo1.png" alt="logo" className="md:w-[60vw] md:h-screen md:bg-[100vw] " />
        </div>
        <div className=' md:h-screen md:flex-4 flex h-screen items-center justify-center w-9/10 md:w-8/10'>
          <div className='w-9/10 md:w-9/10 lg:w-7/10 md:h-8/10 shadow-[0_8px_32px_0_#000002e] rounded-2xl p-8 h-8/10 bg-[#181c2bd9] blackdrop-blur-lg'>
            <p className='text-[#f3f6fd] text-4xl font-bold'>Login</p>
            <div style={{ color: "#8b97b3", marginBottom: "1em" }}>Join the infinite future</div>

            <input type="email" placeholder='example@gmail.com' onChange={(e) => setEmail(e.target.value)} required
              className='bg-[#24283af2] border-[#374151] outline-none rounded p-1 text-white w-full px-2' />
            <input type="password" placeholder='Enter you password' onChange={(e) => setPassword(e.target.value)} required
              className='bg-[#24283af2] border-[#374151] outline-none rounded p-1 text-white w-full mt-3 px-2' />
            <button type="submit" onClick={loginEvent}
              className='bg-gradient-to-r from-[#15e0ff] from-40% to-[#a259f7] to-100% rounded text-white font-bold p-1 w-full mt-3'> Login </button>

            <div className="text-[#8b97b3] text-center p-3">- OR -</div>
            <button onClick={linkedinLogin}
              className='w-full rounded bg-[#232949] text-[#15e0ff] p-2 '>
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
