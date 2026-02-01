const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
      required: true
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true
    },
    status: {
      type: String,
      enum: ["Applied", "Shortlisted", "Rejected"],
      default: "Applied"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobApplication", jobApplicationSchema);