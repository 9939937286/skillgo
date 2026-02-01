const Job = require("../models/Job");

const createCompanyJob = async (req, res) => {
  try {
    const { title, category, salaryAmount, location, type } = req.body;

    const companyId = req.user.id; // JWT se aaya

    const job = await Job.create({
      company: companyId,
      title,
      category,
      salaryAmount,
      location,
      type,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Job creation failed",
    });
  }
};

module.exports = createCompanyJob;