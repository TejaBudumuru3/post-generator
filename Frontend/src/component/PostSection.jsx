import PostCarousel from './PostCarousel';
import { useSelector } from 'react-redux';


const PostSection = () => {

  const posts = useSelector((state)=>state.posts.item)
  if(posts === undefined || posts === null || Object.keys(posts).length === 0) {
    return (
      <>
        <p className='post-text'>No posts available</p>
      </>
    )
  }
 
  return (
    <>
    <div className="posts-corner">
      <h3 style={{color: "white"}}>Generated posts</h3>
      <PostCarousel/>
    </div>
    </>
  )
}

export default PostSection