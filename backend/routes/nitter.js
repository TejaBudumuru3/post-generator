// const express = require('express');
// const axios = require('axios');
// const cheerio = require('cheerio');

// const NitterRoute = express.Router();

// NitterRoute.post('/', async (req, res) => {
//   const { input } = req.body;

//   if (!input) {
//     return res.status(400).json({ error: 'Input text is required' });
//   }

//   const nitterInstances = [
//     'https://nitter.privacydev.net',
//     'https://nitter.poast.org',
//     'https://nitter.kavin.rocks'
//   ];
  
//   const nitterInstance = "https://xcancel.com"; // Replacing with xcancel.com
//   // const input = "shubman gill century";
  
//   const searchQuery = encodeURIComponent(input.trim()).replace(/%20/g, "+"); 
//   const searchURL = `${nitterInstance}/search?f=tweets&q=${searchQuery}`;
  
//   console.log(`Generated Search URL: ${searchURL}`);
//   try {
//     const searchURL = `${randomInstance}${encodeURIComponent(input)}`;
    
// const headers = {
//   'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
//   'Accept-Language': 'en-US,en;q=0.9'
// };
//     const response = await axios.get(searchURL, {
//       headers,
//       responseType: 'text' // Ensure it's treated as text
//     });
//     console.log('Response:', response); // Debugging
    
//     console.log('HTML Response:', response.data); // Debugging

//     const tweets = extractTweetsFromHTML(response.data);
    
//     if (!tweets.length) {
//       return res.status(404).json({ error: 'No relevant tweets found' });
//     }

//     res.status(200).json({ tweets });

//   } catch (error) {
//     console.log(`Error fetching tweets: ${error}`);
//     res.status(500).json({ error: 'Failed to fetch tweets' });
//   }
// });

// // HTML Parsing Function
// function extractTweetsFromHTML(html) {
//   const $ = cheerio.load(html);
//   let tweets = [];

//   $('.timeline-item .tweet-content').each((i, el) => {
//     tweets.push($(el).text().trim());
//   });

//   return tweets;
// }

// module.exports = NitterRoute;
// const express = require("express");
// const axios = require("axios");

// const NitterRoute = express.Router();

// NitterRoute.get("/", async (req, res) => {
//   const { input } = req.query;

//   if (!input) {
//     return res.status(400).json({ error: "Input text is required" });
//   }

//   try {
//     const instance = "https://xcancel.com"; // Updated to use xcancel.com
//     const searchURL = `${instance}/search?f=tweets&q=${encodeURIComponent(input).replace(/%20/g, "+")}`;

//     console.log(`Fetching from: ${searchURL}`);

//     const response = await axios.get(searchURL, {
      
//       headers: {
//         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
//         "Accept-Language": "en-US,en;q=0.9",
//         "Referer": "https://xcancel.com/",
//         "Connection": "keep-alive",
//       },
//       });
 

//     if (!response.data || response.data.length === 0) {
//       return res.status(404).json({ error: "No tweets found" });
//     }

//     // Extract tweets (parsing needed based on response format)
//     const tweets = extractTweets(response.data);
//     res.status(200).json({ tweets });

//   } catch (error) {
//     console.error("Error fetching tweets:", error.message);
//     res.status(500).json({ error: "Failed to fetch tweets" });
//   }
// });

// // Function to extract tweets (Modify based on response structure)
// function extractTweets(html) {
//   const regex = /<p class="tweet-content">(.+?)<\/p>/g;
//   let tweets = [];
//   let match;

//   while ((match = regex.exec(html)) !== null) {
//     tweets.push(match[1]);
//   }

//   return tweets;
// }

// module.exports = NitterRoute;



const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

async function fetchTweets() {
    const browser = await puppeteer.launch({ headless: false }); // Use visible mode for debugging
    const page = await browser.newPage();

    const url = "https://xcancel.com/search?f=tweets&q=shubman+gill+century";
    console.log(`Navigating to: ${url}`);

    await page.goto(url, { waitUntil: 'networkidle2' });

    // 🛑 Wait for JavaScript verification
    console.log("Waiting for verification to complete...");
    await page.waitForFunction(
        () => !document.querySelector('script[src*="check"]'), // Wait until the anti-bot scripts are gone
        { timeout: 20000 } // Wait up to 20 seconds
    );

    // ✅ Page should now be fully loaded
    console.log("Verification complete. Extracting tweets...");

    // Extract page content after verification
    const content = await page.content();
    console.log("Extracted Content:", content.substring(0, 500)); // Log first 500 characters

    // Take a screenshot for debugging
    await page.screenshot({ path: 'debug.png', fullPage: true });

    await browser.close();
}

fetchTweets();
