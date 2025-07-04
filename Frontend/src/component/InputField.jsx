import React, { useState } from 'react'
import Message from './Message';
import Toast from './Toast';
import { useSelector, useDispatch } from 'react-redux';
import {  setPost, clearPost } from '../slices/postSlice.js'
import { setLinkedinPost, clearLinkedinPost } from '../slices/linkedinSlice.js';
import { setImage } from '../slices/imageSlice.js';

const InputField = () => {

  const userData = useSelector((state)=>state.user.data);
  const dispatch = useDispatch();
  const [generateImage, setGenerateImage] = useState(false)
  const [postInput, setPostInput] = React.useState('');
  const [tone, setTone] = React.useState('');
  const [platform,setPlatform] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [toast, setToast] = React.useState(false);
  const [toastMsg , setToastMsg] = React.useState('');
  const [toastState, setToastState] = React.useState('');

  const handlePost = async()=>{
    setLoading(true);
    if(postInput.trim() === '') {
      setLoading(false);
      setToastMsg("Please enter topic to a post");
      setToastState("primary");
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
      return;
    }
    else{
      if(!platform) {
      setLoading(false);
      setToastMsg("Please select the platform");
      setToastState("primary");
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
      return;
      }
      if(!userData || !userData.name) {
        setLoading(false);
        setToastMsg("Please login to post");
        setToastState("danger");
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
        setLoading(false);
        return;
      }
      try {
        if(platform === "X"){
          console.log("X triggered")
          const URL = import.meta.env.VITE_BACKEND_URL;
          const PostResponse = await fetch(`${URL}/GenerateData`,{
            method:"POST",
            credentials:"include",
            headers:{
              "content-type":"application/json"
            },
            body: JSON.stringify({
              question: postInput,
              tone: tone,
            })
          });

          const postData = await PostResponse.json();
          if(PostResponse.ok){
            const totalPosts = postData.ans.split("~")
            dispatch(clearLinkedinPost())
            dispatch(setPost(totalPosts));
            setLoading(false);
            return;
          }
        }
        else if(platform === "linkedin"){
          console.log("linked triggered")
          console.log(generateImage,"Image generation")
          const URL = import.meta.env.VITE_LINKEDIN_URL;
          const PostResponse = await fetch(`${URL}generate-post`,{
            method:"POST",
            credentials:"include",
            headers:{
              "content-type":"application/json"
            },
            body: JSON.stringify({
              question: postInput,
              tone: tone,
              generateImage: generateImage
            })
          });

          const postData = await PostResponse.json();
          if(PostResponse.ok){
            const totalPost = postData.postText
            const imageURL = postData.imageDataUrl
            console.log(totalPost)
            console.log(imageURL)
            dispatch(clearPost())
            dispatch(setLinkedinPost(totalPost));
            dispatch(setImage(imageURL))
            setLoading(false);
            return;
          }
        }
      } catch (error) {
        setLoading(false);
        setToastMsg("Sometime went wrong");
        setToastState("danger");
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
        return;
      }
      
    }
  }

    return (
      <>
        <div className='input-box'>
          <div className="input-wrapper">
              <div className='input-text-container'>
                <input type='text' className='input-field' placeholder='Post anything' onChange={(e) =>{setPostInput(e.target.value)}}/>
                {/* <hr/> */}
              </div>
              <div className="input-option-container">
                <div className="input-options">
                  <div className="input-select">
                    <select className='form-select' onChange={ (e)=>{ setTone(e.target.value)}} style={{width:"auto"}}>
                      <option value="">Tone</option>
                      <option value="Formal">Formal</option>
                      <option value="Informal">Informal</option>
                      <option value="Funny">Funny</option>
                      <option value="Inspirational">Inspirational</option>
                      <option value="Professional">Professional</option>
                      <option value="Casual">Casual</option>
                      <option value="Sarcastic">Sarcastic</option>
                      <option value="Aggressive">Aggressive</option>
                      <option value="sympthetical">sympthetical</option>
                      <option value="Enthusiastic">Enthusiastic</option>
                    </select>

                      <div className="platform-selection" style={{ display: "flex", alignItems: "center" }}>
                        <label className={`radio-btn-label ${platform === "X" ? "selected" : ""}`}>
                          <input
                            type="radio"
                            name="platform"
                            value="X"
                            checked={platform === "X"}
                            onChange={() => setPlatform("X")}
                          />
                          <img src="/x.png" alt="X" />
                        </label>
                        <label className={`radio-btn-label ${platform === "linkedin" ? "selected" : ""}`}>
                          <input
                            type="radio"
                            name="platform"
                            value="linkedin"
                            checked={platform === "linkedin"}
                            onChange={() => setPlatform("linkedin") }
                          />
                          <img src="/linkedin.png" alt="LinkedIn" />
                        </label>

                        {platform==="linkedin" && (<div className="toggle-title">
                          <label className="switch" style={{ display: "flex", marginRight: "10px" }}>
                            <input type="checkbox" id="toggleSwitch" checked={generateImage} onChange={(e)=>setGenerateImage(e.target.checked)} />
                            <span className="slider"></span>
                          </label>
                          <p style={{ color: "whitesmoke", paddingRight: "1px", display:"contents" }}>
                            <svg style={{width:"40px",height:"40px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                              <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clip-rule="evenodd" />
                            </svg>
                          </p>
                        </div>)}
                    </div>

                    {/* <div className="platform-selection" style={{display: "flex",alignItems:"center"}}>
                      <button className='X-btn' onClick={()=>setPlatform("X")} 
                      style={{
                              
                              pointerEvents: platform === "linkedin" ? "none" : "auto",
                              opacity: platform === "linkedin" ? 0.5 : 1,
                              marginRight: "10px"
                            }}><img src='/x.png'/></button>
                      <button className='Linkedin-btn' onClick={()=>setPlatform("linkedin")}><img src='/linkedin.png'/></button>
                      <div className="toggle-title">
                        <label class="switch" style={{display:"flex",marginRight:"10px"}}>
                          <input type="checkbox" id="toggleSwitch"/>
                          <span class="slider"></span>
                        </label>
                        <p style={{color:"whitesmoke",paddingRight:"1px",display:"contents"}}>Image generation</p>
                      </div>
                    </div> */}
                  </div>
                  <button className='input-button' onClick={()=>handlePost()}>&uarr;</button>
              </div>
            </div>
          </div>
        </div>
        {loading && <Message />}
        {toast && <Toast state={toastState} message={toastMsg} />}
        
    </>
  )
}

export default InputField