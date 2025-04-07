const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
const TOGETHER_API_KEY = 'c0eaac49c02dae99151c61addd0ac5da53b145cafe673e5b1d128f2ad4870118'; // Replace with your real key

app.use(bodyParser.json()); // Allows you to read JSON body content

// Counter variable that increases with every request
let requestCount = 0;

app.get("/counter", (req, res) => {
  requestCount++;
  res.send(`${requestCount}`);
  console.log(`Counter hit at: ${new Date().toISOString()}`);
});

// ChatGPT-style endpoint with token limit
app.post("/chatgpt", async (req, res) => {
  requestCount++;
  const userMessage = req.body.message;
  const maxTokens = req.body.max_tokens || 25; // default to 60 tokens if not provided

  if (!userMessage) {
    return res.status(400).json({ error: "Missing 'message' in request body." });
  }

  try {
    const response = await axios.post(
      "https://api.together.xyz/v1/chat/completions",
      {
        model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: userMessage }
        ],
        max_tokens: maxTokens
      },
      {
        headers: {
          Authorization: `Bearer ${TOGETHER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });

  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Something went wrong." });
  }

  console.log(`ChatGPT hit at: ${new Date().toISOString()}`);
});

// Calculator route
app.get("/calculate", (req, res) => {
  requestCount++;
  const num1 = Number(req.headers.num1);
  const num2 = Number(req.headers.num2);
  const operation = req.headers.operation;
  let result;

  switch (operation) {
    case "Addition":
      result = num1 + num2;
      break;
    case "Substraction":
      result = num1 - num2;
      break;
    case "Multiplication":
      result = num1 * num2;
      break;
    case "Division":
      result = num1 / num2;
      break;
    default:
      return res.status(400).send("Invalid operation");
  }

  res.send(`${result}`);
  console.log(`Calculation hit at: ${new Date().toISOString()}`);
});

app.listen(port, () => {
  console.log(`🟢 Server running at http://localhost:${port}`);
});
