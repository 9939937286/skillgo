const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "PASTE_YOUR_MONGODB_ATLAS_URL_HERE"
    );
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;