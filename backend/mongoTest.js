const mongoose = require("mongoose");

const uri =
  "mongodb+srv://skillgo:skillgo123@cluster0.ykqx0ry.mongodb.net/skillgo?retryWrites=true&w=majority";

async function run() {
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB Connected Successfully");

    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("🏓 Ping successful");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
  }
}

run();