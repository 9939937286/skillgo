require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());

// routes
app.use("/api/auth", require("./src/routes/auth"));
app.use("/api/users", require("./src/routes/users"));

app.get("/", (req, res) => {
  res.send("SkillGo API Running");
});

module.exports = app;