const Job = require("../models/Job");

const getCompanyJobs = async (req, res) => {
  try {
    const companyId = req.user.id;

    const jobs = await Job.find({ company: companyId });

    res.status(200).json({
      success: true,
      totalJobs: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Fetch failed",
    });
  }
};

module.exports = getCompanyJobs;