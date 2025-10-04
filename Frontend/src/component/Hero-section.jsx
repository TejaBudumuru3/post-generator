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
    <div className="w-full h-screen bg-black flex flex-col">
      <div className=" w-full h-32 px-2 flex-1 text-center text-white pt-3">
      <p className="text-xl"> [PROMPT /TO /IMPACT]</p>
      <p className="text-lg">AI POWERED /CONTENT GENREATION </p>
      </div>
      <div className="flex-1 w-full content-center">
        <img src="pro.png"/>
        <p className="absolute left-3 top-1/2 text-white text-[8px]">[USER PROMPT]</p>
      </div>
      <div className="flex-1 flex px-3 gap-5 px-3 items-center w-full">
        <button className="p-2 bg-[#36b6ea] h-10 rounded text-white">Join Community</button>
        <button className="p-2 border-1 border-[#36b6ea] h-10 rounded text-white">get started</button>
      </div>
    </div>
  );
};
export default Hero;
