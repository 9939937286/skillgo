const express = require("express");
const router = express.Router();

const Job = require("../models/Job");
const companyAuth = require("../middleware/companyMiddleware");

// ============================
// GET all company jobs
// ============================
router.get("/", companyAuth, async (req, res) => {
  try {
    const jobs = await Job.find({ companyId: req.company.id });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ============================
// GET applicants for a job
// ============================
router.get("/:jobId/applicants", companyAuth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({
      jobTitle: job.title,
      totalApplicants: job.applicants.length,
      applicants: job.applicants,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ============================
// SHORTLIST worker
// ============================
router.post("/:jobId/shortlist/:workerId", companyAuth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    const applicant = job.applicants.find(
      (a) => a.worker.toString() === req.params.workerId
    );

    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    applicant.status = "shortlisted";
    await job.save();

    res.json({ message: "Worker shortlisted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ============================
// ACCEPT worker
// ============================
router.post("/:jobId/accept/:workerId", companyAuth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    const applicant = job.applicants.find(
      (a) => a.worker.toString() === req.params.workerId
    );

    applicant.status = "accepted";
    await job.save();

    res.json({ message: "Worker accepted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ============================
// REJECT worker
// ============================
router.post("/:jobId/reject/:workerId", companyAuth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    const applicant = job.applicants.find(
      (a) => a.worker.toString() === req.params.workerId
    );

    applicant.status = "rejected";
    await job.save();

    res.json({ message: "Worker rejected" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// 🔥 MOST IMPORTANT LINE
module.exports = router;