// const express = require("express")
// require('dotenv').config({ path: '../myenv.env' })
// const Groq = require('groq-sdk')
// const route = express.Router()

// route.post("/", async (req, res) => {
//     const { input } = req.body;

//     if (!input) {
//         return res.status(400).json({ error: "Input text is required" });
//     }

//     try {
//         console.clear();
//         console.log(`${process.env.GROQ_API}`);
//         const groq = new Groq({ apiKey: `${process.env.GROQ_API}`});
//         const response = await groq.chat.completions.create({
//             messages:[{
//                 role:"user",
//                 content:`${input}`,
//             },],
//             model: "qwen-2.5-32b",
//             use_search_engine: true,  // Parameter to enable web search (example parameter name)
//             temperature: 0.7,      // Optional: Adjust temperature for response creativity
//             max_tokens: 50, 
//         })
//         console.log(response.choices[0].message.content);
//         res.status(200).json({response:response.choices[0].message.content});
//         // res.send(response.choices[0].message.content);
//     } catch (error) {
//         console.error(`Error generating post:", ${error.response?.data || error.message}`);
//         res.status(500).json({ error: "Failed to generate post" });
//     }
// });

// module.exports = route



// const express = require("express")
// require('dotenv').config({ path: '../myenv.env' })
// const Groq = require('groq-sdk')
// const route = express.Router()

// route.post("/", async (req, res) => {
//     const { input } = req.body;

//     if (!input) {
//         return res.status(400).json({ error: "Input text is required" });
//     }

//     try {
//         console.clear();
//         console.log(${process.env.GROQ_API});
//         const groq = new Groq({ apiKey: ${process.env.GROQ_API}});
//         const response = await groq.chat.completions.create({
//             messages:[{
//                 role:"user",
//                 content:${input},
//             },],
//             model: "qwen-2.5-32b",
//             use_search_engine: true,  // Parameter to enable web search (example parameter name)
//             temperature: 0.7,      // Optional: Adjust temperature for response creativity
//             max_tokens: 50, 
//         })
//         console.log(response.choices[0].message.content);
//         res.status(200).json({response:response.choices[0].message.content});
//         // res.send(response.choices[0].message.content);
//     } catch (error) {
//         console.error(Error generating post:", ${error.response?.data || error.message});
//         res.status(500).json({ error: "Failed to generate post" });
//     }
// });

// module.exports = route


// const express = require("express");
// require("dotenv").config({ path: "../myenv.env" });
// const axios = require("axios");
// const cheerio = require("cheerio");
// const Groq = require("groq-sdk");

// const route = express.Router();

// async function fetchTweets(topic) {
//     const url = https://nitter.poast.org/search?q=${encodeURIComponent(topic)};

//     try {
//         const { data } = await axios.get(url, { headers: {
//             "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
//         } });
//         const $ = cheerio.load(data);
//         console.log("Data:", $);
//         let tweets = [];

//         $("div.timeline-item").each((i, el) => {
//             const tweetText = $(el).find(".tweet-content").text().trim();
//             if (tweetText) tweets.push(tweetText);
//         });

//         return tweets.slice(0, 5); // Get the latest 5 tweets
//     } catch (error) {
//         console.error("Error fetching tweets:", error);
//         return [];
//     }
// }

// route.post("/", async (req, res) => {
//     const { input } = req.body;

//     if (!input) {
//         return res.status(400).json({ error: "Input text is required" });
//     }

//     try {
        
//         console.log(${process.env.GROQ_API});

//         // Fetch recent tweets on the given topic
//         const tweets = await fetchTweets(input);
//         console.log("Tweets:", tweets);
//         if (tweets.length === 0) {

//             return res.status(500).json({ error: "No relevant tweets found" });
//         }

//         // Prepare prompt for Groq API
//         const prompt = `Based on the following tweets, generate a unique and engaging tweet on the topic "${input}":
        
//         ${tweets.join("\n\n")}

//         Output only the tweet without any explanation.`;

//         const groq = new Groq({ apiKey: ${process.env.GROQ_API} });
//         const response = await groq.chat.completions.create({
//             messages: [{ role: "user", content: prompt }],
//             model: "qwen-2.5-32b",
//             temperature: 0.7,
//             max_tokens: 50,
//         });

//         const aiGeneratedTweet = response.choices[0].message.content.trim();
//         console.log("Generated Tweet:", aiGeneratedTweet);
//         res.status(200).json({ response: aiGeneratedTweet });
//     } catch (error) {
//         console.error(Error generating post:", ${error.response?.data || error.message});
//         res.status(500).json({ error: "Failed to generate post" });
//     }
// });

// module.exports = route;


// const express = require('express');
// require('dotenv').config({ path: '../myenv.env' });
// const { TwitterApi } = require('twitter-api-v2');
// const route = express.Router();
// const Groq = require('groq-sdk');

// // Initialize Twitter client with Bearer Token
// const twitterClient = new TwitterApi(process.env.X_BEARER_TOKEN);

