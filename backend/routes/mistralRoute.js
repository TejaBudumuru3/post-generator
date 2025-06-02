// const Mistral =  require('@mistralai/mistralai');
require('dotenv').config({ path: '../myenv.env' })
const express = require("express");
const axios = require('axios');

const Mroute = express.Router();
Mroute.post("/", async (req, res) => {
    const apiKey = process.env.MISTRAL_API;
    const { input } = req.body;

    if (!input) {
        return res.status(400).json({ error: "Input text is required" });
    }
    else{
        try {
                
                console.log(`${apiKey}`);
                // const client = new Mistral({apiKey: apiKey});
                const payload = {
                    model: "open-mistral-7b",
                    messages: [{ role: "user", content: input }],
                    temperature: 0.7,
                    max_tokens: 50,
                };
                
                const response = await axios.post(process.env.MISTRAL_API_URL, payload, {
                    headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                },
                });

                const generatedPost = response.data.choices[0].message.content;



                // const chatResponse = await client.chat.complete({
                //     model: 'open-mistral-7b',
                //     messages: [{role: 'user', content: input}],
                //   });
                console.log('Chat:', generatedPost);
                res.status(200).json({response:generatedPost});
                // res.send(response.choices[0].message.content);
            } catch (error) {
                console.error(`Error generating post:", ${error || error.message}`);
                res.status(500).json({ error: "Failed to generate post" });
            }
        }
    });
        
module.exports = Mroute