const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://skillgo:skillgo123@cluster0.ykqx0ry.mongodb.net/skillgo",
      {
        serverApi: {
          version: "1",
          strict: true,
          deprecationErrors: true,
        },
      }
    );

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;