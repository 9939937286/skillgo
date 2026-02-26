const express = require("express");
const { exec } = require("child_process");

const app = express();
app.use(express.json());

app.post("/deploy", (req, res) => {
  console.log("🔥 Ultra Deploy Triggered");

  exec("cd /root/skillgo && git pull && pm2 restart all", (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      return res.send("Deploy Error");
    }
    console.log(stdout);
    res.send("✅ Ultra Deploy Success");
  });
});

app.listen(9000, () => {
  console.log("🔥 Ultra Webhook Running Port 9000");
});
