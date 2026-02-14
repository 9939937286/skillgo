const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// ===============================
// SMART ULTRA PRO MAXX+++ DASHBOARD
// ===============================
router.get("/", auth, async (req, res) => {
  try {
    const user = req.user;

    let dashboardData = {};

    // Role Based Smart Engine
    if (user.role === "company") {
      dashboardData = {
        panel: "Company Ultra Dashboard",
        features: [
          "Post Jobs",
          "Hire Workers",
          "Contracts",
          "SkillGo Payments",
        ],
      };
    } else if (user.role === "agent") {
      dashboardData = {
        panel: "Agent Ultra Dashboard",
        features: [
          "Manage Clients",
          "Commission System",
          "Global Manpower",
        ],
      };
    } else {
      dashboardData = {
        panel: "Worker Ultra Dashboard",
        features: [
          "Find Jobs",
          "Skill Profile",
          "Live Location Safety",
        ],
      };
    }

    res.json({
      success: true,
      ultraMode: "Smart Ultra Pro Maxx+++",
      user,
      dashboardData,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;