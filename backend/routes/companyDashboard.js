const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// ✅ Company Profile API
router.get(
  "/profile",
  authMiddleware,
  roleMiddleware(["company"]),
  (req, res) => {
    const company = req.user;

    res.status(200).json({
      success: true,
      message: "Company profile fetched successfully",
      data: {
        companyId: company.id,
        email: company.email,
        role: company.role,
        companyName: company.companyName || "SkillGo Company",
        status: "ACTIVE",
        verified: true
      }
    });
  }
);

// (test route rehne do)
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "CompanyDashboard route loaded successfully ✅"
  });
});

module.exports = router;