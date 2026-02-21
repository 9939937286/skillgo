require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ MongoDB Connected Successfully");
})
.catch(err => {
    console.log("❌ MongoDB Error:", err.message);
});

// Test Route
app.get("/", (req, res) => {
    res.send("🔥 Smart Caller Backend Running...");
});

const PORT = 5000;

    console.log(`🚀 Server running on http://localhost:${PORT}`);
});