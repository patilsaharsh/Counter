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


app.get("/calculate", (req, res) => {
  let num1 = req.header.num1
  let num2 = req.header.num2
  let operation = req.header.operation
  let Result = 0

  if(operation == 'Add'){
    Result = num1 + num2
  res.send(`${Result}`);
    
  }else{
    res.send(`Invalid request`);
  }
  
  
  console.log(`${currentTime}`)
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
