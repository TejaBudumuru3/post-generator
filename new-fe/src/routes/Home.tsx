import InputBox from "../components/InputBox";

const Home = () => {


  return (
    <>
    <div className="pt-20 flex flex-col ">
      <div className="flex text-[#A9A9A9] text-5xl justify-center font-bold cursor-default">
        <h1>Hello, user</h1>
      </div>
      {/* Main container with a new gold-colored shadow */}
      <div className="flex flex-col items-center mt-5 place-self-center sm:w-3/5 w-[90%] rounded-2xl 
                       shadow-[0_0_15px_0px_#00e5ff] p-5 bg-[#323232]/50 backdrop-blur-sm border border-[#00e5ff]/20">
        
        {/* Tab container with a subtle gold glow */}
        {/* <div className="grid grid-cols-3 w-full gap-1 text-center rounded-full font-bold text-lg justify-between py-1 sm:px-1 bg-white/10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={` px-2 py-2 rounded-full transition-colors duration-300
                          ${activeTab === tab 
                            ? "bg-[#FFD700] bg-white text-black" 
                            : "text-[#A9A9A9] hover:bg-white/20"
                          }`}
            >
              {tab}
            </button>
          ))}
        </div> */}
        <div className="w-full">
            <InputBox />
        </div>
      </div>
        
    </div>
    </>
  );
};

export default Home;

