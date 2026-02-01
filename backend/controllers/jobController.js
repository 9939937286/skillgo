const Job = require("../models/Job");

/**
 * =========================
 * CREATE JOB (Company)
 * =========================
 * POST /api/jobs/create
 * JWT required
 */
exports.createJob = async (req, res) => {
  try {
    const { title, description, location, salary, jobType } = req.body;

    if (!title || !description || !location || !salary) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled"
      });
    }

    const job = await Job.create({
      company: req.user.id, // JWT se company id
      title,
      description,
      location,
      salary,
      jobType
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      job
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

/**
 * =========================
 * GET ALL JOBS (Worker side)
 * =========================
 * GET /api/jobs
 * Public (JWT optional)
 */
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("company", "companyName email")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      count: jobs.length,
      jobs
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

/**
 * =========================
 * GET COMPANY JOBS
 * =========================
 * GET /api/jobs/company
 * JWT required
 */
exports.getCompanyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ company: req.user.id }).sort({
      createdAt: -1
    });

    return res.json({
      success: true,
      count: jobs.length,
      jobs
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

/**
 * =========================
 * GET JOB BY ID
 * =========================
 * GET /api/jobs/:id
 */
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "company",
      "companyName email"
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    return res.json({
      success: true,
      job
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

/**
 * =========================
 * DELETE JOB (Company)
 * =========================
 * DELETE /api/jobs/:id
 * JWT required
 */
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    // Ensure only owner company can delete
    if (job.company.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this job"
      });
    }

    await job.deleteOne();

    return res.json({
      success: true,
      message: "Job deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};