const Hero = () => {
  return (
    // <div className="flex flex-col w-screen h-screen">
    //   <div className="flex-1 bg-white mt-12 mx-24">
    //     <p className="text-6xl "> [PROMPT /TO /IMPACT]</p>
    //     <p className="text-3xl">AI POWERED /CONTENT GENREATION </p>
    //   </div>
    //   <div className="flex-1   ">
    //     <img className="mx-96" src="/pro.png" alt="Failed to load" width={800} />
    //     <p className="justify-start text-4xl mx-24"> This is the second secoin </p>
      
    //   </div>
    //   <div className="flex-1 mx-24">
    //       <button className="mx-4 border-b-orange-800 bg-red-50">
    //       Join Community
    //     </button>
    //     <button className="mx-4 p-2 border-black bg-red-50">
    //       {" Get started"}
    //     </button>
    //   </div>
    // </div>
    <div className="w-full h-screen bg-black flex items-end md:items-center lg:items-end flex-col">
      <div className=" w-full h-32  px-2 flex-0 text-center text-white pt-3 ">
      <p className="text-xl md:text-4xl md:text-left px-3">[PROMPT /TO /IMPACT]</p>
      <p className="text-lg md:text-2xl md:text-left px-3">AI POWERED /CONTENT GENREATION </p>
      </div>
      <div className="flex-0  w-full h-6/10 md:w-7/10 md:h-[65%] md:relative md:right-0 content-center lg:right-20">
        <img src="pro.png" className="w-full h-full object-cover "/>
        <p className="absolute md:left-2 md:text-md lg:top-[36%] lg:left-[-20%] left-2 top-[40%] text-white text-[8px] lg:text-xl md:top-[40%]">[USER PROMPT]</p>
      </div>
      <div className="flex-2  lg:h-32 flex px-3 md:gap-5 md:justify-normal px-3 items-center justify-between  w-full">
        <button className="p-2 bg-[#36b6ea] h-10 rounded text-white hover:scale-110 hover:duration-700">Join Community</button>
        <button className="p-2 border-1 border-[#36b6ea] h-10 rounded text-white hover:scale-110 hover:duration-700">get started</button>
      </div>
    </div>
  );
};
export default Hero;
