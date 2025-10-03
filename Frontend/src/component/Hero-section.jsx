const Hero = () => {
  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex-1 bg-white mt-12 mx-24">
        <p className="text-6xl "> [PROMPT /TO /IMPACT]</p>
        <p className="text-3xl">AI POWERED /CONTENT GENREATION </p>
      </div>
      <div className="flex-1   ">
        <img className="mx-96" src="/public/pro.png" alt="Failed to load" width={800} />
        <p className="justify-start text-4xl mx-24"> This is the second secoin </p>
      
      </div>
      <div className="flex-1 mx-24">
          <button className="mx-4 border-b-orange-800 bg-red-50">
          Join Community
        </button>
        <button className="mx-4 p-2 border-black bg-red-50">
          {" Get started"}
        </button>
      </div>
    </div>
  );
};
export default Hero;
