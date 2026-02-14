const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// =====================================
// AI ADAPTIVE 1000 SCREEN ULTRA ENGINE
// =====================================
router.get("/", auth, async (req, res) => {
  try {
    const user = req.user;

    // Base Screen Library (Ultra Expandable)
    const screenLibrary = {
      relationScreens: [
        "Friend Mode",
        "Family Mode",
        "Girlfriend Mode",
        "Business Partner Mode"
      ],
      workScreens: [
        "Company Control Panel",
        "Agent Operations",
        "Worker Quick Jobs"
      ],
      customScreens: [
        "Minimal Digital",
        "Ultra Dark Pro",
        "HD Smart Layout"
      ]
    };

    // Role Adaptive Engine
    let suggestedScreens = [];

    if (user.role === "company") {
      suggestedScreens = ["Company Control Panel", "Business Partner Mode"];
    } else if (user.role === "agent") {
      suggestedScreens = ["Agent Operations", "Friend Mode"];
    } else {
      suggestedScreens = ["Worker Quick Jobs", "Family Mode"];
    }

    res.json({
      success: true,
      ultraMode: "AI Adaptive 1000 Screen Ultra Engine 🚀",
      userRole: user.role,
      suggestedScreens,
      screenLibrary
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;