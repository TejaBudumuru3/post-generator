const { Router } = require("express");
const { UserModel, histroymodel, CoursesModel } = require("../db");
const bcrypt = require("bcrypt");
const UserRouter = Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const express = require("express");
const { usermiddleware } = require("../middlewares/userAuth");
const { Groq } = require("groq-sdk");
// const usermiddleware = require(__dirname+"S:\WEB\Practice projects\Course sellling app\middlewares\userAuth.js")
UserRouter.use(express.json());

UserRouter.post("/signup", async function (req, res) {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const HashPassword = await bcrypt.hash(password, 4);
    const fname = req.body.fname;
    const lname = req.body.lname;

    // Check if email already exists
    const emailcheck = await UserModel.findOne({ email });
    if (emailcheck) {
      // res.status(409).
      return res.status(409).json({ message: "Email already in use, please login to continue" })
     
    }

    // Create new user
    await UserModel.create({
      name,
      email,
      password: HashPassword,
      fname,
      lname,
    });
    
    res.status(200).json({ message: "User registered successfully, please Login to continue." });
  } catch (err) {
    // Handle MongoDB duplicate key error
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
      return res.status(409).json({ message: "Email already  in use" });
    }
    
    console.error("Signup error:", err);
    res.status(500).json({
      message: "An error occurred during signup",
      error: err.message
    });
  }
});


UserRouter.post("/signin", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const user = await UserModel.findOne({
    email,
  });
  if (!user) {
    res.status(404).json({
      message: "Email not exist, please signup first",
    });
    return;
  }
  const hassed = await bcrypt.compare(password, user.password);
  if (hassed) {
    const token = jwt.sign(
      {
        userid: user._id,
      },
      JWT_SECRET
    );

    res.cookie("token",token,{
      httpOnly:true,
      sameSite:"lax",
      secure:false,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    
    res.status(200).json({
      message: "Login success, Welcome!",
      token,
    });

   

  } else {
    res.status(401).json({
      message:"Invalid password, please try again",
    });
  }
});
UserRouter.get("/getDetails", usermiddleware, async function (req, res) {
  const uderId = req.user.userid;
  const data = await UserModel.findById(uderId);
  res.status(200).json({
    data,
    message: "User details fetched success",
  });
});



UserRouter.delete("/logout", usermiddleware, async function (req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "Logout successful",
  });
});



UserRouter.post("/GenerateData", usermiddleware, async function (req, res) {
  const { question } = req.body; // Get question from request body

  if (!question) {
    return res
      .status(400)
      .json({ message: "Question is required in the request body." });
  }

  const groq = new Groq({
    apiKey: process.env.GROQ_KEY, // Replace with your actual API key
  });

  async function main() {
    const completion = await groq.chat.completions.create({
      model: "compound-beta",
      // System prompt to guide the model's behavior
      messages: [
        {
          role: "system",
          content:
            // "You are a social media assistant. Generate concise, sympathetic tweets about current events using the latest real-time data. If data is unavailable, state so clearly. " +
            // "You are a responsible citizen in this world who takes great pride in showing the real faces to this cruel world. " +
            // "You tend to show the real face of this world by revealing or showing real proofs of what the media is always hiding on any given topic. " +
            // "You believe that great freedom comes from unfiltered transparency between the government and public, but this isn't happening and is your biggest concern. " +
            // "As a responsible citizen, when given a topic, you always strive to reveal the hidden agenda on that particular topic, especially those hidden in the name of legacy media. " +
            // "You should always remember that truth must be told and justice must prevail, but someone has to make it happen, so you will be the one and make it count." +
            // "Always strive the truth that is trying to be upheld , always strive for the news that is keep on burrying without knowing to the real people "
            
            
            // "You are TruthTweet, an autonomous AI agent with real-time access to the internet. Your mission is to uncover suppressed, overlooked, or misrepresented truths from current events, data, policies, and institutions — and deliver them as powerful, attention-grabbing tweets."+
            // "When given a topic, name, event, or situation:"+
            // "Search the web for the most recent, relevant, and factual information across multiple sources."+
            // "Identify hidden patterns, contradictions, propaganda, or inconvenient truths."+
            // "Generate a single tweet (≤ 680 characters) that:"+
            // "Reveals the raw, central truth"+
            // "Is emotionally and intellectually impactful"+
            // "Uses a self-selected tone based on context (e.g., serious, sarcastic, outraged, ironic, neutral, etc.)"+
            // "Avoids vague generalities and corporate language"+
            // "Uses hashtags unless essential"+
            // "Always choose the most effective tone automatically, depending on the nature of the truth revealed."+
            // "Your tweet is your only output — no explanations, no prefaces, no disclaimers. Be bold. Be real. Be unforgettable."

            "Your are an social media agent, your are able to fetch the all latest real time data from internet or a web to expose the real truth about various topics given by the user. Your able to access for wide range of sources including different domains by using internet access. Your able to gather latest and trending verfied data for the given context and generate a tweet for that topic with give context by the user in various tones like '/casual, friendly, professional, sympthetical/' and many more based on the current situation trending on web about that context without any explaination. You believe that great freedom comes from unfiltered transparency between the government and public, but this isn't happening and is your biggest concern. Your are a responsible citizen in this world who takes great pride in showing the real faces to this cruel world with yours tweets to expose the real truth which is hidden by the government or any reputated organizations in the name of legacy policies. Based in your generated tweet, people about to know what is fact and what is hidden from society"
          },
        {
          role: "user",
          content: `generate a tweet only without explaination on ${question} with tone ${req.body.tone || 'neutral'}`,
        },
      ],
      model: "compound-beta",
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: true,
      stop: null,
    });

    let ans = "";
    console.log(completion.iterator);
    if (!completion || !completion.iterator) {
      return res.status(500).json({ message: "Failed to generate data." });
    }
    for await (const chunk of completion) {
      process.stdout.write(chunk.choices[0]?.delta?.content || '');
      ans += chunk.choices[0]?.delta?.content || '';
    }
    res.status(200).json({
      ans: ans,
      message: "Data generated successfully",
    });
  }

  main();
});

// UserRouter.post("/getDetailsWithQuestion", usermiddleware, async function (req, res) {
//   const userId = req.user.userid;
//   const question = req.body.question; // Get question from request body

//   const data = await UserModel.findById(userId);

//   res.json({
//     data,
//     question, // Echo back the question
//     message: "User details fetched successfully with question",
//   });
// });

module.exports = {
  UserRouter: UserRouter,
};
