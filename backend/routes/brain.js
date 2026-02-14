const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// ==========================================
// 🧠 NEURO-ADAPTIVE AI SCREEN BRAIN ENGINE
// ==========================================

let brainMemory = {};

router.get("/", auth, async (req, res) => {
  try {
    const user = req.user;
    const userId = user.id;

    // Default brain state
    if (!brainMemory[userId]) {
      brainMemory[userId] = {
        role: user.role,
        behaviour: {
          jobClicks: 0,
          relationUse: 0,
          businessActions: 0,
        },
        liveScreen: "Minimal Digital",
      };
    }

    const brain = brainMemory[userId];

    // Smart Decision Logic
    let predictedScreen = "Minimal Digital";

    if (brain.role === "company" && brain.behaviour.businessActions >= 1) {
      predictedScreen = "Company Control Panel";
    } else if (brain.behaviour.jobClicks > brain.behaviour.relationUse) {
      predictedScreen = "Worker Quick Jobs";
    } else if (brain.behaviour.relationUse >= 1) {
      predictedScreen = "Family Mode";
    }

    res.json({
      success: true,
      ultraMode: "Neuro-Adaptive AI Brain 🧠",
      role: brain.role,
      behaviour: brain.behaviour,
      currentLiveScreen: brain.liveScreen,
      predictedScreen,
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Behaviour update route
router.post("/update", auth, (req, res) => {
  const userId = req.user.id;
  const { type } = req.body;

  if (!brainMemory[userId]) {
    brainMemory[userId] = {
      role: req.user.role,
      behaviour: { jobClicks: 0, relationUse: 0, businessActions: 0 },
      liveScreen: "Minimal Digital",
    };
  }

  if (type === "job") brainMemory[userId].behaviour.jobClicks++;
  if (type === "relation") brainMemory[userId].behaviour.relationUse++;
  if (type === "business") brainMemory[userId].behaviour.businessActions++;

  res.json({
    success: true,
    message: "Brain Behaviour Updated 🧠",
    brain: brainMemory[userId],
  });
});

module.exports = router;