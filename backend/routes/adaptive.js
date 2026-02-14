const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// =======================================
// SELF-ADAPTIVE BEHAVIOUR SMART UI ENGINE
// =======================================

// Temporary behaviour memory (Ultra Base)
let behaviourMemory = {};

router.get("/", auth, async (req, res) => {
  try {
    const user = req.user;
    const userId = user.id;

    // Default behaviour data
    if (!behaviourMemory[userId]) {
      behaviourMemory[userId] = {
        jobClicks: 0,
        relationUse: 0,
        businessActions: 0,
      };
    }

    const data = behaviourMemory[userId];

    // Smart Auto Priority Logic
    let autoScreen = "Minimal Digital";

    if (data.businessActions > data.jobClicks) {
      autoScreen = "Company Control Panel";
    } else if (data.jobClicks > data.relationUse) {
      autoScreen = "Worker Quick Jobs";
    } else {
      autoScreen = "Family Mode";
    }

    res.json({
      success: true,
      ultraMode: "Self-Adaptive Behaviour Engine 🧠",
      behaviour: data,
      autoSelectedScreen: autoScreen,
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Behaviour update simulate route (testing ke liye)
router.post("/action", auth, (req, res) => {
  const userId = req.user.id;
  const { type } = req.body;

  if (!behaviourMemory[userId]) {
    behaviourMemory[userId] = {
      jobClicks: 0,
      relationUse: 0,
      businessActions: 0,
    };
  }

  if (type === "job") behaviourMemory[userId].jobClicks++;
  if (type === "relation") behaviourMemory[userId].relationUse++;
  if (type === "business") behaviourMemory[userId].businessActions++;

  res.json({
    success: true,
    message: "Behaviour Updated ✅",
    behaviour: behaviourMemory[userId],
  });
});

module.exports = router;