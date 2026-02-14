const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// =======================================
// 🌍 GEO BRAIN ENGINE (AUTO GEO CONTROL)
// =======================================

// Temporary geo rules memory
let geoControl = {
  India: {
    Bihar: {
      "East Champaran": {
        screens: true,
        hiring: true,
        liveMode: "satellite",
      },
    },
  },
};

// 🧠 Auto Geo Decision
router.post("/detect", auth, (req, res) => {
  const { country, state, district } = req.body;

  let appliedRules = {};

  if (
    geoControl[country] &&
    geoControl[country][state] &&
    geoControl[country][state][district]
  ) {
    appliedRules = geoControl[country][state][district];
  } else {
    appliedRules = {
      screens: true,
      hiring: false,
      liveMode: "normal",
    };
  }

  res.json({
    success: true,
    ultraMode: "Geo Brain Engine 🌍",
    location: { country, state, district },
    appliedRules,
  });
});

module.exports = router;