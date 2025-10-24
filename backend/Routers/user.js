const { Router } = require("express");
const { UserModel, PostModel } = require("../models/db");
const bcrypt = require("bcrypt");
const UserRouter = Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const express = require("express");
const { usermiddleware } = require("../middlewares/userAuth");
const { Groq } = require("groq-sdk");
const Linkedin = require("./Linkedin");
    const { GoogleGenAI, Modality } = require("@google/genai");

const axios = require("axios");
// const usermiddleware = require(__dirname+"S:\WEB\Practice projects\Course sellling app\middlewares\userAuth.js")
UserRouter.use(express.json());

UserRouter.use("/v2", Linkedin);

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
      return res
        .status(409)
        .json({ message: "Email already in use, please login to continue" });
    }

    // Create new user
    await UserModel.create({
      name,
      email,
      password: HashPassword,
      fname,
      lname,
    });

    res.status(200).json({
      message: "User registered successfully, please Login to continue.",
    });
  } catch (err) {
    // Handle MongoDB duplicate key error
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
      return res.status(409).json({ message: "Email already  in use" });
    }

    console.error("Signup error:", err);
    res.status(500).json({
      message: "An error occurred during signup",
      error: err.message,
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

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      message: "Login success, Welcome!",
      token: token,
    });
  } else {
    res.status(401).json({
      message: "Invalid password, please try again",
    });
  }
});

UserRouter.get("/getDetails", usermiddleware, async function (req, res) {
  const userId = req.user.userid;
  let data = null;
  try {
    data = await UserModel.findById(userId);
  } catch (e) {
    console.log("No records from db", e);
  }
  if (data === null && userId) {
    try {
      const linkedinRes = await axios.get(
        "https://api.linkedin.com/v2/userinfo",
        {
          headers: { Authorization: `Bearer ${userId}` },
        }
      );

      console.log(
        "--------------------------------data from linkedin",
        linkedinRes.data,
        "----------------------------------"
      );
      data = linkedinRes.data;
      // try {

      //   const user = await UserModel.create({
      //     name: data.name,
      //     email:data.email,

      //   });

      // } catch (error) {

      // }
    } catch (e) {
      console.log(e);
    }
  }
  res.status(200).json({
    data,
    message: "User details fetched success",
  });
});

UserRouter.delete("/logout", usermiddleware, async function (req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.status(200).json({
    message: "Logout successful",
  });
});

