import React, { useState } from "react"

const Posts = ({tone = "casual", img=null, post="", platform = "image based", posts = ["Labore, perspiciatis ea! Optio nesciunt, ratione quia dolore, sequi excepturi vel, quam officiis aspernatur iure cupiditate ullam fugiat! Quasi voluptatem iusto minima", "Labore, perspiciatis ea! Optio nesciunt, ratione quia dolore, sequi excepturi vel, quam officiis aspernatur iure cupiditate ullam fugiat! Quasi voluptatem iusto minima", "Labore, perspiciatis ea! Optio nesciunt, ratione quia dolore, sequi excepturi vel, quam officiis aspernatur iure cupiditate ullam fugiat! Quasi voluptatem iusto minima","4","5"]}) => {
    const [activePost, setActivePost] = useState(0)
    const minDistance = 50
    const [touchStart, setTouchStart] = useState<number | null>(null)
    const [touchEnd, setTouchEnd] = useState<number | null>(null)


    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) =>{
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const handleDownload = () =>{
        if(!img) return
        const link = document.createElement("a");
        link.href = (img)
        link.download = `ainifinty-download-${Date.now()}`
        document.body.appendChild(link); // Required for Firefox
        link.click();
        document.body.removeChild(link)
    }

    const handleTouchEnd = ()=>{
        if( !touchEnd || !touchStart) return;
        const distance = touchStart - touchEnd
        const leftSwipe = distance > minDistance;
        const rightSwipe = distance < minDistance;

        if(leftSwipe){
            ToNext()
        }
        if(rightSwipe) ToPrev()

    }

    const ToNext = ()=>{
        const isLastSlide = activePost === posts.length-1;
        const index = isLastSlide ? 0 : activePost + 1;
        setActivePost(index)
    }

    const ToPrev = ()=>{
        const isFirstSlide = activePost === 0;
        const index = isFirstSlide ? posts.length - 1 : activePost - 1 
        setActivePost(index)
    }
  return (
    <>
        <div className=" w-full">
            <div className="border rounded-3xl bg-[#323232]/50 p-6 text-lg backdrop-blur-sm">
                <div className="flex flex-col lg:flex-row  p-6 w-full justify-between">
                    <div className="flex gap-3 py-2 place-self-center">
                        <p>{platform}</p>
                        <p>| {tone}</p>
                    </div>
                    {(platform !== "X") &&

                    (
                        platform.includes("image") ? 
                        (<button className="border border-[#00e5ff]/20 text-white px-6 py-2 cursor-pointer rounded-full bg-[#00e5ff]/70 hover:bg-[#00e5ff]/50" onClick={handleDownload}>Download image</button>)
                        : (<a href={`https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(encodeURIComponent(post))}`} target="_blank" className="border border-[#00e5ff]/20 text-white px-6 py-2 cursor-pointer rounded-full bg-[#00e5ff]/70 hover:bg-[#00e5ff]/50">Post on Linkedin</a>)
                    )  
                    }

                </div>
                <div className="p-6 shadow-[0_0px_5px_1px_inset_#00e5ff] border border-[#00e5ff]/20 rounded-lg">
                {platform === "X" ? (
                    <div id="indicators-carousel" className="relative w-full" data-carousel="static">
                        {/* <!-- Car ousel wrapper --> */}
                        <div className="relative overflow-hidden rounded-lg min-h-150 md:min-h-100" 
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                            onTouchMove={handleTouchMove}>
                            {/* <!-- Item 1 --> */}
                            {posts.map((post, index)=>(
                                <div className={`${activePost === index ? "opacity-100" : "opacity-0"} duration-700 sm:w-full  ease-in-out flex flex-col justify-between`} data-carousel-item={index === 0 ? "active" : ""}>
                                    <p className="absolute block -translate-x-1/2 w-full lg:w-[75%] -translate-y-1/2 top-1/2 left-1/2 text-white">{post}</p>
                                    <div className=" w-full text-center absolute bottom-12">
                                        <a href={`https://x.com/compose/post?text=${encodeURIComponent(post)}`} target="_blank"
                                            className="border border-[#00e5ff]/20 text-white px-6 py-2 cursor-pointer rounded-full bg-[#00e5ff]/70 hover:bg-[#00e5ff]/50">
                                            Post on X
                                        </a>
                                    </div>
                                </div>
                            ))}

                        </div>
                        {/* <!-- Slider indicators --> */}
                        <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
                            {posts.map((_, index) => (
                                <button 
                                    key={index} type="button" 
                                    className={`w-3 h-3 rounded-full ${activePost === index ? 'bg-white' : 'bg-white/30'}`} 
                                    onClick={() => setActivePost(index)} // This makes the dots clickable too
                                ></button>
                            ))}
                        </div>
                        {/* <!-- Slider controls --> */}
                        <button type="button" onClick={ToPrev} className="hidden lg:block absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                                </svg>
                                <span className="sr-only">Previous</span>
                            </span>
                        </button>
                        <button type="button" onClick={ToNext} className="hidden lg:block absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                                </svg>
                                <span className="sr-only">Next</span>
                            </span>
                        </button>
                    </div>
                ) : (
                    (platform === "Linkedin") ? (
                    <p>{post}</p>
                    ) : (
                        <div className="place-self-center">
                            <img src={img ? img : "https://pbs.twimg.com/media/G3hr0RUWwAAXa6v?format=jpg&name=medium"} alt="generated post" className="h-120"/>
                        </div>
                    )
                    
                )} 
                </div>

            


            </div>
        </div>
    </>
  )
}

export default Posts