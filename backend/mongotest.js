const mongoose = require("mongoose");

const uri = "mongodb+srv://skillgo:skillgo123@cluster0.zeslio0.mongodb.net/?retryWrites=true&w=majority";

async function run() {
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log("✅ MongoDB Direct Connected Ultra Pro Max 🚀");
  } catch (err) {
    console.log("❌ Mongo Error:", err);
  }
}

run();
