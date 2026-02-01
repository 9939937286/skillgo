const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const authMiddleware = require("../middleware/authMiddleware");

// ===============================
// COMPANY: VIEW JOB APPLICANTS
// ===============================
router.get("/jobs/:jobId/applicants", authMiddleware, async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId).select("title applicants");

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({
      jobTitle: job.title,
      totalApplicants: job.applicants.length,
      applicants: job.applicants,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;