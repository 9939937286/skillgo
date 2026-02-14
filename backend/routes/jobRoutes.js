const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Job = require("../models/Job");

router.post("/", auth, async (req, res) => {
  try {
    const job = new Job({
      ...req.body,
      company: req.user.id,
    });

    await job.save();

    res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

router.get("/", auth, async (req, res) => {
  const jobs = await Job.find({ company: req.user.id });
  res.json(jobs);
});

module.exports = router;