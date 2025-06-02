require('dotenv').config({ path: '../myenv.env' })
const express = require("express");
const claude = require('@anthropic-ai/sdk');

const ClaudeRoute = express.Router();
ClaudeRoute.post("/", async (req, res) => {
    const{ input } = req.body;
    if(!input){
        return res.status(400).json({error:"Input text is required"});
    }else{
        const anthropic = new claude({ apiKey: `${process.env.CLAUDE_API}`});

        try{
            const response = await anthropic.messages.create({
                model: "claude-3-5-sonnet",
                max_tokens: 1024,
                messages: [{ role: "user", content: input }],
              });
            console.log(response.choices[0].message.content);
            res.status(200).json({response:response.choices[0].message.content});
        }catch(error){
            console.error(`Error generating post:", ${error.response?.data || error.message}`);
            res.status(500).json({ error: "Failed to generate post" });
        }
    }
});

module.exports = ClaudeRoute
