const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// middleware
app.use(express.json());

// test route
app.get("/api", (req, res) => {
  res.json({
    status: "success",
    message: "SkillGo API Working",
  });
});

// users route
app.use("/api/users", require("./routes/userroutes"));

module.exports = app;