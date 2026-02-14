const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// 👑 Owner Feature Control
let featureControl = {
  dashboard: true,
  screens: true,
  adaptive: true,
  liveScreen: true,
  brain: true,
};

// Owner Only Access
const ownerOnly = (req, res, next) => {
  if (req.user.role !== "company") {
    return res.status(403).json({ message: "Owner Access Only" });
  }
  next();
};

// GET Panel Status
router.get("/", auth, ownerOnly, (req, res) => {
  res.json({
    success: true,
    ultraMode: "Owner Panel Control 👑",
    featureControl,
  });
});

// Toggle Feature
router.post("/toggle", auth, ownerOnly, (req, res) => {
  const { feature } = req.body;

  if (!featureControl.hasOwnProperty(feature)) {
    return res.status(400).json({ message: "Feature not found" });
  }

  featureControl[feature] = !featureControl[feature];

  res.json({
    success: true,
    message: `${feature} toggled`,
    featureControl,
  });
});

module.exports = router;