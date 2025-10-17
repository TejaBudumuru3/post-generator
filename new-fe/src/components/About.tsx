const About = () => {
  return (
    <div className='p-5 flex-col bg-white flex lg:flex-row gap-5 items-center'>
        <img src='AppLogo.png' alt='logo' className='rounded-full size-32 md:size-50 lg:size-64'/>
        <div className='h-full w-full'>
            <p className='text-5xl font-bold '>AINFINITY</p>
            <p className='text-lg'>Imagine turning a single spark of an idea into a wave of perfectly crafted content. That’s the magic behind AInfinity. We've built an intelligent creative partner designed to eliminate writer's block and save you precious time. Whether you need a volley of witty tweets for X or a polished, professional article for LinkedIn, our AI instantly transforms your simple prompts into compelling posts. Simply choose your platform, select your tone, and watch as AInfinity builds the content you need to connect, engage, and stand out in the digital crowd. Welcome to the future of content creation.</p>
            <div className='flex gap-2 flex-col'>
                <p className='border bg-gray-900 w-fit p-2 px-3 rounded-full text-[#36b6ea]'>AI CONTENT CREATION</p>
                <p className='border bg-gray-900 w-fit p-2 px-3 rounded-full'>AI-POWERED CREATIVITY</p>
                <p className='border bg-gray-900 w-fit p-2 px-3 rounded-full'>IMAGE GENERATION</p>
            </div>
        </div>
    </div>
  )
}

export default About