// route.get('/', async (req, res) => {
//   const { input } = req.body; // Use req.query to capture query parameters

//   if (!input) {
//     return res.status(400).json({ error: 'Input text is required' });
//   }

//   try {
//     const FetchedTweets = await twitterClient.v2.search(input, { max_results:10  });
//     res.json(FetchedTweets.data);
//     const prompt="";
//     const tweets = FetchedTweets.data;
//     console.log(`Tweets: ${tweets}`);
    
//     if (!tweets || tweets.length === 0) {
//       res.status(404).json({ error: 'No relevant tweets found' });
//       prompt=`Based on the following topic "${input}", generate a unique and engaging tweet 
             
//               Output only the tweet without any explanation.`;
//     }
//     else{
//       const tweetText = tweets.map((tweet) => tweet.text).join('\n\n');
//       prompt =`Based on the following tweets, generate a unique and engaging tweet on the topic "${input}":
//               ${tweetText}
//               Output only the tweet without any explanation.`;
//     }
//     const groq = new Groq({ apiKey: process.env.GROQ_API });
//     const response = await groq.chat.completions.create({
//       messages: [
//         {
//           role: 'user',
//           content: `${prompt}`,
//         },
//       ],
//       model: 'qwen-2.5-32b',
//       use_search_engine: true, // Parameter to enable web search (example parameter name)
//       temperature: 0.7, // Optional: Adjust temperature for response creativity
//       max_tokens: 50,
//     });
//     console.log(`tweet: ${response.choices[0].message.content}`);
//     res.status(200).json({ response: response.choices[0].message.content });
  
//   } catch (error) {
//     console.error(`Error fetching tweets: ${error}`);
//     res.status(500).json({ error: 'Failed to generate' });
//   }
// });

// module.exports = route;



const express = require('express');
require('dotenv').config({ path: '../myenv.env' });
const { TwitterApi } = require('twitter-api-v2');
const Groq = require('groq-sdk');

const app = express();
app.use(express.json());
const twitterClient = new TwitterApi(process.env.X_BEARER_TOKEN_AMBATI);

app.post('/', async (req, res) => {
  const { input } = req.body;

  if (!input || typeof input !== 'string' || input.trim().length < 2) {
    return res.status(400).json({ error: 'Input must be a non-empty string with at least 2 characters' });
  }

  try {
    const encodedInput = encodeURIComponent(input);
    console.log(`Encoded Query: ${encodedInput}`);

    console.log(`Searching for tweets with query: ${encodedInput}`);
    const FetchedTweets = await twitterClient.v2.search(encodedInput, { max_results: 10 });

    console.log(`Twitter API Response: ${JSON.stringify(FetchedTweets, null, 2)}`);

    // Check if tweets were found
    if (!FetchedTweets.data?.data || FetchedTweets.data.data.length === 0) {
      console.log(`No tweets found for query: ${encodedInput}`);
      return res.status(404).json({
        error: 'No relevant tweets found',
        details: `Query: ${encodedInput}`
      });
    }

    const tweets = FetchedTweets.data.data;
    console.log(`Fetched Tweets: ${JSON.stringify(tweets, null, 2)}`);

    const tweetText = tweets.map((tweet) => tweet.text).join('\n\n');

    // Generate a new tweet using Groq API
    const prompt = `Based on the following tweets, generate a unique and engaging tweet on the topic "${input}":
    ${tweetText}
    Output only the tweet in english and without any explanation.`;

    console.log(`Prompt Sent to Groq: ${prompt}`);

    const groq = new Groq({ apiKey: process.env.GROQ_API });
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `${prompt}`,
        },
      ],
      model: 'qwen-2.5-32b',
      temperature: 0.7,
      max_tokens: 50,
    });

    console.log(`Groq API Request: ${response}`);
    console.log(`Groq API Response: ${JSON.stringify(response, null, 2)}`);

    if (!response.choices || response.choices.length === 0) {
      return res.status(500).json({ error: 'Groq API returned an empty response' });
    }

    const generatedTweet = response.choices[0].message.content;
    console.log(`Generated Tweet: ${generatedTweet}`);
    // Send JSON response with original tweets and generated tweet
    res.status(200).json({
      original_tweets: tweets.map(tweet => ({ id: tweet.id, text: tweet.text })),
      generated_tweet: generatedTweet
    });

  } catch (error) {
    console.error(`Error fetching tweets: ${error.message}`);
    console.error(`Error Details: ${JSON.stringify(error, null, 2)}`);

    if (error.code === 429) {
      return res.status(429).json({
        error: 'Rate limit exceeded. Please try again later.',
        reset_time: new Date(error.rateLimit.reset * 1000).toISOString()
      });
    } else if (error.code === 403) {
      return res.status(403).json({ error: 'Forbidden. Check your API token and permissions.' });
    } else {
      return res.status(500).json({ error: 'Failed to fetch tweets or generate a new tweet' });
    }
  }
});
module.exports = app;