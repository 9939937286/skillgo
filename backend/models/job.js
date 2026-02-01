const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    salary: {
      type: Number,
      required: true
    },
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract"],
      default: "Full-time"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);