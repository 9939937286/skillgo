const express = require("express");
const auth = require("../middleware/authMiddleware");
const Company = require("../models/Company");
const CompanyProfile = require("../models/CompanyProfile");

const router = express.Router();

router.get("/dashboard", auth, async (req, res) => {
  const company = await Company.findById(req.user.id).select("-password");
  if (!company) return res.status(404).json({ message: "Company not found" });

  const profile = await CompanyProfile.findOne({ user: company._id });

  res.json({
    company,
    profile,
    profileCompleted: !!profile
  });
});

module.exports = router;