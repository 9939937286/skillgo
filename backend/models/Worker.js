const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    skills: [{ type: String }],
    location: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Worker", workerSchema);