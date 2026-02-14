const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// =====================================
// LIVE REAL-TIME SMART SCREEN ENGINE
// =====================================

// Temporary live state memory
let liveState = {};

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    if (!liveState[userId]) {
      liveState[userId] = {
        currentScreen: "Minimal Digital",
        lastUpdate: Date.now(),
      };
    }

    res.json({
      success: true,
      ultraMode: "Live Smart Screen Engine ⚡",
      live: liveState[userId],
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Simulate live screen switch (adaptive trigger)
router.post("/switch", auth, (req, res) => {
  const userId = req.user.id;
  const { screen } = req.body;

  if (!liveState[userId]) {
    liveState[userId] = {
      currentScreen: "Minimal Digital",
      lastUpdate: Date.now(),
    };
  }

  liveState[userId].currentScreen = screen;
  liveState[userId].lastUpdate = Date.now();

  res.json({
    success: true,
    message: "Live Screen Switched 🚀",
    live: liveState[userId],
  });
});

module.exports = router;