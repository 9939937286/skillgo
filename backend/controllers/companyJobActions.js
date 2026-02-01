const Job = require("../models/Job");

const updateStatus = async (req, res, status) => {
  try {
    const { jobId, workerId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const applicant = job.applicants.find(a => a.worker === workerId);
    if (!applicant)
      return res.status(404).json({ message: "Applicant not found" });

    applicant.status = status;
    applicant.actionAt = new Date();

    await job.save();
    res.json({ message: `Worker ${status} successfully` });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.shortlist = (req, res) => updateStatus(req, res, "shortlisted");
exports.accept    = (req, res) => updateStatus(req, res, "accepted");
exports.reject    = (req, res) => updateStatus(req, res, "rejected");