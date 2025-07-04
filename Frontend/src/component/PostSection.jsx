import PostCarousel from './PostCarousel';
import { useSelector } from 'react-redux';


const PostSection = () => {

  const posts = useSelector((state)=>state.posts.item)
  const linkedinPost = useSelector((state)=>state.linkedinPost)

  const imageUrl = useSelector((state)=>state.image)
  if((posts === undefined || posts === null || Object.keys(posts).length === 0) && (linkedinPost === null || linkedinPost === "")) {
    return (
      <>
        {/* <p className='post-text'></p> */}
        
      </>
    )
  }
  else if(linkedinPost){
    return (
      <>
        <p className='post-text'>{linkedinPost}</p>
        <img src={imageUrl} alt='generated image'/>
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