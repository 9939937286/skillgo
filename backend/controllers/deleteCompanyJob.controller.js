const Job = require("../models/Job");

const deleteCompanyJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const companyId = req.user.id;

    const job = await Job.findOne({ _id: jobId, company: companyId });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found or not authorized",
      });
    }

    await job.deleteOne();

    res.json({
      success: true,
      message: "Job deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};

module.exports = deleteCompanyJob;