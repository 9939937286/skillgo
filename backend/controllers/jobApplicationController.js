const JobApplication = require("../models/JobApplication");
const Job = require("../models/Job");

/* =========================
   Worker Apply Job
========================= */
exports.applyJob = async (req, res) => {
  try {
    const workerId = req.user.id; // JWT se
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({ message: "Job ID required" });
    }

    const jobExists = await Job.findById(jobId);
    if (!jobExists) {
      return res.status(404).json({ message: "Job not found" });
    }

    const alreadyApplied = await JobApplication.findOne({
      job: jobId,
      worker: workerId,
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied to this job" });
    }

    const application = await JobApplication.create({
      job: jobId,
      worker: workerId,
    });

    res.status(201).json({
      message: "Job applied successfully",
      application,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};