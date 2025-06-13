import React from 'react'
import PostCarousel from './PostCarousel';


const PostSection = ({posts}) => {
  let TotalPosts =[];
  if(posts === undefined || posts === null || Object.keys(posts).length === 0) {
    return (
      <>
        <p className='post-text'>No posts available</p>
      </>
    )
  }
  else{
    console.log(posts)
    TotalPosts = posts.split("~");
    console.log(TotalPosts)
  }
  return (
    <>
    <div className="posts-corner">
      <h3 style={{color: "white"}}>Generated posts</h3>
      <PostCarousel posts = {TotalPosts}/>
    </div>
    </>
  )
}

export default PostSection