const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const PORT = 5006;

// 🔥 SRV BYPASS ULTRA CONNECTION
const MONGO_URI =
"mongodb://skillgo:skillgo123@cluster0-shard-00-00.zeslio0.mongodb.net:27017,cluster0-shard-00-01.zeslio0.mongodb.net:27017,cluster0-shard-00-02.zeslio0.mongodb.net:27017/?ssl=true&replicaSet=atlas-xxxxx-shard-0&authSource=admin&retryWrites=true&w=majority";

// MongoDB Connect
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected (SRV Bypass Ultra)"))
  .catch((err) => console.log("❌ MongoDB Error:", err.message));

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 SkillGo Server Running...");
});

// Server Start
app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});