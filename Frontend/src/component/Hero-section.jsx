const Hero = () => {
  return (
    <div className="w-full h-screen bg-black flex items-center justify-between md:items-center lg:items-end flex-col">
      <div className="w-full h-32 px-2 md:px-5 flex-0 text-center text-white pt-3">
        <p className="text-xl md:text-4xl md:text-left tracking-wider">[PROMPT /TO /IMPACT]</p>
        <p className="text-lg md:text-2xl md:text-left tracking-wider">AI POWERED /CONTENT GENERATION</p>
      </div>

      <div className="flex-0 w-[70%] h-[60%] md:w-[70%] md:h-[65%] md:relative md:right-0 content-center lg:right-20">
        <img src="pro.png" className="w-full h-full object-cover "/>
      </div>
      <div className=" h-16 lg:h-32 flex px-3 md:px-5 md:gap-5 md:justify-normal items-center justify-between  w-full">
        <button className="p-2 bg-[#36b6ea] h-10 rounded text-white transition duration-700 ease-in-out hover:scale-110">
          Join Community



          


          
        </button>
        <button className="p-2 border border-[#36b6ea] h-10 rounded text-white transition duration-700 ease-in-out hover:scale-110">
          get started
        </button>    
      </div>
    </div>
  );
};
export default Hero;
