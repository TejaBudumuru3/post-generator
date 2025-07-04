require("dotenv").config();
const express = require('express');
const { UserModel } = require('../models/db');
const jwt = require('jsonwebtoken');
const axios = require("axios");
const { GoogleGenAI, Modality } = require('@google/genai');
const { usermiddleware } = require("../middlewares/userAuth");
const { OtpModel } = require("../models/OtpSchema");
const sendEmail = require("../utils/sendMail");
const { JWT_SECRET } = require("../config");


const Linkedin = express.Router();


// Linkedin.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const EmailCheck = await UserModel.findOne({
//       email
//     })
//     if (EmailCheck) {
//       return res.status(400).json(
//         {
//           message: "email already exists please login"
//         }
//       )
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     UserModel.create({
//       username: name,
//       email,
//       password: hashedPassword
//     })
//     // console.log("Account sign up successfull ")
//     return res.status(201).json({ message: "user created successfully" });
//   } catch (error) {
//     console.log(error)
//   }
// })

Linkedin.get('/auth/linkedin', (req, res) => {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.LINKEDIN_CLIENT_ID,
    redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
  });
  params.append('scope', 'openid profile email');
  params.append('state', 'juijhy6ygfyFTGhk8tr');
  const authUrl = 'https://www.linkedin.com/oauth/v2/authorization?' + params.toString();
  console.log('LinkedIn Auth URL:', authUrl);
  res.redirect(authUrl);
});

// Linkedin.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   console.log("we are in loginrouteo")
//   try {
//     const user = await UserModel.findOne({ email });
//     console.log(user)
//     if (!user)
//       return res.status(400).json({ message: "User not found" });
//     const passwordMatch = await bcrypt.compare(password, user.password);
//     console.log(passwordMatch)
//     if (!passwordMatch)
//       return res.status(400).json({ message: "invalid password" });
//     else {
//       // return res.status(200).json({ message: "Login success", user: user})
//       const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

//       res.cookie("token", token, {
//         httpOnly: true,
//         secure: false,
//         sameSite: "none",
//         maxAge: 24 * 60 * 60 * 1000 // 1 day
//       })
//       console.log("token is tis ", token)
//       return res.status(200).json({ message: "Login sucess", username: user.username, email: user.email, token: token })
//     }
//   }
//   catch (e) {
//     console.log(e)
//     return res.status(500).json({ message: "INternal server error" });
//   }
// })


// Linkedin.get('/auth/linkedin/callback', async (req, res) => {
//   const code = req.query.code;
//   if (!code) {
//     return res.status(400).send('No code provided');
//   }

//   try {
//     console.log({
//       code,
//       redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
//       client_id: process.env.LINKEDIN_CLIENT_ID,
//       client_secret: process.env.LINKEDIN_CLIENT_SECRET
//     });

//     const params = new URLSearchParams({
//       grant_type: 'authorization_code',
//       code: code,
//       redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
//       client_id: process.env.LINKEDIN_CLIENT_ID,
//       client_secret: process.env.LINKEDIN_CLIENT_SECRET
//     });

//     const tokenResponse = await axios.post(
//       'https://www.linkedin.com/oauth/v2/accessToken',
//       params.toString(),
//       withCredentials = true,
//       { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
//     );

//     const accessToken = tokenResponse.data.access_token;
//     res.cookie("token", accessToken, {
//         httpOnly: true,
//         secure: false,
//         sameSite: "lax",
//         maxAge: 24 * 60 * 60 * 1000 // 1 day
//       })
//       console.log("token is tis ", token)
//       return res.status(200).json({ message: "Login sucess", token: accessToken })
    
//     // You can now store accessToken in your database for this user

//     // res.send('Access token received!'); // For testing, you can send the token or a success message
//   } catch (error) {
//     console.log(error.response ? error.response.data : error.message);
//     const errorMessage = error.response ? JSON.stringify(error.response.data, null, 2) : error.message;
//     res.status(500).send(`<pre>Error exchanging code for access token: ${errorMessage}</pre>`);
//   }
// });


Linkedin.get('/auth/linkedin/callback', async (req, res) => {
  console.log("callback hit")
  const code = req.query.code;
  console.log("code from linkedin callback", code)
  if (!code) {
    console.log("no code provided from linkedin callback")
    return res.status(400).send('No code provided');
  }

  try {
    // Prepare request parameters
    console.log("code provided from callback", code)
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: process.env.LINKEDIN_REDIRECT_URI, 
      client_id: process.env.LINKEDIN_CLIENT_ID,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET,
    });

    console.log("params :",params)

    // Request access token from LinkedIn
    const tokenResponse = await axios.post(
      'https://www.linkedin.com/oauth/v2/accessToken',
      params.toString(),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );
    console.log('✅ Token exchange successful:', tokenResponse.data);
    const accessToken = tokenResponse.data.access_token;

    const token = jwt.sign({userid: accessToken}, JWT_SECRET);
    // Set access token as HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: true, // Set true on production (HTTPS)
      sameSite: 'none', // Use 'none' + secure: true for cross-origin cookies
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    console.log('✅ Token set as cookie successfully');

    
    // Optionally redirect or send response
    console.log(accessToken)
    return res.redirect(process.env.FRONTEND_URL); // Redirect to your frontend application
    // return res.status(200).json({
    //   message: 'Login success',
    //   token: accessToken,
    // });
  } catch (error) {
    const msg = error.response?.data || error.message;
    console.error('❌ Error during token exchange:', msg);
    return res.status(500).send(`<pre>Error exchanging code for token:\n${JSON.stringify(msg, null, 2)}</pre>`);
  }
});


