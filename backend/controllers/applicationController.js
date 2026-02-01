const Application = require("../models/Application");

exports.getCompanyApplications = async (req, res) => {
  try {
    // companyId token se aata hai
    const companyId = req.user.id;

    const applications = await Application.find({ company: companyId })
      .populate("job", "title location salary")
      .populate("worker", "name email mobile")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};