const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const authMiddleware = require("../middleware/authMiddleware");
const workerMiddleware = require("../middleware/workerMiddleware");

// =====================================
// WORKER: GET ALL JOBS WITH APPLY STATUS
// =====================================
router.get("/jobs", authMiddleware, workerMiddleware, async (req, res) => {
  try {
    const workerId = req.user.id;

    const jobs = await Job.find().sort({ createdAt: -1 });

    const result = jobs.map((job) => {
      const appliedEntry = job.applicants.find(
        (a) => a.worker === workerId
      );

      return {
        jobId: job._id,
        title: job.title,
        company: job.company,
        description: job.description,
        applied: !!appliedEntry,
        appliedAt: appliedEntry ? appliedEntry.appliedAt : null,
      };
    });

    res.json({
      totalJobs: result.length,
      jobs: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;