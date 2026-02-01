const Job = require("../models/Job");

// CREATE JOB
const createJob = async (req, res) => {
  try {
    const { title, description, salary, location } = req.body;

    if (!title || !description || !salary || !location) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const job = await Job.create({
      companyId: req.company.id,
      title,
      description,
      salary,
      location,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET COMPANY JOBS
const getCompanyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ companyId: req.company.id });
    res.json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createJob,
  getCompanyJobs,
};