const express = require("express")
require('dotenv').config({ path: '../myenv.env' })
const axios = require('axios')
const Groq = require('groq-sdk')
const route = express.Router()

route.post("/", async (req, res) => {
    const { input } = req.body;

    if (!input) {
        return res.status(400).json({ error: "Input text is required" });
    }

    try {
        console.clear();
        console.log(`${process.env.GROQ_API}`);
        const groq = new Groq({ apiKey: `${process.env.GROQ_API}`});
        const response = await groq.chat.completions.create({
            messages:[{
                role:"user",
                content:`${input}`,
            },],
            model: "gemma2-9b-it",
        })
        console.log(response.choices[0].message.content);
        res.status(200).json({response:response.choices[0].message.content});
        // res.send(response.choices[0].message.content);
    } catch (error) {
        console.error("Error generating post:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to generate post" });
    }
});

module.exports = route