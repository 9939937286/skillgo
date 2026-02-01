const mongoose = require("mongoose");

const manpowerSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    duration: {
      type: String, // daily / monthly / contract
      required: true,
    },
    status: {
      type: String,
      enum: ["OPEN", "CLOSED"],
      default: "OPEN",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Manpower", manpowerSchema);s