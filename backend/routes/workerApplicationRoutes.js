const express = require("express");
const router = express.Router();
const JobApplication = require("../models/JobApplication");
const Job = require("../models/Job");
const auth = require("../middleware/auth");

// ✅ Worker applies for a job
router.post("/apply/:jobId", auth, async (req, res) => {
  try {
    if (req.user.role !== "worker") {
      return res.status(403).json({ message: "Only workers can apply" });
    }

    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const application = await JobApplication.create({
      job: job._id,
      worker: req.user.id,
      company: job.company,
    });

    res.status(201).json({
      message: "Job applied successfully",
      application,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Already applied for this job" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;