const mongoose = require("mongoose");

const connectDB = async () => {
  try {

    await mongoose.connect(
      "mongodb+srv://skillgo:skillgo123@cluster0.ykqx0ry.mongodb.net/?retryWrites=true&w=majority&authSource=admin"
    );

    console.log("MongoDB Connected Successfully");

  } catch (error) {
    console.log("MongoDB Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;