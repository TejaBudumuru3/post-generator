import { useState } from "react"

const InputBox = () => {
    const options = ["Casual", "Professional", "Sarcastic", "Aggressive", "Enthusiastic"]
    const [activeTone, setActiveTone] = useState("Casual")
  return (
    <>
        <style>{`
            .opts{
                background:black;
                text-align:center;
            }
            .label{
                cursor:default;
                margin:4px 0;
                color:#00e5ff;
            }
        `}</style>
        <div className=" w-full h-auto p-6">
            <h6 className="label">Idea or Topic:</h6>
            <textarea name="prompt" className="border rounded border-[#538b92] text-white text-lg w-full min-h-24 p-2" placeholder="Idea or topic" id=""></textarea>
            <h6 className="label">Tone</h6>
            <div className="bg-white/10 lg:rounded-full rounded-3xl gap-2 lg:h-12 p-1 w-full grid grid-cols-1 lg:grid-cols-5">
                {
                    options.map((option)=>(
                        <button
                        key={option}
                        onClick={()=> setActiveTone(option)}
                        className={`p-2 rounded-full transition-colors duration-300
                          ${activeTone === option
                            ? "bg-[#FFD700] bg-white text-black h-full" 
                            : "text-[#A9A9A9] hover:bg-white/20"
                          }`}
                        >
                            {option}
                        </button>
                    ))
                }
            </div>
            <button type='submit' className="border border-[#00e5ff]/20 h-10 text-white mt-5 w-full rounded-xl bg-[#00e5ff]/70">Generate</button>
        </div>
    </>
  )
}

export default InputBox