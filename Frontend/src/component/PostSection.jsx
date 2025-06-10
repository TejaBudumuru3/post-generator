import React from 'react'


const PostSection = ({posts}) => {
  if(posts === undefined || posts === null || Object.keys(posts).length === 0) {
    return (
      <>
        <p className='post-text'>No posts available</p>
      </>
    )
  }
  else{
    console.log("posts from PostSection", posts);
  }
  return (
    <>
    <p className='post-text'>{posts}</p>
    </>
  )
}

export default PostSection