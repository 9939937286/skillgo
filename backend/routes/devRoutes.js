const express = require("express");
const Company = require("../models/company");

const router = express.Router();

// ⚠️ DEV ONLY – password reset
router.post("/reset-company-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({
        message: "email and newPassword required"
      });
    }

    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // 👇 password set (pre-save hook hash karega)
    company.password = newPassword;
    await company.save();

    res.json({ message: "Password reset successful (DEV)" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;