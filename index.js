const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());  // Enable CORS

const http = require('https');
const port = 5000;

app.post("/ask", async (req, res) => {
  const prompt = req.body.prompt;

  try {
    if (!prompt) {
      throw new Error("Uh oh, no prompt was provided");
    }

    // My openAI GPT-3.5-turbo API request with RapidAPI key
    const options = {
      method: 'POST',
      hostname: 'open-ai21.p.rapidapi.com',
      port: null,
      path: '/conversationgpt35',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '162cf2f892msh9669a0f0a2b5a8ap1de4fajsn2bfc59083c31',
        'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
      }
    };

    const reqGPT3 = http.request(options, function (resGPT3) {
      const chunks = [];

      resGPT3.on('data', function (chunk) {
        chunks.push(chunk);
      });

      resGPT3.on('end', function () {
        const body = Buffer.concat(chunks);
        const bodyString = body.toString();

        try {
          const jsonResponse = JSON.parse(bodyString);
          const resultContent = jsonResponse.result;

          // Send the OpenAI gpt response back to the client or frontend
          res.status(200).json({
            result: resultContent,
          });
        } catch (error) {
          console.error('Error parsing JSON:', error.message);
          res.status(500).json({
            success: false,
            message: 'Internal Server Error',
          });
        }
      });
    });

    reqGPT3.write(JSON.stringify({
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      web_access: false,
      system_prompt: '',
      temperature: 0.9,
      top_k: 5,
      top_p: 0.9,
      max_tokens: 256
    }));
    
    reqGPT3.end();

  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}!`));