Linkedin.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found" });
    else {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      await OtpModel.create({
        email,
        otp
      })

      await sendEmail(
        email,
        "Your OTP for LinkedIn Post Generation",
        `Your OTP is ${otp}. It is valid for 5 minutes.`
      )
      // For testing purposes only - remove this in production
      res.status(200).json({ message: "OTP sent successfully", otp: otp });
    }
  } catch (e) {
    console.error("Error sending OTP:", e);
    res.status(500).json({ message: "Internal server error" });
  }
})

Linkedin.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  // const { otp } = req.body
  console.log(req.body)
  try {
    const otpRecord = await OtpModel.findOne({ email });
    if (!otpRecord)
      return res.status(400).json({ message: "No OTP found for this email" });
    else {
      console.log("this is from the db", otpRecord)
      console.log("this is from the req body otp", otp)

     
      if (otp === otpRecord.otp) {
        await OtpModel.deleteOne({ email });
        await UserModel.updateOne({ email }, { isVerified: true });
        res.status(200).json({ message: "OTP verified successfully" });
      }
      else {
        return res.status(400).json({ message: "Invalid OTP" });
      }
    }
  }
  catch (e) {
    console.log(e)
    res.status(500).json({ message: "Internal server error" });
  }
});


Linkedin.post("/generate-post", usermiddleware , async (req, res) => {
  const GEMINI_API_KEY = process.env.GEMINI_API;
  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  const { question, tone, generateImage } = req.body;

  function extractJsonFromMarkdown(text) {
    return text
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```$/, '')
      .trim();
  }

  console.log("into the generate post route", question, tone);
  const prompt = `Generate a LinkedIn post about: "${question}"
            Requirements:
            - Tone: ${tone}
            - Structure:
            1. Hook (first line should grab attention)
            2. 2-3 paragraphs of valuable content
            3. Call-to-action for engagement
            4. 3-5 relevant hashtags
            - Keep under 2,000 characters
            - Make it engaging and shareable
            - Include personal insights or experiences if relevant
            - Use bullet points or emojis sparingly but effectively

            Format the response as below do not include any other formatting like `+"``` or text (this is must and should be followed strictly):"+`
            {
            "hook": "attention-grabbing first line",
            "content": "main content paragraphs",
            "callToAction": "engagement prompt",
            "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3"],
            "characterCount": 1234,
            "fullPost": "complete formatted post"
            } make sure that the response doesn't contain any characters `+"' ``` ' at beginning or end of the response and also make sure that the response is a valid json object and not a stringified json object";

  try {
        console.log(  "this is the 1st line from the gemini api")    

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: prompt
    },
    console.log( prompt, "this is the response from the gemini api")    
    );

    const jsonResponse = extractJsonFromMarkdown(response.text);
    console.log(jsonResponse, "this is the response from the gemini api")
    let responseText=""
    try {
      const parseJson = JSON.parse(jsonResponse)
      responseText  = parseJson.fullPost;
      console.log(responseText, "this is the response from the parseJson")
      if(generateImage)
      {
        try{
        // Prompt Gemini to generate an image based on the topic
          const imageResponse = await ai.models.generateContent({
            model: "gemini-2.0-flash-preview-image-generation",
            contents: `Create a visually engaging image that represents the concept of '${responseText}', using illustrations or icons, not just plain text.`,
            config: { responseModalities: [Modality.TEXT, Modality.IMAGE] },
          });

           // Find the image in the response
          let imageBase64 = null;
          let imageMimeType = "image/png";
          const parts = imageResponse.candidates?.[0]?.content?.parts || [];
          for (const part of parts) {
            if (part.inlineData) {
              imageBase64 = part.inlineData.data;
              imageMimeType = part.inlineData.mimeType || "image/png";
              break;
            }
          }

          if (!imageBase64) {
            return res.status(500).json({ error: "No image generated" });
          }

          // Respond with both text and image (as data URL)
          return res.status(200).json({
            postText: responseText,
            imageDataUrl: `data:${imageMimeType};base64,${imageBase64}`
          });

          }
        catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to generate image" });
        }
      }
      else{
        return res.status(200).json({
            postText: responseText,
            imageDataUrl: `image generation false`,
            image:false
          });
      }
    } catch (parseError) {
      // If JSON parsing fails, return a formatted structure
      return {
        hook: "Generated LinkedIn Post",
        content: responseText,
        callToAction: "What are your thoughts on this? Share below! 👇",
        hashtags: ["#LinkedIn", "#Professional", "#Networking"],
        characterCount: responseText.length,
        fullPost: responseText
      };
    }
  }
  catch (error) {
    console.error("Error generating LinkedIn post:", error);
    throw error;
  }
})






module.exports = Linkedin 