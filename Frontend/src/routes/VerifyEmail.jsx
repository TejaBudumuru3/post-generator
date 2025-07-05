import React from 'react'
import { useState } from 'react'
import Toast from '../component/Toast'
import { useNavigate } from 'react-router-dom'

const VerifyEmail = () => {

    const navigator = useNavigate()

    const [sendOTP, setSendOTP] = useState(false)
    const [verifyOTP, setVerifyOTP] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [toast, setToast] = useState(false)
    const [toastMsg, setToastMsg] = useState(false)
    const [toastState, setToastState] = useState(false)
    const [readOnly, setReadOnly] = useState(false);
    const handleVerify = async()=>{
        console.log("verify otp")
        if(!email){
            console.log("mail emory")
            setToast(true)
            setToastMsg("enter email")
            setToastState("danger")
            setTimeout(() => {
                  setToast(false);
                }, 3000);
            return
        }
        else{
            try{
                const URL = import.meta.env.VITE_LINKEDIN_URL
                const sentOTP = await fetch(`${URL}/send-otp`,
                    {
                        method: "POST",
                        credentials: "include",
                        headers:{
                            "content-type":"application/json"
                        },
                        body: JSON.stringify({
                        email
                        })
                    });
                    const data = await sentOTP.json()
                if(sentOTP.ok){
                    setToast(true)
                    setToastMsg(data.message)
                    setToastState("success")
                    setTimeout(() => {
                        setToast(false);
                        }, 3000);
                    setSendOTP(true)
                    setVerifyOTP(true)
                    setReadOnly(true)
                    console.log(data.message)
                }
                else{
                    setToast(true)
                    setToastMsg(data.message)
                    setToastState("danger")
                    setTimeout(() => {
                        setToast(false);
                        }, 3000);

                    console.log(data.message)
                }
            }
            catch(error){
                setToast(true)
                setToastMsg(`error ${error}`)
                setToastState("danger")
                setTimeout(() => {
                    setToast(false);
                    }, 3000);
            }
            
        }
    }

    const handleOTP = async()=>{
        if(!password){
            setToast(true)
            setToastMsg("enter OTP")
            setToastState("danger")
            setTimeout(() => {
                  setToast(false);
                }, 3000);
            return
        }
        else{
            if(password.length>6){
                setToast(true)
                setToastMsg("enter valid OTP")
                setToastState("danger")
                setTimeout(() => {
                    setToast(false);
                    }, 3000);
                return
            }
            try{
                const URL = import.meta.env.VITE_LINKEDIN_URL
                const sentOTP = await fetch(`${URL}/verify-otp`,
                    {
                        method: "POST",
                        credentials: "include",
                        headers:{
                            "content-type":"application/json"
                        },
                        body: JSON.stringify({
                        email,
                        otp:password
                        })
                    });
                    const data = await sentOTP.json()
                if(sentOTP.ok){
                    setToast(true)
                    setToastMsg(data.message)
                    setToastState("success")
                    setTimeout(() => {
                        setToast(false);
                        }, 3000);
                    setSendOTP(false)
                    setVerifyOTP(false)
                    setReadOnly(false)
                    console.log(data.message)
                    setTimeout(() => {
                        navigator("/home")
                    }, 3000);
                }
                else{
                    setToast(true)
                    setToastMsg(data.message)
                    setToastState("danger")
                    setTimeout(() => {
                        setToast(false);
                        }, 3000);

                    console.log(data.message)
                }
            }
            catch(error){
                setToast(true)
                setToastMsg(`error ${error}`)
                setToastState("danger")
                setTimeout(() => {
                    setToast(false);
                    }, 3000);
            }
        }
    }
  return (
    <>
      <div className='auth-section'>
          <div className="form-logo">
          </div>
          <div className='right-panel'>
            <div className='form-card' style={{display:"flex", flexDirection:"column",justifyContent: "space-between",paddingBottom: "50vh"}}>
              <h2 style={{color: "#f3f6fd"}}>Verify User</h2>
                <div>
                    <input type="email" placeholder='example@gmail.com' onChange={(e)=> setEmail(e.target.value)} readOnly={readOnly} required/>
                    {sendOTP && (<input type="password" placeholder='Enter OTP'  onChange={(e)=> setPassword(e.target.value)} inputMode="numeric" pattern="\d{6}" maxLength="6" minLength="6" required/>)}
                    {verifyOTP ? (<button onClick={()=> handleOTP()} > Verify OTP </button>) : (<button onClick={()=>{handleVerify()}}> get OTP </button>)}
                </div>
            </div>

          </div>
          
      </div>
      {toast && <Toast message={toastMsg} state={toastState} style={{marginTop: "10px", position: "fixed", top: "10px",textAlign:"center"}}/>}
    </>
  )
}

export default VerifyEmail