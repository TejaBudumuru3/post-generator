import PostCarousel from './PostCarousel';
import { useSelector } from 'react-redux';


const PostSection = () => {

  const posts = useSelector((state)=>state.posts.item)
  const linkedinPost = useSelector((state)=>state.linkedinPost)
  const img = useSelector((state)=>state.imgAvail)
  const imageUrl = useSelector((state)=>state.image)
  if(posts) {
    return (
      <>
    <div className="posts-corner">
      <h3 style={{color: "white"}}>Generated posts</h3>
      <PostCarousel/>
    </div>
    </>
    )
  }
  else if(linkedinPost){
    return (
      <>
        <p className='post-text'>{linkedinPost}</p>
        {img && (<img src={imageUrl} alt='generated image'/>)}
        
      </>
    )
  }
}

export default PostSection