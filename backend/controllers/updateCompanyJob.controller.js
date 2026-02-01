const Job = require("../models/Job");
const mongoose = require("mongoose");

const updateCompanyJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // ✅ Job ID validation
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Job ID",
      });
    }

    const updateData = req.body;

    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      updateData,
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    console.error("UPDATE JOB ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Job update failed",
    });
  }
};

module.exports = updateCompanyJob;