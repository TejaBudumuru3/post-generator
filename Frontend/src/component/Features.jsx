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

import React, { Children, useEffect, useRef, useState } from 'react';

const useInView = (options)=>{
    const ref = useRef(null)
    const [isInView, setIsInView] = useState(false);

    useEffect(()=>{
      const observer = new IntersectionObserver(([entry])=>{
        setIsInView(entry.isIntersecting);
      },options);

      if (ref.current){
        observer.observe(ref.current)
      }

      return ()=>{
        if(ref.current)
          observer.unobserve(ref.current)
      }
    },[options,ref])

    return [ref, isInView]
}

const AnimateSection = ({children})=>{
  const [ref, isInView] = useInView({
    thresold:0.4,
  })

  return(
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0 scale-90' : 'opacity-0 translate-y-10 scale-80'}`} >
        {children}
    </div>
  )
}

const Features = () => {


  return (
    <>
      {/* --- CAROUSEL VIEW FEATURE --- */}
      {/* <div onMouseEnter={()=>setSlide(true)} onMouseLeave={()=>setSlide(false)}
        className={`${slide ? '' : 'hidden'} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                      w-[95%]  max-w-[90%] 
                      bg-black flex w- flex-col md:flex-col lg:flex-row lg:w-[90%] 
                      gap-5 p-5 border-1 border-[#36b6ea] rounded-lg shadow-lg z-20`}>
        
        <img src='slides.png' alt='slides' className='w-full  lg:w-128 h-auto rounded '/>

        <div className='text-white'>
          <p className='text-2xl md:text-3xl lg:text-4xl font-bold'>Dynamic Carousel View</p>
          <p className='mt-4 text-gray-300 text-sm md:text-base'>
            Showcase your posts in a sleek, interactive carousel. This feature allows you to display multiple generated posts in a single, compact space. Users can easily swipe or click through your content, making it perfect for showcasing a series of related ideas or different versions of a post. It's fully responsive and designed to look great on any device, providing a clean and engaging way to present your AI-generated content.
          </p>
        </div>
      </div> */}

      
      <Background/>
      <div className='w-full min-h-screen flex flex-col gap-4 bg-black p-4 md:p-8'>
        
        <p className='text-3xl md:text-4xl lg:text-5xl text-white font-bold text-center'>KEY FEATURES</p>

        <div className='grid grid-cols-1 md:grid-rows-3 gap-10'>

          <AnimateSection>
          <div className='border-1 border-y-[#36b6ea] border-x-[#36b6ea]/50 shadow-white/10 shadow-2xl backdrop-grayscale rounded-4xl hover:scale-110 hover:duration-700 cursor-default p-15 flex-col flex lg:flex-row lg:items-center gap-5 bg-gray-900'>

            <div className='text-white'>
              {/* Responsive Text: Larger on bigger screens */}
              <p className='text-2xl md:text-3xl lg:text-4xl font-bold text-center'>AI-Powered Content</p>
              <p className='mt-4 text-gray-300 text-sm md:text-base text-white/60'>
                Stuck trying to think of what to post? Let our creative AI do the heavy lifting. Whether you need a quick, catchy tweet for X or a more detailed, professional post for LinkedIn, our tool has you covered. Just give it a single word or a simple topic, and watch as it instantly generates content tailored to your needs. Get a choice of five snappy tweets or one comprehensive, well-structured post perfect for a professional audience. It’s the easiest way to keep all your social media feeds fresh and engaging.
              </p>
            </div>
            <img src='cube.png' alt='cube' className='w-full lg:w-90 lg:h-[90%] h-auto rounded-2xl shadow-[#36b6ea]/50 shadow-2xl  '/>

          </div>
          </AnimateSection>

          <AnimateSection>
          <div className='border-1 border-y-[#36b6ea] border-x-[#36b6ea]/50 shadow-white/10 shadow-2xl rounded-4xl p-15 flex-col hover:scale-110 hover:duration-700 cursor-default flex lg:flex-row lg:items-center gap-5 bg-gray-900 overflow-hidden'>
            <div className='text-white'>
              {/* Responsive Text: Larger on bigger screens */}
              <p className='text-2xl md:text-3xl lg:text-4xl text-center font-bold'>Fine-Tune Your Voice</p>
              <p className='mt-4 text-gray-300 text-sm md:text-base text-white/60'>
                Make sure every post perfectly matches your unique style. With our Tone Selection feature, you have complete control over the voice of your content. Simply choose from a variety of tones—like professional, casual, or even funny—before you generate. Our AI will then craft every word to reflect your chosen style, ensuring the message not only looks like it came from you, but sounds like it too. It’s the perfect way to ensure your content is always authentic.          </p>
            </div>
            {/* <div className='w-[100%] flex-shrink-0 self-center h-64 overflow-hidden'>
              <img src='tones.png' alt='tones' className='w-full lg:w-full h-full rounded-2xl shadow-[#36b6ea]/50 shadow-2xl object-fill object-center'/>
            </div> */}
            <img src='tones.png' alt='cube' className='w-full lg:w-90 lg:h-[90%] h-auto rounded-2xl shadow-[#36b6ea]/50 shadow-2xl  '/>

          </div>
          </AnimateSection>

          <AnimateSection>
          <div className='border-1 border-y-[#36b6ea] border-x-[#36b6ea]/50 shadow-white/10 shadow-2xl rounded-4xl p-15 hover:scale-110 hover:duration-700 cursor-default flex-col flex lg:flex-row lg:items-center gap-5 bg-gray-900'>
            <div className='text-white'>
              {/* Responsive Text: Larger on bigger screens */}
              <p className='text-2xl md:text-3xl lg:text-4xl text-center font-bold'>Instant Image Generation</p>
              <p className='mt-4 text-gray-300 text-sm md:text-base text-white/60'>
                Bring your ideas to life with stunning visuals. Our AI Image Generation feature transforms your text prompts into unique, high-quality images in seconds. Whether you need a custom graphic for a blog post, an eye-catching background for a quote, or a creative illustration to share, simply describe what you want and let our AI create it for you. Stop searching for stock photos and start creating original visuals that make your content stand out.
              </p>

            </div>
            <img src='image_feature.png' alt='image_feature' className='w-full lg:w-90 lg:h-[90%] h-auto rounded-2xl shadow-[#36b6ea]/50 shadow-2xl '/>
          </div> 
          </AnimateSection>

        </div>
      </div>
    </>
  );
};

export default Features;
