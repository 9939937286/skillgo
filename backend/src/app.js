// app.js (FINAL – MongoDB SKIP MODE)

const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// ===============================
// TEST ROUTE (Health Check)
// ===============================
app.get("/api", (req, res) => {
  res.json({
    status: "success",
    message: "SkillGo API Working",
  });
});

// ===============================
// USERS ROUTE (TEMP DIRECT)
// ===============================
app.get("/api/users", (req, res) => {
  res.json({
    status: "success",
    message: "SkillGo Users API Working",
    data: [],
  });
});

module.exports = app;