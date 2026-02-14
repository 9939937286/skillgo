const JobApplication = require("../models/JobApplication");

const getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await JobApplication.find({ job: jobId })
      .populate("worker", "name phone")
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getJobApplications
};