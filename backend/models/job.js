const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const auth = require("../middleware/auth");

/**
 * CREATE JOB
 * POST /api/jobs/create
 */
router.post("/create", auth, async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();

    res.json({
      success: true,
      message: "Job created",
      job,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * GET ALL JOBS
 * GET /api/jobs
 */
router.get("/", async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 });
  res.json({ success: true, jobs });
});

/**
 * GET SINGLE JOB
 * GET /api/jobs/:id
 */
router.get("/:id", async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }
  res.json({ success: true, job });
});

module.exports = router;