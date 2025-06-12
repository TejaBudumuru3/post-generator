import React from 'react'
import Message from './Message';
import Toast from './Toast';

const InputField = ({setPosts,userData}) => {

  const [postInput, setPostInput] = React.useState('');
  const [tone, setTone] = React.useState('');
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
        const URL = "http://localhost:3000/user/GenerateData";
        const PostResponse = await fetch(URL,{
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
          console.log(postData.ans);
          setPosts(postData.ans);
          setLoading(false);
          return;
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
              <input type='text' className='input-field' placeholder='Post anything' onChange={(e) =>{setPostInput(e.target.value)}}/>
              <button className='input-button' onClick={handlePost}>&uarr;</button>
            </div>
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
        </div>
        {loading && <Message />}
        {toast && <Toast state={toastState} message={toastMsg} />}
        
    </>
  )
}

export default InputField