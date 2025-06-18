import { useSelector } from 'react-redux'

const PostCarousel = () => {
    const posts = useSelector((state)=> state.posts.item)
  return (
    <>
    <div id="carouselExampleCaptions" className="carousel slide">
        <div className="carousel-inner">
            <div className="carousel-item active">
            <div className="carousel-caption d-md-block">
                <h5>{posts[0]}</h5>
                <a href={`https://x.com/compose/post?text=${encodeURIComponent(posts[0])}`} target="_blank" rel="noopener noreferrer" 
                   className="btn btn-primary rounded-pill px-4 py-2" 
                   style={{ backgroundColor: '#1DA1F2', border: 'none' }}>
                   Post on X
                </a>
            </div>
            </div>
            <div className="carousel-item">
            <div className="carousel-caption d-block" >
                <h5>{posts[1]}</h5>
                <a href={`https://x.com/compose/post?text=${encodeURIComponent(posts[1])}`} target="_blank" rel="noopener noreferrer"
                   className="btn btn-primary rounded-pill px-4 py-2"
                   style={{ backgroundColor: '#1DA1F2', border: 'none' }}>
                   Post on X
                </a>
            </div>
            </div>
            <div className="carousel-item">
            <div className="carousel-caption ">
                <h5>{posts[2]}</h5>
                <a href={`https://x.com/compose/post?text=${encodeURIComponent(posts[2])}`} target="_blank" rel="noopener noreferrer"
                   className="btn btn-primary rounded-pill px-4 py-2"
                   style={{ backgroundColor: '#1DA1F2', border: 'none' }}>
                   Post on X
                </a>
            </div>
            </div>
            <div className="carousel-item">
            <div className="carousel-caption ">
                <h5>{posts[3]}</h5>
                <a href={`https://x.com/compose/post?text=${encodeURIComponent(posts[3])}`} target="_blank" rel="noopener noreferrer"
                   className="btn btn-primary rounded-pill px-4 py-2"
                   style={{ backgroundColor: '#1DA1F2', border: 'none' }}>
                   Post on X
                </a>
            </div>
            </div>
            <div className="carousel-item">
            <div className="carousel-caption ">
                <h5>{posts[4]}</h5>
                <a href={`https://x.com/compose/post?text=${encodeURIComponent(posts[4])}`} target="_blank" rel="noopener noreferrer"
                   className="btn btn-primary rounded-pill px-4 py-2"
                   style={{ backgroundColor: '#1DA1F2', border: 'none' }}>
                   Post on X
                </a>
            </div>
            </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
        <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 5"></button>

        </div>
        </div>
    </>
  )
}

export default PostCarousel