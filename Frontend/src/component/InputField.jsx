import React from 'react'

const InputField = ({setPosts,userData}) => {

  const [postInput, setPostInput] = React.useState('');
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
          question: postInput
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
            <button className='input-button' onClick={handlePost}>&uarr;</button>
        </div>
    </div>
  )
}

export default InputField