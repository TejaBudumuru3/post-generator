const Background=()=>{
    const [dots, setDots] = useState([]);

    useEffect(()=>{
        const newDots = Array.from({length:30}).map(()=>({
            top:`${Math.random() *100}%`,
            left:`${Math.random() *100}%`,

            size:'5px',

            animationDuration: `${Math.random() * 5 + 5}s`,
            animationDelay: `${Math.random() * 5}s`,
        }))
        setDots(newDots)
    },[])
    return(
        <div className=" top-0 left-0 w-full h-full z-100 overflow-hidden">
        {dots.map((dot, i) => (
        <div
          key={i}
          className="absolute bg-[#36b6ea] rounded-full animate-fadeInOut animate-ping "
          style={{
            top: dot.top,
            left: dot.left,
            width: dot.size,
            height: dot.size,
            animationDuration: dot.animationDuration,
            animationDelay: dot.animationDelay,
            animationIterationCount: 'infinite',
          }}
        />
        ))}
        <style>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.8; }
        }
        .animate-fadeInOut {
          animation-name: fadeInOut;
        }
      `}</style>
        </div>
        
    )
}

import React, { useEffect, useState } from 'react';

const Features = () => {
    const [cube, setCube] = useState(false);
    const [slide, setSlide] = useState(false);
    const [image, setImage] = useState(false)
    const [tone, setTone] = useState(false);

  return (
    <>
      {/* --- MODAL / DETAIL VIEW --- */}
      <div className={`${cube ? '': 'hidden'} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                      w-[95%]  max-w-[90%] 
                      bg-black flex w- flex-col md:flex-col lg:flex-row lg:w-[90%]
                      gap-5 p-5 border-1 border-[#36b6ea] rounded-lg shadow-lg z-20`}
                      onMouseEnter={()=>setCube(true)}
                      onMouseLeave={()=>setCube(false)}>
        
        <img src='cube.png' alt='cube' className='w-full  lg:w-80 h-auto rounded flex-shrink-0'/>

        <div className='text-white'>
          {/* Responsive Text: Larger on bigger screens */}
          <p className='text-2xl md:text-3xl lg:text-4xl font-bold'>AI-Powered Content</p>
          <p className='mt-4 text-gray-300 text-sm md:text-base'>
            Stuck trying to think of what to post? Let our creative AI do the heavy lifting. Whether you need a quick, catchy tweet for X or a more detailed, professional post for LinkedIn, our tool has you covered. Just give it a single word or a simple topic, and watch as it instantly generates content tailored to your needs. Get a choice of five snappy tweets or one comprehensive, well-structured post perfect for a professional audience. It’s the easiest way to keep all your social media feeds fresh and engaging.
          </p>
        </div>
      </div>

      <div className={`${tone ? '': 'hidden'} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                      w-[95%]  max-w-[90%]  /* Responsive width with a max size */
                      bg-black flex w- flex-col md:flex-col lg:flex-row lg:w-[90%]  /* Stacks on mobile, side-by-side on desktop */
                      gap-5 p-5 border-1 border-[#36b6ea] rounded-lg shadow-lg z-20`}
                      onMouseEnter={()=>{setTone(true)}}
                      onMouseLeave={()=>{setTone(false)}}>
        
        {/* Responsive Image: Full width on mobile, fixed width on larger screens */}
        <img src='tones.png' alt='tones' className='w-full  lg:w-128 h-auto rounded '/>

        <div className='text-white'>
          {/* Responsive Text: Larger on bigger screens */}
          <p className='text-2xl md:text-3xl lg:text-4xl font-bold'>Fine-Tune Your Voice</p>
          <p className='mt-4 text-gray-300 text-sm md:text-base'>
            Make sure every post perfectly matches your unique style. With our Tone Selection feature, you have complete control over the voice of your content. Simply choose from a variety of tones—like professional, casual, or even funny—before you generate. Our AI will then craft every word to reflect your chosen style, ensuring the message not only looks like it came from you, but sounds like it too. It’s the perfect way to ensure your content is always authentic.          </p>
        </div>
      </div>

      <div onMouseEnter={()=>setSlide(true)} onMouseLeave={()=>setSlide(false)}
        className={`${slide ? '' : 'hidden'} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                      w-[95%]  max-w-[90%]  /* Responsive width with a max size */
                      bg-black flex w- flex-col md:flex-col lg:flex-row lg:w-[90%]  /* Stacks on mobile, side-by-side on desktop */
                      gap-5 p-5 border-1 border-[#36b6ea] rounded-lg shadow-lg z-20`}>
        
        {/* Responsive Image: Full width on mobile, fixed width on larger screens */}
        <img src='slides.png' alt='slides' className='w-full  lg:w-128 h-auto rounded '/>

        <div className='text-white'>
          {/* Responsive Text: Larger on bigger screens */}
          <p className='text-2xl md:text-3xl lg:text-4xl font-bold'>Dynamic Carousel View</p>
          <p className='mt-4 text-gray-300 text-sm md:text-base'>
            Showcase your posts in a sleek, interactive carousel. This feature allows you to display multiple generated posts in a single, compact space. Users can easily swipe or click through your content, making it perfect for showcasing a series of related ideas or different versions of a post. It's fully responsive and designed to look great on any device, providing a clean and engaging way to present your AI-generated content.
          </p>
        </div>
      </div>

      <div className={`${image ? '': 'hidden'} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                      w-[95%]  max-w-[90%]  /* Responsive width with a max size */
                      bg-black flex w- flex-col md:flex-col lg:flex-row lg:w-[90%]  /* Stacks on mobile, side-by-side on desktop */
                      gap-5 p-5 border-1 border-[#36b6ea] rounded-lg shadow-lg z-20`}
                      onMouseEnter={()=>setImage(true)} 
                      onMouseLeave={()=>setImage(false)}>
        
        {/* Responsive Image: Full width on mobile, fixed width on larger screens */}
        <img src='image_feature.png' alt='image_feature' className='w-full  lg:w-128 h-auto rounded '/>

        <div className='text-white'>
          {/* Responsive Text: Larger on bigger screens */}
          <p className='text-2xl md:text-3xl lg:text-4xl font-bold'>Instant Image Generation</p>
          <p className='mt-4 text-gray-300 text-sm md:text-base'>
            Bring your ideas to life with stunning visuals. Our AI Image Generation feature transforms your text prompts into unique, high-quality images in seconds. Whether you need a custom graphic for a blog post, an eye-catching background for a quote, or a creative illustration to share, simply describe what you want and let our AI create it for you. Stop searching for stock photos and start creating original visuals that make your content stand out.
          </p>
        </div>
      </div>
      {/* We need to add custom CSS keyframes for the animation. */}
      
        <Background/>
      {/* --- MAIN FEATURES GRID --- */}
      <div className='w-full min-h-screen flex flex-col gap-4 bg-black p-4 md:p-8'>
        
        <p className='text-3xl md:text-4xl lg:text-5xl text-white font-bold text-center'>KEY FEATURES</p>
        
        {/* Responsive Grid: 1 column on mobile, 2 on medium screens and up */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

          {/* Card 1 */}
          <div className='bg-black text-center p-4 flex flex-col border-3 border-[#36b6ea]/50 border-y-[#36b6ea] rounded
                           transition duration-300 ease-in-out hover:scale-105 hover:border-[#36b6ea] hover:z-10 hover:cursor-pointer'
                           onMouseEnter={()=>setCube(true)}
                           onMouseLeave={()=>setCube(false)}>
            <div className='flex gap-2 justify-center items-center mb-2'>
              <p className='text-white text-lg sm:text-xl lg:text-2xl'>AI-POWERED</p>
              <p className='text-[#36b6ea] text-lg sm:text-xl lg:text-2xl'>//</p>
              <p className='text-white text-lg sm:text-xl lg:text-2xl'>CONTENT</p>
            </div>
            <img src='cube.png' alt='cube' className='w-3/4 max-w-xs mx-auto object-contain'/>
          </div>

          {/* Card 2 */}
          <div className='bg-black text-center p-4 flex flex-col border-3 border-[#36b6ea]/50 border-y-[#36b6ea] rounded
                           transition duration-300 ease-in-out hover:scale-105 hover:border-[#36b6ea] hover:z-10 hover:cursor-pointer'
                           onMouseEnter={()=>{setTone(true)}}
                           onMouseLeave={()=>{setTone(false)}}>
            <div className='flex gap-2 justify-center items-center mb-2'>
              <p className='text-white text-lg sm:text-xl lg:text-2xl'>TONE</p>
              <p className='text-[#36b6ea] text-lg sm:text-xl lg:text-2xl'>//</p>
              <p className='text-white text-lg sm:text-xl lg:text-2xl'>SELECTION</p>
            </div>
            <img src="tones.png" alt='tones' className='w-full h-full object-cover rounded'/>
          </div>

          {/* Card 3 */}
          <div className='bg-black text-center p-4 flex flex-col border-3 border-[#36b6ea]/50 border-y-[#36b6ea] rounded
                           transition duration-300 ease-in-out hover:scale-105 hover:border-[#36b6ea] hover:z-10 hover:cursor-pointer'
                           onMouseEnter={()=>setSlide(true)}
                           onMouseLeave={()=>setSlide(false)}>
            <div className='flex gap-2 justify-center items-center mb-2'>
              {/* Responsive title text */}
              <p className='text-white text-lg sm:text-xl lg:text-2xl'>CAROUSEL</p>
              <p className='text-[#36b6ea] text-lg sm:text-xl lg:text-2xl'>//</p>
              <p className='text-white text-lg sm:text-xl lg:text-2xl'>VIEW</p>
            </div>
            <img src="slides.png" alt='slides' className='w-full h-full object-cover rounded' />
          </div>

          {/* Card 4 */}
          <div className='bg-black text-center p-4 flex flex-col border-3 border-[#36b6ea]/50 border-y-[#36b6ea] rounded
                           transition duration-300 ease-in-out hover:scale-105 hover:border-[#36b6ea] hover:z-10 hover:cursor-pointer'
                           onMouseEnter={()=>setImage(true)} 
                           onMouseLeave={()=>setImage(false)}>
            <div className='flex gap-2 justify-center items-center mb-2'>
              <p className='text-white text-lg sm:text-xl lg:text-2xl'>IMAGE</p>
              <p className='text-[#36b6ea] text-lg sm:text-xl lg:text-2xl'>//</p>
              <p className='text-white text-lg sm:text-xl lg:text-2xl'>GENERATION</p>
            </div>
            <img src="image_feature.png" alt='tones' className='w-3/4 max-w-xs mx-auto object-contain'/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
