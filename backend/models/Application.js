const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    worker: { type: mongoose.Schema.Types.ObjectId, ref: "Worker", required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    status: { type: String, default: "Applied" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);