// 🚀 Smart Caller Backend Server

const express = require("express");
const cors = require("cors");
const connectDB = require("./mongodb"); // 🍃 MongoDB File

const app = express();

// ✅ MongoDB Connect
connectDB();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// 📂 Routes
const voiceRoute = require("./routes/voice");

// ✅ API Routes
app.use("/api", voiceRoute);

// 🧪 Test Route
app.get("/", (req, res) => {
  res.send("✅ Smart Caller Server Running...");
});

// 🌐 Server Start
const PORT = 5006;

app.listen(PORT, () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);
});