const express = require("express");
const app = express();
const port = 3000;

// 🔁 Counter variable that increases with every request
let requestCount = 0;
const currentTime = new Date()

app.get("/", (req, res) => {
  requestCount++; // Increment the counter
  res.send(`${requestCount}`);
  console.log(`${currentTime}`)
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
