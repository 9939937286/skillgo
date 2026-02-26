const express = require("express");
const { exec } = require("child_process");

const app = express();
app.use(express.json());

app.post("/deploy", (req, res) => {
  exec("sh /root/skillgo/backend/ultra-deploy.sh");
  res.send("Ultra Deploy Triggered");
});

app.listen(9000,"0.0.0.0",()=>{
 console.log("Webhook Running 9000");
});
