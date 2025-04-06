const express = require("express");
const app = express();
const port = 3000;

// 🔁 Counter variable that increases with every request
let requestCount = 0;

app.get("/", (req, res) => {
  requestCount++; // Increment the counter
  res.send(`${requestCount}`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
