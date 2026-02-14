const express = require("express");
const router = express.Router();

router.post("/voice-command", (req, res) => {
  const { command } = req.body;

  if (command === "CALL") {
    return res.json({ message: "Call start ho raha hai" });
  }

  if (command === "RECEIVE") {
    return res.json({ message: "Call receive ho gaya" });
  }

  if (command === "DISCONNECT") {
    return res.json({ message: "Call disconnect ho gaya" });
  }

  res.json({ message: "Unknown command" });
});

module.exports = router;