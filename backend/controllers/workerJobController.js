const CompanyJob = require("../models/CompanyJob");

const getAllJobs = async (req, res) => {
  try {
    const jobs = await CompanyJob.find()
      .populate({
        path: "companyId",
        select: "name email",
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error("❌ Worker getAllJobs error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
    });
  }
};

module.exports = {
  getAllJobs,
};