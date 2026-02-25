const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  res.send("🔥 SkillGo Server Ultra Live");
});

mongoose.connect(process.env.MONGO_URI)
.then(() => {

  console.log("🔥 MongoDB Connected Ultra Pro Max");

  const PORT = 5006;

  // ⭐⭐⭐ MOST IMPORTANT LINE
  app.listen(PORT, "0.0.0.0", () => {
    console.log("🚀 Server running on port " + PORT);
  });

})
.catch(err => console.log(err));
