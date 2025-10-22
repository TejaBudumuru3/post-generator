require("dotenv").config();
const express = require("express");
const { UserModel } = require("../models/db");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { GoogleGenAI, Modality } = require("@google/genai");
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

Linkedin.get("/auth/linkedin", (req, res) => {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.LINKEDIN_CLIENT_ID,
    redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
  });
  params.append("scope", "openid profile email");
  params.append("state", "juijhy6ygfyFTGhk8tr");
  const authUrl =
    "https://www.linkedin.com/oauth/v2/authorization?" + params.toString();
  console.log("LinkedIn Auth URL:", authUrl);
  res.redirect(authUrl);
});


Linkedin.get("/auth/linkedin/callback", async (req, res) => {
  console.log("callback hit");
  const code = req.query.code;
  console.log("code from linkedin callback", code);
  if (!code) {
    console.log("no code provided from linkedin callback");
    return res.redirect(`${process.env.FRONTEND_URL}/auth/error?message=No code provided`);
  }

  try {
    // Prepare request parameters
    console.log("code provided from callback", code);
    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
      client_id: process.env.LINKEDIN_CLIENT_ID,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET,
    });

    console.log("params :", params);

    // Request access token from LinkedIn
    const tokenResponse = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      params.toString(),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    console.log("✅ Token exchange successful:", tokenResponse.data);
    const accessToken = tokenResponse.data.access_token;

    const token = jwt.sign({ userid: accessToken }, JWT_SECRET);
    // Set access token as HTTP-only cookie
     res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Set true on production (HTTPS)
      sameSite: "none", // Use 'none' + secure: true for cross-origin cookies
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    console.log("This is from res without reutrn" , token.valueOf)
      res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Set true on production (HTTPS)
      sameSite: "none", // Use 'none' + secure: true for cross-origin cookies
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    console.log("This is from res without reutrn" , token.valueOf)

    // console.log("✅ Token set as cookie successfully");

    // Optionally redirect or send response
    console.log(accessToken);
    // return res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`); // Redirect to your frontend application
    // return res.status(200).json({
    //   message: 'Login success',
    //   token: accessToken,
    // });
  } catch (error) {
    const msg = error.response?.data || error.message;
    console.error("❌ Error during token exchange:", msg);
    return res.redirect(`${process.env.FRONTEND_URL}/auth/error?message=Authentication failed`);

  }
});

Linkedin.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });
    else {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      await OtpModel.create({
        email,
        otp,
      });

      await sendEmail(
        email,
        "OTP from Post AInfinity",
        `Your OTP is ${otp}. It is valid for 5 minutes.`
      );
      // For testing purposes only - remove this in production
      res.status(200).json({ message: `OTP sent ${email}` });
    }
  } catch (e) {
    console.error("Error sending OTP:", e);
    res.status(500).json({ message: "Internal server error" });
  }
});

Linkedin.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  // const { otp } = req.body
  console.log(req.body);
  try {
    const otpRecord = await OtpModel.findOne({ email });
    if (!otpRecord)
      return res.status(400).json({ message: "No OTP found for this email" });
    else {
      console.log("this is from the db", otpRecord);
      console.log("this is from the req body otp", otp);

      if (otp === otpRecord.otp) {
        await OtpModel.deleteOne({ email });
        await UserModel.updateOne({ email }, { isVerified: true });
        res.status(200).json({ message: "OTP verified successfully" });
      } else {
        return res.status(400).json({ message: "Invalid OTP" });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

Linkedin.post("/generate-post", usermiddleware, async (req, res) => {
  const GEMINI_API_KEY = process.env.GEMINI_API;
  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  const { question, tone, } = req.body;

  function extractJsonFromMarkdown(text) {
    return text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```$/, "")
      .trim();
  }

  console.log("into the generate post route", question, tone);
  const prompt =
    `Generate a LinkedIn post about: "${question}"
            Requirements:
            - Tone: ${tone}
            - Structure:
            1. Hook (first line should grab attention)
            2. 2-3 paragraphs of valuable content
            3. Call-to-action for engagement
            4. 3-5 relevant hashtags
            - Keep between 400 to 600 characters
            - Make it engaging and shareable
            - Include personal insights or experiences if relevant
            - Use bullet points or emojis sparingly but effectively

            Format the response as below do not include any other formatting like ` +
    "``` or text (this is must and should be followed strictly):" +
    `
            {
            "hook": "attention-grabbing first line",
            "content": "main content paragraphs",
            "callToAction": "engagement prompt",
            "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3"],
            "characterCount": 1234,
            "fullPost": "complete formatted post"
            } make sure that the response doesn't contain any characters ` +
    "' ``` ' at beginning or end of the response and also make sure that the response is a valid json object and not a stringified json object";

  try {
    console.log("this is the 1st line from the gemini api");

    const response = await ai.models.generateContent(
      {
        model: "gemini-2.0-flash-001",
        contents: prompt,
      },
      console.log(prompt, "this is the response from the gemini api")
    );

    const jsonResponse = extractJsonFromMarkdown(response.text);
    console.log(jsonResponse, "this is the response from the gemini api");
    
    const postData = JSON.parse(jsonResponse);
    return res.status(200).json({ 
      message: "Post generated successfully", 
      post: postData 
    });
  } catch (error) {
    console.error("Error generating LinkedIn post:", error);
    return res.status(500).json({ 
      message: "Error generating post", 
      error: error.message 
    });
  }
});

module.exports = Linkedin;
