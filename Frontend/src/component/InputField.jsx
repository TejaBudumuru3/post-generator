import React from 'react'
import Message from './Message';
import Toast from './Toast';
import { useSelector, useDispatch } from 'react-redux';
import {  setPost, clearPost } from '../slices/postSlice.js'
import { setLinkedinPost, clearLinkedinPost } from '../slices/linkedinSlice.js';
import { setImage } from '../slices/imageSlice.js';

const InputField = () => {

  const userData = useSelector((state)=>state.user.data);
  const dispatch = useDispatch();

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
                    <select className='form-select' onChange={ (e)=>{ setTone(e.target.value)}} width="100%">
                      <option value="">Select Tone</option>
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
                  </div>
                  <button className='input-button' onClick={handlePost}>&uarr;</button>
                </div>
              </div>

              <div className="input-option-container">
                <div className="input-options">
                  <div className="input-select">
                    <select className='form-select' onChange={ (e)=>{ setPlatform(e.target.value)}} width="100%">
                      <option value="">Select Platform</option>
                      <option value="X">X (twitter)</option>
                      <option value="linkedin">Linkedin</option>
                    </select>
                  </div>
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