const Company = require("../models/Company");

exports.getCompanyDashboard = async (req, res) => {
  try {
    // 🔥 id yahin se aa rahi
    const companyId = req.company.id;

    const company = await Company.findById(companyId).select("-password");

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json({
      message: "Company dashboard loaded successfully",
      dashboard: {
        companyId: company._id,
        companyName: company.companyName,
        email: company.email,
        joinedOn: company.createdAt,
        totalJobs: 0,
        activeJobs: 0,
        workersHired: 0
      }
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};