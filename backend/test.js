const mongoose = require('mongoose');

const uri = "mongodb+srv://skillgo:skillgo123@cluster0.ykqx0ry.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB Connected Successfully");

    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("🚀 Ping Success");
  } catch (err) {
    console.error("❌ MongoDB Error:", err);
  } finally {
    await mongoose.disconnect();
  }
}

run();