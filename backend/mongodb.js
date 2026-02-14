// 🌐 MongoDB Connection File

const mongoose = require("mongoose");

// 👉 यहाँ अपना MongoDB Atlas URI डालना है
const MONGO_URI =
  "mongodb+srv://skillgo:skillgo123@cluster0.ykqx0ry.mongodb.net/skillgo?retryWrites=true&w=majority&authSource=admin";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("🍃 MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;