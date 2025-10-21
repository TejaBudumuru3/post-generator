import { useState } from "react"
import Posts from "./Posts";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";

const InputBox = () => {
    const options = ["Casual", "Professional", "Sarcastic", "Aggressive", "Enthusiastic"]
    const [activeTone, setActiveTone] = useState("Casual")
    const [activeTab, setActiveTab] = useState("X");
    const [tab, setTab] = useState("")
    const [tone, setTone]= useState("")
    const [prompt, setPrompt] = useState("")
    const tabs = ["X", "Linkedin", "Image base"];
    const [postSection, setPostSection] = useState(false)
    const [xPosts, setXPosts] = useState([])
    const [LinkedInPost, setLinkedinPost] = useState("")
    const [buttonLoading, setButtonLoading] = useState(false)
    const [image, setImage] = useState("")

    const handlePost = async()=>{
        setButtonLoading(true)
        const URL = import.meta.env.VITE_BACKEND_URL;
        try{
            if(!prompt){
                console.log("prompt empty");
                toast.error("Provide your Idea/Topic")
                setButtonLoading(false)
                return
            }
            if(activeTab === "X"){
                const res = await axios.post(`${URL}/GenerateData`,{
                    question: prompt,
                    tone: activeTone
                },{withCredentials: true})
                
                console.log(res)
                if(res.data){
                    const totalPosts = res.data.ans.split("~")
                    setXPosts(totalPosts)
                    setTab(activeTab)
                    setTone(activeTone)
                }

            }else if (activeTab === "Linkedin"){
                const res = await axios.post(`${URL}/v2/generate-post`,{
                    question: prompt,
                    tone: activeTone
                },{withCredentials: true})
                    
                    console.log(res)
                if(res.data){
                    const totalPosts = res.data.post.fullPost
                    setLinkedinPost(totalPosts)
                    console.log((totalPosts));
                    setTab(activeTab)
                    setTone(activeTone)
                }
            }
            else{
                const res = await axios.post(`${URL}/GenerateImage`,{
                    Prompt: prompt,
                    tone: activeTone
                },{withCredentials: true})
                    
                    console.log(res)
                if(res.data){
                    const totalPosts = res.data.image
                    // setLinkedinPost(totalPosts)
                    setTone(activeTone)
                    setTab(activeTab)
                    console.log((totalPosts));
                    setImage(totalPosts)
                }
            }
            setPostSection(true)
            setButtonLoading(false)
        }catch(e: any){
            setButtonLoading(false)
            console.log(e);
            toast.error("something went wrong, please try again later")
            return
        }
    }
    

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
        <Toaster position="top-right"/>
        <div className=" w-full h-auto p-6">
            <div className="bg-white/10 lg:rounded-full rounded-3xl gap-2 lg:h-12 p-1 w-full grid grid-cols-1 font-bold md:grid-cols-3">
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
            </div>
            <h6 className="label pt-10">Idea or Topic:</h6>
            <textarea name="prompt" onChange={(e)=>{setPrompt(e.target.value)}} className="border rounded border-[#538b92] text-white text-lg w-full min-h-24 p-2" placeholder="Idea or topic" id=""></textarea>
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
            <button type='submit' onClick={handlePost} className={`border border-[#00e5ff]/20 h-10 text-white mt-5 w-full hover:bg-[#00e5ff]/30  ${buttonLoading ? "bg-[#00e5ff]/30 cursor-not-allowed" : "bg-[#00e5ff]/70 cursor-pointer"} rounded-xl `} disabled={buttonLoading}>{buttonLoading ? "Generating..." : "Generate"}</button>
        </div>

        {/* posts output */}
        {postSection &&
    
        <div className='text-white text-bold text-2xl place-self-center w-full '>
          <div className="place-self-center p-6">
                <p>Generated Posts</p>
                <hr className="w-[100%] mt-5 text-center"></hr>
            </div>
            <div className="flex gap-2 flex-col">
              <Posts platform={tab} posts={xPosts} post={LinkedInPost} tone={tone} img={image}/>

            </div>
        </div>
        }
    </>
  )
}

export default InputBox