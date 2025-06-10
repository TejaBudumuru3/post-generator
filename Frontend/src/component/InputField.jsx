import React from 'react'

const InputField = ({setPosts,userData}) => {

  const [postInput, setPostInput] = React.useState('');
  const [tone, setTone] = React.useState('');
  const handlePost = async()=>{
    
    if(postInput.trim() === '') {
      alert("Please enter a topic to post");
      return;
    }
    else{
      if(!userData || !userData.name) {
        alert("Please login to post");
        return;
      }
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
      }
    }
  }

    return (
      <div className='input-box'>
        <div className="input-wrapper">
            <input type='text' className='input-field' placeholder='Post anything' onChange={(e) =>{setPostInput(e.target.value)}}/>
            <button className='input-button' onClick={handlePost}>&uarr;</button><br/>
            <select className='input-select' onChange={ (e)=>{ setTone(e.target.value)}}>
                <option value="">Select Tone</option>
                <option value="Formal">Formal</option>
                <option value="Informal">Informal</option>
                <option value="Funny">Funny</option>
                <option value="Inspirational">Inspirational</option>
                <option value="Professional">Professional</option>
                <option value="Casual">Casual</option>
                <option value="Sarcastic">Sarcastic</option>
                <option value="Aggressive">Aggressive</option>
                <option value="Enthusiastic">Enthusiastic</option>
              </select>
        </div>
    </div>
  )
}

export default InputField