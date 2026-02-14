const mongoose = require("mongoose");

const workerApplicationSchema = new mongoose.Schema(
  {
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    status: {
      type: String,
      default: "applied",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "WorkerApplication",
  workerApplicationSchema
);