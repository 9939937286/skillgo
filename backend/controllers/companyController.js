const Company = require("../models/Company");

exports.updateCompanyProfile = async (req, res) => {
  try {
    const companyId = req.user.id;

    const { phone, address, gst, pan } = req.body;

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    if (phone) company.phone = phone;
    if (address) company.address = address;
    if (gst) company.gst = gst;
    if (pan) company.pan = pan;

    await company.save();

    res.status(200).json({
      message: "Company profile updated successfully",
      company
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};