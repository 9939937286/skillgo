const CompanyProfile = require("../models/CompanyProfile");

// ===============================
// GET COMPANY PROFILE
// ===============================
exports.getCompanyProfile = async (req, res) => {
  try {
    const profile = await CompanyProfile.findOne({
      user: req.user.id,
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Company profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ===============================
// CREATE or UPDATE COMPANY PROFILE
// ===============================
exports.upsertCompanyProfile = async (req, res) => {
  try {
    const profileData = {
      user: req.user.id,
      companyName: req.body.companyName,
      gstNumber: req.body.gstNumber,
      address: req.body.address,
      contactNumber: req.body.contactNumber,
    };

    const profile = await CompanyProfile.findOneAndUpdate(
      { user: req.user.id },
      profileData,
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: "Company profile saved",
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};