UserRouter.post("/GenerateData", usermiddleware, async function (req, res) {
  const { question } = req.body; // Get question from request body
  const { tone } = req.body;
  // const userId = req.user.userid;
  if (!question) {
    return res
      .status(400)
      .json({ message: "Question is required in the request body." });
  }

  const groq = new Groq({
    apiKey: process.env.GROQ_KEY, // Replace with your actual API key
  });

  async function main() {
    try {
      const completion = await groq.chat.completions.create({
        model: "compound-beta",
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

              "Your are an social media agent, your are able to fetch the all latest real time data from internet or a web to expose the real truth about various topics given by the user. Your able to access for wide range of sources including different domains by using internet access. Your able to gather latest and trending verfied data for the given context and generate a tweet for that topic with give context by the user in various tones like '/casual, friendly, professional, sympthetical/' and many more based on the current situation trending on web about that context without any explaination. You believe that great freedom comes from unfiltered transparency between the government and public, but this isn't happening and is your biggest concern. Your are a responsible citizen in this world who takes great pride in showing the real faces to this cruel world with yours tweets to expose the real truth which is hidden by the government or any reputated organizations in the name of legacy policies. Based in your generated tweet, people about to know what is fact and what is hidden from society",
          },
          {
            role: "user",
            content: `generate a 5 tweets without explaination on ${question} with tone ${
              tone || "neutral"
            } for every tweet should separated by a special character "~" dont use that special character in tweets that charater is used to seperate the tweets only each tweet contains maximium 280 characters(for 5 tweets 5*280 max limit + 4 ~) including hashtags with '#' as mandatory and emojis(if needed) and the each tweet shouldn't exceeds the X tweet limit (mandatory) and it upto the limited characters length so it shouldn't be small or too long tweets.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1024,
        top_p: 1,
        stream: false,
      });

      if (!completion || !completion.choices || !completion.choices[0]) {
        throw new Error("Invalid response from Groq API");
      }

      const ans = completion.choices[0].message.content;

      if (!ans) {
        throw new Error("Empty response from Groq API");
      }

      // const post = await PostModel.create({
      //   question: question,
      //   content: ans,
      //   User: userId,
      // });

      // const user = await UserModel.findById(userId);
      // user.posts.push(post._id);
      // await user.save();

      return res.status(200).json({
        //post: post,
        ans: ans,
        message: "Data generated successfully",
      });
    } catch (error) {
      console.error("Error generating response:", error);

      // Handle rate limit error specifically
      if (error.message && error.message.includes("rate_limit_exceeded")) {
        return res.status(429).json({
          message: "API rate limit reached. Please try again in a few minutes.",
          error: "Rate limit exceeded",
          retryAfter: 60, // Suggest retrying after 1 minute
        });
      }

      // Handle other API errors
      if (error.message && error.message.includes("429")) {
        return res.status(429).json({
          message: "Too many requests. Please try again later.",
          error: "Rate limit exceeded",
        });
      }

      // Handle other errors
      return res.status(500).json({
        message: "Failed to generate data",
        error: error.message,
      });
    }
  }

  main().catch((error) => {
    console.error("Main function error:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  });
});

UserRouter.get("/getPosts", usermiddleware, async function (req, res) {
  const userId = req.user.userid;
  const data = await PostModel.find({ User: userId });
  res.status(200).json({
    data,
    message: "Posts fetched successfully",
  });
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
UserRouter.post("/GenerateImage", usermiddleware,  async (req, res) => {
  try {
    const GEMINI_API_KEY = process.env.GEMINI_API;
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    
    const { Prompt, tone } = req.body;

    if (!Prompt | !tone) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    
      // Build a focused, semantically faithful image prompt from user input
      const normalize = (s) => String(s || "").toLowerCase().trim();
      const toneKey = normalize(tone);
      const tonePresets = {
        casual: {
        style: "friendly, approachable, modern, soft shadows, slight grain",
        palette: "warm pastels, soft blues, peach, off-white"
        },
        professional: {
        style: "clean, corporate, minimalist, grid-aligned, high legibility",
        palette: "navy, cool gray, white, subtle accents"
        },
        sarcastic: {
        style: "bold, high-contrast, ironic visual metaphors, edgy typography",
        palette: "black, white, neon accent (magenta or lime)"
        },
        aggressive: {
        style: "high-impact, dramatic lighting, strong contrast, bold type",
        palette: "deep red, charcoal, black, white"
        },
        enthusiastic: {
        style: "vibrant, energetic, dynamic gradients, playful motion cues",
        palette: "bright yellow, orange, teal, white"
        }
      };
      const preset = tonePresets[toneKey] || tonePresets.professional;
      const corePrompt = String(Prompt || "").trim();

      const systemPrompt = `
    Create a single high-quality social media poster image only.

    Understand the core semantic intent of: "${corePrompt}"
    Depict its main idea with relevant, compelling visuals (avoid literal blocks of text).

    Tone: ${toneKey || "professional"}
    Visual style: ${preset.style}
    Color palette: ${preset.palette}

    Design and composition:
    - One clear focal subject tied to the core idea.
    - Clean background (gradient or subtle texture); generous whitespace and safe margins.
    - Balanced layout with strong hierarchy and visual flow.
    - 2048×2048 resolution (or square), sharp, anti-aliased.

    Text overlay (English only, crystal clear, no overlap/warping):
    - Headline: <= 9 words capturing the essence of "${corePrompt}".
    - Supporting line: <= 12 words.
    - High contrast, large sizes, proper kerning/leading, no tiny text.

    Restrictions:
    - No logos, trademarks, or watermarks.
    - No copyrighted or branded characters.
    - Avoid graphic violence, sexual content, or hate symbols.

    Output:
    - Return one image. Do not include explanations or captions.`;
    try {
      // Generate image with Gemini
      const imageResponse = await ai.models.generateContent({
        model: "gemini-2.0-flash-preview-image-generation",
        contents: systemPrompt,
        config: { responseModalities: [Modality.TEXT, Modality.IMAGE], temperature: 0.1},
        
      });

      // Extract image from response
      let imageBase64 = null;
      let imageMimeType = "image/png";
      const parts = imageResponse.candidates?.[0]?.content?.parts || [];

      for (const part of parts) {
        if (part.inlineData) {
          imageBase64 = part.inlineData.data;
          imageMimeType = part.inlineData.mimeType || "image/png";
          break;
        }
        // console.log(part.inlineData.data)
      }

      if (!imageBase64) {
        return res.status(500).json({
          success: false,
          error: "No image generated by the model",
        });
      }

      // Convert base64 to buffer and send as image
      // const imageBuffer = Buffer.from(imageBase64, 'base64');
      
      res.set({
        'Content-Type': imageMimeType,
        // 'Content-Length': imageBase64.length,
        'Content-Disposition': 'inline; filename="generated-image.png"'
      });
      
      return res.status(200).json({
        image: `data:${imageMimeType};base64,${imageBase64}`,
      });
      
    } catch (err) {
      console.error("Image generation error:", err);
      return res.status(500).json({
        success: false,
        error: "Failed to generate image",
        details: err.message,
      });
    }

    // Assume 'systemPrompt' is the text prompt from the user, e.g., "A futuristic cityscape at night"
// const userPrompt = systemPrompt; 

// try {
//     // 1. CORRECTED: Using the simple and free 'gemini-2.5-flash-image-preview' model.
//    // API key will be injected by the environment
//     const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${GEMINI_API_KEY}`;

//     // 2. SIMPLIFIED: The payload is much simpler for this model.
//     const payload = {
//       contents: [{
//           parts: [{ "text": userPrompt }]
//       }],
//       generationConfig: {
//           // This tells the model you want an image back.
//           responseModalities: ['IMAGE'] 
//       },
//     };

//     const imageResponse = await fetch(apiUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//     });
    
//     if (!imageResponse.ok) {
//         throw new Error(`API call failed with status: ${imageResponse.status}`);
//     }

//     const result = await imageResponse.json();
    
//     // 3. CORRECTED: Find the part in the response that contains the image data.
//     const imagePart = result.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
//     const imageBase64 = imagePart?.inlineData?.data;
//     const imageMimeType = "image/png";

//     if (!imageBase64) {
//       return res.status(500).json({
//         success: false,
//         error: "No image was generated by the model.",
//       });
//     }

//     // 4. Send the final JSON response with the data URL.
//     return res.status(200).json({
//       success: true,
//       image: `data:${imageMimeType};base64,${imageBase64}`,
//     });

// } catch (error) {
//     console.error("Error generating image:", error);
//     return res.status(500).json({
//         success: false,
//         error: "An internal server error occurred.",
//     });
// }
  } catch (error) {
    console.error("Request processing error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to process request",
      details: error.message,
    });
  }
});
module.exports = {
  UserRouter: UserRouter,
};
