// ===== SkillGo Ultra Pro Max Server =====
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

// ===== PORT =====
const PORT = process.env.PORT || 5006;

// ===== MongoDB URI =====
// ⚠️ apna password .env file me rakhen
const MONGO_URI = process.env.MONGO_URI;

// ===== MongoDB Connect =====
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("🚀 MongoDB Connected from VPS Ultra Pro Max");
  })
  .catch((err) => {
    console.log("❌ MongoDB Error:", err.message);
  });

// ===== Test Route =====
app.get("/", (req, res) => {
  res.send("🔥 SkillGo VPS Server Running Ultra Pro Max 🚀");
});

// ===== Health API =====
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    app: "SkillGo Backend",
    server: "Ultra Pro Max",
  });
});

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});