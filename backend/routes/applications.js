const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const Job = require("../models/Job");
const auth = require("../middleware/auth");

/**
 * APPLY TO JOB
 */
router.post("/apply/:jobId", auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const existing = await Application.findOne({
      jobId: job._id,
      userId: req.user.id
    });

    if (existing) {
      return res.status(400).json({ message: "Already applied" });
    }

    const application = await Application.create({
      jobId: job._id,
      userId: req.user.id,
      role: req.user.role || "worker"
    });

    res.json({
      success: true,
      message: "Applied successfully",
      application
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;