const Job = require("../models/Job");

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch jobs",
      error: err.message
    });
  }
};