const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    skills: {
      type: String
    },
    role: {
      type: String,
      default: "worker"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Worker", workerSchema);