const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Replace this with your real Together API key
const TOGETHER_API_KEY = 'c0eaac49c02dae99151c61addd0ac5da53b145cafe673e5b1d128f2ad4870118';

// Middleware to parse plain text input
app.use(bodyParser.text({ type: 'text/plain' }));

// Counter variable that increases with every request
let requestCount = 0;

// ➤ COUNTER ROUTE
app.get("/counter", (req, res) => {
  requestCount++;
  res.send(`${requestCount}`);
  console.log(`Counter hit at: ${new Date().toISOString()}`);
});

// ➤ CHAT ROUTE (plain text input)
app.post("/chatgpt", async (req, res) => {
  requestCount++;

  const userMessage = req.body;
  const maxTokens = Number(req.headers["max-tokens"]) || 25;

  if (!userMessage || typeof userMessage !== "string") {
    return res.status(400).json({ error: "Request body must be plain text." });
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

// ➤ CALCULATOR ROUTE
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
      result = num2 !== 0 ? num1 / num2 : "Cannot divide by zero";
      break;
    default:
      return res.status(400).send("Invalid operation");
  }

  res.send(`${result}`);
  console.log(`Calculation hit at: ${new Date().toISOString()}`);
});

// ➤ START SERVER
app.listen(port, () => {
  console.log(`🟢 Server running at http://localhost:${port}`);
});
