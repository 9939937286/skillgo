const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  role: {
    type: String,
    enum: ["worker", "agent"],
    default: "worker"
  },
  status: {
    type: String,
    enum: ["APPLIED", "APPROVED", "REJECTED", "ACTIVE"],
    default: "APPLIED"
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Application", applicationSchema);