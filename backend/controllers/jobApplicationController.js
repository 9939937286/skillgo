const Job = require("../models/Job");
const JobApplication = require("../models/JobApplication");

// Worker applies to job
exports.applyToJob = async (req, res) => {
  try {
    const workerId = req.user.id;
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required"
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    const alreadyApplied = await JobApplication.findOne({
      job: jobId,
      worker: workerId
    });

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "Already applied to this job"
      });
    }

    const application = await JobApplication.create({
      job: jobId,
      worker: workerId,
      company: job.company
    });

    res.status(201).json({
      success: true,
      message: "Job applied successfully",
      application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// Company views applicants
exports.getCompanyApplicants = async (req, res) => {
  try {
    const companyId = req.user.id;

    const applications = await JobApplication.find({ company: companyId })
      .populate("job", "title location salary")
      .populate("worker", "name email mobile skills");

    res.json({
      success: true,
      applications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};